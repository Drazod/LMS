import { useState } from "react";
import { MockStudySidebar } from "@/components/layout/MockStudySidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { SidebarIcon } from "@phosphor-icons/react/dist/ssr";
import { H4 } from "@/components/ui/typography";
import { Outlet } from "react-router-dom";

function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" onClick={toggleSidebar} className="!p-4">
      <SidebarIcon className="!size-8" weight="duotone" />
    </Button>
  )
}

function Content() {
  const { state } = useSidebar();
  return (
    <div
      data-state={state}
      className="
        flex-1 min-h-screen
        transition-[margin] duration-300 ease-in-out
        px-6 py-4
        data-[state=expanded]:ml-[--sidebar-width]
        data-[state=collapsed]:ml-[--sidebar-width-icon]
      "
    >
      <header className="h-14 flex items-center gap-2 border-b mb-4">
        <SidebarTrigger />
        <H4 className="font-bold">
          Bài 1. Trình bày ý kiến về một sự việc có tính thời sự;
          Nghe và nhận biết tính thuyết phục của ý kiến
        </H4>
      </header>
      <Outlet />
    </div>
  );
}

export default function MockStudentStudyLayout() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <MockStudySidebar />
        <div className={`${open ? "ml-64" : ""} transition-all flex-1 max-h-dvh`}>
          <Content />
        </div>
      </SidebarProvider>
    </div>
  );
}