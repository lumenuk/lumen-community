import { siteConfig } from "@/lib/site-config";

/**
 * Sends an internal notification email via Resend (https://resend.com).
 * - RESEND_API_KEY — if unset, returns false and callers fall back to file storage.
 * - LEAD_NOTIFY_EMAIL — default recipient; falls back to the site contact address.
 *   On Resend's free tier without a verified domain, this must be the email the
 *   Resend account was registered with.
 * - LEAD_FROM_EMAIL — sender; defaults to Resend's shared onboarding sender,
 *   which works before lumengrowth.co.uk is verified.
 */
export async function sendNotificationEmail(options: {
  subject: string;
  lines: string[];
  replyTo?: string;
  to?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to =
    options.to ?? process.env.LEAD_NOTIFY_EMAIL ?? siteConfig.contactEmail;
  const from = process.env.LEAD_FROM_EMAIL ?? "Lumen Growth <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        ...(options.replyTo ? { reply_to: options.replyTo } : {}),
        subject: options.subject,
        text: options.lines.join("\n"),
      }),
    });
    if (!response.ok) {
      // Log status only, never submission contents.
      console.error(`Notification email failed with status ${response.status}`);
      return false;
    }
    return true;
  } catch {
    console.error("Notification email failed to send");
    return false;
  }
}
