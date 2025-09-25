import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface StudySidebarProps {
  open: boolean;
  onClose: () => void;
  sections: any;
  onItemClick: (sectionId: number) => void;
  position: number;
  select: number | null;
}

import { useDispatch, useSelector } from "react-redux";
import { setSelectedIndex } from "../../features/slices/selectedIndex";
import logo from '/hoctiengvietai_white.svg';
const StudySidebar = ({
  open,
  onClose,
  sections,
  onItemClick,
  position,
  select,
}: StudySidebarProps) => {
  const selectedIndex = useSelector((state) => state.selectedIndex.value);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth < 1024 && window.innerWidth >= 768
  );
  // const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024 && window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Collapse
        in={open}
        orientation={isMobile || isTablet ? "vertical" : "horizontal"}
        style={{ minWidth: "none" }}
      >
        <div
          className={`flex flex-col w-full lg:w-72 lg:h-dvh
           mb-auto shadow-xl`}
        >
          <List
            component="nav"
            className="!pt-0"
            aria-label="main mailbox folders"
          >
            <div className="flex flex-row lg:py-4 ps-4 justify-between items-center lg:border-b lg:border-b-gray-400">
              {!(isMobile || isTablet) && (
                <>
                  <a href="#">
                    <img src={logo} className="h-8" />
                  </a>
                  {/* <Button onClick={onClose} className="!text-black">
                    <ArrowBackIcon />
                  </Button> */}
                </>
              )}
            </div>
            {sections?.payload.sections.map((item, index) => (
              <ListItemButton
                key={index}
                className="!w-full"
                // disabled={item.disable}
                // selected={id === index}
                selected={select === item.sectionId}
                disabled={item.position > position}
                onClick={() => onItemClick(item.sectionId)}
              >
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText
                  primary={"Lesson " + (index + 1) + ": " + item.sectionName}
                />
              </ListItemButton>
            ))}
          </List>
        </div>
      </Collapse>
    </>
  );
};
StudySidebar.propTypes = {
  sidebar: PropTypes.array.isRequired,
};
export default StudySidebar;
