import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentCategoriesKey } from "@/hooks/useDocumentCategories";
import type { DocumentCategory } from "@/lib/categories";

const createDocumentCategory = async (
  payload: CreateDocumentCategoryPayload,
): Promise<DocumentCategory> => {
  const res = await fetch("/api/categories", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const message =
      typeof data === "object" && data !== null && "error" in data
        ? (data as { error: string }).error
        : `Failed to create category: ${res.status}`;
    throw new Error(message);
  }
  return data as DocumentCategory;
};

export const useCreateDocumentCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDocumentCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentCategoriesKey });
    },
  });
};

export type CreateDocumentCategoryPayload = {
  name: string;
  user_id: string;
  description: string;
  parent_id: number | null;
};
