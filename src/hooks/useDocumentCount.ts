import * as React from "react";

import { useDocumentCategories } from "@/hooks/useDocumentCategories";
import { useDocuments } from "@/hooks/useDocuments";
import {
  type DocumentCategory,
  getCategoryAndDescendantIds,
} from "@/lib/categories";

export type UseDocumentCountOptions = {
  byParent?: boolean;
  includeSubcategories?: boolean;
};

const countByCategory = (
  items: { category_id?: number }[],
  categoryId: number | null,
): number => {
  if (categoryId == null) return items.length;
  return items.filter(
    (doc) => doc.category_id != null && doc.category_id === categoryId,
  ).length;
};

const countByCategoryAndDescendants = (
  items: { category_id?: number }[],
  tree: DocumentCategory[],
  categoryId: number,
): number => {
  const ids = getCategoryAndDescendantIds(tree, categoryId);
  const set = new Set(ids);
  return items.filter(
    (doc) => doc.category_id != null && set.has(doc.category_id),
  ).length;
};

export const useDocumentCount = (
  categoryId: number | null | undefined,
  options?: UseDocumentCountOptions,
) => {
  const byParent = options?.byParent ?? false;
  const includeSubcategories = options?.includeSubcategories ?? false;

  const { data: documentsData, isLoading, isError, error } = useDocuments();
  const { data: categoryTree = [] } = useDocumentCategories();

  const items = documentsData?.items ?? [];

  const count = React.useMemo(() => {
    if (categoryId === undefined || categoryId === null) {
      return items.length;
    }
    if (includeSubcategories || byParent) {
      return countByCategoryAndDescendants(items, categoryTree, categoryId);
    }
    return countByCategory(items, categoryId);
  }, [items, categoryTree, categoryId, byParent, includeSubcategories]);

  const isSuccess = !isLoading && !isError;

  return {
    data: categoryId === undefined ? undefined : count,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
