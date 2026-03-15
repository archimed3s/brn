import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default: "border-input",
        outline: "border-[#D0D5DD] bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Input = ({ className, variant, ...props }: InputProps) => (
  <input className={cn(inputVariants({ variant, className }))} {...props} />
);

type InputProps = React.ComponentPropsWithoutRef<"input"> &
  VariantProps<typeof inputVariants>;

export { Input, inputVariants };
