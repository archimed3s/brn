"use client";

import * as React from "react";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Radio } from "@/components/atoms/Radio";
import { Select } from "@/components/atoms/Select";
import { Text } from "@/components/atoms/Text";

export const AddCategoryForm = ({
  values,
  onValuesChange,
  parentCategories,
  onCancel,
  onSubmit,
  isSubmitting = false,
}: AddCategoryFormProps) => {
  const { type, parentId, name } = values;

  const handleTypeMain = React.useCallback(() => {
    onValuesChange({ ...values, type: "main", parentId: "" });
  }, [values, onValuesChange]);

  const handleTypeSub = React.useCallback(() => {
    onValuesChange({ ...values, type: "sub" });
  }, [values, onValuesChange]);

  const handleParentChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onValuesChange({ ...values, parentId: e.target.value });
    },
    [values, onValuesChange],
  );

  const handleNameChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onValuesChange({ ...values, name: e.target.value });
    },
    [values, onValuesChange],
  );

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Text variant="label" as="span" className="font-medium text-[#344054]">
          Category type
        </Text>
        <div className="flex flex-col gap-3">
          <Label className="flex cursor-pointer items-center gap-2">
            <Radio
              name="categoryType"
              checked={type === "main"}
              onChange={handleTypeMain}
            />
            <Text
              variant="label"
              as="span"
              className="font-normal text-[#344054]"
            >
              Main Category
            </Text>
          </Label>
          <Label className="flex cursor-pointer items-center gap-2">
            <Radio
              name="categoryType"
              checked={type === "sub"}
              onChange={handleTypeSub}
            />
            <Text
              variant="label"
              as="span"
              className="font-normal text-[#344054]"
            >
              Subcategory
            </Text>
          </Label>
        </div>
      </div>

      {type === "sub" && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="parent-category">Parent Category *</Label>
          <Select
            id="parent-category"
            required={type === "sub"}
            value={parentId}
            onChange={handleParentChange}
            variant="outline"
          >
            <option value="">Select parent category...</option>
            {parentCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="category-name">Category Name *</Label>
        <Input
          id="category-name"
          type="text"
          required
          placeholder="Enter category name..."
          value={name}
          onChange={handleNameChange}
          variant="outline"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2 pb-1">
        <Button
          type="button"
          variant="outline"
          className="h-11 border-[#D0D5DD] bg-white px-4 py-3 hover:border-[#98A2B3] hover:bg-[#F9FAFB]"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 border-2 border-white/10 bg-[#1570EF] px-4 py-3 hover:bg-[#1557B0]"
        >
          {isSubmitting ? "Adding…" : "Add Category"}
        </Button>
      </div>
    </form>
  );
};

export type AddCategoryFormValues = {
  type: "main" | "sub";
  parentId: string;
  name: string;
};

type AddCategoryFormProps = {
  values: AddCategoryFormValues;
  onValuesChange: (values: AddCategoryFormValues) => void;
  parentCategories: { id: number; name: string }[];
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
};
