import React from "react";
import { TextField, Button } from "@mui/material";
import {
  UserIcon,
  BookOpenIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
const OnlineCourse = () => {
  return (
    <div className="bg-blue-gray-600 mt-2">
      <div className="container mx-auto py-10 w-full h-1/2  mb-6">
        <div className="text-center text-white leading-16">
          <h1 className="text-4xl font-bold">Online Course To Learn</h1>
          <p> Own Your Feature Learning New Skill Online</p>
          <div className="p-2 bg-blue-gray-200 sm:w-1/2 sm:mx-auto mt-6 flex rounded-md mx-2">
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Enter Your Email"
              variant="filled"
              className="!w-full !bg-white !rounded-sm"
              size="small"
            />
            <Button
              variant="contained"
              size="small"
              color="primary"
              className="!ml-3 !bg-orange-500 !text-black"
            >
              Search
            </Button>
          </div>
          <div className="sm:flex justify-center sm:space-x-4 mt-6 mx-4 space-y-4 sm:mx-0 sm:space-y-0">
            <div className="bg-blue-gray-200 sm:w-1/6 p-4 rounded-md">
              <div className="text-5xl">
                <UserIcon className="h-12 w-12 text-white inline-block mb-2" />
                5M
              </div>
              <p>Over 5 million student</p>
            </div>
            <div className="bg-blue-gray-200 sm:w-1/6 p-4 rounded-md">
              <div className="text-5xl">
                <BookOpenIcon className="h-12 w-12 text-white inline-block mb-2" />
                30K
              </div>
              <p>30,000 Courses</p>
            </div>
            <div className="bg-blue-gray-200 sm:w-1/6 p-4 rounded-md">
              <div className="text-5xl">
                <Square3Stack3DIcon className="h-12 w-12 text-white inline-block mb-2" />
                20K
              </div>
              <p>Learn Anything Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineCourse;
