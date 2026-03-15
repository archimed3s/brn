import { cn } from "@/lib/utils";

export const Divider = ({
  className,
  "aria-hidden": ariaHidden,
}: DividerProps) => (
  <div
    className={cn("shrink-0 border-t border-border", className)}
    aria-hidden={ariaHidden}
  />
);

type DividerProps = {
  className?: string;
  "aria-hidden"?: boolean;
};
