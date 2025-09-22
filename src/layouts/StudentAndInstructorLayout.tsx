import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  SidebarProvider,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";
import { SidebarIcon } from "@phosphor-icons/react/dist/ssr";
import { student_sidebar, instructor_sidebar } from "@/constants/sidebar";

function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" onClick={toggleSidebar} className="!p-4">
      <SidebarIcon className="!size-8" weight="duotone" />
    </Button>
  )
}

const StudentAndInstructorLayout = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const base = location.pathname.startsWith("/dashboard/instructor")
    ? "/dashboard/instructor"
    : "/dashboard/student";
  const items = base === "/dashboard/instructor" ? instructor_sidebar : student_sidebar;

  const sectionName =
    items.find((it) => {
      const rel = it.path?.replace(/^\/+/, "") ?? "";
      const to = rel ? `${base}/${rel}` : base;
      return to === base ? location.pathname === base : location.pathname.startsWith(to);
    })?.name || (base.includes("instructor") ? "Instructor Dashboard" : "Student Dashboard");

  return (
    <div className="min-h-dvh bg-background">
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <DashboardSidebar />
        <div className={`${open ? "ml-64" : ""} transition-all flex-1 max-h-dvh`}>
          <header className="fixed z-999 flex h-16 w-full bg-background shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <h1 className="text-lg font-medium">{sectionName}</h1>
          </header>
          <div className="mt-16 flex-1 overflow-y-auto p-8">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default StudentAndInstructorLayout;
