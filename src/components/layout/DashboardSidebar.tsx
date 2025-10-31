import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  student_sidebar,
  instructor_sidebar
} from "@/constants/sidebar";
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr";
import logo from '/hoctiengvietai_white.svg';
import { Button } from "@/components/ui/button";

export function DashboardSidebar() {
  const location = useLocation();
  const base =
    location.pathname.startsWith("/dashboard/instructor")
      ? "/dashboard/instructor"
      : "/dashboard/student";

  const items =
    base === "/dashboard/instructor" ? instructor_sidebar : student_sidebar;

  return (
    <Sidebar variant="floating" collapsible="icon" className="w-64 sm:w-64">
      <SidebarHeader>
        <a href="/"><img src={logo} className="px-2 invert w-fit h-10 object-contain hover:opacity-50 duration-75 ease-in-out transition" /></a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Ứng dụng</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const to = item.path ? `${base}/${item.path}` : base;
                const isActive =
                  to === base
                    ? location.pathname === base
                    : location.pathname.startsWith(to);

                return (
                  <SidebarMenuItem key={`${base}-${item.name}`}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={to}>
                        <item.icon className="size-6" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <Button className="w-full justify-start" onClick={() => {
            // Clear local storage and redirect to login
            localStorage.clear();
            window.location.href = "/auth/login";
          }}>
            <SignOutIcon className="size-6" />
            Đăng xuất
          </Button>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
