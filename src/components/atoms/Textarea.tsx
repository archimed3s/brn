"use client";

import { cva, type VariantProps } from "class-variance-authority";

import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "relative flex-1 resize-none border-0 bg-transparent px-3 py-2 text-base font-normal leading-6 text-foreground focus:outline-none focus:ring-0",
  {
    variants: {},
    defaultVariants: {},
  },
);

const Textarea = ({
  className,
  value,
  onChange,
  placeholder,
  rows = 3,
  ...props
}: TextareaProps) => (
  <div className={cn("relative flex flex-1 flex-col", className)}>
    {placeholder != null && value === "" && (
      <Text
        variant="body"
        as="span"
        className="pointer-events-none absolute left-3 top-3 text-muted-foreground"
      >
        {placeholder}
      </Text>
    )}
    <textarea
      rows={rows}
      value={value}
      onChange={onChange}
      className={cn(textareaVariants({}))}
      {...props}
    />
  </div>
);

type TextareaProps = Omit<
  React.ComponentPropsWithoutRef<"textarea">,
  "value" | "onChange"
> &
  VariantProps<typeof textareaVariants> & {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    className?: string;
  };

export { Textarea, textareaVariants };
