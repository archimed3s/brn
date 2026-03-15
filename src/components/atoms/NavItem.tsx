import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

export const NavItem = ({
  icon,
  selected,
  "aria-label": ariaLabel,
}: NavItemProps) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className={cn(
      "size-12 shrink-0 rounded-md p-3 transition-colors",
      selected && "bg-[#F2F4F7]",
      !selected && "hover:bg-[#EAECF0]",
    )}
    aria-label={ariaLabel}
    aria-current={selected ? "page" : undefined}
  >
    {icon}
  </Button>
);

export type NavItemProps = {
  icon: React.ReactNode;
  selected?: boolean;
  "aria-label": string;
};
