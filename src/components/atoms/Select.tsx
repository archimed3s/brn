import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const selectVariants = cva(
  "w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default: "border-input",
        outline:
          "border-[#D0D5DD] bg-white focus-visible:border-[#1570EF] focus-visible:ring-[#1570EF]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Select = ({ className, variant, ...props }: SelectProps) => (
  <select className={cn(selectVariants({ variant, className }))} {...props} />
);

type SelectProps = React.ComponentPropsWithoutRef<"select"> &
  VariantProps<typeof selectVariants>;

export { Select, selectVariants };
