import { useQuery } from "@tanstack/react-query";
import type { DocumentCategory } from "@/lib/categories";

export const documentCategoriesKey = ["documentCategories"] as const;

const fetchDocumentCategories = async (): Promise<DocumentCategory[]> => {
  const res = await fetch("/api/categories", {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error ?? `Failed to fetch categories: ${res.status}`);
  }
  return res.json();
};

export const useDocumentCategories = () =>
  useQuery({
    queryKey: documentCategoriesKey,
    queryFn: fetchDocumentCategories,
  });
