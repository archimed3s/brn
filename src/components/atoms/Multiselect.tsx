"use client";

import { Select } from "@base-ui/react/select";
import { Check } from "lucide-react";
import * as React from "react";

import { Label } from "@/components/atoms/Label";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";

const multiselectTriggerVariants = cn(
  "w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors",
  "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
  "disabled:pointer-events-none disabled:opacity-50",
  "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
  "flex items-center justify-between gap-2 border-[#D0D5DD] bg-white",
  "focus-visible:border-[#1570EF] focus-visible:ring-[#1570EF]/20",
);

const renderMultiselectValue = (
  val: number[] | number | null,
  placeholder: string,
): React.ReactNode => {
  const arr = Array.isArray(val) ? val : val == null ? [] : [val];
  if (arr.length === 0) {
    return (
      <Text variant="body" as="span" className="text-[#98A2B3]">
        {placeholder}
      </Text>
    );
  }
  return `${arr.length} selected`;
};

const Multiselect = ({
  options,
  value,
  onChange,
  placeholder = "Select…",
  label,
  required,
  id,
  "aria-label": ariaLabel,
  className,
}: MultiselectProps) => {
  const handleValueChange = React.useCallback(
    (v: number[] | number | null) => {
      const next = Array.isArray(v) ? v : v == null ? [] : [v];
      onChange(next);
    },
    [onChange],
  );

  const handleRenderValue = React.useCallback(
    (val: number[] | number | null) => renderMultiselectValue(val, placeholder),
    [placeholder],
  );

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label != null && (
        <Label htmlFor={id} className="text-[#344054]">
          {label}
          {required && " *"}
        </Label>
      )}
      <Select.Root
        multiple
        value={value.length > 0 ? value : null}
        onValueChange={handleValueChange}
      >
        <Select.Trigger
          id={id}
          aria-label={ariaLabel ?? label}
          aria-required={required}
          className={cn(multiselectTriggerVariants, "cursor-pointer")}
        >
          <Select.Value placeholder={placeholder}>
            {handleRenderValue}
          </Select.Value>
          <Select.Icon>
            <svg
              className="size-4 shrink-0 text-[#98A2B3]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <title>Dropdown</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Backdrop className="fixed inset-0 z-40 bg-transparent" />
          <Select.Positioner className="z-50">
            <Select.Popup
              className={cn(
                "max-h-60 w-[var(--trigger-width)] overflow-auto rounded-lg border border-[#D0D5DD] bg-white p-1 shadow-lg",
              )}
            >
              <Select.List className="flex flex-col gap-0.5">
                {options.map((opt) => (
                  <Select.Item
                    key={opt.id}
                    value={opt.id}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm outline-none",
                      "data-[highlighted]:bg-[#F2F4F7] data-[selected]:bg-[#EBF5FF]",
                    )}
                  >
                    <Select.ItemText>{opt.name}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Check className="size-4 shrink-0 text-[#1570EF]" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export type MultiselectOption = { id: number; name: string };

type MultiselectProps = {
  options: MultiselectOption[];
  value: number[];
  onChange: (value: number[]) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  id?: string;
  "aria-label"?: string;
  className?: string;
};

export { Multiselect };
