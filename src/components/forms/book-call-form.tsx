"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { submitBookCall } from "@/lib/actions/contact";
import { initialContactFormState } from "@/lib/validation/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Values = {
  businessName: string;
  firstName: string;
  lastName: string;
  websiteOrLinkedin: string;
  phone: string;
  message: string;
  consent: boolean;
};

const EMPTY: Values = {
  businessName: "",
  firstName: "",
  lastName: "",
  websiteOrLinkedin: "",
  phone: "",
  message: "",
  consent: false,
};

const STORAGE_KEY = "lumen-book-call-v1";

type FieldName = keyof Omit<Values, "consent">;

const STEPS: { id: string; title: string; fields: (keyof Values)[] }[] = [
  { id: "business", title: "Business name", fields: ["businessName"] },
  { id: "name", title: "Your name", fields: ["firstName", "lastName"] },
  { id: "link", title: "Website or LinkedIn", fields: ["websiteOrLinkedin"] },
  { id: "phone", title: "Phone number", fields: ["phone"] },
  { id: "message", title: "How can we help?", fields: ["message", "consent"] },
];

const wordCount = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;

function validateName(value: string, label: string): string | undefined {
  const v = value.trim();
  if (v.length < 2) return `Enter your ${label} (at least 2 letters).`;
  if (!/^\p{L}[\p{L}\s'’.-]*$/u.test(v)) return `Enter a valid ${label} — letters only.`;
  return undefined;
}

function validateField(name: keyof Values, values: Values): string | undefined {
  switch (name) {
    case "businessName":
      return values.businessName.trim().length >= 2
        ? undefined
        : "Enter your business name.";
    case "firstName":
      return validateName(values.firstName, "first name");
    case "lastName":
      return validateName(values.lastName, "last name");
    case "websiteOrLinkedin":
      return /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i.test(
        values.websiteOrLinkedin.trim()
      )
        ? undefined
        : "Enter a real website or LinkedIn URL (e.g. yourbusiness.co.uk).";
    case "phone": {
      const digits = values.phone.replace(/\D/g, "");
      if (!/^[+()\d][+()\-\s\d]*$/.test(values.phone.trim()) || digits.length < 7 || digits.length > 15)
        return "Enter a real phone number, including the area or country code.";
      return undefined;
    }
    case "message": {
      const words = wordCount(values.message);
      if (words < 20) return "Please write at least 20 words so we can prepare.";
      if (words > 200) return "Please keep it under 200 words.";
      return undefined;
    }
    case "consent":
      return values.consent ? undefined : "Please tick the box so we can contact you.";
    default:
      return undefined;
  }
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

export function BookCallForm() {
  const [state, formAction, isPending] = useActionState(
    submitBookCall,
    initialContactFormState
  );
  const [values, setValues] = useState<Values>(EMPTY);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const loaded = useRef(false);

  /* Restore anything the visitor typed earlier (in case they left mid-way). */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { values?: Partial<Values>; step?: number };
        // Legitimate one-time hydration of the draft the visitor left behind.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (saved.values) setValues((v) => ({ ...v, ...saved.values }));
        if (typeof saved.step === "number")
          setStep(Math.max(0, Math.min(saved.step, STEPS.length - 1)));
      }
    } catch {
      /* ignore */
    }
    loaded.current = true;
  }, []);

  /* Persist on every change so nothing is lost on refresh/abandon. */
  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, step }));
    } catch {
      /* ignore */
    }
  }, [values, step]);

  /* Clear the saved draft once it's successfully sent. */
  useEffect(() => {
    if (state.status === "success") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  }, [state.status]);

  // Show a field's client error, falling back to any server-side error for it.
  const serverErrors = state.status === "error" ? state.fieldErrors : undefined;
  const fieldError = (name: keyof Values) => errors[name] ?? serverErrors?.[name];

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-2xl border border-[#E6E6EC] p-10 text-center"
      >
        <CheckCircle2 className="size-10 text-[#3B3BD9]" aria-hidden="true" />
        <p className="text-lg font-medium text-[#0A0A0C]">Request received</p>
        <p className="max-w-md text-[15px] leading-relaxed text-[#4A4A55]">
          {state.message}
        </p>
      </div>
    );
  }

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  function setField(name: FieldName, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  }

  function validateStep(index: number): boolean {
    const stepErrors: Partial<Record<keyof Values, string>> = {};
    for (const f of STEPS[index].fields) {
      const err = validateField(f, values);
      if (err) stepErrors[f] = err;
    }
    setErrors((e) => ({ ...e, ...stepErrors }));
    return Object.keys(stepErrors).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Final client gate: validate everything; block and jump to the first problem.
    const allErrors: Partial<Record<keyof Values, string>> = {};
    for (const s of STEPS)
      for (const f of s.fields) {
        const err = validateField(f, values);
        if (err) allErrors[f] = err;
      }
    if (Object.keys(allErrors).length > 0) {
      e.preventDefault();
      setErrors(allErrors);
      const idx = STEPS.findIndex((s) => s.fields.some((f) => allErrors[f]));
      if (idx >= 0) setStep(idx);
    }
    // otherwise let the server action run
  }

  const messageWords = wordCount(values.message);

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="bc-company">Company website</label>
        <input id="bc-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-[#E6E6EC]">
        <div
          className="h-full rounded-full bg-[#3B3BD9] transition-all duration-300"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {state.status === "error" && state.message ? (
        <p
          className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <div>
        <h2 className="font-serif text-[26px] leading-[1.15] font-normal tracking-[-0.01em] text-[#0A0A0C]">
          {current.title}
        </h2>

        <div className="mt-6 space-y-5">
          {/* Step 1 — business name (kept mounted; hidden when inactive) */}
          <div className={current.id === "business" ? "" : "hidden"}>
            <Input
              id="bc-businessName"
              name="businessName"
              type="text"
              aria-label="Business name"
              value={values.businessName}
              onChange={(e) => setField("businessName", e.target.value)}
              autoComplete="organization"
            />
            <FieldError message={fieldError("businessName")} />
          </div>

          {/* Step 2 — name */}
          <div className={current.id === "name" ? "grid gap-5 sm:grid-cols-2" : "hidden"}>
            <div>
              <Label htmlFor="bc-firstName">First name</Label>
              <Input
                id="bc-firstName"
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={(e) => setField("firstName", e.target.value)}
                autoComplete="given-name"
              />
              <FieldError message={fieldError("firstName")} />
            </div>
            <div>
              <Label htmlFor="bc-lastName">Last name</Label>
              <Input
                id="bc-lastName"
                name="lastName"
                type="text"
                value={values.lastName}
                onChange={(e) => setField("lastName", e.target.value)}
                autoComplete="family-name"
              />
              <FieldError message={fieldError("lastName")} />
            </div>
          </div>

          {/* Step 3 — website / linkedin */}
          <div className={current.id === "link" ? "" : "hidden"}>
            <Input
              id="bc-websiteOrLinkedin"
              name="websiteOrLinkedin"
              type="text"
              inputMode="url"
              aria-label="Website or LinkedIn"
              placeholder="yourbusiness.co.uk"
              value={values.websiteOrLinkedin}
              onChange={(e) => setField("websiteOrLinkedin", e.target.value)}
              autoComplete="url"
            />
            <FieldError message={fieldError("websiteOrLinkedin")} />
          </div>

          {/* Step 4 — phone */}
          <div className={current.id === "phone" ? "" : "hidden"}>
            <Input
              id="bc-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              aria-label="Phone number"
              placeholder="07123 456789"
              value={values.phone}
              onChange={(e) => setField("phone", e.target.value)}
              autoComplete="tel"
            />
            <FieldError message={fieldError("phone")} />
          </div>

          {/* Step 5 — message + consent */}
          <div className={current.id === "message" ? "space-y-5" : "hidden"}>
            <div>
              <Textarea
                id="bc-message"
                name="message"
                rows={5}
                aria-label="How can we help?"
                placeholder="A few lines on the work you'd like to hand over…"
                value={values.message}
                onChange={(e) => setField("message", e.target.value)}
                maxLength={2000}
              />
              <div className="mt-1.5 flex items-center justify-between">
                <FieldError message={fieldError("message")} />
                <span
                  className={`ml-auto text-xs ${
                    messageWords > 200 ? "text-destructive" : "text-[#8A8A94]"
                  }`}
                >
                  {messageWords} / 20–200 words
                </span>
              </div>
            </div>
            <div>
              <label className="flex items-start gap-3 text-sm text-[#15151C]">
                <Checkbox
                  name="consent"
                  value="true"
                  checked={values.consent}
                  onCheckedChange={(checked) =>
                    setValues((v) => ({ ...v, consent: checked === true }))
                  }
                  className="mt-0.5"
                />
                <span>
                  I consent to Lumen Growth contacting me about my enquiry. See our{" "}
                  <a href="/privacy-policy" className="font-medium underline underline-offset-2">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              <FieldError message={fieldError("consent")} />
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#4A4A55] transition-colors hover:text-[#0A0A0C]"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
        ) : (
          <span />
        )}

        {isLast ? (
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-[10px] bg-[#0A0A0C] px-[30px] py-[15px] text-[15px] font-medium text-white transition-colors hover:bg-[#25252C] disabled:opacity-60"
          >
            {isPending ? "Submitting…" : "Book a call"}
            {!isPending ? <ArrowUpRight className="size-[15px]" /> : null}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-2 rounded-[10px] bg-[#0A0A0C] px-[30px] py-[15px] text-[15px] font-medium text-white transition-colors hover:bg-[#25252C]"
          >
            Continue
            <ArrowRight className="size-[15px]" />
          </button>
        )}
      </div>
    </form>
  );
}
