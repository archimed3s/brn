"use client";

import { Upload, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/atoms/Button";
import { Dialog } from "@/components/atoms/Dialog";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import {
  Multiselect,
  type MultiselectOption,
} from "@/components/atoms/Multiselect";
import { Text } from "@/components/atoms/Text";
import { Textarea } from "@/components/atoms/Textarea";
import { useDocumentCategories } from "@/hooks/useDocumentCategories";
import { useUploadDocument } from "@/hooks/useUploadDocument";
import { flattenSubcategoriesOnly } from "@/lib/categories";
import { cn } from "@/lib/utils";

export const UPLOAD_DOCUMENT_MODAL_TITLE_ID = "upload-document-modal-title";
export const UPLOAD_DOCUMENT_MODAL_DESC_ID = "upload-document-modal-desc";

const INITIAL_NAME = "";
const INITIAL_TECHNICAL: number[] = [];
const INITIAL_METHOD: number[] = [];
const INITIAL_NOTES = "";

export const UploadDocumentModal = ({
  open,
  onOpenChange,
}: UploadDocumentModalProps) => {
  const { data: categoryTree = [] } = useDocumentCategories();
  const categoryOptions: MultiselectOption[] = React.useMemo(
    () =>
      flattenSubcategoriesOnly(categoryTree).map((c) => ({
        id: c.id,
        name: c.name,
      })),
    [categoryTree],
  );

  const [name, setName] = React.useState(INITIAL_NAME);
  const [technicalCategoryIds, setTechnicalCategoryIds] =
    React.useState<number[]>(INITIAL_TECHNICAL);
  const [methodCategoryIds, setMethodCategoryIds] =
    React.useState<number[]>(INITIAL_METHOD);
  const [file, setFile] = React.useState<File | null>(null);
  const [notes, setNotes] = React.useState(INITIAL_NOTES);
  const [dragOver, setDragOver] = React.useState(false);

  const uploadDocument = useUploadDocument();

  const resetForm = React.useCallback(() => {
    setName(INITIAL_NAME);
    setTechnicalCategoryIds(INITIAL_TECHNICAL);
    setMethodCategoryIds(INITIAL_METHOD);
    setFile(null);
    setNotes(INITIAL_NOTES);
    setDragOver(false);
  }, []);

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!next) {
        resetForm();
        uploadDocument.reset();
      }
      onOpenChange(next);
    },
    [onOpenChange, resetForm, uploadDocument],
  );

  const handleFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      setFile(f ?? null);
    },
    [],
  );

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  }, []);

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = React.useCallback(() => {
    setDragOver(false);
  }, []);

  const handleNameChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [],
  );

  const handleNotesChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNotes(e.target.value);
    },
    [],
  );

  const handleCancel = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedName = name.trim();
      if (!trimmedName) return;
      if (technicalCategoryIds.length === 0) return;
      if (methodCategoryIds.length === 0) return;
      if (!file) return;

      const tags = methodCategoryIds
        .map((id) => categoryOptions.find((o) => o.id === id)?.name)
        .filter((t): t is string => typeof t === "string");
      const category_id = technicalCategoryIds[0] ?? 0;

      uploadDocument.mutate(
        {
          name: trimmedName,
          category_id,
          tags,
          file,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            resetForm();
          },
        },
      );
    },
    [
      name,
      technicalCategoryIds,
      methodCategoryIds,
      file,
      categoryOptions,
      uploadDocument,
      onOpenChange,
      resetForm,
    ],
  );

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup
            aria-labelledby={UPLOAD_DOCUMENT_MODAL_TITLE_ID}
            aria-describedby={UPLOAD_DOCUMENT_MODAL_DESC_ID}
            className="w-full max-w-[calc(100vw-2rem)] sm:w-[640px] sm:max-w-[640px]"
          >
            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
              <section className="shrink-0" aria-label="Upload document header">
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
                <div className="flex flex-col gap-2">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F2F4F7]">
                    <Upload className="size-5 text-[#98A2B3]" aria-hidden />
                  </div>
                  <Dialog.Title
                    id={UPLOAD_DOCUMENT_MODAL_TITLE_ID}
                    className="text-2xl font-semibold leading-8 text-[#0D1017]"
                  >
                    Upload New Document
                  </Dialog.Title>
                  <Dialog.Description
                    id={UPLOAD_DOCUMENT_MODAL_DESC_ID}
                    className="text-sm font-normal leading-5 text-[#98A2B3]"
                  >
                    Add a document with name, categories, and file.
                  </Dialog.Description>
                </div>
              </section>

              <form
                onSubmit={handleSubmit}
                className="flex min-h-0 flex-1 flex-col overflow-hidden"
              >
                <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                  <div className="flex flex-col gap-5 pt-5">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="upload-doc-name">Document Name *</Label>
                      <Input
                        id="upload-doc-name"
                        type="text"
                        required
                        placeholder="i.e Support and Resistance Levels"
                        value={name}
                        onChange={handleNameChange}
                        variant="outline"
                      />
                    </div>

                    <Multiselect
                      id="upload-doc-technical"
                      label="Technical Category"
                      required
                      placeholder="Select a technical topic..."
                      options={categoryOptions}
                      value={technicalCategoryIds}
                      onChange={setTechnicalCategoryIds}
                    />

                    <Multiselect
                      id="upload-doc-method"
                      label="Method Category"
                      required
                      placeholder="Select strategic area..."
                      options={categoryOptions}
                      value={methodCategoryIds}
                      onChange={setMethodCategoryIds}
                    />

                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-[#344054]">
                        File *
                      </Label>
                      <label
                        className={cn(
                          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#D0D5DD] bg-[#F9FAFB] px-4 py-8 transition-colors",
                          dragOver && "border-[#1570EF] bg-[#EBF5FF]",
                          !file && "hover:border-[#98A2B3] hover:bg-[#F2F4F7]",
                        )}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                      >
                        <input
                          type="file"
                          className="sr-only"
                          accept=".docx,.doc,.pdf,.txt,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/pdf,text/plain"
                          onChange={handleFileChange}
                          required
                        />
                        <div className="flex size-14 items-center justify-center rounded-full bg-[#F2F4F7]">
                          <Upload
                            className="size-7 text-[#98A2B3]"
                            aria-hidden
                          />
                        </div>
                        <Text
                          variant="body"
                          as="span"
                          className="text-center font-normal text-[#1570EF]"
                        >
                          Click to upload or drag and drop
                        </Text>
                        <Text
                          variant="caption"
                          as="span"
                          className="text-[#6B7280]"
                        >
                          DOCX, DOC, PDF, TXT
                        </Text>
                        {file != null && (
                          <Text
                            variant="captionSemibold"
                            as="span"
                            className="text-[#1570EF]"
                          >
                            {file.name}
                          </Text>
                        )}
                      </label>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="upload-doc-notes"
                        className="font-semibold text-[#0D1017]"
                      >
                        Notes for Bruno
                      </Label>
                      <Textarea
                        id="upload-doc-notes"
                        value={notes}
                        onChange={handleNotesChange}
                        placeholder={
                          "• This replaces an older version on the same topic\n• Don't create rules from this yet\n• Focus on the entry signals section"
                        }
                        rows={4}
                        className="rounded-lg border border-[#D0D5DD] bg-white text-[#344054] placeholder:text-[#98A2B3] focus-visible:border-[#1570EF] focus-visible:ring-2 focus-visible:ring-[#1570EF]/20"
                      />
                    </div>

                    {uploadDocument.isError && (
                      <Text
                        variant="body"
                        as="p"
                        className="text-sm text-destructive"
                      >
                        {uploadDocument.error instanceof Error
                          ? uploadDocument.error.message
                          : "Failed to upload document"}
                      </Text>
                    )}
                  </div>
                </div>

                <section
                  className="shrink-0 pt-5"
                  aria-label="Upload document actions"
                >
                  <div className="flex justify-end gap-3 pt-2 pb-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 border-[#D0D5DD] bg-white px-4 py-3 hover:border-[#98A2B3] hover:bg-[#F9FAFB]"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={uploadDocument.isPending}
                      className="h-11 border-2 border-white/10 bg-[#1570EF] px-4 py-3 hover:bg-[#1557B0]"
                    >
                      {uploadDocument.isPending
                        ? "Uploading…"
                        : "Upload Document"}
                    </Button>
                  </div>
                </section>
              </form>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

type UploadDocumentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
