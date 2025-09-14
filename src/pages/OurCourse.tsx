// src/pages/OurCourse.tsx
import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import OutlinedInput from "@mui/material/OutlinedInput";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

import CourseCard from "@/components/OurCourse/CourseCard";
import BriefCourseCard from "@/components/OurCourse/BriefCourseCard";
import Category from "@/components/OurCourse/Category";
import AdvImg from "@/assets/courses/adv.jpg";

import api from "@/lib/api";

// ===== Types (align with your backend payloads) =====
type InstructorMini = {
  name: string;
  avtUrl: string | null;
};

type CourseItem = {
  courseId: number;
  title: string;
  instructor: InstructorMini;
  courseThumbnail: string | null;
  avgRating: number | null;
  categoryName: string;
  totalReviews: number;
  prePrice: number | "free" | null;
  aftPrice: number | "free" | null;
};

type CategoryItem = {
  categoryId: number;
  categoryName: string;
};

type PaginationMeta = {
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
};

type ApiResponse<T> = {
  payload: T;
  metadata?: {
    pagination?: PaginationMeta;
    [k: string]: unknown;
  };
  // plus your other fields like code/message if present
};

// ===== Component =====
const OurCourse: React.FC = () => {
  const [courseList, setCourseList] = useState<CourseItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [category, setCategory] = useState<CategoryItem[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(parseInt(searchParams.get("page") || "1", 10));
  const [isPageSet, setIsPageSet] = useState(false);

  const [titleSearch, setTitleSearch] = useState<string>("");

  const navigate = useNavigate();
  const myRef = useRef<HTMLDivElement | null>(null);

  // ===== Scroll to top button =====
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;
      setShowButton(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backToTop = () => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  // ===== Load categories =====
  useEffect(() => {
    let alive = true;
    (async () => {
      setIsLoadingCategory(true);
      try {
        const res = await api.get<ApiResponse<CategoryItem[]>>("/categories");
        if (!alive) return;
        const list = res.data?.payload ?? [];
        setCategory(list);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        if (alive) setIsLoadingCategory(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // ===== Sync `page` with URL search params =====
  useEffect(() => {
    const p = parseInt(searchParams.get("page") || "1", 10);
    setPage(p);
    setIsPageSet(true);
  }, [searchParams]);

  // ===== Load courses whenever page changes =====
  useEffect(() => {
    if (!isPageSet) return;

    let alive = true;
    (async () => {
      setIsLoading(true);
      try {
        if (window.screen.width > 720) {
          backToTop();
        }

        // Backend pages are 0-based, UI is 1-based
        const res = await api.get<ApiResponse<CourseItem[]>>("/courses", {
          params: { page: page - 1, size: 9 }, // adjust size as you wish
        });

        if (!alive) return;

        const list = res.data?.payload ?? [];
        setCourseList(list);

        const tp = res.data?.metadata?.pagination?.totalPages ?? 0;
        setTotalPages(tp);
      } catch (err) {
        console.error("Failed to load courses:", err);
        setCourseList([]);
        setTotalPages(0);
      } finally {
        if (alive) setIsLoading(false);
        setIsPageSet(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [page, isPageSet]);

  // ===== Handlers =====
  const handlePaging = (_: React.ChangeEvent<unknown>, pageNumber: number) => {
    setSearchParams({ page: String(pageNumber) });
  };

  const handleOutlineInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleSearch(e.target.value);
  };

  const handleSearchKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };

  const handleSearchButtonClick = () => {
    navigate(`/course/search?title=${encodeURIComponent(titleSearch)}`);
  };

  return (
    <div className="w-full" ref={myRef}>
      <div className="bg-course-banner h-96 relative">
        <div className="h-full pt-32 bg-purple-900 opacity-80 text-center flex items-center">
          <p className="text-white m-auto font-bold text-4xl">Our Course</p>
        </div>
      </div>

      <div className="border-t-[1px] border-b-[1px]">
        <div className="flex gap-1 items-center p-4 text-sm max-w-[500px] md:max-w-[1180px] mx-auto">
          <Link to={"/"}>Home</Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <p>Our Course</p>
        </div>
      </div>

      <div className="md:flex md:gap-8 p-4 max-w-[500px] md:max-w-[1180px] mx-auto mt-16 mb-12">
        {/* Left panel */}
        <div className="h-full md:w-1/4 w-full space-y-12">
          <div className="w-full flex gap-1">
            <OutlinedInput
              fullWidth
              sx={{
                "& input": {
                  paddingTop: "7px",
                  paddingBottom: "7px",
                },
                borderRight: 0,
              }}
              onChange={handleOutlineInputChange}
              value={titleSearch}
              onKeyUp={handleSearchKeyUp}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f7b204",
                color: "#000",
                padding: "1px",
                "&:hover": {
                  backgroundColor: "#4c1864",
                  color: "#fff",
                },
              }}
              onClick={handleSearchButtonClick}
            >
              <SearchIcon />
            </Button>
          </div>

          <div className="space-y-3">
            <h5 className="text-[17px] font-semibold">ALL COURSES</h5>
            {isLoadingCategory ? <p>Loading...</p> : <Category category={category} />}
          </div>

          <div className="min-w-full">
            <Link to={"/course/search?minPrice=0&maxPrice=0"}>
              <img src={AdvImg} alt="adv image" className="max-w-full m-auto h-auto" />
            </Link>
          </div>

          <div>
            <h4 className="font-semibold text-lg">RECENT COURSES</h4>
            <BriefCourseCard title={"Introduction Educhamp"} oldPrice={190} newPrice={120} amountReview={3} />
            <BriefCourseCard title={"English For Tommorow"} oldPrice={"free"} newPrice={"free"} amountReview={7} />
          </div>
        </div>

        {/* Right panel */}
        <div className="w-full md:w-3/4 space-y-8 mt-20 md:mt-0">
          {!isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full pt-7">
              {courseList.map((course) => (
                <CourseCard
                  key={course.courseId}
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
              ))}
            </div>
          ) : (
            <div className="text-center">
              <CircularProgress />
            </div>
          )}

          <div className="w-fit mx-auto">
            <Pagination
              variant="outlined"
              shape="rounded"
              // MUI `color` prop is enum; style via `sx` instead
              sx={{
                "& .MuiPaginationItem-root": {
                  borderColor: "#4c1864",
                },
                "& .Mui-selected": {
                  backgroundColor: "#4c1864 !important",
                  color: "#fff",
                },
              }}
              count={totalPages || 0}
              onChange={handlePaging}
              siblingCount={1}
              size="large"
              page={page}
            />
          </div>
        </div>
      </div>

      <div className={`w-full group ${showButton ? "visible" : "invisible"}`}>
        <button
          onClick={backToTop}
          className="w-10 h-10 fixed bottom-4 right-4 rounded bg-[#f7b204] hover:bg-[#4c1864] z-50 p-2"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 group-hover:text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OurCourse;
