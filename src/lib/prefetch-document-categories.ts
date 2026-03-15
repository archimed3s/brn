import type { QueryClient } from "@tanstack/react-query";

import { documentCategoriesKey } from "@/hooks/useDocumentCategories";
import { fetchDocumentCategories } from "@/lib/fetch-document-categories";

export const prefetchDocumentCategories = async (
  queryClient: QueryClient,
): Promise<void> => {
  await queryClient.prefetchQuery({
    queryKey: documentCategoriesKey,
    queryFn: fetchDocumentCategories,
  });
};
