import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import CourseCard from "@/components/OurCourse/CourseCard";

import SwiperButton from "@/components/home/SwiperButton";
import { useEffect, useState } from "react";
import axios from "axios";


type CourseItem = {
  courseId: string;
  title: string;
  description: string;
  price: number;
  courseThumbnail: string;
  avgRating: number;
  totalRating: string;
  status: string;
  createdAt: string;
  instructor: {
    userId: string;
    name: string;
  };
  category: {
    categoryId: number;
    name: string;
  };
};

const PopularCourses = () => {
  const [courses, setCourses] = useState<CourseItem[]>([]);

  useEffect(() => {
    axios
     .get("https://lmsaibe-production.up.railway.app/api/courses?page=1&size=10")
      .then((res) => {
        // Make sure data exists and is an array
        const coursesData = res.data?.data;
        if (Array.isArray(coursesData)) {
          setCourses(coursesData);
        } else {
          console.error("Expected courses array but got:", coursesData);
          setCourses([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        setCourses([]); // Set empty array on error
      });
  }, []);
  console.log(courses);
  return (
    <div className="container mx-auto px-14 py-20 flex flex-col gap-10">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-4xl font-bold">Khóa học nổi bật</h1>
        <p>Các khóa học được đăng kí nhiều</p>
      </div>
      <div className="w-full h-full">
        <Swiper
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          spaceBetween={24}
          modules={[Navigation]}
          className="w-full h-full "
        >
          <SwiperButton />
          {courses && courses.length > 0 ? courses.map((course) => (
            <SwiperSlide key={course.courseId} className="h-full">
              <CourseCard
                courseId={course.courseId}
                instructorName={course.instructor?.name}
                instructorImage="" // API doesn't provide instructor image
                thumbnail={course.courseThumbnail}
                score={course.avgRating}
                title={course.title}
                category={course.category?.name}
                amountReview={parseInt(course.totalRating)}
                oldPrice={null} // API doesn't provide old price
                newPrice={course.price}
              />
            </SwiperSlide>
          )) : (
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-gray-500">No courses available</p>
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularCourses;
