"use client";

import type { ReactNode } from "react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Drawer = ({ open, onOpenChange, children, className }: DrawerProps) => {
  const handleBackdropClick = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  return (
    <>
      <div
        role="presentation"
        aria-hidden
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ease-out lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={handleBackdropClick}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "flex h-full shrink-0 flex-col overflow-hidden border-r border-[#EAECF0] bg-white transition-transform duration-200 ease-out lg:bg-[#F2F4F7]",
          "fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] shadow-xl lg:relative lg:inset-auto lg:z-auto lg:h-screen lg:w-auto lg:max-w-none lg:translate-x-0 lg:border-r-0 lg:shadow-none",
          open ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
};

type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
};

export { Drawer };
