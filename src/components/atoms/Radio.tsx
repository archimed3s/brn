import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const radioVariants = cva(
  "size-4 cursor-pointer border-[#D0D5DD] text-[#1570EF] focus:ring-2 focus:ring-[#1570EF]/20 focus:ring-offset-0",
  {
    variants: {},
    defaultVariants: {},
  },
);

const Radio = ({ className, ...props }: RadioProps) => (
  <input type="radio" className={cn(radioVariants({ className }))} {...props} />
);

type RadioProps = Omit<React.ComponentPropsWithoutRef<"input">, "type"> &
  VariantProps<typeof radioVariants>;

export { Radio, radioVariants };
