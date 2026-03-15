"use client";

import * as React from "react";

export type AccordionContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AccordionContext =
  React.createContext<AccordionContextValue | null>(null);
