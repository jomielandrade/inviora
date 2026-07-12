"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({
  className,
  ...props
}: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
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
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion flex flex-1 items-center justify-between gap-4 py-5 text-left text-lg font-heading font-medium text-navy outline-none transition-colors hover:text-navy/80 focus-visible:rounded-md focus-visible:ring-3 focus-visible:ring-ring/50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          aria-hidden="true"
          className="size-5 shrink-0 text-blue transition-transform duration-300 group-data-[panel-open]/accordion:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden text-[0.9375rem] leading-relaxed text-muted-foreground transition-[height] duration-300 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
        className
      )}
      {...props}
    >
      <div className="pb-5 pr-8">{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionPanel };
