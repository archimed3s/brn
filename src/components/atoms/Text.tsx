import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      heading: "text-2xl font-semibold leading-8 text-foreground",
      body: "text-base font-normal leading-6 text-foreground",
      bodySemibold: "text-base font-semibold leading-6 text-foreground",
      caption: "text-xs font-normal leading-[18px] text-muted-foreground",
      captionSemibold:
        "text-xs font-semibold leading-[18px] text-muted-foreground",
      label: "text-sm font-medium leading-none text-foreground",
      labelSemibold: "text-sm font-semibold leading-5 text-foreground",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const Text = ({ className, variant, as = "span", ...props }: TextProps) => {
  const classNameComputed = cn(textVariants({ variant, className }));
  const rest = props as React.HTMLAttributes<HTMLElement>;
  switch (as) {
    case "h1":
      return <h1 className={classNameComputed} {...rest} />;
    case "h2":
      return <h2 className={classNameComputed} {...rest} />;
    case "p":
      return <p className={classNameComputed} {...rest} />;
    default:
      return <span className={classNameComputed} {...rest} />;
  }
};

type TextProps = React.ComponentPropsWithoutRef<"p"> &
  VariantProps<typeof textVariants> & {
    as?: "p" | "span" | "h1" | "h2";
  };

export type { TextProps };
export { Text, textVariants };
