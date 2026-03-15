"use client";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { useDocumentCount } from "@/hooks/useDocumentCount";
import { cn } from "@/lib/utils";

export const CategorySubRow = ({
  label,
  count,
  categoryId,
  selected,
  onSelect,
}: CategorySubRowProps) => {
  const { data: documentCount } = useDocumentCount(categoryId);
  const displayCount =
    categoryId !== undefined
      ? typeof documentCount === "number"
        ? documentCount
        : "-"
      : (count ?? 0);

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "flex min-h-10 w-full items-center justify-start gap-3 rounded-md py-2 pl-6 pr-3 transition-colors",
        selected && "border border-chart-1 bg-chart-1/10",
        !selected && "hover:bg-accent",
      )}
      aria-current={selected ? "true" : undefined}
      onClick={onSelect}
    >
      <Text
        variant="label"
        as="span"
        className={cn(
          "min-w-0 truncate leading-5",
          selected ? "text-foreground" : "text-muted-foreground",
        )}
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
    </Button>
  );
};

export type CategorySubRowProps = {
  label: string;
  count?: number;
  categoryId?: number;
  selected?: boolean;
  onSelect?: () => void;
};
