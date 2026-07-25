"use server";

import type { ZodType } from "zod";
import {
  auditSchema,
  membershipSchema,
  type ContactFormState,
} from "@/lib/validation/contact";
import { isRateLimited, requestIdentifier } from "@/lib/rate-limit";
import { sendNotificationEmail } from "@/lib/notify";
import { saveSubmission } from "@/lib/submissions-store";

function collectFieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

async function handleSubmission<T extends { company?: string; email: string }>(options: {
  schema: ZodType<T>;
  raw: Record<string, unknown>;
  storeType: "membership" | "growth-audit";
  subject: (data: T) => string;
  lines: (data: T) => string[];
  successMessage: string;
}): Promise<ContactFormState> {
  const identifier = await requestIdentifier();
  if (isRateLimited(identifier)) {
    return {
      status: "error",
      message: "Too many submissions from this connection. Please try again shortly.",
    };
  }

  const parsed = options.schema.safeParse(options.raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: collectFieldErrors(parsed.error.issues),
    };
  }

  /* Honeypot tripped: pretend success, store nothing. */
  if (parsed.data.company) {
    return { status: "success", message: options.successMessage };
  }

  const { company, ...data } = parsed.data;
  void company;

  const emailSent = await sendNotificationEmail({
    subject: options.subject(parsed.data),
    lines: options.lines(parsed.data),
    replyTo: parsed.data.email,
  });

  let fileSaved = false;
  try {
    await saveSubmission(options.storeType, data);
    fileSaved = true;
  } catch {
    console.error("Submission file storage failed");
  }

  if (!emailSent && !fileSaved) {
    return {
      status: "error",
      message:
        "Something went wrong on our side and your request wasn't recorded. Please email us directly instead. The address is in the footer.",
    };
  }

  return { status: "success", message: options.successMessage };
}

export async function submitMembershipApplication(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  return handleSubmission({
    schema: membershipSchema,
    raw: {
      fullName: formData.get("fullName"),
      businessName: formData.get("businessName"),
      website: formData.get("website") ?? "",
      email: formData.get("email"),
      phone: formData.get("phone") ?? "",
      aboutBusiness: formData.get("aboutBusiness"),
      hopingFor: formData.get("hopingFor"),
      consent: formData.get("consent") ?? "",
      company: formData.get("company") ?? "",
    },
    storeType: "membership",
    subject: (data) => `Community application: ${data.businessName}`,
    lines: (data) => [
      `Name: ${data.fullName}`,
      `Business: ${data.businessName}`,
      `Website: ${data.website || "not provided"}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "not provided"}`,
      "",
      "About the business:",
      data.aboutBusiness,
      "",
      "Hoping to get from the community:",
      data.hopingFor,
    ],
    successMessage:
      "Thanks, your application has been received. We'll review it and be in touch soon.",
  });
}

export async function submitGrowthAuditRequest(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  return handleSubmission({
    schema: auditSchema,
    raw: {
      fullName: formData.get("fullName"),
      businessName: formData.get("businessName"),
      website: formData.get("website"),
      email: formData.get("email"),
      phone: formData.get("phone") ?? "",
      wantMore: formData.get("wantMore"),
      preferredContact: formData.get("preferredContact"),
      consent: formData.get("consent") ?? "",
      company: formData.get("company") ?? "",
    },
    storeType: "growth-audit",
    subject: (data) => `Content Audit request: ${data.businessName}`,
    lines: (data) => [
      `Name: ${data.fullName}`,
      `Business: ${data.businessName}`,
      `Website: ${data.website}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "not provided"}`,
      `Wants more of: ${data.wantMore}`,
      `Preferred contact method: ${data.preferredContact}`,
    ],
    successMessage:
      "Thanks, your Content Audit request has been received. We'll review your business and be in touch soon.",
  });
}
