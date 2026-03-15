"use client";

import * as React from "react";

import { ChatFooter } from "@/components/molecules/chat/ChatFooter";
import { ChatHeader } from "@/components/molecules/chat/ChatHeader";
import { ChatMessageList } from "@/components/molecules/chat/ChatMessageList";

export const ChatPanel = ({ isClosing = false, onClose }: ChatPanelProps) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (isClosing) {
      setVisible(false);
      return;
    }
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [isClosing]);

  const open = visible && !isClosing;

  return (
    <aside
      className={`fixed inset-0 z-50 flex h-full flex-col overflow-hidden border-0 bg-[#FCFCFD] shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.08),0px_8px_8px_-4px_rgba(10,13,18,0.03),0px_3px_3px_-1.5px_rgba(10,13,18,0.04)] transition-all duration-300 ease-out lg:static lg:z-auto lg:h-screen lg:shrink-0 lg:border-l lg:border-[#CFCFCF] ${open ? "w-full translate-x-0 lg:w-[416px]" : "w-full translate-x-full lg:w-0"}`}
    >
      <ChatHeader onClose={onClose} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <ChatMessageList />
      </div>
      <ChatFooter />
    </aside>
  );
};

type ChatPanelProps = {
  isClosing?: boolean;
  onClose?: () => void;
};
