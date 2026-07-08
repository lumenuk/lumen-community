"use server";

import { headers } from "next/headers";
import { growthAuditSchema } from "@/lib/validation/growth-audit";
import { isRateLimited } from "@/lib/rate-limit";
import { saveGrowthAuditLead } from "@/lib/leads-store";
import { sendLeadNotification } from "@/lib/lead-notification";
import type { GrowthAuditFormState } from "@/lib/validation/growth-audit";

export async function submitGrowthAudit(
  _prevState: GrowthAuditFormState,
  formData: FormData
): Promise<GrowthAuditFormState> {
  const requestHeaders = await headers();
  const identifier =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(identifier)) {
    return {
      status: "error",
      message: "Too many submissions from this connection. Please try again shortly.",
    };
  }

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    businessName: formData.get("businessName"),
    businessArea: formData.get("businessArea"),
    websiteUrl: formData.get("websiteUrl") ?? "",
    services: formData.getAll("services"),
    revenueBand: formData.get("revenueBand") ?? "",
    challenge: formData.get("challenge"),
    consent: formData.get("consent") ?? "",
    company: formData.get("company") ?? "",
  };

  const parsed = growthAuditSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  if (parsed.data.company) {
    return { status: "success" };
  }

  const { company, ...lead } = parsed.data;
  void company;

  const fullLead = { ...lead, submittedAt: new Date().toISOString() };

  /* Two delivery paths: email via Resend (if configured) and the local file
     store (works on persistent hosts; may fail on read-only serverless FS).
     Only report success to the visitor if at least one path worked. */
  const emailSent = await sendLeadNotification(fullLead);

  let fileSaved = false;
  try {
    await saveGrowthAuditLead(fullLead);
    fileSaved = true;
  } catch {
    console.error("Lead file storage failed");
  }

  if (!emailSent && !fileSaved) {
    return {
      status: "error",
      message:
        "Something went wrong on our side and your request wasn't recorded. Please email us directly instead — the address is in the footer.",
    };
  }

  return {
    status: "success",
    message:
      "Thanks — your Growth Audit request has been received. We'll review your business and be in touch soon.",
  };
}
