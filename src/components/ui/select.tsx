import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        data-slot="select"
        className={cn(
          "flex h-11 w-full appearance-none rounded-md border border-input bg-background px-3.5 pr-9 text-sm text-foreground shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

export { Select };
