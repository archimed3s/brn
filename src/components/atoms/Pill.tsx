import { X } from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";

export const Pill = ({ label, onRemove }: PillProps) => (
  <Button
    type="button"
    variant="ghost"
    size="xs"
    onClick={onRemove}
    className="flex cursor-pointer items-center gap-0.5 rounded px-1 py-0.5 hover:bg-[#EAECF0]"
  >
    <Text variant="captionSemibold" as="span" className="text-[#535862]">
      {label}
    </Text>
    <X className="size-3 text-[#535862]" />
  </Button>
);

type PillProps = {
  label: string;
  onRemove?: () => void;
};
