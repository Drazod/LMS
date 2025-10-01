import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
  postalCode: z.string().min(5, { message: "Postal code must be at least 5 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  newPassword: z.string().min(6, { message: "New password must be at least 6 characters" }),
  reTypePassword: z.string().min(6, { message: "Please re-type your password" }),
}).refine((data) => data.newPassword === data.reTypePassword, {
  message: "Passwords do not match.",
});

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { ImageUpload } from "@/components/common/ImageUpload";

import {
  useGetStudentQuery,
  useUpdateStudentAddressMutation,
  useUpdateStudentPasswordMutation,
  useUpdateStudentProfileMutation,
} from "@/apis/StudentDashboardApi";
import { FloppyDiskIcon } from "@phosphor-icons/react/dist/ssr";

const StudentProfile = () => {
  const { data: student, isLoading, isError } = useGetStudentQuery();
  const [updateStudentProfile] = useUpdateStudentProfileMutation();
  const [updateStudentAddress] = useUpdateStudentAddressMutation();
  const [updateStudentPassword] = useUpdateStudentPasswordMutation();

  const [avatar, setAvatar] = useState("");
  const [publicId, setPublicId] = useState("");
  const [updateAvatar, setUpdateAvatar] = useState("");
  // const [updatePublicId, setUpdatePublicId] = useState("");
  // const [open, setOpen] = useState(false);
  // const [email, setEmail] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [country, setCountry] = useState("");
  // const [postalCode, setPostalCode] = useState("");
  // const [password, setPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [reTypePassword, setReTypePassword] = useState("");
  // useEffect(() => {
  //   if (!isLoading && !isError) {
  //     setEmail(student.payload.email);
  //     setFirstName(student.payload.firstName);
  //     setLastName(student.payload.lastName);
  //     setPhoneNumber(student.payload.phoneNumber);
  //     setAddress(student.payload.userAddress);
  //     setCity(student.payload.userCity);
  //     setCountry(student.payload.userCountry);
  //     setPostalCode(student.payload.userPostalCode);
  //     setAvatar(student.payload.avtUrl);
  //     setPublicId(student.payload.publicAvtId);
  //   }
  // }, [student, isLoading, isError]);
  // const handleCancelProfile = () => {
  //   setEmail(student.payload.email);
  //   setFirstName(student.payload.firstName);
  //   setLastName(student.payload.lastName);
  //   setPhoneNumber(student.payload.phoneNumber);
  //   setAvatar(student.payload.avtUrl);
  //   setPublicId(student.payload.publicAvtId);
  //   handleDelete(updatePublicId);
  //   setUpdateAvatar(null);
  //   setUpdatePublicId(null);
  // };
  // const handleCancelAddress = () => {
  //   setAddress(student.payload.userAddress);
  //   setCity(student.payload.userCity);
  //   setCountry(student.payload.userCountry);
  //   setPostalCode(student.payload.userPostalCode);
  // };
  // const handleCancelPassword = () => {
  //   setPassword("");
  //   setNewPassword("");
  //   setReTypePassword("");
  // };
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleUpdateProfile = async () => {
  //   try {
  //     await updateStudentProfile({
  //       name: `${firstName} ${lastName}`,
  //       email,
  //       // password,
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //     })
  //       .unwrap()
  //       .then(() => {
  //         Toast.fire({
  //           icon: "success",
  //           title: "Update successfully",
  //         });
  //       });
  //   } catch (err) {
  //     Toast.fire({
  //       icon: "error",
  //       title: "Update failed",
  //     });
  //   }
  // };
  // const handleUpdateAddress = async () => {
  //   try {
  //     await updateStudentAddress({
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //       userAddress: address,
  //       userCity: city,
  //       userCountry: country,
  //       userPostalCode: postalCode,
  //     })
  //       .unwrap()
  //       .then(() => {
  //         Toast.fire({
  //           icon: "success",
  //           title: "Update successfully",
  //         });
  //       });
  //   } catch (err) {
  //     Toast.fire({
  //       icon: "error",
  //       title: "Update failed",
  //     });
  //   }
  // };
  // const handleUpdatePassword = async () => {
  //   await updateStudentPassword({
  //     name: `${firstName} ${lastName}`,
  //     email,
  //     phoneNumber,
  //     firstName,
  //     lastName,
  //   })
  //     .unwrap()
  //     .then(() => {
  //       Toast.fire({
  //         icon: "success",
  //         title: "Update successfully",
  //       });
  //     });
  // };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      password: "",
      newPassword: "",
      reTypePassword: "",
    },
  });

  async function onSubmitUpdateProfile(values: z.infer<typeof formSchema>) {
    try {
      await updateStudentProfile({
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
      }).unwrap();
      console.log("Profile updated");
    } catch (err) {
      console.error("Update profile failed", err);
    }
  };

  async function onSubmitUpdateAddress(values: z.infer<typeof formSchema>) {
    try {
      await updateStudentAddress({
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        userAddress: values.address,
        userCity: values.city,
        userCountry: values.country,
        userPostalCode: values.postalCode,
      }).unwrap();
      console.log("Address updated");
    } catch (err) {
      console.error("Update address failed", err);
    }
  };

  async function onSubmitUpdatePassword(values: z.infer<typeof formSchema>) {
    try {
      await updateStudentPassword({
        email: values.email,
        password: values.newPassword,
      }).unwrap();

      form.setValue("password", "");
      form.setValue("newPassword", "");
      form.setValue("reTypePassword", "");

      console.log("Password updated");
    } catch (err) {
      console.error("Update password failed", err);
    }
  };

  return (
    <div>
      {/* START REFACTORING */}
      <Form {...form}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <Card>
            <CardHeader>
              Personal Details
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {avatar === "" && updateAvatar === "" ? (
                <figure className="my-auto mx-auto md:h-full lg:h-80 w-full flex flex-col gap-1.5">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Avatar</label>
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
                  <p>Avatar</p>
                  <img
                    src={updateAvatar !== "" ? updateAvatar : avatar}
                    onClick={handleClickOpen}
                    alt="avatar"
                    className="h-[300px] w-full mx-auto col-span-4 object-cover rounded-l-md"
                  />
                </div>
              )}
              <form onSubmit={form.handleSubmit(onSubmitUpdateProfile)} className="flex flex-col gap-5 justify-end">
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button variant="secondary" type="submit"><FloppyDiskIcon className="!size-5" /> Save profile</Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              Address
            </CardHeader>
            <CardContent className="space-y-3">
              <form onSubmit={form.handleSubmit(onSubmitUpdateAddress)} className="flex flex-col gap-5 justify-items-end">
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Postal Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button variant="secondary" type="submit"><FloppyDiskIcon className="!size-5" /> Save address</Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              Password
            </CardHeader>
            <CardContent className="space-y-3">
              <form onSubmit={form.handleSubmit(onSubmitUpdatePassword)} className="flex flex-col gap-5 justify-items-end">
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Current Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="New Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reTypePassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Re-type New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Re-type New Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button variant="secondary" type="submit"><FloppyDiskIcon className="!size-5" /> Save password</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Form>
      {/* END REFACTORING */}
      {/* <div>
        <div className="border border-gray-30 rounded-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 px-4">
            <Typography variant="h6" className="!mt-5 md:col-span-3">
              1. Personal Details
            </Typography>
            {avatar === "" && updateAvatar === "" ? (
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
        </div>
      </div> */}
      {/* <Dialog open={open}>
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
                variant="outline"
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
      </Dialog> */}
    </div>
  );
};

export default StudentProfile;
