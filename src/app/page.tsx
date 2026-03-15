"use client";

import { useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/atoms/Button";
import { Drawer } from "@/components/atoms/Drawer";
import { Text } from "@/components/atoms/Text";
import { AppBar } from "@/components/organisms/AppBar";
import { CategoriesPanel } from "@/components/organisms/CategoriesPanel";
import { ChatPanel } from "@/components/organisms/ChatPanel";
import { DocumentDetailContent } from "@/components/organisms/DocumentDetailContent";
import { Sidebar } from "@/components/organisms/Sidebar";
import { StrategyContent } from "@/components/organisms/StrategyContent";

const PAGE_TITLE = "Strategy Files";

const DESKTOP_BREAKPOINT = 1024;

const CHAT_TRANSITION_MS = 350;

const HomePage = () => {
  const [chatOpen, setChatOpen] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const documentId = searchParams.get("document");
  const hasTriggeredDesktopChatOpen = React.useRef(false);
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  React.useEffect(() => {
    void searchParams.toString();
    setDrawerOpen(false);
  }, [searchParams]);

  React.useEffect(() => {
    if (hasTriggeredDesktopChatOpen.current) return;
    if (typeof window === "undefined" || window.innerWidth < DESKTOP_BREAKPOINT)
      return;
    hasTriggeredDesktopChatOpen.current = true;
    const id = requestAnimationFrame(() => {
      setChatOpen(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleCloseChat = React.useCallback(() => {
    if (closeTimeoutRef.current) return;
    setClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      setChatOpen(false);
      setClosing(false);
      closeTimeoutRef.current = null;
    }, CHAT_TRANSITION_MS);
  }, []);

  const handleOpenChat = React.useCallback(() => {
    setChatOpen(true);
  }, []);

  const handleOpenDrawer = React.useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const handleChatToggle = React.useCallback(() => {
    if (chatOpen) {
      handleCloseChat();
    } else {
      setChatOpen(true);
    }
  }, [chatOpen, handleCloseChat]);

  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-[#F2F4F7] lg:flex-row lg:h-screen lg:gap-6">
      <AppBar
        title={PAGE_TITLE}
        onMenuClick={handleOpenDrawer}
        onChatClick={handleChatToggle}
        chatOpen={chatOpen}
      />
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <div className="flex h-full min-h-0 flex-col overflow-hidden lg:flex-row lg:gap-6">
          <Sidebar />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:min-h-full lg:py-6">
            <CategoriesPanel />
          </div>
        </div>
      </Drawer>
      <div
        className={`flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-4 transition-[width] duration-300 ease-out lg:px-0 lg:gap-6 lg:py-6 ${!chatOpen && !closing ? "lg:pr-6" : ""}`}
      >
        {documentId ? <DocumentDetailContent /> : <StrategyContent />}
      </div>
      {chatOpen || closing ? (
        <ChatPanel isClosing={closing} onClose={handleCloseChat} />
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={handleOpenChat}
          className="fixed right-0 top-1/2 z-10 min-h-12 min-w-14 -translate-y-1/2 rounded-l-lg border-r-0 border-[#CFCFCF] bg-[#FCFCFD] px-4 py-5 shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.08)] transition-colors hover:bg-[#F2F4F7] active:-translate-y-1/2 hidden touch-manipulation lg:inline-flex [transition-property:color,background-color,border-color]"
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
