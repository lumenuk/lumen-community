"use server";

import { newsletterSchema, type ContactFormState } from "@/lib/validation/contact";
import { isRateLimited, requestIdentifier } from "@/lib/rate-limit";
import { sendNotificationEmail } from "@/lib/notify";
import { saveSubmission } from "@/lib/submissions-store";
import { siteConfig } from "@/lib/site-config";

/**
 * Newsletter signups are delivered as notification emails to NEWSLETTER_EMAIL
 * (falls back to LEAD_NOTIFY_EMAIL, then the site contact address) and appended
 * to the file store. When a real newsletter provider is chosen (e.g. Mailchimp
 * or Resend Audiences), replace the body of this action with the provider API
 * call; the form component doesn't need to change.
 */
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
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: "Enter a valid email address." };
  }

  if (parsed.data.company) {
    return { status: "success", message: "You're on the list." };
  }

  const emailSent = await sendNotificationEmail({
    subject: "New newsletter subscriber",
    lines: [`Email: ${parsed.data.email}`],
    to:
      process.env.NEWSLETTER_EMAIL ??
      process.env.LEAD_NOTIFY_EMAIL ??
      siteConfig.contactEmail,
  });

  let fileSaved = false;
  try {
    await saveSubmission("newsletter", { email: parsed.data.email });
    fileSaved = true;
  } catch {
    console.error("Newsletter file storage failed");
  }

  if (!emailSent && !fileSaved) {
    return {
      status: "error",
      message: "Something went wrong on our side. Please try again later.",
    };
  }

  return { status: "success", message: "You're on the list. Welcome." };
}
