import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIndex } from "../../features/slices/selectedIndex";
import logo from "../../assets/logo.png";
import React, { useEffect, useState } from "react";

const DashboardSidebar = ({ open, onClose, sidebar }) => {
  // State management for mobile/tablet screen size
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024 && window.innerWidth >= 768);

  const selectedIndex = useSelector((state) => state.selectedIndex.value);
  const dispatch = useDispatch();

  // Update screen size state on window resize
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
          className={`flex flex-col w-full lg:w-72 lg:h-[calc(91vh+5px)] mb-auto shadow-xl`}
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
                    <img src={logo} className="h-8" alt="Logo" />
                  </a>
                  <Button onClick={onClose} className="!text-black">
                    <ArrowBackIcon />
                  </Button>
                </>
              )}
            </div>

            {/* Render sidebar items if available */}
            {Array.isArray(sidebar) && sidebar.length > 0 ? (
              sidebar.map((item, index) => (
                <ListItemButton
                  key={index}
                  className="w-full"
                  selected={selectedIndex === index}
                  onClick={() => dispatch(setSelectedIndex(index))}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))
            ) : (
              <ListItemText primary="No items available in the sidebar" />
            )}
          </List>
        </div>
      </Collapse>
    </>
  );
};

DashboardSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  sidebar: PropTypes.array, // Optional array
};

DashboardSidebar.defaultProps = {
  sidebar: [], // Default to empty array
};

export default DashboardSidebar;
