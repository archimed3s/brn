import { useQuery } from "@tanstack/react-query";
import type { DocumentItem, DocumentsListResponse } from "@/lib/documents";

export const documentsKey = ["documents"] as const;

const ALL_DOCUMENTS_PAGE = 1;
const ALL_DOCUMENTS_SIZE = 100;

const normalizeItem = (raw: Record<string, unknown>): DocumentItem => {
  const name = typeof raw.name === "string" ? raw.name : "";
  const filename = typeof raw.filename === "string" ? raw.filename : "";
  const title =
    [name, filename].filter(Boolean).join(" ") ||
    (typeof raw.title === "string" ? raw.title : "");
  const description =
    typeof raw.description === "string"
      ? raw.description
      : typeof raw.desc === "string"
        ? raw.desc
        : "";
  const status = typeof raw.status === "string" ? raw.status : "draft";
  const id = typeof raw.id === "number" ? raw.id : undefined;
  const category_id =
    typeof raw.category_id === "number" ? raw.category_id : undefined;
  return { id, category_id, title, description, status };
};

const fetchAllDocuments = async (): Promise<DocumentsListResponse> => {
  const params = new URLSearchParams({
    page: String(ALL_DOCUMENTS_PAGE),
    size: String(ALL_DOCUMENTS_SIZE),
  });
  const res = await fetch(`/api/documents?${params.toString()}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      typeof err?.error === "string"
        ? err.error
        : `Failed to fetch documents: ${res.status}`,
    );
  }
  const raw = (await res.json()) as {
    items?: unknown[];
    total: number;
    page: number;
    size: number;
    pages: number;
  };
  const items: DocumentItem[] = (raw.items ?? []).map((x) =>
    normalizeItem(
      typeof x === "object" && x !== null ? (x as Record<string, unknown>) : {},
    ),
  );
  return {
    items,
    total: raw.total,
    page: raw.page,
    size: raw.size,
    pages: raw.pages,
  };
};

export const useDocuments = () =>
  useQuery({
    queryKey: documentsKey,
    queryFn: fetchAllDocuments,
  });
