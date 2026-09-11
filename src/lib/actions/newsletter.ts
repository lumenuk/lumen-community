"use server";

import { newsletterSchema, type ContactFormState } from "@/lib/validation/contact";
import { isRateLimited, requestIdentifier } from "@/lib/rate-limit";
import { sendNotificationEmail } from "@/lib/notify";
import { saveSubmission } from "@/lib/submissions-store";

const SUCCESS_MESSAGE =
  "You're on the list. We'll email you when there's something worth reading — nothing else.";

/* Insights newsletter sign-up. Same defence-in-depth as the contact forms:
   rate limit, honeypot, then email notification with a file-store fallback.
   Consent is captured explicitly in the form (GDPR); see lib/validation. */
export async function subscribeToNewsletter(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const identifier = await requestIdentifier();
  if (isRateLimited(identifier)) {
    return {
      status: "error",
      message: "Too many attempts from this connection. Please try again shortly.",
    };
  }

  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    consent: formData.get("consent") ?? "",
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: fieldErrors.consent ?? "Please enter a valid email address.",
      fieldErrors,
    };
  }

  /* Honeypot tripped: pretend success, store nothing. */
  if (parsed.data.company) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const emailSent = await sendNotificationEmail({
    subject: "New Insights subscriber",
    lines: [`Email: ${parsed.data.email}`],
    replyTo: parsed.data.email,
  });

  let fileSaved = false;
  try {
    await saveSubmission("newsletter", { email: parsed.data.email });
    fileSaved = true;
  } catch {
    console.error("Newsletter submission file storage failed");
  }

  if (!emailSent && !fileSaved) {
    return {
      status: "error",
      message:
        "Something went wrong on our side. Please try again, or email us directly — the address is in the footer.",
    };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}
