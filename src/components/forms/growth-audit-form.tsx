"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitGrowthAudit } from "@/lib/actions/growth-audit";
import {
  initialGrowthAuditFormState,
  revenueBands,
  serviceOptions,
} from "@/lib/validation/growth-audit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

export function GrowthAuditForm() {
  const [state, formAction, isPending] = useActionState(
    submitGrowthAudit,
    initialGrowthAuditFormState
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-10 text-center"
      >
        <CheckCircle2 className="size-10 text-warm" aria-hidden="true" />
        <p className="text-lg font-semibold text-foreground">Request received</p>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {state.message ??
            "Thanks — we've received your Growth Audit request and will be in touch soon."}
        </p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-8" noValidate>
      {/* Honeypot field: kept off-screen for real users, left in the tab order for bots that fill every field. */}
      <div className="absolute left-0 top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company website</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status === "error" && state.message ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" type="text" autoComplete="name" required />
          <FieldError message={errors.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
          <FieldError message={errors.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" required />
          <FieldError message={errors.phone} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessName">Business name</Label>
          <Input id="businessName" name="businessName" type="text" required />
          <FieldError message={errors.businessName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessArea">Business address or area</Label>
          <Input
            id="businessArea"
            name="businessArea"
            type="text"
            placeholder="e.g. Battersea, London"
            required
          />
          <FieldError message={errors.businessArea} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="websiteUrl">Website URL (optional)</Label>
          <Input
            id="websiteUrl"
            name="websiteUrl"
            type="url"
            placeholder="https://"
            autoComplete="url"
          />
          <FieldError message={errors.websiteUrl} />
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-foreground">
          Services you&apos;re interested in
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2.5 text-sm text-foreground"
            >
              <Checkbox name="services" value={option.value} />
              {option.label}
            </label>
          ))}
        </div>
        <FieldError message={errors.services} />
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="revenueBand">Approximate annual revenue (optional)</Label>
        <Select id="revenueBand" name="revenueBand" defaultValue="">
          <option value="">Select a range</option>
          {revenueBands.map((band) => (
            <option key={band.value} value={band.value}>
              {band.label}
            </option>
          ))}
        </Select>
        <p className="text-xs text-muted-foreground">
          This helps us prepare for the call. It&apos;s optional, and you can select
          &ldquo;Prefer not to say&rdquo;.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="challenge">What&apos;s your main marketing challenge right now?</Label>
        <Textarea id="challenge" name="challenge" required maxLength={1000} />
        <FieldError message={errors.challenge} />
      </div>

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm text-foreground">
          <Checkbox name="consent" value="true" required className="mt-0.5" />
          <span>
            I consent to Lumen Growth contacting me about my Growth Audit request. See our{" "}
            <a href="/privacy-policy" className="font-medium underline">
              Privacy Policy
            </a>{" "}
            for how we handle your information.
          </span>
        </label>
        <FieldError message={errors.consent} />
      </div>

      <Button
        type="submit"
        size="lg"
        variant="warm"
        disabled={isPending}
        className="w-full sm:w-auto"
      >
        {isPending ? "Submitting..." : "Request a Growth Audit"}
      </Button>
    </form>
  );
}
