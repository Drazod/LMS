import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Input,
  InputBase,
  OutlinedInput,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import BreadCrumbsDashboard from "../common/BreadcrumbsDashboard";
import {
  useGetInstructorQuery,
  useUpdateInstructorAddressMutation,
  useUpdateInstructorPasswordMutation,
  useUpdateInstructorProfileMutation,
} from "@/apis/InstructorDashboardApi";
import { Toast } from "@/configs/SweetAlert";
import { handleDelete } from "@/utils/deleteImage";
import {ImageUpload} from "@/components/common/ImageUpload";
import Loader from "@/components/common/Loader";
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
const InstructorProfile = () => {
  const { data: Instructor, isLoading, isError } = useGetInstructorQuery();
  const [
    updateInstructorProfile,
    { isLoading: isUpdated, error: updateError },
  ] = useUpdateInstructorProfileMutation();
  const [
    updateInstructorAddress,
    { isLoading: addressLoading, error: addressError },
  ] = useUpdateInstructorAddressMutation();
  const [
    updateInstructorPassword,
    { isLoading: isPasswordUpdated, error: updatePasswordError },
  ] = useUpdateInstructorPasswordMutation();

  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [publicId, setPublicId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reTypePassword, setReTypePassword] = useState("");
  const [updateAvatar, setUpdateAvatar] = useState("");
  const [updatePublicId, setUpdatePublicId] = useState("");

  useEffect(() => {
    if (!isLoading && !isError) {
      setEmail(Instructor.payload.email);
      setFirstName(Instructor.payload.firstName);
      setLastName(Instructor.payload.lastName);
      setPhoneNumber(Instructor.payload.phoneNumber);
      setAddress(Instructor.payload.userAddress);
      setCity(Instructor.payload.userCity);
      setCountry(Instructor.payload.userCountry);
      setPostalCode(Instructor.payload.userPostalCode);
      setAvatar(Instructor.payload.avtUrl);
      setPublicId(Instructor.payload.publicAvtId);
    }
  }, [Instructor, isLoading, isError]);
  const handleCancelProfile = () => {
    setEmail(Instructor.payload.email);
    setFirstName(Instructor.payload.firstName);
    setLastName(Instructor.payload.lastName);
    setPhoneNumber(Instructor.payload.phoneNumber);
    setAvatar(Instructor.payload.avtUrl);
    setPublicId(Instructor.payload.publicAvtId);
    handleDelete(updatePublicId);
    setUpdateAvatar("");
    setUpdatePublicId("");
  };
  const handleCancelAddress = () => {
    setAddress(Instructor.payload.userAddress);
    setCity(Instructor.payload.userCity);
    setCountry(Instructor.payload.userCountry);
    setPostalCode(Instructor.payload.userPostalCode);
  };
  const handleCancelPassword = () => {
    setPassword("");
    setNewPassword("");
    setReTypePassword("");
  };
  const handleUpdateProfile = async () => {
    try {
      await updateInstructorProfile({
        name: `${firstName} ${lastName}`,
        email,
        // password,
        firstName,
        lastName,
        phoneNumber,
      })
        .unwrap()
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Update successfully",
          });
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Update failed",
      });
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateAddress = async () => {
    try {
      await updateInstructorAddress({
        firstName,
        lastName,
        phoneNumber,
        userAddress: address,
        userCity: city,
        userCountry: country,
        userPostalCode: postalCode,
      })
        .unwrap()
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Update successfully",
          });
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Update failed",
      });
    }
  };
  const handleUpdatePassword = async () => {
    await updateInstructorPassword({
      name: `${firstName} ${lastName}`,
      email,
      phoneNumber,
      firstName,
      lastName,
      password,
    })
      .unwrap()
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Update successfully",
        });
      });
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;
  return (
    <div className="mt-5">
      <BreadCrumbsDashboard name={"User Profile"} />
      <div className="my-10">
        <div className="border border-gray-30 rounded-md p-4">
          <Typography variant="h6" className="!font-bold px-4">
            User Profile
          </Typography>
          <Divider />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 px-4">
            <Typography variant="h6" className="!mt-5 md:col-span-3">
              1. Personal Details
            </Typography>
            {(avatar === "" || !avatar) &&
            (updateAvatar === "" || !updateAvatar) ? (
              <figure className="my-auto mx-auto md:h-full lg:h-[35vh] w-full">
                <div className="flex items-center  justify-center h-full w-full my-auto">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-3 text-center">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <ImageUpload
                      setImage={setAvatar}
                      setPublicId={setPublicId}
                    />
                  </label>
                </div>
              </figure>
            ) : (
              <div className="flex flex-col justify-around mx-auto my-auto w-full">
                <img
                  src={updateAvatar !== "" ? updateAvatar : avatar}
                  onClick={handleClickOpen}
                  alt="avatar"
                  className="h-[300px] w-full mx-auto col-span-4 object-cover rounded-l-md"
                />
              </div>
            )}
            <div className="grid md:col-span-2 grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <Typography variant="small" color="gray">
                  First Name:
                </Typography>
                <form autoComplete="off" className="w-full">
                  <FormControl className="w-full" size="small">
                    <OutlinedInput
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                </form>
              </div>
              <div>
                <Typography variant="small" color="gray">
                  Last Name:
                </Typography>
                <form autoComplete="off" className="w-full">
                  <FormControl className="w-full" size="small">
                    <OutlinedInput
                      aria-label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </form>
              </div>
              <div className="md:col-span-2">
                <Typography variant="small" color="gray">
                  Email:
                </Typography>
                <form autoComplete="off" className="w-full">
                  <FormControl className="w-full" size="small">
                    <OutlinedInput value={email} data-testid="email" disabled />
                  </FormControl>
                </form>
              </div>
              <div className="md:col-span-2">
                <Typography variant="small" color="gray">
                  Phone Number:
                </Typography>
                <form autoComplete="off" className="w-full">
                  <FormControl className="w-full" size="small">
                    <OutlinedInput
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </FormControl>
                </form>
              </div>
              <div className="md:col-span-2 flex gap-4">
                <SaveButton variant="contained" onClick={handleUpdateProfile}>
                  Save
                </SaveButton>
                <DeleteButton variant="contained" onClick={handleCancelProfile}>
                  Cancel
                </DeleteButton>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 px-4">
            <Typography variant="h6" className="!mt-5 md:col-span-2">
              2. Address
            </Typography>
            <div>
              <Typography variant="small" color="gray">
                Address:
              </Typography>
              <form autoComplete="off" className="w-full">
                <FormControl className="w-full" size="small">
                  <OutlinedInput
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </form>
            </div>
            <div>
              <Typography variant="small" color="gray">
                City:
              </Typography>
              <form autoComplete="off" className="w-full">
                <FormControl className="w-full" size="small">
                  <OutlinedInput
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormControl>
              </form>
            </div>
            <div>
              <Typography variant="small" color="gray">
                Country:
              </Typography>
              <form autoComplete="off" className="w-full">
                <FormControl className="w-full" size="small">
                  <OutlinedInput
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </FormControl>
              </form>
            </div>
            <div>
              <Typography variant="small" color="gray">
                Postal Code:
              </Typography>
              <form autoComplete="off" className="w-full">
                <FormControl className="w-full" size="small">
                  <OutlinedInput
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </FormControl>
              </form>
            </div>
            <div className="md:col-span-2 flex gap-4">
              <SaveButton variant="contained" onClick={handleUpdateAddress}>
                Save
              </SaveButton>
              <DeleteButton variant="contained" onClick={handleCancelAddress}>
                Cancel
              </DeleteButton>
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
                <OutlinedInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </form>
            <Typography variant="small" color="gray">
              New Password:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.value.target)}
                />
              </FormControl>
            </form>
            <div className="md:col-span-2"></div>
            <Typography variant="small" color="gray">
              Re Type Password:
            </Typography>
            <form autoComplete="off" className="w-full md:col-span-2">
              <FormControl className="w-full" size="small">
                <OutlinedInput
                  type="password"
                  value={reTypePassword}
                  onChange={(e) => setReTypePassword(e.value.target)}
                />
              </FormControl>
            </form>
            <div className="md:col-span-2 flex gap-4 mb-10">
              <SaveButton variant="contained" onClick={handleUpdatePassword}>
                Save
              </SaveButton>
              <DeleteButton variant="contained" onClick={handleCancelPassword}>
                Cancel
              </DeleteButton>
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
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Change Avatar</DialogTitle>
        <DialogContent>
          {updateAvatar === "" || !updateAvatar ? (
            <figure className="my-auto mx-auto md:h-full lg:h-[35vh] w-full">
              <div className="flex items-center  justify-center h-full w-full my-auto">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-3 text-center">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <ImageUpload
                    setImage={setUpdateAvatar}
                    setPublicId={setUpdatePublicId}
                  />
                </label>
              </div>
            </figure>
          ) : (
            <div className="flex flex-col justify-around mx-auto my-auto w-full">
              <img
                src={avatar}
                onClick={handleClickOpen}
                alt="avatar"
                className="h-[200px] w-full mx-auto col-span-4 object-cover rounded-l-md"
              />
              <Button
                color="error"
                variant="contained"
                className="!mt-5"
                onClick={() => {
                  handleDelete(updatePublicId), setUpdateAvatar(null);
                }}
              >
                Delete Image
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructorProfile;
