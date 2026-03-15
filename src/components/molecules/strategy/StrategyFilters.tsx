"use client";

import { Check, ChevronDown, Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import type { DocumentItem } from "@/lib/documents";
import { formatDocumentStatus } from "@/lib/documents";
import { cn } from "@/lib/utils";

const STATUS_DOT_CLASS: Record<string, string> = {
  all: "bg-[#98A2B3]",
  learned: "bg-[#12B76A]",
  "in process": "bg-[#F79009]",
  new: "bg-[#F04438]",
  draft: "bg-[#98A2B3]",
};

const statusToDotClass = (status: string): string => {
  const key = status.toLowerCase();
  return STATUS_DOT_CLASS[key] ?? "bg-[#98A2B3]";
};

const useStatusCounts = (items: DocumentItem[]) =>
  React.useMemo(() => {
    const byStatus = new Map<string, number>();
    for (const item of items) {
      const key = item.status?.toLowerCase().trim() || "draft";
      byStatus.set(key, (byStatus.get(key) ?? 0) + 1);
    }
    const total = items.length;
    const entries = Array.from(byStatus.entries())
      .map(([status, count]) => ({ status, count }))
      .sort((a, b) => b.count - a.count);
    return { total, byStatus: entries };
  }, [items]);

export const StrategyFilters = ({
  items,
  selectedStatus,
  onStatusChange,
  onAddDocument,
}: StrategyFiltersProps) => {
  const [open, setOpen] = React.useState(false);
  const { total, byStatus } = useStatusCounts(items);

  const handleToggle = React.useCallback(() => {
    setOpen((o) => !o);
  }, []);

  const handleCloseBackdrop = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleSelectAll = React.useCallback(() => {
    onStatusChange(null);
    setOpen(false);
  }, [onStatusChange]);

  const handleSelectStatus = React.useCallback(
    (status: string) => {
      onStatusChange(status);
      setOpen(false);
    },
    [onStatusChange],
  );

  const handleStatusClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const status = e.currentTarget.dataset.status;
      if (status != null) handleSelectStatus(status);
    },
    [handleSelectStatus],
  );

  const handleAddDocument = React.useCallback(() => {
    onAddDocument?.();
  }, [onAddDocument]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          onClick={handleToggle}
          className="flex cursor-pointer items-center gap-2 rounded-lg border-[#D0D5DD] bg-white px-3.5 py-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:border-[#98A2B3] hover:bg-[#F9FAFB]"
        >
          <Text variant="body" as="span">
            {selectedStatus == null
              ? "All Statuses"
              : formatDocumentStatus(selectedStatus)}
          </Text>
          <Text
            variant="captionSemibold"
            as="span"
            className="rounded-2xl bg-[#F2F4F7] px-2 py-0.5 text-[#344054]"
          >
            {selectedStatus == null
              ? total
              : (byStatus.find((e) => e.status === selectedStatus.toLowerCase())
                  ?.count ?? 0)}
          </Text>
          <ChevronDown
            className={cn("size-5 transition-transform", open && "rotate-180")}
          />
        </Button>
        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              aria-hidden
              onClick={handleCloseBackdrop}
            />
            <div className="absolute left-0 top-full z-20 mt-1 min-w-[200px] rounded-lg border border-[#E9EAEB] bg-white py-2 shadow-lg">
              <Button
                type="button"
                variant="ghost"
                onClick={handleSelectAll}
                className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-[#F9FAFB]"
              >
                <span
                  className={cn(
                    "size-2 shrink-0 rounded-full",
                    statusToDotClass("all"),
                  )}
                  aria-hidden
                />
                <Text variant="body" as="span">
                  All Statuses
                </Text>
                <Text
                  variant="captionSemibold"
                  as="span"
                  className="ml-auto rounded-2xl bg-[#F2F4F7] px-2 py-0.5 text-[#344054]"
                >
                  {total}
                </Text>
                {selectedStatus == null && (
                  <Check className="size-4 shrink-0 text-[#1570EF]" />
                )}
              </Button>
              {byStatus.map(({ status, count }) => {
                const isSelected = selectedStatus?.toLowerCase() === status;
                return (
                  <Button
                    key={status}
                    type="button"
                    variant="ghost"
                    data-status={status}
                    onClick={handleStatusClick}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-[#F9FAFB]"
                  >
                    <span
                      className={cn(
                        "size-2 shrink-0 rounded-full",
                        statusToDotClass(status),
                      )}
                      aria-hidden
                    />
                    <Text variant="body" as="span">
                      {formatDocumentStatus(status)}
                    </Text>
                    <Text
                      variant="captionSemibold"
                      as="span"
                      className="ml-auto rounded-2xl bg-[#F2F4F7] px-2 py-0.5 text-[#344054]"
                    >
                      {count}
                    </Text>
                    {isSelected && (
                      <Check className="size-4 shrink-0 text-[#1570EF]" />
                    )}
                  </Button>
                );
              })}
            </div>
          </>
        )}
      </div>
      <Button
        type="button"
        className="flex h-11 cursor-pointer items-center gap-2 rounded-lg border-2 border-white/10 bg-[#0D419D] px-4 py-3 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#0A357D] [&_svg]:text-white"
        onClick={handleAddDocument}
      >
        <Plus className="size-5" />
        Add Document
      </Button>
    </div>
  );
};

export type StrategyFiltersProps = {
  items: DocumentItem[];
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
  onAddDocument?: () => void;
};
