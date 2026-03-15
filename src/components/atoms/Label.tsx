import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("", {
  variants: {
    variant: {
      default: "text-sm font-medium leading-5 text-[#344054]",
      muted: "text-sm font-normal leading-5 text-[#98A2B3]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Label = ({ className, variant, ...props }: LabelProps) => (
  <label className={cn(labelVariants({ variant, className }))} {...props} />
);

type LabelProps = React.ComponentPropsWithoutRef<"label"> &
  VariantProps<typeof labelVariants>;

export { Label, labelVariants };
