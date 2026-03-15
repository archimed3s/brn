import { FolderPlus } from "lucide-react";

import { Text } from "@/components/atoms/Text";

export const ADD_CATEGORY_MODAL_TITLE_ID = "add-category-modal-title";
export const ADD_CATEGORY_MODAL_DESC_ID = "add-category-modal-desc";

export const AddCategoryModalHeader = ({
  title,
  description,
}: AddCategoryModalHeaderProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F2F4F7]">
      <FolderPlus className="size-5 text-[#98A2B3]" />
    </div>
    <Text
      variant="heading"
      as="h2"
      id={ADD_CATEGORY_MODAL_TITLE_ID}
      className="text-[#0D1017]"
    >
      {title}
    </Text>
    <Text
      variant="body"
      as="p"
      id={ADD_CATEGORY_MODAL_DESC_ID}
      className="text-sm font-normal leading-5 text-[#98A2B3]"
    >
      {description}
    </Text>
  </div>
);

export type AddCategoryModalHeaderProps = {
  title: string;
  description: string;
};
