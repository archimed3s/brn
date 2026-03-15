import { Paperclip, SquarePen } from "lucide-react";

import { IconLabelButton } from "@/components/atoms/IconLabelButton";
import { Pill } from "@/components/atoms/Pill";

export const ChatFooterActions = () => (
  <div className="flex items-center justify-between gap-3 px-3 py-2">
    <div className="flex flex-1 items-center min-h-px min-w-px">
      <Pill label="AAPL" />
    </div>
    <div className="flex items-center gap-3">
      <IconLabelButton icon={<SquarePen className="size-4 text-[#535862]" />}>
        Shortcuts
      </IconLabelButton>
      <IconLabelButton icon={<Paperclip className="size-4 text-[#535862]" />}>
        Attach
      </IconLabelButton>
    </div>
  </div>
);
