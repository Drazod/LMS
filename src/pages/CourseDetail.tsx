// src/pages/CourseDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import CourseInfo from "@/components/course/CourseInfo";
import CourseDescription from "@/components/course/CourseDescription";
import Curriculum from "@/components/course/Curriculum";
import Instructor from "@/components/course/Instructor";
import CourseDetailBox from "@/components/course/CourseDetailBox";
import Overview from "@/components/course/Overview";
import api from "@/lib/api";
import "../configs/style.css";

// ---- Types (aligned with new API response structure) ----
type ApiResponse<T> = { 
  success: boolean; 
  data: T; 
  message?: string; 
};

type Section = {
  sectionId: string;
  title: string;
  description: string;
  orderIndex: string;
  contents: any[];
};

type CourseDetail = {
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
    categoryId: string;
    name: string;
  };
  sections: Section[];
};

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    if (!courseId) return;

    let alive = true;
    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        // Fetch course details using new API structure
        const courseRes = await api.get<ApiResponse<CourseDetail>>(`/courses/${courseId}`);

        if (!alive) return;

        // Handle new API response structure
        const courseData = courseRes.data?.data;
        
        if (!courseData) {
          throw new Error("Course not found");
        }

        // Ensure sections is always an array
        const processedCourseData = {
          ...courseData,
          sections: courseData.sections || []
        };

        setCourse(processedCourseData);
      } catch (e: any) {
        console.error("Failed to fetch course details:", e);
        setError(e?.response?.data?.message || e?.message || "Failed to fetch course details");
      } finally {
        if (alive) setIsLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [courseId]);

  // smooth-scroll for in-page hash links, with cleanup
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const targetPos = (el as HTMLElement).getBoundingClientRect().top;
        const offset = targetPos + window.pageYOffset - (window.innerHeight / 2 - (el as HTMLElement).offsetHeight / 2);
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    };

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    links.forEach((a) => a.addEventListener("click", handler));
    return () => links.forEach((a) => a.removeEventListener("click", handler));
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-12">
        <CircularProgress />
      </div>
    );
  }

  if (error || !course) {
    return <div className="p-4 text-red-600">Error: {error ?? "Unknown error"}</div>;
  }

  return (
    <div className="scroll-smooth bg-white">
      <div className="bg-course-banner h-96 relative">
        <div className="h-full pt-32 bg-purple-900 opacity-80 text-center flex items-center">
          <p className="text-white m-auto font-bold text-7xl">Couse Details</p>
        </div>
      </div>
      <div className="container mx-auto p-14 flex flex-row-reverse gap-6">
        <div className="w-1/5">
          <div className="sticky top-24 mb-8 mx-4 md:mx-0">
            <CourseDetailBox course={course} courseId={parseInt(course.courseId)} />
          </div>
        </div>
        <div className="w-4/5">
          <div
            className="aspect-3/2 bg-cover bg-center w-full md:w-auto text-left rounded-md overflow-hidden object-fill"
            style={{ backgroundImage: `url("${course.courseThumbnail ?? ""}")` }}
          />
          <CourseInfo course={course} />
          <div className="flex flex-row items-start gap-10">
            <section id="overview" className="sticky top-24 self-start mb-8">
              <Overview course={course} />
            </section>
            <div>
              <section id="description" className="min-w-0">
                <CourseDescription course={course} />
              </section>
              <section id="curriculum">
                <Curriculum curriculumData={course.sections} />
              </section>
              <section id="instructor">
                <Instructor course={course} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
