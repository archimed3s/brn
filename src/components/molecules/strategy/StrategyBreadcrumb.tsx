import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Text } from "@/components/atoms/Text";

export const StrategyBreadcrumb = ({ segments }: StrategyBreadcrumbProps) => (
  <div className="flex items-center gap-2">
    {segments.map((seg, i) => (
      <Text
        key={seg.href ?? `${seg.label}-${i}`}
        variant="label"
        as="span"
        className="flex items-center gap-2"
      >
        {i > 0 && <ChevronRight className="size-4 shrink-0 text-[#98A2B3]" />}
        {seg.href != null ? (
          <Link
            href={seg.href}
            className={
              seg.active
                ? "rounded-md bg-[#F9FAFB] px-2 py-1 text-sm font-semibold leading-5 text-[#344054] hover:bg-[#F2F4F7]"
                : "rounded-md pr-2 py-1 font-normal leading-5 text-[#344054] hover:bg-[#F2F4F7] hover:text-[#0D1017]"
            }
          >
            {seg.label}
          </Link>
        ) : (
          <Text
            variant={seg.active ? "labelSemibold" : "label"}
            as="span"
            className={
              seg.active
                ? "rounded-md bg-[#F9FAFB] px-2 py-1 leading-5 text-[#344054]"
                : "pr-2 py-1 font-normal leading-5 text-[#344054]"
            }
          >
            {seg.label}
          </Text>
        )}
      </Text>
    ))}
  </div>
);

export type BreadcrumbSegment = {
  label: string;
  active?: boolean;
  href?: string;
};

type StrategyBreadcrumbProps = {
  segments: BreadcrumbSegment[];
};
