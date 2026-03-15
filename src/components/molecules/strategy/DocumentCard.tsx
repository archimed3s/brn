"use client";

import {
  CheckCircle,
  ChevronRight,
  Eye,
  FolderInput,
  Home,
  Link2,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { LinkedDocumentsModal } from "@/components/organisms/LinkedDocumentsModal";
import { cn } from "@/lib/utils";

export const DocumentCard = ({
  documentId,
  title,
  description,
  breadcrumb,
  status,
  statusClass,
  onViewDocument,
}: DocumentCardProps) => {
  const [linkedModalOpen, setLinkedModalOpen] = React.useState(false);

  const handleViewDocument = React.useCallback(() => {
    if (documentId != null) {
      onViewDocument?.(documentId);
    }
  }, [documentId, onViewDocument]);

  const handleOpenLinkedModal = React.useCallback(() => {
    setLinkedModalOpen(true);
  }, []);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[#E0E3E6] bg-white p-6">
      <div className="flex items-center gap-2">
        <Home className="size-4 shrink-0 text-[#475467]" aria-hidden />
        {breadcrumb.split(" > ").map((part, index) => (
          <Text
            key={part}
            variant="label"
            as="span"
            className="flex items-center gap-2 leading-5 text-[#475467]"
          >
            {index > 0 && <ChevronRight className="size-4 shrink-0" />}
            {part}
          </Text>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <Text
          variant="bodySemibold"
          as="h2"
          className="leading-6 text-[#0D1017]"
        >
          {title}
        </Text>
        <Text
          variant="label"
          as="p"
          className="font-normal leading-5 text-[#45484F]"
        >
          {description}
        </Text>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-9 rounded-lg border-[#D0D5DD] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:border-[#98A2B3] hover:bg-[#F2F4F7]"
            aria-label="View document"
            disabled={documentId == null}
            onClick={handleViewDocument}
          >
            <Eye className="size-5 text-[#344054]" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-9 rounded-lg border-[#D0D5DD] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:border-[#98A2B3] hover:bg-[#F2F4F7]"
            aria-label="Add to folder"
          >
            <FolderInput className="size-5 text-[#344054]" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-9 rounded-lg border-[#D0D5DD] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:border-[#98A2B3] hover:bg-[#F2F4F7]"
            aria-label="Linked documents"
            onClick={handleOpenLinkedModal}
          >
            <Link2 className="size-5 text-[#344054]" />
          </Button>
        </div>
        <LinkedDocumentsModal
          open={linkedModalOpen}
          onOpenChange={setLinkedModalOpen}
        />
        <Text
          variant="label"
          as="span"
          className={cn(
            "flex items-center gap-1 rounded-2xl px-2.5 py-1",
            statusClass,
          )}
        >
          {status.toLowerCase() === "learned" && (
            <CheckCircle className="size-3" />
          )}
          {status}
        </Text>
      </div>
    </div>
  );
};

export type DocumentCardProps = {
  documentId?: number;
  title: string;
  description: string;
  breadcrumb: string;
  status: string;
  statusClass: string;
  onViewDocument?: (id: number) => void;
};
