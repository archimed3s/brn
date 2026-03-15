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
  <aside className="flex h-auto w-full shrink-0 flex-col justify-between overflow-hidden border-r border-[#EAECF0] bg-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] lg:h-screen lg:w-[81px]">
    <div className="flex flex-col gap-4 pt-4 lg:gap-6 lg:pt-8">
      <div className="flex items-center gap-3 px-2 lg:justify-center lg:gap-0 lg:px-4">
        <Button
          type="button"
          size="icon"
          className="size-10 shrink-0 rounded-md bg-[#1570EF] text-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] transition-colors hover:bg-[#1557B0] active:translate-y-0 touch-manipulation lg:size-8"
          aria-label="Home"
        >
          <Zap className="size-5" />
        </Button>
        <Text
          variant="bodySemibold"
          as="span"
          className="text-[#0D1017] lg:hidden"
        >
          Home
        </Text>
      </div>
      <nav
        className="flex flex-col gap-0.5 px-2 lg:gap-2 lg:px-4"
        aria-label="Main"
      >
        <NavItem
          icon={<Home className="size-6 text-[#344054]" />}
          label="Home"
          selected
          aria-label="Home"
        />
        <NavItem
          icon={<BarChart2 className="size-6 text-[#667085]" />}
          label="Charts"
          aria-label="Charts"
        />
        <NavItem
          icon={<Layers className="size-6 text-[#667085]" />}
          label="Layers"
          aria-label="Layers"
        />
        <NavItem
          icon={<CheckCircle className="size-6 text-[#667085]" />}
          label="Checklist"
          aria-label="Checklist"
        />
        <NavItem
          icon={<PieChart className="size-6 text-[#667085]" />}
          label="Analytics"
          aria-label="Analytics"
        />
      </nav>
    </div>
    <div className="flex flex-col gap-2 px-2 pb-4 lg:gap-6 lg:px-4 lg:pb-6">
      <div className="flex items-center gap-3 lg:justify-center lg:gap-0">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="min-h-[44px] min-w-[44px] shrink-0 rounded-lg bg-[#F2F4F7] transition-colors hover:bg-[#EAECF0] active:translate-y-0 touch-manipulation lg:size-12"
          aria-label="Settings"
        >
          <Settings className="size-6 text-[#344054]" aria-hidden />
        </Button>
        <Text
          variant="body"
          as="span"
          className="text-sm font-medium text-[#344054] lg:hidden"
        >
          Settings
        </Text>
      </div>
      <div className="flex items-center gap-3 lg:justify-center lg:gap-0">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="min-h-[44px] min-w-[44px] shrink-0 rounded-full bg-[#F2F4F7] transition-colors hover:bg-[#EAECF0] active:translate-y-0 touch-manipulation lg:size-12"
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
        <Text
          variant="body"
          as="span"
          className="text-sm font-medium text-[#344054] lg:hidden"
        >
          Account
        </Text>
      </div>
    </div>
  </aside>
);
