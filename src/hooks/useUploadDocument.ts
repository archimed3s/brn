import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentsKey } from "@/hooks/useDocuments";

export type UploadDocumentPayload = {
  name: string;
  category_id: number;
  tags: string[];
  file: File;
};

const uploadDocument = async (
  payload: UploadDocumentPayload,
): Promise<unknown> => {
  const formData = new FormData();
  formData.set("name", payload.name);
  formData.set("category_id", String(payload.category_id));
  for (const tag of payload.tags) {
    formData.append("tags", tag);
  }
  formData.set("file", payload.file);

  const res = await fetch("/api/documents/upload", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      typeof data === "object" && data !== null && "error" in data
        ? (data as { error: string }).error
        : `Failed to upload document: ${res.status}`;
    throw new Error(message);
  }
  return data;
};

export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentsKey });
    },
  });
};
