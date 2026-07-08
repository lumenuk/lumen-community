import { siteConfig } from "@/lib/site-config";
import type { GrowthAuditLead } from "@/lib/leads-store";

/**
 * Emails each Growth Audit lead via Resend (https://resend.com).
 * Configuration (see README):
 * - RESEND_API_KEY  — if unset, email delivery is skipped and the caller
 *   falls back to file storage only.
 * - LEAD_NOTIFY_EMAIL — recipient; defaults to the site contact address.
 *   On Resend's free tier without a verified domain, this must be the email
 *   the Resend account was created with.
 * - LEAD_FROM_EMAIL — sender; defaults to Resend's shared onboarding sender,
 *   which works before lumengrowth.co.uk is verified.
 */
export async function sendLeadNotification(lead: GrowthAuditLead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.LEAD_NOTIFY_EMAIL ?? siteConfig.contactEmail;
  const from = process.env.LEAD_FROM_EMAIL ?? "Lumen Growth <onboarding@resend.dev>";

  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Business: ${lead.businessName}`,
    `Address / area: ${lead.businessArea}`,
    `Website: ${lead.websiteUrl || "not provided"}`,
    `Services interested in: ${lead.services.join(", ")}`,
    `Revenue band: ${lead.revenueBand || "not provided"}`,
    `Submitted at: ${lead.submittedAt}`,
    "",
    "Main marketing challenge:",
    lead.challenge,
  ];

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
        reply_to: lead.email,
        subject: `Growth Audit request — ${lead.businessName}`,
        text: lines.join("\n"),
      }),
    });
    if (!response.ok) {
      // Log status only — never the submission contents.
      console.error(`Lead notification email failed with status ${response.status}`);
      return false;
    }
    return true;
  } catch {
    console.error("Lead notification email failed to send");
    return false;
  }
}
