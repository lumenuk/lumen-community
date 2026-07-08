import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("divide-y divide-border", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("py-1", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
          className
        )}
        {...props}
      >
        {children}
        <Plus
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[panel-open]:rotate-45"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionPanel({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        "overflow-hidden text-sm text-muted-foreground transition-all",
        "h-[var(--accordion-panel-height)] data-[starting-style]:h-0 data-[ending-style]:h-0",
        className
      )}
      {...props}
    >
      <div className="pb-5 pr-8 leading-relaxed">{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionPanel };
