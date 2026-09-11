"use client";

import { Moon, Sun } from "lucide-react";

/* Light/dark switch. State lives on <html class="dark"> (set before paint by the
   inline script in layout.tsx); this button flips that class and persists the
   choice. Icons are shown via `dark:` variants rather than React state, so there
   is no hydration mismatch and no flash. */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    root.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* private mode / storage disabled — the toggle still works for the session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      title="Toggle theme"
      className={
        "inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-accent-ink/60 hover:text-foreground " +
        (className ?? "")
      }
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="block size-4 dark:hidden" />
    </button>
  );
}
