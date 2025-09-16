import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  SidebarInset,
  useSidebar
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";
// import DashboardNavBar from "@/components/admin_dashboard/DashboardNavBar";

import { SidebarIcon } from "@phosphor-icons/react/dist/ssr";

import {
  instructor_sidebar,
  student_sidebar
} from "@/constants/sidebar";


function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" onClick={toggleSidebar} className="!p-4">
      <SidebarIcon className="size-8" weight="duotone" />
    </Button>
  )
}

const StudentAndInstructorLayout = () => {
  const [menuToggle, setMenuToggle] = useState(true);
  const [open, setOpen] = useState(true);
  const path = useLocation();

  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };

  return (
    // <SidebarProvider>
    //   <div className="w-full h-screen flex flex-col">
    //     {/* <DashboardNavBar
    //       menuToggle={menuToggle}
    //       handleMenuToggle={handleMenuToggle}
    //     /> */}
    //     <div className="flex flex-col lg:flex-row flex-grow overflow-auto w-full">
    //       <div className="w-full lg:w-fit">
    //         {/* <DashboardSidebar
    //           open={menuToggle}
    //           onClose={handleMenuToggle}
    //           sidebar={
    //             path.pathname.includes("/dashboard/student")
    //               ? student_sidebar
    //               : instructor_sidebar
    //           }
    //         /> */}
    //         <DashboardSidebar />
    //       </div>
    //       <div className="w-full h-full p-9 overflow-y-auto">
    //         <SidebarTrigger />
    //         <Outlet />
    //       </div>
    //     </div>
    //   </div>
    // </SidebarProvider>
    <div className="min-h-dvh bg-background">
      <SidebarProvider
        open={open} onOpenChange={setOpen}>
        <DashboardSidebar />
        <SidebarInset className="transition-all h-screen">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
          </header>
          <div className="flex-1 overflow-y-auto p-8">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default StudentAndInstructorLayout;
