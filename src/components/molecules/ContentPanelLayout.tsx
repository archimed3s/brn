import type { ReactNode } from "react";

export const ContentPanelLayout = ({ children }: ContentPanelLayoutProps) => (
  <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#E9EAEB] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
      {children}
    </div>
  </main>
);

type ContentPanelLayoutProps = {
  children: ReactNode;
};
