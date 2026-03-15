"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";
import { AccordionContext } from "./AccordionContext";

export const AccordionRoot = ({
  open,
  onOpenChange,
  children,
  className,
}: AccordionRootProps) => (
  <AccordionContext.Provider value={{ open, onOpenChange }}>
    <div className={cn("flex flex-col", className)}>{children}</div>
  </AccordionContext.Provider>
);

type AccordionRootProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};
