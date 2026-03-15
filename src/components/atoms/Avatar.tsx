import { Bot } from "lucide-react";

import { Text } from "@/components/atoms/Text";

export const Avatar = ({ variant }: AvatarProps) => {
  if (variant === "user") {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#F3F4F7] bg-white">
        <Text variant="bodySemibold" as="span" className="text-[#475467]">
          UK
        </Text>
      </div>
    );
  }
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F3F4F7] p-2">
      <Bot className="size-5 text-[#475467]" />
    </div>
  );
};

type AvatarProps = {
  variant: "user" | "assistant";
};
