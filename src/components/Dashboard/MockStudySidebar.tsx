import { Link, useParams, useLocation } from "react-router-dom"
import { FileTextIcon, UserSoundIcon, HeadphonesIcon } from "@phosphor-icons/react/dist/ssr"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import logo from '/hoctiengvietai_white.svg';

const items = [
  { id: "1", title: "Phần 1: Kỹ năng nói", url: "phan-1-ky-nang-noi", icon: UserSoundIcon },
  { id: "2", title: "Phần 2: Kỹ năng nghe", url: "phan-2-ky-nang-nghe", icon: HeadphonesIcon },
  { id: "3", title: "Phần 3: Hoạt động kết hợp", url: "phan-3-hoat-dong-ket-hop", icon: FileTextIcon },
]

export function MockStudySidebar() {
  const { courseId } = useParams()
  const location = useLocation()

  return (
    <Sidebar variant="floating" collapsible="icon" className="w-64 sm:w-64">
      <SidebarHeader>
        <img src={logo} className="px-2 invert w-fit h-10 object-contain" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Phần</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const to = `/mock/student/${courseId}/${item.url}`
                const active = location.pathname === to
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={active ? "bg-primary/10 text-primary" : ""}
                    >
                      <Link to={to}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}