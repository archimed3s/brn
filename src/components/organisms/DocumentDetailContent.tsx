"use client";

import { FileCode2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { ContentPanelLayout } from "@/components/molecules/ContentPanelLayout";
import { StrategyBreadcrumb } from "@/components/molecules/strategy/StrategyBreadcrumb";
import { useDocument } from "@/hooks/useDocument";
import { useDocumentCategories } from "@/hooks/useDocumentCategories";
import { findCategoryWithParent } from "@/lib/categories";
import {
  documentStatusToClass,
  formatCreatedAt,
  formatDocumentStatus,
} from "@/lib/documents";
import { cn } from "@/lib/utils";

export const DocumentDetailContent = () => {
  const searchParams = useSearchParams();
  const documentIdParam = searchParams.get("document");
  const documentId = React.useMemo(() => {
    if (documentIdParam == null || documentIdParam === "") return null;
    const n = Number(documentIdParam);
    return Number.isNaN(n) ? null : n;
  }, [documentIdParam]);

  const { data: categoryTree = [] } = useDocumentCategories();
  const { data: doc, isLoading, isError, error } = useDocument(documentId);

  const breadcrumbSegments = React.useMemo(() => {
    if (doc == null) return [{ label: "All Documents", active: true }];
    const found =
      doc.category_id != null
        ? findCategoryWithParent(categoryTree, doc.category_id)
        : null;
    const segments: { label: string; active?: boolean; href?: string }[] = [
      { label: "All Documents", href: "/" },
    ];
    if (found) {
      if (found.parent) {
        segments.push({
          label: found.parent.name,
          href: `?category=${found.parent.id}`,
        });
      }
      segments.push({
        label: found.category.name,
        href: `?category=${found.category.id}`,
      });
    }
    segments.push({ label: doc.name, active: true });
    return segments;
  }, [doc, categoryTree]);

  if (documentId == null) {
    return null;
  }

  if (isLoading) {
    return (
      <ContentPanelLayout>
        <Text variant="body" as="p" className="text-muted-foreground">
          Loading document…
        </Text>
      </ContentPanelLayout>
    );
  }

  if (isError || doc == null) {
    return (
      <ContentPanelLayout>
        <Text variant="body" as="p" className="text-destructive">
          {error instanceof Error ? error.message : "Failed to load document."}
        </Text>
      </ContentPanelLayout>
    );
  }

  const createdLabel = doc.created_at ? formatCreatedAt(doc.created_at) : null;

  return (
    <ContentPanelLayout>
      <section className="shrink-0 p-6" aria-label="Document header">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StrategyBreadcrumb segments={breadcrumbSegments} />
          <Button
            type="button"
            variant="outline"
            size="default"
            className="shrink-0 gap-2 rounded-lg border-[#D0D5DD] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:border-[#98A2B3] hover:bg-[#F2F4F7]"
          >
            <FileCode2 className="size-5 text-[#344054]" />
            Edit with Bruno
          </Button>
        </div>
        <Text variant="heading" as="h1" className="text-[#0D1017]">
          {doc.name}
        </Text>
      </section>
      <section
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-6 pt-0"
        aria-label="Document content"
      >
        <div className="flex flex-col gap-6">
          {doc.summary_text ? (
            <section className="flex flex-col gap-3">
              <div className="text-base font-normal leading-6 whitespace-pre-wrap text-[#0D1017] [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mb-1.5 [&_h3]:mt-3 [&_h3]:text-sm [&_h3]:font-semibold [&_p]:mb-2 [&_ul]:list-inside [&_ul]:list-disc [&_ol]:list-inside [&_ol]:list-decimal">
                {doc.summary_text}
              </div>
            </section>
          ) : null}

          <section className="flex flex-col gap-2 border-t border-[#EAECF0] pt-4">
            <Text variant="labelSemibold" as="h2" className="text-[#344054]">
              Details
            </Text>
            <dl className="grid gap-2 text-sm">
              {doc.filename ? (
                <div className="flex flex-wrap gap-2">
                  <dt className="font-medium text-[#475467]">Filename</dt>
                  <dd className="text-[#0D1017]">{doc.filename}</dd>
                </div>
              ) : null}
              {doc.mime_type ? (
                <div className="flex flex-wrap gap-2">
                  <dt className="font-medium text-[#475467]">Type</dt>
                  <dd className="text-[#0D1017]">{doc.mime_type}</dd>
                </div>
              ) : null}
              <div className="flex flex-wrap items-center gap-2">
                <dt className="font-medium text-[#475467]">Status</dt>
                <dd>
                  <Text
                    variant="captionSemibold"
                    as="span"
                    className={cn(
                      "inline-flex rounded-2xl px-2.5 py-1",
                      documentStatusToClass(doc.status),
                    )}
                  >
                    {formatDocumentStatus(doc.status)}
                  </Text>
                </dd>
              </div>
              {doc.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  <dt className="w-full font-medium text-[#475467]">Tags</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {doc.tags.map((tag) => (
                      <Text
                        key={tag}
                        variant="caption"
                        as="span"
                        className="rounded-md bg-[#F2F4F7] px-2 py-0.5 text-[#344054]"
                      >
                        {tag}
                      </Text>
                    ))}
                  </dd>
                </div>
              ) : null}
              {createdLabel ? (
                <div className="flex flex-wrap gap-2">
                  <dt className="font-medium text-[#475467]">Created</dt>
                  <dd className="text-[#0D1017]">{createdLabel}</dd>
                </div>
              ) : null}
              {doc.user_id ? (
                <div className="flex flex-wrap gap-2">
                  <dt className="font-medium text-[#475467]">User ID</dt>
                  <dd className="font-mono text-[#0D1017]">{doc.user_id}</dd>
                </div>
              ) : null}
            </dl>
          </section>
        </div>
      </section>
    </ContentPanelLayout>
  );
};
