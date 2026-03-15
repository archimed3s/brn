import "server-only";

import type { DocumentCategory } from "@/lib/categories";

const DOCUMENT_CATEGORIES_PATH = "/api/v1/conversation/document-categories";

export const fetchDocumentCategories = async (): Promise<
  DocumentCategory[]
> => {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    return [];
  }

  const url = `${baseUrl}${DOCUMENT_CATEGORIES_PATH}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data as DocumentCategory[];
  } catch (err) {
    console.error("fetchDocumentCategories failed", err);
    return [];
  }
};
