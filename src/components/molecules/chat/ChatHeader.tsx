import { X } from "lucide-react";

import { Button } from "@/components/atoms/Button";

export const ChatHeader = ({ onClose }: ChatHeaderProps) => (
  <div className="relative flex h-[72px] shrink-0 items-start px-6 py-4">
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="absolute right-[14px] top-3 size-10 rounded-lg p-2 hover:bg-[#F2F4F7]"
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
