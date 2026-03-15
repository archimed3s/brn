"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

import { useAccordion } from "./useAccordion";

export const AccordionTrigger = ({
  children,
  className,
}: AccordionTriggerProps) => {
  const { open, onOpenChange } = useAccordion();

  const handleClick = React.useCallback(() => {
    onOpenChange(!open);
  }, [open, onOpenChange]);

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "flex min-h-10 w-full flex-1 items-center justify-start gap-3 rounded-md px-3 py-2 transition-colors hover:bg-accent",
        className,
      )}
      aria-expanded={open}
      onClick={handleClick}
    >
      {children}
      <span className="min-w-0 flex-1" aria-hidden />
      {open ? (
        <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
      ) : (
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
      )}
    </Button>
  );
};

export type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string;
};
