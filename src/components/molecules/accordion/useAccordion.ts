"use client";

import * as React from "react";

import { AccordionContext } from "./AccordionContext";

export const useAccordion = () => {
  const ctx = React.useContext(AccordionContext);
  if (ctx == null) {
    throw new Error("Accordion components must be used within Accordion");
  }
  return ctx;
};
