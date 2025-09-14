import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SwiperButton from "./SwiperButton";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import convertScoreToListStar from "@/utils/convertScoreToListStar";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const CourseCard = ({ course, listStar }) => (
  <div className="rounded overflow-hidden shadow-lg mx-2 sm:mx-0 h-full">
    <div className="h-60">
      <img className="w-full" src={course.courseThumbnail} alt="Course" />
    </div>
    <div className="px-6 py-4">
      <div className="h-20 overflow-hidden">
        <a
          href={`/course/${course.courseId}`}
          className="font-bold text-black text-xl mb-2 "
        >
          {course.title}
        </a>
      </div>
      <p
        href={`/course/${course.courseId}`}
        className="text-gray-700 text-base"
      >
        {course.categoryName}
      </p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        {course.totalReviews} Reviews
      </span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        <span className="mt-2 pt-2">{course.avgRating}</span>{" "}
        {listStar.map((n, index) =>
          n === 1 ? (
            <StarIcon key={index} sx={{ color: "#f7b204" }} fontSize="small" />
          ) : n === 0 ? (
            <StarOutlineIcon
              key={index}
              sx={{ color: "#f7b204" }}
              fontSize="small"
            />
          ) : (
            <StarHalfIcon
              key={index}
              sx={{ color: "#f7b204" }}
              fontSize="small"
            />
          )
        )}
      </span>
      <span className="font-bold text-xl mt-2">{course.aftPrice}đ</span>
    </div>
  </div>
);

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses?page=1&size=10")
      .then((res) => {
        setCourses(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto px-14 py-20">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-4xl font-bold">Popular Courses</h1>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
      </div>
      <div className="relative w-full h-full">
        <Swiper
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          spaceBetween={50}
          //slidesPerView={3}
          modules={[Navigation]}
          className="w-full h-full "
        >
          <SwiperButton />
          {courses
            .sort((a, b) => (a.avgRating < b.avgRating ? 1 : -1))
            .map((course, index) => (
              <SwiperSlide key={index}>
                <CourseCard
                  course={course}
                  listStar={convertScoreToListStar(course.avgRating)}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularCourses;
