import { useState } from "react";
import { ButtonBase, Grow, Popper } from "@mui/material";

const DashboardDropDownMenu = ({
  children, // Menu
  buttonContent,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((pre) => !pre);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ButtonBase
      className="flex items-center"
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
    >
      {buttonContent}
      <Popper anchorEl={anchorEl} open={open} placement="bottom-end" transition>
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            timeout={300}
            style={{ transformOrigin: "100% 0 0" }}
          >
            <div>{children}</div>
          </Grow>
        )}
      </Popper>
    </ButtonBase>
  );
};

export default DashboardDropDownMenu;
