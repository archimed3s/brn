import type { ReactNode } from "react";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";

export const NavItem = ({
  icon,
  label,
  selected,
  "aria-label": ariaLabel,
  className,
}: NavItemProps) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className={cn(
      "min-h-[44px] shrink-0 rounded-md gap-3 p-3 transition-colors active:translate-y-0 touch-manipulation",
      "w-full justify-start px-4 lg:w-auto lg:size-12 lg:justify-center lg:gap-0 lg:px-3",
      selected && "bg-[#F2F4F7]",
      !selected && "hover:bg-[#EAECF0]",
      className,
    )}
    aria-label={ariaLabel}
    aria-current={selected ? "page" : undefined}
  >
    {icon}
    {label != null ? (
      <Text
        variant="label"
        as="span"
        className="truncate text-[#344054] lg:hidden"
      >
        {label}
      </Text>
    ) : null}
  </Button>
);

export type NavItemProps = {
  icon: ReactNode;
  label?: string;
  selected?: boolean;
  "aria-label": string;
  className?: string;
};
