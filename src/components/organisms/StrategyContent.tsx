"use client";

import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Text } from "@/components/atoms/Text";
import { ContentPanelLayout } from "@/components/molecules/ContentPanelLayout";
import { StrategyBreadcrumb } from "@/components/molecules/strategy/StrategyBreadcrumb";
import { StrategyFilters } from "@/components/molecules/strategy/StrategyFilters";
import { StrategyListBody } from "@/components/molecules/strategy/StrategyListBody";
import { StrategyNextBar } from "@/components/molecules/strategy/StrategyNextBar";
import { UploadDocumentModal } from "@/components/organisms/UploadDocumentModal";
import { useDocumentCategories } from "@/hooks/useDocumentCategories";
import { useDocuments } from "@/hooks/useDocuments";
import { findCategoryWithParent } from "@/lib/categories";
import type { DocumentItem } from "@/lib/documents";

export const StrategyContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategoryId = React.useMemo(() => {
    const c = searchParams.get("category");
    if (c == null || c === "") return null;
    const n = Number(c);
    return Number.isNaN(n) ? null : n;
  }, [searchParams]);

  const { data: categoryTree = [] } = useDocumentCategories();
  const { segments, title, breadcrumbString } = React.useMemo(() => {
    if (selectedCategoryId == null) {
      return {
        segments: [{ label: "All Documents", active: true, href: "/" }],
        title: "Strategy Files",
        breadcrumbString: "All Documents",
      };
    }
    const found = findCategoryWithParent(categoryTree, selectedCategoryId);
    if (found == null) {
      return {
        segments: [{ label: "All Documents", active: true, href: "/" }],
        title: "Strategy Files",
        breadcrumbString: "All Documents",
      };
    }
    const { category, parent } = found;
    if (parent == null) {
      return {
        segments: [
          { label: "All Documents", href: "/" },
          { label: category.name, active: true },
        ],
        title: category.name,
        breadcrumbString: category.name,
      };
    }
    return {
      segments: [
        { label: "All Documents", href: "/" },
        { label: parent.name, href: `?category=${parent.id}` },
        { label: category.name, active: true },
      ],
      title: category.name,
      breadcrumbString: `${parent.name} > ${category.name}`,
    };
  }, [categoryTree, selectedCategoryId]);

  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null,
  );
  const [uploadModalOpen, setUploadModalOpen] = React.useState(false);

  const handleOpenUploadModal = React.useCallback(() => {
    setUploadModalOpen(true);
  }, []);

  const openDocumentDetail = React.useCallback(
    (documentId: number) => {
      const next = new URLSearchParams(searchParams.toString());
      next.set("document", String(documentId));
      router.push(`?${next.toString()}`);
    },
    [router, searchParams],
  );

  const { data: documentsData, isLoading, isError, error } = useDocuments();
  const allItems: DocumentItem[] = React.useMemo(() => {
    const list = documentsData?.items ?? [];
    if (selectedCategoryId == null) return list;
    return list.filter(
      (doc) =>
        doc.category_id != null && doc.category_id === selectedCategoryId,
    );
  }, [documentsData?.items, selectedCategoryId]);
  const items = React.useMemo(() => {
    if (selectedStatus == null) return allItems;
    const key = selectedStatus.toLowerCase();
    return allItems.filter(
      (doc) => (doc.status?.toLowerCase().trim() || "draft") === key,
    );
  }, [allItems, selectedStatus]);

  return (
    <ContentPanelLayout>
      <section
        className="flex shrink-0 flex-col gap-3 p-4 lg:gap-4 lg:p-6"
        aria-label="Strategy header"
      >
        <StrategyBreadcrumb segments={segments} />
        <Text
          variant="heading"
          as="h1"
          className="break-words text-[#0D1017] lg:text-2xl"
        >
          {title}
        </Text>
        <StrategyFilters
          items={allItems}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onAddDocument={handleOpenUploadModal}
        />
      </section>
      <section
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 pt-0 lg:p-6 lg:pt-0"
        aria-label="Documents list"
      >
        <div className="flex flex-col gap-4">
          <StrategyListBody
            isLoading={isLoading}
            isError={isError}
            error={error instanceof Error ? error : null}
            items={items}
            breadcrumbString={breadcrumbString}
            onViewDocument={openDocumentDetail}
          />
        </div>
      </section>
      <section
        className="shrink-0 p-4 pt-0 lg:p-6"
        aria-label="Strategy footer"
      >
        <div className="h-px w-full bg-[#EAECF0]" />
        <StrategyNextBar label="Continuation Patterns" />
      </section>
      <UploadDocumentModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
      />
    </ContentPanelLayout>
  );
};
