"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { useAccordion } from "./useAccordion";

export const AccordionContent = ({
  children,
  className,
}: AccordionContentProps) => {
  const { open } = useAccordion();
  if (!open) return null;
  return <div className={cn("flex flex-col pb-1", className)}>{children}</div>;
};

type AccordionContentProps = {
  children: ReactNode;
  className?: string;
};
