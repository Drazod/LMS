import { Link, useParams } from "react-router-dom"
import { FileTextIcon, UserSoundIcon, HeadphonesIcon } from "@phosphor-icons/react/dist/ssr"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    id: "1",
    title: "Phần 1: Kỹ năng nói",
    url: "section1",
    icon: UserSoundIcon,
  },
  {
    id: "2",
    title: "Phần 2: Kỹ năng nghe",
    url: "section2",
    icon: HeadphonesIcon,
  },
  {
    id: "3",
    title: "Phần 3: Hoạt động kết hợp",
    url: "section3",
    icon: FileTextIcon,
  },
]

export function MockStudySidebar() {
  const { courseId } = useParams()
  return (
    <Sidebar collapsible="none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Phần</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link to={`/mock/student/${courseId}/${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}