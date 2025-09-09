import { ButtonBase, Zoom } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const DashboardMenuButton = ({ className, onClick, open }) => {
  open = open ?? false;
  return (
    <div className={"flex " + className}>
      <ButtonBase
        component="div"
        className="flex-grow flex items-center justify-center"
        onClick={onClick}
      >
        <Zoom in={!open} className="absolute">
          <MenuOutlinedIcon fontSize="inherit" color="inherit" />
        </Zoom>
        <Zoom in={open} className="absolute">
          <CloseOutlinedIcon fontSize="inherit" color="inherit" />
        </Zoom>
      </ButtonBase>
    </div>
  );
};

export default DashboardMenuButton;
