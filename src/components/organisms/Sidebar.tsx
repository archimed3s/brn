import {
  BarChart2,
  CheckCircle,
  Home,
  Layers,
  PieChart,
  Settings,
  Zap,
} from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { NavItem } from "@/components/atoms/NavItem";
import { Text } from "@/components/atoms/Text";

export const Sidebar = () => (
  <aside className="flex h-screen w-[81px] shrink-0 flex-col justify-between overflow-hidden border-r border-[#EAECF0] bg-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]">
    <div className="flex flex-col gap-6 pt-8">
      <div className="flex items-center justify-center px-4">
        <Button
          type="button"
          size="icon"
          className="size-8 shrink-0 rounded-md bg-[#1570EF] text-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] transition-colors hover:bg-[#1557B0]"
          aria-label="Home"
        >
          <Zap className="size-5" />
        </Button>
      </div>
      <nav className="flex flex-col gap-2 px-4" aria-label="Main">
        <NavItem
          icon={<Home className="size-6 text-[#344054]" />}
          selected
          aria-label="Home"
        />
        <NavItem
          icon={<BarChart2 className="size-6 text-[#667085]" />}
          aria-label="Charts"
        />
        <NavItem
          icon={<Layers className="size-6 text-[#667085]" />}
          aria-label="Layers"
        />
        <NavItem
          icon={<CheckCircle className="size-6 text-[#667085]" />}
          aria-label="Checklist"
        />
        <NavItem
          icon={<PieChart className="size-6 text-[#667085]" />}
          aria-label="Analytics"
        />
      </nav>
    </div>
    <div className="flex flex-col gap-6 px-4 pb-6">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-12 shrink-0 rounded-lg bg-[#F2F4F7] hover:bg-[#EAECF0]"
        aria-label="Settings"
      >
        <Settings className="size-6 text-[#344054]" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-12 shrink-0 rounded-full bg-[#F2F4F7] hover:bg-[#EAECF0]"
        aria-label="User menu"
      >
        <Text
          variant="bodySemibold"
          as="span"
          className="text-center text-lg leading-7 text-[#475467]"
        >
          UK
        </Text>
      </Button>
    </div>
  </aside>
);
