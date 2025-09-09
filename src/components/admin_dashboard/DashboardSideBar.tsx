import { Collapse } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import logo from "../../assets/logo.png"
import { useEffect, useState } from "react";
import { ArrowUpward, ArrowBack } from "@mui/icons-material";

const DashboardSideBar = ({ children, open, onClose }) => {
  const [isBigScreen, changeWidth] = useState(window.innerWidth > 960)

  window.onresize = () => {changeWidth(window.innerWidth > 960)}

  return (
    <Collapse 
      in={open}
      orientation={isBigScreen ? "horizontal" : "vertical"} 
      style={isBigScreen ? {minWidth:"none", height:"100%"} : {minHeight:"none", width:"100%"}}
    >
      <div className="flex flex-col h-full w-full lg:w-72 mb-auto shadow-xl">
        <div className="flex flex-row p-4 justify-between items-center border-b border-b-gray-400">
          <a href="#">
            <img src={logo} className="h-8"></img>
          </a>
          <button onClick={onClose}>
            {isBigScreen ? <ArrowBack/>:<ArrowUpward/>}
          </button>
        </div>
        {children}
      </div>
    </Collapse>
  );
};

export default DashboardSideBar;
