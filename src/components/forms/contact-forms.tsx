"use client";

import { useActionState, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  submitGrowthAuditRequest,
  submitMembershipApplication,
} from "@/lib/actions/contact";
import {
  initialContactFormState,
  preferredContactOptions,
  type ContactFormState,
} from "@/lib/validation/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export type ContactFormKind = "membership" | "audit";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

function Honeypot({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
      <label htmlFor={`${idPrefix}-company`}>Company website</label>
      <input
        id={`${idPrefix}-company`}
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}

function SuccessCard({ state }: { state: ContactFormState }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 border border-foreground bg-card p-10 text-center"
    >
      <CheckCircle2 className="size-10 text-warm-deep" aria-hidden="true" />
      <p className="text-lg font-semibold text-foreground">Request received</p>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        {state.message}
      </p>
    </div>
  );
}

function ConsentField({ error }: { error?: string }) {
  return (
    <div className="space-y-2">
      <label className="flex items-start gap-3 text-sm text-foreground">
        <Checkbox name="consent" value="true" required className="mt-0.5" />
        <span>
          I consent to Lumen Growth contacting me about my enquiry. See our{" "}
          <a href="/privacy-policy" className="font-medium underline">
            Privacy Policy
          </a>{" "}
          for how we handle your information.
        </span>
      </label>
      <FieldError message={error} />
    </div>
  );
}

function MembershipForm() {
  const [state, formAction, isPending] = useActionState(
    submitMembershipApplication,
    initialContactFormState
  );

  if (state.status === "success") return <SuccessCard state={state} />;
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-7" noValidate>
      <Honeypot idPrefix="membership" />
      {state.status === "error" && state.message ? (
        <p
          className="border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="m-fullName">Full name</Label>
          <Input id="m-fullName" name="fullName" type="text" autoComplete="name" required />
          <FieldError message={errors.fullName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-businessName">Business name</Label>
          <Input id="m-businessName" name="businessName" type="text" required />
          <FieldError message={errors.businessName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-website">Website (optional)</Label>
          <Input id="m-website" name="website" type="url" placeholder="https://" autoComplete="url" />
          <FieldError message={errors.website} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-email">Email</Label>
          <Input id="m-email" name="email" type="email" autoComplete="email" required />
          <FieldError message={errors.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-phone">Phone (optional)</Label>
          <Input id="m-phone" name="phone" type="tel" autoComplete="tel" />
          <FieldError message={errors.phone} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="m-aboutBusiness">Tell us about your business</Label>
        <Textarea id="m-aboutBusiness" name="aboutBusiness" required maxLength={1200} />
        <FieldError message={errors.aboutBusiness} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="m-hopingFor">What are you hoping to get from the community?</Label>
        <Textarea id="m-hopingFor" name="hopingFor" required maxLength={1200} />
        <FieldError message={errors.hopingFor} />
      </div>

      <ConsentField error={errors.consent} />

      <Button type="submit" size="lg" variant="warm" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "Submitting..." : "Apply to Join the Community"}
      </Button>
    </form>
  );
}

function AuditForm() {
  const [state, formAction, isPending] = useActionState(
    submitGrowthAuditRequest,
    initialContactFormState
  );

  if (state.status === "success") return <SuccessCard state={state} />;
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-7" noValidate>
      <Honeypot idPrefix="audit" />
      {state.status === "error" && state.message ? (
        <p
          className="border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="a-fullName">Full name</Label>
          <Input id="a-fullName" name="fullName" type="text" autoComplete="name" required />
          <FieldError message={errors.fullName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="a-businessName">Business name</Label>
          <Input id="a-businessName" name="businessName" type="text" required />
          <FieldError message={errors.businessName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="a-website">Website</Label>
          <Input id="a-website" name="website" type="url" placeholder="https://" autoComplete="url" required />
          <FieldError message={errors.website} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="a-email">Email</Label>
          <Input id="a-email" name="email" type="email" autoComplete="email" required />
          <FieldError message={errors.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="a-phone">Phone (optional)</Label>
          <Input id="a-phone" name="phone" type="tel" autoComplete="tel" />
          <FieldError message={errors.phone} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="a-preferredContact">Preferred contact method</Label>
          <Select id="a-preferredContact" name="preferredContact" defaultValue="" required>
            <option value="" disabled>
              Choose one
            </option>
            {preferredContactOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FieldError message={errors.preferredContact} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="a-wantMore">What do you want more of?</Label>
        <Input
          id="a-wantMore"
          name="wantMore"
          type="text"
          placeholder="e.g. enquiries, bookings, visibility, social presence"
          required
          maxLength={300}
        />
        <FieldError message={errors.wantMore} />
      </div>

      <ConsentField error={errors.consent} />

      <Button type="submit" size="lg" variant="warm" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "Submitting..." : "Request a Free Content Audit"}
      </Button>
    </form>
  );
}

export function ContactForms({ initialKind = "membership" }: { initialKind?: ContactFormKind }) {
  const [kind, setKind] = useState<ContactFormKind>(initialKind);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choose an enquiry type"
        className="flex flex-col gap-2 sm:flex-row"
      >
        <button
          type="button"
          role="tab"
          aria-selected={kind === "membership"}
          onClick={() => setKind("membership")}
          className={cn(
            "border px-5 py-3 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            kind === "membership"
              ? "border-foreground bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          )}
        >
          Apply to Join the Community
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={kind === "audit"}
          onClick={() => setKind("audit")}
          className={cn(
            "border px-5 py-3 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            kind === "audit"
              ? "border-foreground bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          )}
        >
          Request a Free Content Audit
        </button>
      </div>
      <div className="mt-8">{kind === "membership" ? <MembershipForm /> : <AuditForm />}</div>
    </div>
  );
}
