import { Text } from "@/components/atoms/Text";
import { DocumentCard } from "@/components/molecules/strategy/DocumentCard";
import type { DocumentItem } from "@/lib/documents";
import { documentStatusToClass, formatDocumentStatus } from "@/lib/documents";

export const StrategyListBody = ({
  isLoading,
  isError,
  error,
  items,
  breadcrumbString,
  onViewDocument,
}: StrategyListBodyProps) => {
  if (isLoading) {
    return (
      <Text variant="body" as="p" className="text-muted-foreground">
        Loading documents…
      </Text>
    );
  }

  if (isError) {
    return (
      <Text variant="body" as="p" className="text-destructive">
        {error instanceof Error ? error.message : "Failed to load documents"}
      </Text>
    );
  }

  if (items.length === 0) {
    return (
      <Text variant="body" as="p" className="text-muted-foreground">
        No documents in this category.
      </Text>
    );
  }

  return (
    <>
      {items.map((doc) => (
        <DocumentCard
          key={doc.id ?? doc.title}
          documentId={doc.id}
          title={doc.title}
          description={doc.description}
          breadcrumb={breadcrumbString}
          status={formatDocumentStatus(doc.status)}
          statusClass={documentStatusToClass(doc.status)}
          onViewDocument={onViewDocument}
        />
      ))}
    </>
  );
};

type StrategyListBodyProps = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  items: DocumentItem[];
  breadcrumbString: string;
  onViewDocument: (id: number) => void;
};
