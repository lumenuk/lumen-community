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
/* Honeypot: humans leave it empty. Any value must pass validation so the
   action can return a fake success instead of an error that tips off bots. */
const honeypot = z.string().optional();

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
    .min(10, "Tell us what you'd like to hand to an agent team.")
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
  consent,
  company: honeypot,
});

/* Book-a-call wizard. Stricter than the legacy forms to keep spam/low-intent
   submissions out: real name parts, a real link, a real phone, a real message. */
const nameField = (label: string) =>
  z
    .string()
    .trim()
    .min(2, `Enter your ${label} (at least 2 letters).`)
    .max(60)
    .regex(
      /^\p{L}[\p{L}\s'’.-]*$/u,
      `Enter a valid ${label} — letters only.`
    );

const linkField = z
  .string()
  .trim()
  .min(1, "Enter your website or LinkedIn.")
  .max(200)
  .refine(
    (value) => /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i.test(value),
    "Enter a real website or LinkedIn URL (e.g. yourbusiness.co.uk)."
  );

const phoneRequired = z
  .string()
  .trim()
  .min(1, "Enter your phone number.")
  .refine((value) => /^[+()\d][+()\-\s\d]*$/.test(value), "Enter a valid phone number.")
  .refine((value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }, "Enter a real phone number, including the area or country code.");

const wordCount = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;

const helpMessage = z
  .string()
  .trim()
  .min(1, "Tell us what you'd like help with.")
  .max(2000)
  .refine((value) => wordCount(value) >= 20, "Please write at least 20 words so we can prepare.")
  .refine((value) => wordCount(value) <= 200, "Please keep it under 200 words.");

export const bookCallSchema = z.object({
  businessName,
  firstName: nameField("first name"),
  lastName: nameField("last name"),
  websiteOrLinkedin: linkField,
  phone: phoneRequired,
  message: helpMessage,
  consent,
  company: honeypot,
});

export type BookCallInput = z.infer<typeof bookCallSchema>;

export type MembershipInput = z.infer<typeof membershipSchema>;
export type AuditInput = z.infer<typeof auditSchema>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export const initialContactFormState: ContactFormState = { status: "idle" };
