"use client";

import { Folder } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Divider } from "@/components/atoms/Divider";
import { Text } from "@/components/atoms/Text";
import { AllDocumentsContent } from "@/components/molecules/categories/AllDocumentsContent";
import { CategoriesPanelHeader } from "@/components/molecules/categories/CategoriesPanelHeader";
import { CategoriesPanelSkeleton } from "@/components/molecules/categories/CategoriesPanelSkeleton";
import { CategoryRow } from "@/components/molecules/categories/CategoryRow";
import { CategorySubRow } from "@/components/molecules/categories/CategorySubRow";
import { AddNewCategoryModal } from "@/components/organisms/AddNewCategoryModal";
import { useDocumentCategories } from "@/hooks/useDocumentCategories";
import { findCategoryWithParent } from "@/lib/categories";

export const CategoriesPanel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategoryId = React.useMemo(() => {
    const c = searchParams.get("category");
    if (c == null || c === "") return null;
    const n = Number(c);
    return Number.isNaN(n) ? null : n;
  }, [searchParams]);

  const { data, isLoading, isError, error } = useDocumentCategories();
  const [expandedIds, setExpandedIds] = React.useState<Set<number>>(new Set());
  const [allDocumentsExpanded, setAllDocumentsExpanded] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const tree = data ?? [];
    if (selectedCategoryId == null) {
      setAllDocumentsExpanded(true);
      return;
    }
    setAllDocumentsExpanded(false);
    const found = findCategoryWithParent(tree, selectedCategoryId);
    if (found == null) return;
    const { category, parent } = found;
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (parent != null) next.add(parent.id);
      else if (category.children.length > 0) next.add(category.id);
      return next;
    });
  }, [selectedCategoryId, data]);
  const [addModalOpen, setAddModalOpen] = React.useState(false);

  const handleOpenAddModal = React.useCallback(() => {
    setAddModalOpen(true);
  }, []);

  const handleSelectCategory = React.useCallback(
    (id: number) => {
      const next = new URLSearchParams(searchParams.toString());
      next.delete("document");
      next.set("category", String(id));
      router.push(`?${next.toString()}`);
    },
    [router, searchParams],
  );

  const toggleCategory = React.useCallback((id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const rootCategories = data ?? [];
  const parentCategories = (data ?? []).map((c) => ({
    id: c.id,
    name: c.name,
  }));

  const panelContent = (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-none border-0 border-border bg-card shadow-none lg:rounded-xl lg:border lg:shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
      <div className="flex shrink-0 flex-col px-4 pt-5">
        <CategoriesPanelHeader onAddClick={handleOpenAddModal} />
        <Divider className="my-2" aria-hidden />
      </div>
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pb-5">
        {isLoading ? (
          <CategoriesPanelSkeleton />
        ) : isError ? (
          <Text variant="body" as="p" className="text-sm text-destructive">
            {error instanceof Error
              ? error.message
              : "Failed to load categories"}
          </Text>
        ) : (
          <>
            <CategoryRow
              icon={
                <Folder className="size-5 shrink-0 text-muted-foreground" />
              }
              label="All Documents"
              categoryId={null}
              expanded={allDocumentsExpanded}
              onToggle={setAllDocumentsExpanded}
            >
              <AllDocumentsContent
                tree={rootCategories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={handleSelectCategory}
              />
            </CategoryRow>

            {rootCategories.map((category) => (
              <React.Fragment key={category.id}>
                <Divider className="my-2" aria-hidden />
                {category.children.length > 0 ? (
                  <CategoryRow
                    label={category.name}
                    categoryId={category.id}
                    includeSubcategories
                    expanded={expandedIds.has(category.id)}
                    onToggle={() => toggleCategory(category.id)}
                  >
                    {category.children.map((child) => (
                      <CategorySubRow
                        key={child.id}
                        label={child.name}
                        categoryId={child.id}
                        selected={selectedCategoryId === child.id}
                        onSelect={() => handleSelectCategory(child.id)}
                      />
                    ))}
                  </CategoryRow>
                ) : (
                  <CategoryRow
                    label={category.name}
                    categoryId={category.id}
                    expanded={false}
                  />
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 shrink-0 flex-col overflow-hidden lg:w-[280px]">
      <AddNewCategoryModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        parentCategories={parentCategories}
      />
      {panelContent}
    </div>
  );
};
