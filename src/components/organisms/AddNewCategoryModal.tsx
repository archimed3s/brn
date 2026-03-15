"use client";

import { X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/atoms/Button";
import { Dialog } from "@/components/atoms/Dialog";
import { Text } from "@/components/atoms/Text";
import type { AddCategoryFormValues } from "@/components/molecules/categories/AddCategoryForm";
import { AddCategoryForm } from "@/components/molecules/categories/AddCategoryForm";
import {
  ADD_CATEGORY_MODAL_DESC_ID,
  ADD_CATEGORY_MODAL_TITLE_ID,
  AddCategoryModalHeader,
} from "@/components/molecules/categories/AddCategoryModalHeader";
import { useCreateDocumentCategory } from "@/hooks/useCreateDocumentCategory";

const INITIAL_VALUES: AddCategoryFormValues = {
  type: "main",
  parentId: "",
  name: "",
};

export const AddNewCategoryModal = ({
  open,
  onOpenChange,
  parentCategories,
  userId = "",
}: AddNewCategoryModalProps) => {
  const [values, setValues] =
    React.useState<AddCategoryFormValues>(INITIAL_VALUES);
  const createCategory = useCreateDocumentCategory();

  const resetForm = React.useCallback(() => {
    setValues(INITIAL_VALUES);
  }, []);

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        createCategory.reset();
      } else {
        resetForm();
      }
      onOpenChange(next);
    },
    [onOpenChange, resetForm, createCategory],
  );

  const handleCancel = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = values.name.trim();
      if (!trimmed) return;
      if (values.type === "sub" && !values.parentId) return;
      createCategory.mutate(
        {
          name: trimmed,
          user_id: userId,
          description: "",
          parent_id: values.type === "main" ? null : Number(values.parentId),
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            resetForm();
          },
        },
      );
    },
    [values, userId, createCategory, onOpenChange, resetForm],
  );

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup
            aria-labelledby={ADD_CATEGORY_MODAL_TITLE_ID}
            aria-describedby={ADD_CATEGORY_MODAL_DESC_ID}
          >
            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
              <section className="shrink-0" aria-label="Add category header">
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
                <AddCategoryModalHeader
                  title="Add New Category"
                  description="Lorem ipsum dolor sit amet consectetur."
                />
              </section>
              <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                {createCategory.isError && (
                  <Text
                    variant="body"
                    as="p"
                    className="text-sm text-destructive"
                  >
                    {createCategory.error instanceof Error
                      ? createCategory.error.message
                      : "Failed to add category"}
                  </Text>
                )}
                <AddCategoryForm
                  values={values}
                  onValuesChange={setValues}
                  parentCategories={parentCategories}
                  onCancel={handleCancel}
                  onSubmit={handleSubmit}
                  isSubmitting={createCategory.isPending}
                />
              </div>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

type AddNewCategoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentCategories: { id: number; name: string }[];
  userId?: string;
};
