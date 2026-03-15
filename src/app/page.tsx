"use client";

import { useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { CategoriesPanel } from "@/components/organisms/CategoriesPanel";
import { ChatPanel } from "@/components/organisms/ChatPanel";
import { DocumentDetailContent } from "@/components/organisms/DocumentDetailContent";
import { Sidebar } from "@/components/organisms/Sidebar";
import { StrategyContent } from "@/components/organisms/StrategyContent";

const HomePage = () => {
  const [chatOpen, setChatOpen] = React.useState(true);
  const searchParams = useSearchParams();
  const documentId = searchParams.get("document");

  const handleCloseChat = React.useCallback(() => {
    setChatOpen(false);
  }, []);

  const handleOpenChat = React.useCallback(() => {
    setChatOpen(true);
  }, []);

  return (
    <div className="flex h-screen w-full gap-6 bg-[#F2F4F7]">
      <Sidebar />
      <div
        className={`flex min-h-0 flex-1 gap-6 overflow-hidden py-6 ${!chatOpen ? "pr-6" : ""}`}
      >
        <CategoriesPanel />
        {documentId ? <DocumentDetailContent /> : <StrategyContent />}
      </div>
      {chatOpen ? (
        <ChatPanel onClose={handleCloseChat} />
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={handleOpenChat}
          className="fixed right-0 top-1/2 z-10 -translate-y-1/2 rounded-l-lg border-r-0 border-[#CFCFCF] bg-[#FCFCFD] px-3 py-4 shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.08)] hover:bg-[#F2F4F7]"
          aria-label="Open chat"
        >
          <Text variant="label" as="span" className="text-[#344054]">
            Chat
          </Text>
        </Button>
      )}
    </div>
  );
};

export default HomePage;
