import { Breadcrumbs, Divider, Link, Typography } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
const BreadCrumbsDashboard = ({ name }) => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      <div className="flex items-center">
        <HomeIcon fontSize="small" className="my-auto" />
        <span className="my-auto">Home</span>
      </div>
    </Link>,
    <Typography key="3" color="text.primary">
      {name}
    </Typography>,
  ];
  return (
    <>
      <div className="flex gap-4">
        <Typography variant="h6" className="font-bold">
          {name}
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          className="!mt-1"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <Divider />
    </>
  );
};

export default BreadCrumbsDashboard;
