"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";
import { initialContactFormState } from "@/lib/validation/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialContactFormState
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-xl border border-[#2f3ee0]/40 bg-[#2f3ee0]/10 p-5 text-left"
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-ink" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-foreground">{state.message}</p>
      </div>
    );
  }

  const emailError = state.status === "error" ? state.fieldErrors?.email : undefined;
  const consentError = state.status === "error" ? state.fieldErrors?.consent : undefined;

  return (
    <form action={formAction} className="space-y-3" noValidate>
      {/* Honeypot — humans leave this empty. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="newsletter-company">Company website</label>
        <input
          id="newsletter-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@yourbusiness.co.uk"
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? "newsletter-email-error" : undefined}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          variant="warm"
          disabled={isPending}
          className="rounded-md px-5 sm:shrink-0"
        >
          {isPending ? "Subscribing…" : "Subscribe"}
          {!isPending ? <ArrowRight className="size-4" /> : null}
        </Button>
      </div>

      {emailError ? (
        <p id="newsletter-email-error" className="text-sm text-destructive" role="alert">
          {emailError}
        </p>
      ) : null}

      {state.status === "error" && !emailError && !consentError && state.message ? (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
        <Checkbox name="consent" value="true" required className="mt-0.5" />
        <span>
          I agree to receive occasional emails from Lumen Growth and accept the{" "}
          <Link href="/privacy-policy" className="font-medium underline underline-offset-2">
            Privacy Policy
          </Link>
          . Unsubscribe anytime.
        </span>
      </label>

      {consentError ? (
        <p className="text-sm text-destructive" role="alert">
          {consentError}
        </p>
      ) : null}
    </form>
  );
}
