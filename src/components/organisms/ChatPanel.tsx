import { ChatFooter } from "@/components/molecules/chat/ChatFooter";
import { ChatHeader } from "@/components/molecules/chat/ChatHeader";
import { ChatMessageList } from "@/components/molecules/chat/ChatMessageList";

export const ChatPanel = ({ onClose }: ChatPanelProps) => (
  <aside className="flex h-screen w-[416px] shrink-0 flex-col overflow-hidden border-l border-[#CFCFCF] bg-[#FCFCFD] shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.08),0px_8px_8px_-4px_rgba(10,13,18,0.03),0px_3px_3px_-1.5px_rgba(10,13,18,0.04)]">
    <ChatHeader onClose={onClose} />
    <div className="flex flex-1 flex-col overflow-hidden">
      <ChatMessageList />
    </div>
    <ChatFooter />
  </aside>
);

type ChatPanelProps = {
  onClose?: () => void;
};
