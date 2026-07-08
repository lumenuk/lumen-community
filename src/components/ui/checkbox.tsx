import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-[6px] border border-input bg-background transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/30 data-[checked]:border-warm data-[checked]:bg-warm aria-invalid:border-destructive",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex text-warm-foreground data-[unchecked]:hidden">
        <Check className="size-3.5" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
