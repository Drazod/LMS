import {
  Button,
  Container,
  Divider,
  FormControl,
  Input,
  InputBase,
  OutlinedInput,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import BreadCrumbsDashboard from "./BreadCrumbsDashboard";
import { grey } from "@mui/material/colors";
const SaveButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#d8a409"),
  backgroundColor: "#d8a409",
  "&:hover": {
    color: theme.palette.getContrastText("#4d0a91"),
    backgroundColor: "#4d0a91",
  },
}));
const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[800]),
  backgroundColor: grey[800],
  "&:hover": {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
  },
}));
const UserProfile = () => {
  return (
    <div>
      <BreadCrumbsDashboard name={"User Profile"} />
      <div className="my-10">
        <div className="border border-gray-30 rounded-md p-4">
          <Typography variant="h6" className="!font-bold px-4">
            User Profile
          </Typography>
          <Divider />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 px-4">
            <Typography variant="h6" className="!mt-5 md:col-span-2">
              1. Personal Details
            </Typography>
            <div>
              <Typography variant="small" color="gray">
                First Name:
              </Typography>
              <form autoComplete="off" className="w-full">
                <FormControl className="w-full" size="small">
                  <OutlinedInput />
                </FormControl>
              </form>
            </div>
            <div>
              <Typography variant="small" color="gray">
                Last Name:
              </Typography>
              <form autoComplete="off" className="w-full">
                <FormControl className="w-full" size="small">
                  <OutlinedInput />
                </FormControl>
              </form>
            </div>
            <div>
              <Typography variant="small" color="gray">
                Email:
              </Typography>
              <form autoComplete="off" className="w-full">
                <FormControl className="w-full" size="small">
                  <OutlinedInput />
                </FormControl>
              </form>
            </div>
            <div>
              <Typography variant="small" color="gray">
                Phone Number:
              </Typography>
              <form autoComplete="off" className="w-full">
                <FormControl className="w-full" size="small">
                  <OutlinedInput />
                </FormControl>
              </form>
            </div>
            <Typography variant="h6" className="!mt-5 md:col-span-2">
              2. Address
            </Typography>
            <div>
              <Typography variant="small" color="gray">
                Address:
              </Typography>
              <form autoComplete="off" className="w-full">
                <FormControl className="w-full" size="small">
                  <OutlinedInput />
                </FormControl>
              </form>
            </div>
            <div>
              <Typography variant="small" color="gray">
                City:
              </Typography>
              <form autoComplete="off" className="w-full">
                <FormControl className="w-full" size="small">
                  <OutlinedInput />
                </FormControl>
              </form>
            </div>
            <div>
              <Typography variant="small" color="gray">
                Country:
              </Typography>
              <form autoComplete="off" className="w-full">
                <FormControl className="w-full" size="small">
                  <OutlinedInput />
                </FormControl>
              </form>
            </div>
            <div>
              <Typography variant="small" color="gray">
                Postal Code:
              </Typography>
              <form autoComplete="off" className="w-full">
                <FormControl className="w-full" size="small">
                  <OutlinedInput />
                </FormControl>
              </form>
            </div>
            <div className="md:col-span-2 flex gap-4">
              <SaveButton variant="contained">Save</SaveButton>
              <DeleteButton variant="contained">Cancel</DeleteButton>
            </div>
            <div className="md:col-span-2"></div>
            <div></div>
            <Typography variant="h6" className="!mt-5 md:col-span-2">
              3. Password
            </Typography>
            <Typography variant="small" color="gray">
              Current Password:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput />
              </FormControl>
            </form>
            <Typography variant="small" color="gray">
              New Password:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput />
              </FormControl>
            </form>
            <div className="md:col-span-2"></div>
            <Typography variant="small" color="gray">
              Re Type Password:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput />
              </FormControl>
            </form>
            <div className="md:col-span-2 flex gap-4 mb-10">
              <SaveButton variant="contained">Save</SaveButton>
              <DeleteButton variant="contained">Cancel</DeleteButton>
            </div>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="col-span-1"></div>
            <Typography variant="h6" className="!my-5 md:col-span-2">
              1. Personal Information
            </Typography>
            <div className="md:col-span-2"></div>
            <Typography variant="medium" className="!my-auto">
              First Name:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput />
              </FormControl>
            </form>
            <div className="md:col-span-2"></div>
            <Typography variant="medium" className="!my-auto">
              Last Name:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput />
              </FormControl>
            </form>
            <div className="md:col-span-2"></div>
            <Typography variant="medium" className="!my-auto">
              Email:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput />
              </FormControl>
            </form>
            <div className="md:col-span-2"></div>
            <Typography variant="medium" className="!my-auto">
              Phone Number:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput />
              </FormControl>
            </form>
            <div className="md:col-span-2"></div>
            <div></div>
            <Typography variant="h6" className="!my-5 md:col-span-2">
              2. Address
            </Typography>
            <div className="md:col-span-2"></div>
            <Typography variant="medium" className="!my-auto">
              Address
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput />
              </FormControl>
            </form>
            <div className="md:col-span-2"></div>
            <Typography variant="medium" className="!my-auto">
              City:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput />
              </FormControl>
            </form>
            <div className="md:col-span-2"></div>
            <Typography variant="medium" className="!my-auto">
              Postal Code:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput />
              </FormControl>
            </form>
            <div className="md:col-span-2"></div>
            <div></div>
            <div className="md:col-span-2 flex gap-4">
              <SaveButton variant="contained">Save</SaveButton>
              <DeleteButton variant="contained">Cancel</DeleteButton>
            </div>
            <div className="md:col-span-2"></div>
            <div></div>
            <Typography variant="h6" className="!my-5 md:col-span-2">
              3. Password
            </Typography>
            <div className="md:col-span-2"></div>
            <Typography variant="medium" className="!my-auto">
              Current Password:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput />
              </FormControl>
            </form>
            <div className="md:col-span-2"></div>
            <Typography variant="medium" className="!my-auto">
              New Password:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput />
              </FormControl>
            </form>
            <div className="md:col-span-2"></div>
            <Typography variant="medium" className="!my-auto">
              Re Type Password:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput />
              </FormControl>
            </form>
            <div className="md:col-span-2"></div>
            <div></div>
            <div className="md:col-span-2 flex gap-4">
              <SaveButton variant="contained">Save</SaveButton>
              <DeleteButton variant="contained">Cancel</DeleteButton>
            </div>
            <div></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
