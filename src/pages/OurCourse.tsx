import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CourseCard from "@/components/OurCourse/CourseCard";
import BriefCourseCard from "@/components/OurCourse/BriefCourseCard";
import Category from "@/components/OurCourse/Category";
import AdvImg from "@/assets/courses/adv.jpg";
import api from "@/lib/api";

// ===== Types (aligned with new API response structure) =====
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

type CategoryItem = {
  categoryId: number;
  categoryName: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const recentCourses = [
  {
    title: "Introduction to EduChamp",
    oldPrice: 199,
    newPrice: 159,
    amountReview: 100,
  },
  {
    title: "English for a Better Tomorrow",
    oldPrice: 99,
    newPrice: "Free",
    amountReview: 200,
  },
];

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
        
        // Handle new API response structure and map to expected format
        const categoriesData = res.data?.data;
        if (Array.isArray(categoriesData)) {
          // Map the API response to match Category component expectations
          const mappedCategories = categoriesData.map((cat: any) => ({
            categoryId: cat.categoryId,
            categoryName: cat.name // Map 'name' to 'categoryName'
          }));
          setCategory(mappedCategories);
        } else {
          console.error("Expected categories array but got:", categoriesData);
          setCategory([]);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
        setCategory([]);
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

        // API call with pagination support
        const res = await api.get<ApiResponse<CourseItem[]>>(`/courses?page=${page}&size=10`);

        if (!alive) return;

        // Handle new API response structure
        const coursesData = res.data?.data;
        if (Array.isArray(coursesData)) {
          setCourseList(coursesData);
        } else {
          console.error("Expected courses array but got:", coursesData);
          setCourseList([]);
        }

        const totalPages = res.data?.pagination?.totalPages ?? 1;
        setTotalPages(totalPages);
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
          <p className="text-white m-auto font-bold text-7xl">Our Course</p>
        </div>
      </div>

      <div className="container mx-auto md:flex md:gap-8 p-14">
        {/* Left panel */}
        <div className="h-full md:w-1/5 w-full space-y-12">
          <div className="w-full flex items-center gap-2">
            <Input
              placeholder="Search courses..."
              value={titleSearch}
              onChange={handleOutlineInputChange}
              onKeyUp={handleSearchKeyUp} />
            <Button
              variant="secondary" className="size-9"
              onClick={handleSearchButtonClick}
            >
              <MagnifyingGlassIcon className="!size-6" weight="duotone" />
            </Button>
          </div>

          <div className="space-y-3">
            <h5 className="text-[17px] font-semibold">ALL COURSES</h5>
            {isLoadingCategory ? (
              <div className="flex items-center justify-center py-4">
                <CircularProgress size={20} />
                <span className="ml-2 text-sm text-gray-500">Loading categories...</span>
              </div>
            ) : (
              <Category category={category} />
            )}
          </div>

          <div className="min-w-full">
            <Link to={"/course/search?minPrice=0&maxPrice=0"}>
              <img src={AdvImg} alt="adv image" className="max-w-full m-auto h-auto" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-lg">RECENT COURSES</h4>
            <div className="flex flex-col gap-3">
              {recentCourses.map((course, index) => (
                <BriefCourseCard 
                  key={index}
                  title={course.title} 
                  oldPrice={course.oldPrice} 
                  newPrice={course.newPrice} 
                  amountReview={course.amountReview} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-full space-y-8 mt-20 md:mt-0">
          {isLoading ? (
            <div className="text-center py-20">
              <CircularProgress />
              <p className="mt-4 text-gray-500">Loading courses...</p>
            </div>
          ) : courseList.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
              {courseList.map((course) => (
                <CourseCard
                  key={course.courseId}
                  courseId={parseInt(course.courseId)}
                  instructorName={course.instructor?.name}
                  instructorImage="" // API doesn't provide instructor image
                  thumbnail={course.courseThumbnail}
                  score={course.avgRating}
                  title={course.title}
                  category={course.category?.name}
                  amountReview={parseInt(course.totalRating)}
                  oldPrice={null} // API doesn't provide separate old price
                  newPrice={course.price}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No courses found.</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or browse all categories.</p>
            </div>
          )}

          {totalPages > 1 && (
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
                count={totalPages}
                onChange={handlePaging}
                siblingCount={1}
                size="large"
                page={page}
              />
            </div>
          )}
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
