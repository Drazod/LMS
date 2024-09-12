import CourseCard from "@/components/OurCourse/CourseCard"
import BriefCourseCard from "@/components/OurCourse/BriefCourseCard"
import Category from "@/components/OurCourse/Category"
import AdvImg from '@/assets/courses/adv.jpg'
import OutlinedInput from '@mui/material/OutlinedInput'
import Pagination from '@mui/material/Pagination'
import { useEffect, useRef, useState } from 'react'
import { getCourse, getCategory } from "@/apis/OurCourse"
import CircularProgress from "@mui/material/CircularProgress"
import { useSearchParams } from "react-router-dom"
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


const OurCourse = () => {
  const [courseList, setCourseList] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCategory, setIsLoadingCategory] = useState(false)
  const myRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1)
  const [isPageSet, setIsPageSet] = useState(false)
  const [category, setCategory] = useState([])
  
  const [titleSearch, setTitleSearch] = useState('')
  const navigate = useNavigate()


  const handleScroll = () => {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }

  const backToTop = () => {
    document.documentElement.style.scrollBehavior = "smooth"
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  useEffect(() => {
    const getData = async () => {
      setIsLoadingCategory(true)
      await getCategory().then(res => {
        setCategory(res.data.payload)
      }) 

      setIsLoadingCategory(false)
    }

    getData()
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  useEffect(() => {
    console.log('get params: ', (searchParams.get('page') || 1))
    setPage(parseInt(searchParams.get('page')) || 1)
    setIsPageSet(true)
    // console.log('change search params: ', typeof page)
  }, [searchParams])

  useEffect(() => {
    const getData = async () => {
        setIsLoading(true)
        if (window.screen.width > 720) {
          backToTop()
        }

        await getCourse(page - 1).then(res => {
          setCourseList(res.data?.payload)
          setTotalPages(res.data?.metadata.pagination.totalPages)
        })
        
        setIsLoading(false)
    }

    if(isPageSet) {
      getData()
      setIsPageSet(false)
    }

  }, [page, isPageSet])

  const handlePaging = ( _, pageNumber ) => {
    setSearchParams({'page': pageNumber})
  }

  const handleOutlineInputChange = (e) => {
    setTitleSearch(e.target.value)
  }

  const handleSearchButtonClick = () => {
    navigate(`search?title=${titleSearch}`)
  }

  return (
    <div className="w-full" ref={myRef}>
      <div className="bg-course-banner h-96 relative">
        <div className="h-full pt-32 bg-purple-900 opacity-80 text-center flex items-center">
          <p className="text-white m-auto font-bold text-4xl">Our Course</p>
        </div>
      </div>
      <div className="border-t-[1px] border-b-[1px]">
        <div className="flex gap-1 items-center p-4 text-sm max-w-[500px] md:max-w-[1180px] mx-auto">
          <Link to={'/'}>Home</Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
          <p>Our Course</p>
        </div>
      </div>
      <div className="md:flex md:gap-8 p-4 max-w-[500px] md:max-w-[1180px] mx-auto mt-16 mb-12">
        <div className="h-full md:w-1/4 w-full space-y-12">
          <div className="w-full flex gap-1">
            <OutlinedInput
              fullWidth={true}
              sx={{
                '& input': {
                paddingY: '7px'
              },
              borderRight: '0px'
              }}
              onChange={handleOutlineInputChange}
              value={titleSearch}
              onKeyUp={(e) => {
                if(e.key == 'Enter') {
                  handleSearchButtonClick()
                }
              }}
            />
            <Button variant="contained"
              sx={{
                backgroundColor: '#f7b204',
                color: '#000',
                padding: '1px',
                '&:hover': {
                  backgroundColor: '#4c1864',
                  color: '#fff'
                }
              }}

              onClick={handleSearchButtonClick}
            >
              <SearchIcon />
            </Button>
          </div>
          <div className="space-y-3">
            <h5 className="text-[17px] font-semibold">ALL COURSES</h5>
            { isLoadingCategory ? <p>Loading...</p> : <Category category={category} />}
          </div>
          <div className="min-w-full">
            <Link to={'/course/search?minPrice=0&maxPrice=0'}>
              <img
                src={AdvImg}
                alt="adv image"
                className="max-w-full m-auto h-auto"
              />
            </Link>
          </div>
          <div>
            <h4 className="font-semibold text-lg">RECENT COURSES</h4>
            <BriefCourseCard
              title={"Introduction Educhamp"}
              oldPrice={190}
              newPrice={120}
              amountReview={3}
            />
            <BriefCourseCard
              title={"English For Tommorow"}
              oldPrice={"free"}
              newPrice={"free"}
              amountReview={7}
            />
          </div>
        </div>
        <div className="w-full md:w-3/4 space-y-8 mt-20 md:mt-0">
          { !isLoading ? (
            <div className=' grid sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full pt-7'>
              { courseList.map(course => <CourseCard key={course.courseId} courseId={course.courseId} instructorName={course.instructor.name} instructorImage={course.instructor.avtUrl} thumbnail={course.courseThumbnail} score={course.avgRating} title={course.title} category={course.categoryName} amountReview={course.totalReviews} oldPrice={course.prePrice} newPrice={course.aftPrice}  />) }
            </div>
            ) : <div className="text-center"><CircularProgress /></div>
          }
          <div className="w-fit mx-auto">
            <Pagination
              variant="outline"
              shape="rounded"
              color="#4c1864"
              count={totalPages || 0}
              onChange={handlePaging}
              siblingCount={1}
              size="large"
              page={page}
            />
          </div>
        </div>
      </div>
      <div className={`w-full group ${showButton ? 'visible' : 'invisible'}`} >
        <button onClick={backToTop} className="w-10 h-10 fixed bottom-4 right-4 rounded bg-[#f7b204] hover:bg-[#4c1864] z-50 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 group-hover:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OurCourse;
