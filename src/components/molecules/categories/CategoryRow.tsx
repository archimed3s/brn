"use client";

import type { ReactNode } from "react";
import * as React from "react";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { Accordion } from "@/components/molecules/accordion";
import { useDocumentCount } from "@/hooks/useDocumentCount";

export const CategoryRow = ({
  label,
  count,
  categoryId,
  countByParent,
  includeSubcategories,
  expanded,
  icon,
  children,
  onToggle,
}: CategoryRowProps) => {
  const { data: documentCount } = useDocumentCount(categoryId, {
    byParent: countByParent,
    includeSubcategories: includeSubcategories,
  });
  const displayCount =
    categoryId !== undefined
      ? typeof documentCount === "number"
        ? documentCount
        : "-"
      : (count ?? 0);

  const [internalOpen, setInternalOpen] = React.useState(expanded);
  const isControlled = onToggle != null;
  const open = isControlled ? expanded : internalOpen;
  const onOpenChange = isControlled
    ? onToggle
    : (next: boolean) => setInternalOpen(next);

  const triggerContent = (
    <>
      {icon != null ? icon : null}
      <Text
        variant="labelSemibold"
        as="span"
        className="min-w-0 truncate text-left text-foreground"
      >
        {label}
      </Text>
      <Text
        variant="captionSemibold"
        as="span"
        className="shrink-0 rounded-full border border-border bg-muted px-2 py-0.5 text-foreground"
      >
        {displayCount}
      </Text>
    </>
  );

  if (children == null) {
    return (
      <div className="flex flex-col">
        <Button
          type="button"
          variant="ghost"
          className="flex min-h-10 w-full flex-1 items-center justify-start gap-3 rounded-md px-3 py-2 transition-colors hover:bg-accent"
        >
          {triggerContent}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Accordion open={open} onOpenChange={onOpenChange}>
        <Accordion.Trigger>{triggerContent}</Accordion.Trigger>
        <Accordion.Content>{children}</Accordion.Content>
      </Accordion>
    </div>
  );
};

export type CategoryRowProps = {
  label: string;
  count?: number;
  categoryId?: number | null;
  countByParent?: boolean;
  includeSubcategories?: boolean;
  expanded: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  onToggle?: (open: boolean) => void;
};
