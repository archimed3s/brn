import type { ReactNode } from "react";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";

export const IconLabelButton = ({
  icon,
  children,
  onClick,
}: IconLabelButtonProps) => (
  <Button
    type="button"
    variant="ghost"
    size="xs"
    onClick={onClick}
    className="flex cursor-pointer items-center gap-1 rounded px-1 py-1 hover:bg-[#EAECF0]"
  >
    {icon}
    <Text variant="captionSemibold" as="span" className="text-[#535862]">
      {children}
    </Text>
  </Button>
);

type IconLabelButtonProps = {
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void;
};
