import { z } from "zod";

export const preferredContactOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "either", label: "Either" },
] as const;

const fullName = z.string().trim().min(2, "Enter your full name.").max(120);
const businessName = z.string().trim().min(2, "Enter your business name.").max(150);
const email = z.string().trim().email("Enter a valid email address.").max(200);
const phoneOptional = z
  .string()
  .trim()
  .max(30)
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || value.length >= 6, "Enter a valid phone number.");
const websiteShape = z
  .string()
  .trim()
  .max(200)
  .refine(
    (value) => !value || /^https?:\/\/.+\..+/i.test(value),
    "Enter a valid website URL, starting with http:// or https://."
  );
const consent = z.literal("true", {
  error: "You must consent to being contacted before submitting.",
});
/* Honeypot: must stay empty; bots that fill every field trip it. */
const honeypot = z.string().max(0).optional().or(z.literal(""));

export const membershipSchema = z.object({
  fullName,
  businessName,
  website: websiteShape.optional().or(z.literal("")),
  email,
  phone: phoneOptional,
  aboutBusiness: z
    .string()
    .trim()
    .min(10, "Tell us a little about your business.")
    .max(1200),
  hopingFor: z
    .string()
    .trim()
    .min(10, "Tell us what you're hoping to get from the community.")
    .max(1200),
  consent,
  company: honeypot,
});

export const auditSchema = z.object({
  fullName,
  businessName,
  website: z
    .string()
    .trim()
    .min(4, "Enter your website URL.")
    .max(200)
    .refine(
      (value) => /^https?:\/\/.+\..+/i.test(value),
      "Enter a valid website URL, starting with http:// or https://."
    ),
  email,
  phone: phoneOptional,
  wantMore: z
    .string()
    .trim()
    .min(3, "Tell us what you want more of.")
    .max(300),
  preferredContact: z.enum(
    preferredContactOptions.map((option) => option.value) as [string, ...string[]],
    { error: "Choose how you'd prefer to be contacted." }
  ),
  consent,
  company: honeypot,
});

export const newsletterSchema = z.object({
  email,
  company: honeypot,
});

export type MembershipInput = z.infer<typeof membershipSchema>;
export type AuditInput = z.infer<typeof auditSchema>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export const initialContactFormState: ContactFormState = { status: "idle" };
