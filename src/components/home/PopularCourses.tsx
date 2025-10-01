import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CourseCard from "@/components/OurCourse/CourseCard";

import SwiperButton from "@/components/home/SwiperButton";
import { useEffect, useState } from "react";
import axios from "axios";


type CourseItem = {
  courseId: number;
  title: string;
  instructor: {
    name: string;
    avtUrl: string;
  };
  courseThumbnail: string | null;
  avgRating: number | null;
  categoryName: string;
  totalReviews: number;
  prePrice: number | "free" | null;
  aftPrice: number | "free" | null;
};

const PopularCourses = () => {
  const [courses, setCourses] = useState<CourseItem[]>([]);

  useEffect(() => {
    axios
     .get("https://lmsbe-production.up.railway.app/api/courses?page=1&size=10")
      .then((res) => {
        setCourses(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto px-14 py-20 flex flex-col gap-10">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-4xl font-bold">Popular Courses</h1>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
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
          {courses.map((course) => (
            <SwiperSlide key={course.courseId} className="h-full">
              <CourseCard
                courseId={course.courseId}
                instructorName={course.instructor?.name}
                instructorImage={course.instructor?.avtUrl}
                thumbnail={course.courseThumbnail}
                score={course.avgRating}
                title={course.title}
                category={course.categoryName}
                amountReview={course.totalReviews}
                oldPrice={course.prePrice}
                newPrice={course.aftPrice}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularCourses;
