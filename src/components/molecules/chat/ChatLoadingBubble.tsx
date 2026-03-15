import { Avatar } from "@/components/atoms/Avatar";
import { LoadingDots } from "@/components/atoms/LoadingDots";

export const ChatLoadingBubble = () => (
  <div className="flex gap-4 py-2">
    <Avatar variant="assistant" />
    <div className="flex max-w-[312px] flex-1 items-center gap-2 rounded-bl-lg rounded-br-lg rounded-tr-lg border border-[#E9EAEB] bg-[#FAFAFA] p-2.5">
      <LoadingDots />
    </div>
  </div>
);
