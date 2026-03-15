export type DocumentItem = {
  id?: number;
  category_id?: number;
  title: string;
  description: string;
  status: string;
};

const DOCUMENT_STATUS_CLASS: Record<string, string> = {
  learned: "bg-[#ECFDF3] text-[#027A48]",
  new: "bg-[#FEF3F2] text-[#B42318]",
  "in process": "bg-[#FFFAEB] text-[#B54708]",
  draft: "bg-[#F2F4F7] text-[#344054]",
};

const DEFAULT_STATUS_CLASS = "bg-[#F2F4F7] text-[#344054]";

export const documentStatusToClass = (status: string): string => {
  const key = status.toLowerCase();
  return DOCUMENT_STATUS_CLASS[key] ?? DEFAULT_STATUS_CLASS;
};

export const formatDocumentStatus = (status: string): string => {
  if (!status) return status;
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export const formatCreatedAt = (createdAt: string): string => {
  if (!createdAt.trim()) return createdAt;
  try {
    const d = new Date(createdAt);
    return Number.isNaN(d.getTime()) ? createdAt : d.toLocaleString();
  } catch {
    return createdAt;
  }
};

export type DocumentsListResponse = {
  items: DocumentItem[];
  total: number;
  page: number;
  size: number;
  pages: number;
};

export type DocumentDetail = {
  id: number;
  user_id: string;
  name: string;
  mime_type: string;
  filename: string;
  tags: string[];
  status: string;
  summary_text: string;
  category_id: number;
  created_at: string;
};
