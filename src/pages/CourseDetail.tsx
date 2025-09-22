// src/pages/CourseDetail.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageEntry from "@/components/PageEntry";
import Page_trace from "@/components/Page_trace";
import CourseInfo from "@/components/Course_info";
import CourseDescription from "@/components/Course_des";
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
      <div className="bg-course-banner h-96 relative">
        <div className="h-full pt-32 bg-purple-900 opacity-80 text-center flex items-center">
          <p className="text-white m-auto font-bold text-7xl">Couse Details</p>
        </div>
      </div>
      <div className="container mx-auto p-14 flex flex-row-reverse gap-6">
        <div className="w-1/5">
          <div className="sticky top-24 mb-8 mx-4 md:mx-0">
            <CourseDetailBox course={course} courseId={String(courseId)} />
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
              <Overview course={mockdata} />
            </section>
            <div>
              <section id="description" className="min-w-0">
                <CourseDescription tempcourse={mockdata} course={course} />
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
