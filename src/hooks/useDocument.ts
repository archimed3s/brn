import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import type { DocumentDetail } from "@/lib/documents";

export const documentDetailKey = (documentId: number | null) =>
  ["document", documentId] as const;

const normalizeDetail = (raw: Record<string, unknown>): DocumentDetail => {
  const id = typeof raw.id === "number" ? raw.id : 0;
  const user_id = typeof raw.user_id === "string" ? raw.user_id : "";
  const name = typeof raw.name === "string" ? raw.name : "";
  const mime_type = typeof raw.mime_type === "string" ? raw.mime_type : "";
  const filename = typeof raw.filename === "string" ? raw.filename : "";
  const tags = Array.isArray(raw.tags)
    ? (raw.tags as string[]).filter((t) => typeof t === "string")
    : [];
  const status = typeof raw.status === "string" ? raw.status : "draft";
  const summary_text =
    typeof raw.summary_text === "string" ? raw.summary_text : "";
  const category_id = typeof raw.category_id === "number" ? raw.category_id : 0;
  const created_at = typeof raw.created_at === "string" ? raw.created_at : "";
  return {
    id,
    user_id,
    name,
    mime_type,
    filename,
    tags,
    status,
    summary_text,
    category_id,
    created_at,
  };
};

const fetchDocument = async (documentId: number): Promise<DocumentDetail> => {
  const res = await fetch(`/api/documents/${documentId}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      typeof err?.error === "string"
        ? err.error
        : `Failed to fetch document: ${res.status}`,
    );
  }
  const raw = (await res.json()) as Record<string, unknown>;
  return normalizeDetail(raw);
};

const isValidDocumentId = (id: number | null | undefined): id is number =>
  typeof id === "number" && id > 0;

export const useDocument = (documentId: number | null) => {
  const enabled = isValidDocumentId(documentId);
  const queryFn = useCallback(() => {
    if (!enabled || documentId == null) {
      throw new Error("Document ID is required");
    }
    return fetchDocument(documentId);
  }, [documentId, enabled]);

  return useQuery({
    queryKey: documentDetailKey(documentId),
    queryFn,
    enabled,
  });
};
