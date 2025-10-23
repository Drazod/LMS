import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import CourseCard from "@/components/OurCourse/CourseCard";
import CategorySearch from "@/components/OurCourse/CategorySearch";
import InstructorSearch from "@/components/OurCourse/InstructorSearch";
import { searchCourse } from "@/apis/OurCourse";

// ——— Types —————————————————————————————————
type Instructor = {
  name: string;
  avtUrl?: string;
};

type CourseItem = {
  courseId: number;
  instructor: Instructor;
  courseThumbnail?: string;
  avgRating?: number;
  title: string;
  categoryName?: string;
  totalReviews?: number;
  prePrice?: number;
  aftPrice?: number;
};

type SearchCourseResponse = {
  data?: {
    payload?: CourseItem[];
    metadata?: {
      pagination?: {
        totalPages?: number;
      };
    };
  };
};

// ——— Component ————————————————————————————————
const CourseSearch: React.FC = () => {
  const [courseList, setCourseList] = useState<CourseItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // loading courses

  const myRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number.parseInt(searchParams.get("page") || "1", 10) || 1;
  const [page, setPage] = useState<number>(initialPage);
  const [isPageSet, setIsPageSet] = useState<boolean>(false);
  const [isTrustPriceRange, setIsTrustPriceRange] = useState<boolean>(true);

  const [titleSearch, setTitleSearch] = useState<string>(searchParams.get("title") || "");
  const [instructorSearch, setInstructorSearch] = useState<string | null>(searchParams.get("instructor"));
  const [categorySearch, setCategorySearch] = useState<string | null>(searchParams.get("category"));
  const [minPriceSearch, setMinPriceSearch] = useState<string>(searchParams.get("minPrice") || "");
  const [maxPriceSearch, setMaxPriceSearch] = useState<string>(searchParams.get("maxPrice") || "");
  const [selectedSortingCheckbox, setSelectedSortingCheckbox] = useState<string>("0");
  const [sort, setSort] = useState<string | null>(null);
  const [direction, setDirection] = useState<"asc" | "desc" | null>(null);

  // ——— Scroll to top button ——————————————————
  const handleScroll = () => {
    const scrolled =
      document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;
    setShowButton(scrolled);
  };

  const backToTop = () => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync `page` from URL
  useEffect(() => {
    setPage(Number.parseInt(searchParams.get("page") || "1", 10) || 1);
    setIsPageSet(true);
  }, [searchParams]);

  // Fetch data
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      if (window.screen.width > 720) {
        backToTop();
      }

      try {
        const res: SearchCourseResponse = await searchCourse(
          page - 1,
          instructorSearch,
          categorySearch,
          titleSearch,
          minPriceSearch,
          maxPriceSearch,
          sort,
          direction
        );

        setCourseList(res.data?.payload ?? []);
        setTotalPages(res.data?.metadata?.pagination?.totalPages ?? 0);
      } catch {
        setCourseList([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    if (isPageSet) {
      void getData();
      setIsPageSet(false);
    }
  }, [
    page,
    isPageSet,
    instructorSearch,
    categorySearch,
    titleSearch,
    minPriceSearch,
    maxPriceSearch,
    sort,
    direction,
  ]);

  // ——— Handlers ————————————————————————————————
  const handlePaging = (_: ChangeEvent<unknown>, pageNumber: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(pageNumber));
    setSearchParams(newParams);
    setPage(pageNumber);
  };

  const handleTitleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleSearch(e.target.value);
  };

  const handleTitleSearchButton = () => {
    const newParams = new URLSearchParams(searchParams);
    if (!titleSearch) {
      newParams.delete("title");
      newParams.delete("page");
      setPage(1);
      setTitleSearch("");
      setSearchParams(newParams);
    } else {
      newParams.delete("page");
      newParams.set("title", titleSearch);
      setPage(1);
      setSearchParams(newParams);
    }
  };

  const categorySearchCallback = (value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("page");
    setPage(1);

    if (value === null) {
      newParams.delete("category");
    } else {
      newParams.set("category", value);
    }

    setSearchParams(newParams);
    setCategorySearch(value);
  };

  const instructorSearchCallback = (value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("page");
    setPage(1);

    if (value === null) {
      newParams.delete("instructor");
    } else {
      newParams.set("instructor", value);
    }

    setSearchParams(newParams);
    setInstructorSearch(value);
  };

  const handleSortingCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedSortingCheckbox((prev) => (val !== prev ? val : "0"));
  };

  // Apply sort selection to URL/search state
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    const setSortParams = (s: string | null, d: "asc" | "desc" | null) => {
      if (!s || !d) {
        newParams.delete("sort");
        newParams.delete("dir");
        setSort(null);
        setDirection(null);
      } else {
        newParams.set("sort", s);
        newParams.set("dir", d);
        setSort(s);
        setDirection(d);
      }
    };

    newParams.delete("page");
    setPage(1);

    switch (selectedSortingCheckbox) {
      case "0":
        setSortParams(null, null);
        break;
      case "1":
        setSortParams("title", "asc");
        break;
      case "2":
        setSortParams("title", "desc");
        break;
      case "3":
        setSortParams("price", "asc");
        break;
      case "4":
        setSortParams("price", "desc");
        break;
      case "5":
        setSortParams("avgRating", "asc");
        break;
      case "6":
        setSortParams("avgRating", "desc");
        break;
      default:
        setSortParams(null, null);
        break;
    }

    setSearchParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSortingCheckbox]);

  // ——— Render ————————————————————————————————
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
          <Link to={"/course"}>Our Course</Link>
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
          <p>Search</p>
        </div>
      </div>

      <div className="md:flex md:gap-8 p-4 max-w-[500px] md:max-w-[1180px] mx-auto mb-12 mt-10">
        {/* Filters */}
        <div className="h-full md:w-1/4 flex md:block">
          <div className="w-full mb-7 space-y-7">
            <p className="text-2xl font-semibold text-[#4c1864]">Filter By</p>

            {/* Title search */}
            <div className="w-full flex gap-1">
              <OutlinedInput
                value={titleSearch}
                fullWidth
                sx={{
                  "& input": {
                    paddingTop: "7px",
                    paddingBottom: "7px",
                  },
                  borderRight: "0px",
                }}
                onChange={handleTitleSearchChange}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleTitleSearchButton();
                  }
                }}
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
                onClick={handleTitleSearchButton}
              >
                <SearchIcon />
              </Button>
            </div>

            {/* Category */}
            <div>
              <p className="text-xl font-medium">Category</p>
              <div className="pl-2 space-y-1">
                <CategorySearch
                  selectedCategory={categorySearch}
                  categorySearchCallback={categorySearchCallback}
                />
              </div>
            </div>

            <hr />

            {/* Instructor */}
            <div>
              <p className="text-xl font-medium">Instructor</p>
              <div className="pl-2 space-y-1">
                <InstructorSearch
                  selectedInstructor={instructorSearch}
                  instructorSearchCallback={instructorSearchCallback}
                />
              </div>
            </div>

            <hr />

            {/* Price */}
            <div className="space-y-2">
              <p className="text-xl font-medium">Price</p>
              <div className="flex gap-2 items-center">
                <OutlinedInput
                  placeholder="Min Price"
                  fullWidth
                  sx={{
                    "& input": {
                      paddingTop: "7px",
                      paddingBottom: "7px",
                    },
                    borderRight: "0px",
                  }}
                  endAdornment={<InputAdornment position="start">₫</InputAdornment>}
                  value={minPriceSearch}
                  type="number"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setMinPriceSearch(e.target.value)}
                />
                <svg
                  className="size-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 12L21 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <OutlinedInput
                  placeholder="Max Price"
                  fullWidth
                  type="number"
                  sx={{
                    "& input": {
                      paddingTop: "7px",
                      paddingBottom: "7px",
                    },
                    borderRight: "0px",
                  }}
                  endAdornment={<InputAdornment position="start">₫</InputAdornment>}
                  value={maxPriceSearch}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxPriceSearch(e.target.value)}
                />
              </div>

              <p
                className={`${
                  isTrustPriceRange ? "invisible" : "visible"
                } text-red-500 text-xs text-center italic`}
              >
                Min Price must be less than Max Price
              </p>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  padding: "10px",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#000",
                  backgroundColor: "#f7b204",
                  "&:hover": {
                    backgroundColor: "#4c1864",
                    color: "#fff",
                  },
                }}
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);

                  const min = minPriceSearch ? Number(minPriceSearch) : null;
                  const max = maxPriceSearch ? Number(maxPriceSearch) : null;

                  // Clear page for new filter
                  newParams.set("page", "1");
                  setPage(1);

                  // Handle min
                  if (min === null) newParams.delete("minPrice");
                  else newParams.set("minPrice", String(min));

                  // Handle max + validation
                  if (max === null) {
                    newParams.delete("maxPrice");
                    setIsTrustPriceRange(true);
                  } else if (min === null || min <= max) {
                    newParams.set("maxPrice", String(max));
                    setIsTrustPriceRange(true);
                  } else {
                    setIsTrustPriceRange(false);
                    // Don't update URL if invalid
                    return;
                  }

                  setSearchParams(newParams);
                }}
              >
                Apply
              </Button>
            </div>

            {/* Sort */}
            <p className="text-2xl font-semibold text-[#4c1864]">Sort By</p>
            <div>
              <div className="space-x-1">
                <input
                  type="checkbox"
                  name="sortBy"
                  id="title_a-z"
                  value={1}
                  checked={selectedSortingCheckbox === "1"}
                  onChange={handleSortingCheckboxChange}
                />
                <label htmlFor="title_a-z">Title A-Z</label>
              </div>
              <div className="space-x-1">
                <input
                  type="checkbox"
                  name="sortBy"
                  id="title_z-a"
                  value={2}
                  checked={selectedSortingCheckbox === "2"}
                  onChange={handleSortingCheckboxChange}
                />
                <label htmlFor="title_z-a">Title Z-A</label>
              </div>
              <div className="space-x-1">
                <input
                  type="checkbox"
                  name="sortBy"
                  id="price-increase"
                  value={3}
                  checked={selectedSortingCheckbox === "3"}
                  onChange={handleSortingCheckboxChange}
                />
                <label htmlFor="price-increase">Ascending Price</label>
              </div>
              <div className="space-x-1">
                <input
                  type="checkbox"
                  name="sortBy"
                  id="price-decrease"
                  value={4}
                  checked={selectedSortingCheckbox === "4"}
                  onChange={handleSortingCheckboxChange}
                />
                <label htmlFor="price-decrease">Descending Price</label>
              </div>
              <div className="space-x-1">
                <input
                  type="checkbox"
                  name="sortBy"
                  id="rating-increase"
                  value={5}
                  checked={selectedSortingCheckbox === "5"}
                  onChange={handleSortingCheckboxChange}
                />
                <label htmlFor="rating-increase">Ascending Rating</label>
              </div>
              <div className="space-x-1">
                <input
                  type="checkbox"
                  name="sortBy"
                  id="rating-decrease"
                  value={6}
                  checked={selectedSortingCheckbox === "6"}
                  onChange={handleSortingCheckboxChange}
                />
                <label htmlFor="rating-decrease">Descending Rating</label>
              </div>
            </div>

            {/* Remove all */}
            <div>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  padding: "10px",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#000",
                  backgroundColor: "#f7b204",
                  "&:hover": {
                    backgroundColor: "#4c1864",
                    color: "#fff",
                  },
                }}
                onClick={() => {
                  setPage(1);
                  setIsTrustPriceRange(true);
                  setTitleSearch("");
                  setInstructorSearch(null);
                  setCategorySearch(null);
                  setMinPriceSearch("");
                  setMaxPriceSearch("");
                  setSelectedSortingCheckbox("0");
                  setSort(null);
                  setDirection(null);
                  setSearchParams(new URLSearchParams());
                }}
              >
                Remove All
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="w-full md:w-3/4 space-y-8 mt-5 md:mt-10">
          {!isLoading ? (
            <>
              {courseList.length === 0 ? (
                <p className="text-center w-full">Don't have any course</p>
              ) : (
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
              )}
            </>
          ) : (
            <div className="text-center">
              <CircularProgress />
            </div>
          )}

          <div className="w-fit mx-auto">
            <Pagination
              variant="outlined"
              shape="rounded"
              // color prop only accepts palette keys; style via sx instead:
              sx={{
                "& .MuiPaginationItem-root.Mui-selected": {
                  borderColor: "#4c1864",
                  color: "#4c1864",
                },
              }}
              count={totalPages}
              onChange={handlePaging}
              siblingCount={1}
              size="large"
              page={page}
            />
          </div>
        </div>
      </div>

      {/* Back to top */}
      <div className={`w-full group ${showButton ? "visible" : "invisible"}`}>
        <button
          onClick={backToTop}
          className="w-10 h-10 fixed bottom-4 right-4 rounded bg-[#f7b204] hover:bg-[#4c1864] z-50 p-2"
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

export default CourseSearch;
