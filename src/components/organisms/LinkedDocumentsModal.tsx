"use client";

import { ChevronRight, Link2, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/atoms/Button";
import { Dialog } from "@/components/atoms/Dialog";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";

export const LINKED_DOCUMENTS_MODAL_TITLE_ID = "linked-documents-modal-title";

const MOCK_LINKED_DOCUMENTS = [
  {
    title: "Double Top Confirmation Signals",
    type: "Confirmation Tool",
    category: "Pattern Analysis",
  },
  {
    title: "Risk Management for Reversal Patterns",
    type: "Trade Management",
    category: "Risk Management",
  },
  {
    title: "Multi-Timeframe Pattern Analysis",
    type: "Pattern Strategy",
    category: "Market Structure",
  },
];

export const LinkedDocumentsModal = ({
  open,
  onOpenChange,
}: LinkedDocumentsModalProps) => {
  const handleClose = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup
            aria-labelledby={LINKED_DOCUMENTS_MODAL_TITLE_ID}
            className="max-w-md"
          >
            <div className="relative flex flex-col gap-5">
              <Dialog.Close
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 size-8 shrink-0 rounded-md text-[#98A2B3] hover:bg-[#F2F4F7] hover:text-[#344054]"
                    aria-label="Close"
                  >
                    <X className="size-5" />
                  </Button>
                }
              />

              <div className="flex items-center gap-3 pr-8">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F2F4F7]">
                  <Link2 className="size-5 text-[#98A2B3]" aria-hidden />
                </div>
                <Dialog.Title
                  id={LINKED_DOCUMENTS_MODAL_TITLE_ID}
                  className="text-xl font-semibold leading-7 text-[#0D1017]"
                >
                  Linked Documents ({MOCK_LINKED_DOCUMENTS.length})
                </Dialog.Title>
              </div>

              <ul className="flex flex-col gap-2">
                {MOCK_LINKED_DOCUMENTS.map((doc) => (
                  <li key={doc.title}>
                    <div
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-[#E0E3E6] bg-white px-4 py-3",
                        "hover:border-[#3B82F6] hover:bg-[#EFF6FF]",
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <Text
                          variant="bodySemibold"
                          as="span"
                          className="block truncate leading-6 text-[#0D1017]"
                        >
                          {doc.title}
                        </Text>
                        <Text
                          variant="label"
                          as="span"
                          className="mt-0.5 block font-normal leading-5 text-[#64748B]"
                        >
                          Type: {doc.type} • Category: {doc.category}
                        </Text>
                      </div>
                      <ChevronRight
                        className="size-5 shrink-0 text-[#344054]"
                        aria-hidden
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-lg border-[#D0D5DD] bg-[#F2F4F7] text-[#344054] hover:bg-[#E4E7EC]"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

type LinkedDocumentsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
