"use client";

import { Menu, MessageCircle } from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";

export const AppBar = ({
  title,
  onMenuClick,
  onChatClick,
  chatOpen,
}: AppBarProps) => (
  <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-[#EAECF0] bg-white px-4 shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1)] lg:hidden">
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="-ml-1 min-h-[44px] min-w-[44px] shrink-0 rounded-lg transition-colors hover:bg-[#F2F4F7] active:translate-y-0 touch-manipulation"
      aria-label="Open menu"
      onClick={onMenuClick}
    >
      <Menu className="size-6 text-[#344054]" aria-hidden />
    </Button>
    <Text
      variant="bodySemibold"
      as="span"
      className="min-w-0 truncate text-center text-[#0D1017]"
    >
      {title}
    </Text>
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "min-h-[44px] min-w-[44px] shrink-0 rounded-lg transition-colors hover:bg-[#F2F4F7] active:translate-y-0 touch-manipulation",
        chatOpen && "bg-[#F2F4F7]",
      )}
      aria-label={chatOpen ? "Chat open" : "Open chat"}
      onClick={onChatClick}
    >
      <MessageCircle className="size-6 text-[#344054]" aria-hidden />
    </Button>
  </header>
);

type AppBarProps = {
  title: string;
  onMenuClick: () => void;
  onChatClick: () => void;
  chatOpen: boolean;
};
