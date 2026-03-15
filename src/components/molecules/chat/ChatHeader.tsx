import { X } from "lucide-react";

import { Button } from "@/components/atoms/Button";

export const ChatHeader = ({ onClose }: ChatHeaderProps) => (
  <div className="relative flex h-14 shrink-0 items-center px-4 py-3 lg:h-[72px] lg:px-6 lg:py-4">
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="absolute right-2 top-1/2 min-h-[44px] min-w-[44px] -translate-y-1/2 rounded-lg p-2 transition-colors hover:bg-[#F2F4F7] active:-translate-y-1/2 touch-manipulation lg:right-[14px] lg:top-3 lg:translate-y-0 lg:active:translate-y-0"
      aria-label="Close chat"
      onClick={onClose}
    >
      <X className="size-5 text-[#344054]" />
    </Button>
  </div>
);

type ChatHeaderProps = {
  onClose?: () => void;
};
