import { MockStudySidebar } from "@/components/Dashboard/MockStudySidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { H1, H2, H3, H4 } from "@/components/ui/typography";
import { Outlet } from "react-router-dom";

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
  return (
    <SidebarProvider>
      <MockStudySidebar />
      <Content />
    </SidebarProvider>
  );
}