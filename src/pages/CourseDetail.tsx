// src/pages/CourseDetail.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageEntry from "@/components/PageEntry";
import Page_trace from "@/components/Page_trace";
import Course_info from "@/components/Course_info";
import Course_des from "@/components/Course_des";
import Curriculum from "@/components/Curriculum";
import Instructor from "@/components/Instructor";
import Reviews from "@/components/Reviews";
import CourseDetailBox from "@/components/CourseDetailBox";
import Overview from "@/components/Overview";
import { templatedata } from "@/constants/mockdata";
import "../configs/style.css";
import { CircularProgress } from "@mui/material";
import api from "@/lib/api";

// ---- types (adjust to your backend if needed)
type ApiResponse<T> = { payload: T; metadata?: any; message?: string };

type InstructorPublic = {
  name: string;
  avtUrl?: string;
};

type Section = {
  sectionId: number;
  sectionName: string;
  // add fields you actually render
};

type CourseDetail = {
  courseId: number;
  title: string;
  description: string;
  categoryName?: string;
  price?: number;
  courseThumbnail?: string;
  createdAt?: string;
  instructor: InstructorPublic;
  sections: Section[];
  // add other fields you use in children
};

type RatingSummary = any; // replace with your real type that <Reviews /> expects

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [rating, setRating] = useState<RatingSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // mock data (for the Overview box)
  const mockdata = useMemo(() => templatedata[0], []);

  useEffect(() => {
    if (!courseId) return;

    let alive = true;
    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        // Adjust endpoints if your backend differs
        const [courseRes] = await Promise.all([
          api.get<ApiResponse<CourseDetail>>(`/courses/details/${courseId}`),
        
        ]);

        if (!alive) return;

        const coursePayload = courseRes.data?.payload;
        // const ratingPayload = ratingRes.data?.payload;

        if (!coursePayload) throw new Error("Course not found");
        // if (!ratingPayload) throw new Error("Rating not found");

        setCourse(coursePayload);
        // setRating(ratingPayload);
      } catch (e: any) {
        setError(e?.message || "Failed to fetch course details");
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
      <PageEntry course={course} />
      <Page_trace />

      <div className="my-8 grid grid-cols-1 md:grid-cols-10 gap-6">
        <div className="md:row-start-1 md:col-start-8 md:col-span-2">
          <div className="sticky top-24 mb-8 mx-4 md:mx-0">
            <CourseDetailBox course={course} courseId={String(courseId)} />
          </div>
        </div>

        <div className="ml-4 md:row-start-1 md:col-start-2 md:col-span-6 mr-4 md:mr-0">
          <div
            className="h-[200px] md:h-[500px] bg-cover bg-center w-full md:w-auto text-left rounded-md overflow-hidden object-fill"
            style={{ backgroundImage: `url("${course.courseThumbnail ?? ""}")` }}
          />
          <Course_info course={course} />

          <div className="md:grid md:grid-cols-5 md:gap-24">
            <div className="col-start-1 col-span-2">
              <div className="sticky top-24 mb-8">
                <Overview course={mockdata} />
              </div>
            </div>

            <div id="overview" className="my-29 col-start-3 col-span-3">
              <Course_des tempcourse={mockdata} course={course} />
            </div>
          </div>

          <div id="curriculum">
            <Curriculum curriculumData={course.sections} />
          </div>

          <div id="instructor">
            <Instructor course={course} />
          </div>

          {/* <div>
            <Reviews course={rating} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
