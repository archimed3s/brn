"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import * as React from "react";

import { CategorySubRow } from "@/components/molecules/categories/CategorySubRow";
import {
  type DocumentCategory,
  flattenSubcategoriesOnly,
} from "@/lib/categories";

const ROW_HEIGHT = 44;
const ALL_DOCS_EXPANDED_HEIGHT = 280;

export const AllDocumentsContent = ({
  tree,
  selectedCategoryId,
  onSelectCategory,
}: AllDocumentsContentProps) => {
  const flattened = React.useMemo(() => flattenSubcategoriesOnly(tree), [tree]);
  const parentRef = React.useRef<HTMLDivElement>(null);

  const handleSelect = React.useCallback(
    (id: number) => () => {
      onSelectCategory(id);
    },
    [onSelectCategory],
  );

  const virtualizer = useVirtualizer({
    count: flattened.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="max-h-[var(--all-docs-height)] overflow-y-auto"
      style={
        {
          "--all-docs-height": `${ALL_DOCS_EXPANDED_HEIGHT}px`,
        } as React.CSSProperties
      }
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const item = flattened[virtualRow.index];
          return (
            <div
              key={item.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <CategorySubRow
                label={item.name}
                categoryId={item.id}
                selected={selectedCategoryId === item.id}
                onSelect={handleSelect(item.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

type AllDocumentsContentProps = {
  tree: DocumentCategory[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number) => void;
};
