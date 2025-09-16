// import {
//   Button,
//   Card,
//   CardActionArea,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Collapse,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import InboxIcon from "@mui/icons-material/Inbox";
// import DraftsIcon from "@mui/icons-material/Drafts";
// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedIndex } from "../../features/slices/selectedIndex";
// import logo from "../../assets/logo.png";
// const DashboardSidebar = ({ open, onClose, sidebar }) => {
//   const selectedIndex = useSelector((state) => state.selectedIndex.value);
//   const dispatch = useDispatch();
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [isTablet, setIsTablet] = useState(
//     window.innerWidth < 1024 && window.innerWidth >= 768
//   );
//   // const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       setIsTablet(window.innerWidth < 1024 && window.innerWidth >= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       <Collapse
//         in={open}
//         orientation={isMobile || isTablet ? "vertical" : "horizontal"}
//         style={{ minWidth: "none" }}
//       >
//         <div
//           className={`flex flex-col w-full lg:w-72 lg:h-[calc(91vh+5px)]
//            mb-auto shadow-xl`}
//         >
//           <List
//             component="nav"
//             className="!pt-0"
//             aria-label="main mailbox folders"
//           >
//             <div className="flex flex-row lg:py-4 ps-4 justify-between items-center lg:border-b lg:border-b-gray-400">
//               {!(isMobile || isTablet) && (
//                 <>
//                   <a href="#">
//                     <img src={logo} className="h-8" />
//                   </a>
//                   <Button onClick={onClose} className="!text-black">
//                     <ArrowBackIcon />
//                   </Button>
//                 </>
//               )}
//             </div>

//             {sidebar.map((item, index) => (
//               <ListItemButton
//                 key={index}
//                 className="w-full"
//                 selected={selectedIndex === index}
//                 onClick={() => dispatch(setSelectedIndex(index))}
//               >
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.name} />
//               </ListItemButton>
//             ))}
//             {/* <ListItemButton
//               selected={selectedIndex === 0}
//               onClick={(event) => handleListItemClick(event, 0)}
//             >
//               <ListItemIcon>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="size-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
//                   />
//                 </svg>
//               </ListItemIcon>
//               <ListItemText className="text-bold" primary="Dashboard" />
//             </ListItemButton>
//             <ListItemButton
//               selected={selectedIndex === 1}
//               onClick={(event) => handleListItemClick(event, 1)}
//             >
//               <ListItemIcon>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="size-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
//                   />
//                 </svg>
//               </ListItemIcon>
//               <ListItemText primary="Course" />
//             </ListItemButton> */}
//           </List>
//         </div>
//       </Collapse>
//     </>
//   );
// };
// DashboardSidebar.propTypes = {
//   sidebar: PropTypes.array.isRequired,
// };
// export default DashboardSidebar;

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon" className="w-64">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
