import { z } from "zod";

export const revenueBands = [
  { value: "under-500k", label: "Under £500k" },
  { value: "500k-2m", label: "£500k – £2m" },
  { value: "2m-plus", label: "£2m+" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
] as const;

export const serviceOptions = [
  { value: "seo", label: "SEO" },
  { value: "local-seo", label: "Local SEO" },
  { value: "google-business-profile", label: "Google Business Profile" },
  { value: "social-media", label: "Social media" },
  { value: "paid-advertising", label: "Paid advertising" },
  { value: "email-marketing", label: "Email marketing" },
  { value: "linkedin-marketing", label: "LinkedIn marketing" },
  { value: "website", label: "Website improvements" },
  { value: "content", label: "Content and blog" },
  { value: "reviews", label: "Reviews and reputation" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const growthAuditSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: z.string().trim().min(6, "Enter a valid phone number.").max(30),
  businessName: z.string().trim().min(2, "Enter your business name.").max(150),
  businessArea: z
    .string()
    .trim()
    .min(2, "Enter your business address or area.")
    .max(150),
  websiteUrl: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || /^https?:\/\/.+\..+/i.test(value),
      "Enter a valid website URL, starting with http:// or https://."
    ),
  services: z
    .array(z.enum(serviceOptions.map((option) => option.value) as [string, ...string[]]))
    .min(1, "Select at least one service you're interested in."),
  revenueBand: z
    .enum(revenueBands.map((band) => band.value) as [string, ...string[]])
    .optional()
    .or(z.literal("")),
  challenge: z
    .string()
    .trim()
    .min(10, "Tell us a little about your main marketing challenge.")
    .max(1000),
  consent: z.literal("true", {
    error: "You must consent to being contacted before submitting.",
  }),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type GrowthAuditInput = z.infer<typeof growthAuditSchema>;

export type GrowthAuditFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export const initialGrowthAuditFormState: GrowthAuditFormState = {
  status: "idle",
};
