import { ChatFooterActions } from "./ChatFooterActions";
import { ChatMessageInput } from "./ChatMessageInput";

export const ChatFooter = () => (
  <div className="shrink-0 bg-white px-6 pb-5">
    <div className="flex min-h-[160px] flex-col gap-3 rounded-xl border border-[#E9EAEB] bg-[#FAFAFA]">
      <ChatMessageInput />
      <ChatFooterActions />
    </div>
  </div>
);
