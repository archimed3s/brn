import { Plus } from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";

export const CategoriesPanelHeader = ({
  onAddClick,
}: CategoriesPanelHeaderProps) => (
  <div className="flex min-h-10 flex-1 items-center justify-between gap-3 rounded-md px-3 py-2">
    <Text
      variant="bodySemibold"
      as="span"
      className="min-w-0 text-left text-foreground"
    >
      Categories
    </Text>
    <Button
      type="button"
      size="icon"
      className="size-8 shrink-0 rounded-md border-2 border-white/10 bg-chart-2 text-primary-foreground shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] transition-colors hover:bg-chart-3"
      onClick={onAddClick}
      aria-label="Add category"
    >
      <Plus className="size-5" />
    </Button>
  </div>
);

type CategoriesPanelHeaderProps = {
  onAddClick?: () => void;
};
