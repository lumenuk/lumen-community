"use client";

import { useActionState } from "react";
import { Check } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";
import { initialContactFormState } from "@/lib/validation/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function NewsletterSignup({ className }: { className?: string }) {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialContactFormState
  );

  if (state.status === "success") {
    return (
      <p
        role="status"
        className={cn("flex items-center gap-2 text-base font-medium text-foreground", className)}
      >
        <Check className="size-5 text-warm-deep" aria-hidden="true" />
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className={cn("max-w-md", className)} noValidate>
      {/* Honeypot: off-screen, ignored by real users. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="newsletter-company">Company</label>
        <input id="newsletter-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <Label htmlFor="newsletter-email" className="sr-only">
        Email address
      </Label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@yourbusiness.co.uk"
          autoComplete="email"
          className="sm:flex-1"
        />
        <Button type="submit" variant="warm" disabled={isPending}>
          {isPending ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      {state.status === "error" && state.message ? (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}
      <p className="mt-3 text-xs text-muted-foreground">
        Occasional, useful emails. No spam, unsubscribe any time.
      </p>
    </form>
  );
}
