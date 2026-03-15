import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const Bubble = ({ variant, children, className }: BubbleProps) => (
  <div
    className={cn(
      "max-w-[312px] flex-1 border border-[#E9EAEB] px-3 py-2",
      variant === "user"
        ? "rounded-bl-lg rounded-br-lg rounded-tl-lg bg-white"
        : "rounded-bl-lg rounded-br-lg rounded-tr-lg bg-[#F3F4F7]",
      className,
    )}
  >
    {children}
  </div>
);

type BubbleProps = {
  variant: "assistant" | "user";
  children: ReactNode;
  className?: string;
};
