import { ArrowRight } from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";

export const StrategyNextBar = ({ label }: StrategyNextBarProps) => (
  <div className="flex items-center justify-end gap-4">
    <Text variant="body" as="span" className="leading-7 text-[#0D1017]">
      {label}
    </Text>
    <Button
      type="button"
      variant="outline"
      className="flex cursor-pointer items-center gap-2 rounded-lg border-[#D0D5DD] bg-white px-[18px] py-2.5 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:border-[#98A2B3] hover:bg-[#F9FAFB]"
    >
      Next
      <ArrowRight className="size-5" />
    </Button>
  </div>
);

type StrategyNextBarProps = {
  label: string;
};
