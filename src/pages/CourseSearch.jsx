import CourseCard from "@/components/OurCourse/CourseCard"
import Pagination from '@mui/material/Pagination'
import { useEffect, useRef, useState } from 'react'
import { searchCourse } from "@/apis/OurCourse"
import CircularProgress from "@mui/material/CircularProgress"
import { useSearchParams } from "react-router-dom"
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import CategorySearch from "@/components/OurCourse/CategorySearch"
import InstructorSearch from "@/components/OurCourse/InstructorSearch"

import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { Link } from "react-router-dom"


const CourseSearch = () => {
  const [courseList, setCourseList] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // loading courses
  const myRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1)
  const [isPageSet, setIsPageSet] = useState(false)
  const [isTrustPriceRange, setIsTrustPriceRange] = useState(true)

  const [titleSearch, setTitleSearch] = useState(searchParams.get('title') || '')
  const [instructorSearch, setInstructorSearch] = useState(searchParams.get('instructor'))
  const [categorySearch, setCategorySearch] = useState(searchParams.get('category'))
  const [minPriceSearch, setMinPriceSearch] = useState(searchParams.get('minPrice') || '')
  const [maxPriceSearch, setMaxPriceSearch] = useState(searchParams.get('maxPrice') || '')
  const [selectedSortingCheckbox, setSelectedSortingCheckbox] = useState('0')
  const [sort, setSort] = useState(null)
  const [direction, setDirection] = useState(null)



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
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  useEffect(() => {
    setPage(parseInt(searchParams.get('page')) || 1)
    setIsPageSet(true)
  }, [searchParams])

  useEffect(() => {

  }, [])

  useEffect(() => {
    const getData = async () => {
        setIsLoading(true)
        if (window.screen.width > 720) {
          backToTop()
        }

        await searchCourse(page - 1,instructorSearch, categorySearch, titleSearch, minPriceSearch, maxPriceSearch, sort, direction).then(res => {
          setCourseList(res.data?.payload)
          setTotalPages(res.data?.metadata.pagination.totalPages)
        }).catch(error => {
          setCourseList([])
          setTotalPages(0)
        })
        
        setIsLoading(false)
    }

    if(isPageSet) {
      getData()
      setIsPageSet(false)
    }

  }, [page, isPageSet])

  const handlePaging = ( _, pageNumber ) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', pageNumber)
    setSearchParams(newParams)
    setPage(pageNumber)
  }

  const handleTitleSearchChange = (e) => {
    setTitleSearch(e.target.value)
  }

  const handleTitleSearchButton = () => {
    const newParams = new URLSearchParams(searchParams)
    if(titleSearch === '' || titleSearch === null) {
      newParams.delete('title')
      newParams.delete('page')
      setPage(1)
      setTitleSearch('')

      setSearchParams(newParams)
    } else {
      newParams.delete('page')
      setPage(1)
      newParams.set('title', titleSearch)

      setSearchParams(newParams)
    }
  }

  const categorySearchCallback = (value) => {
    const newParams = new URLSearchParams(searchParams)
    if(value === null) {
      newParams.delete('category')
      newParams.delete('page')
      setPage(1)

      setSearchParams(newParams)
      setCategorySearch(value)
    } else {
      newParams.delete('page')
      setPage(1)
      newParams.set('category', value)

      setSearchParams(newParams)
      setCategorySearch(value)
    }
  }

  const instructorSearchCallback = (value) => {
    const newParams = new URLSearchParams(searchParams)
    if(value === null) {
      newParams.delete('instructor')
      newParams.delete('page')
      setPage(1)

      setSearchParams(newParams)
      setInstructorSearch(value)
    } else {
      newParams.delete('page')
      newParams.set('instructor', value)

      setSearchParams(newParams)
      setInstructorSearch(value)
    }
  }

  const handleSortingCheckboxChange = (e) => {
    if(e.target.value != selectedSortingCheckbox) {
      setSelectedSortingCheckbox(e.target.value)
    } else {
      setSelectedSortingCheckbox('0')
    }
  }

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams)
    if(selectedSortingCheckbox === '0') {
      newParams.delete('sort')
      newParams.delete('dir')
      newParams.delete('page')
      setPage(1)
      setSort(null)
      setDirection(null)
      setSearchParams(newParams)
    }

    if(selectedSortingCheckbox === '1') {
      newParams.set('sort', 'title')
      newParams.set('dir', 'asc')
      newParams.delete('page')
      setPage(1)
      setSort('title')
      setDirection('asc')
      setSearchParams(newParams)
    }

    if(selectedSortingCheckbox === '2') {
      newParams.set('sort', 'title')
      newParams.set('dir', 'desc')
      newParams.delete('page')
      setPage(1)
      setSort('title')
      setDirection('desc')
      setSearchParams(newParams)
    }

    if(selectedSortingCheckbox === '3') {
      newParams.set('sort', 'price')
      newParams.set('dir', 'asc')
      newParams.delete('page')
      setPage(1)
      setSort('price')
      setDirection('asc')
      setSearchParams(newParams)
    }

    if(selectedSortingCheckbox === '4') {
      newParams.set('sort', 'price')
      newParams.set('dir', 'desc')
      newParams.delete('page')
      setPage(1)
      setSort('price')
      setDirection('desc')
      setSearchParams(newParams)
    }

    if(selectedSortingCheckbox === '5') {
      newParams.set('sort', 'avgRating')
      newParams.set('dir', 'asc')
      newParams.delete('page')
      setPage(1)
      setSort('avgRating')
      setDirection('asc')
      setSearchParams(newParams)
    }

    if(selectedSortingCheckbox === '6') {
      newParams.set('sort', 'avgRating')
      newParams.set('dir', 'desc')
      newParams.delete('page')
      setPage(1)
      setSort('avgRating')
      setDirection('desc')
      setSearchParams(newParams)
    }
  }, [selectedSortingCheckbox])

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
          <Link to={'/course'}>Our Course</Link>
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
          <p>Search</p>
        </div>
      </div>
      <div className="md:flex md:gap-8 p-4 max-w-[500px] md:max-w-[1180px] mx-auto mb-12 mt-10">
        <div className="h-full md:w-1/4 flex md:block">
          <div className="w-full mb-7 space-y-7">
            <p className="text-2xl font-semibold text-[#4c1864]">Filter By</p>
            <div className="w-full flex gap-1">
              <OutlinedInput
                value={titleSearch}
                fullWidth={true}
                sx={{
                  '& input': {
                  paddingY: '7px'
                },
                borderRight: '0px'
                }}
                onChange={handleTitleSearchChange}
                onKeyUp={(e) => {
                  if(e.key == 'Enter') {
                    handleTitleSearchButton()
                  }
                }}
              />
              <Button variant="contained" sx={{
                backgroundColor: '#f7b204',
                color: '#000',
                padding: '1px',
                '&:hover': {
                  backgroundColor: '#4c1864',
                  color: '#fff'
                }
              }}

              onClick={handleTitleSearchButton}
              >
                <SearchIcon />
              </Button>
            </div>
            <div>
              <p className="text-xl font-medium">Category</p>
              <div className="pl-2 space-y-1">
                <CategorySearch selectedCategory={categorySearch} categorySearchCallback={categorySearchCallback}/>
              </div>
            </div>
            <hr />
            <div>
              <p className="text-xl font-medium">Instructor</p>
              <div className="pl-2 space-y-1">
                <InstructorSearch selectedInstructor={instructorSearch} instructorSearchCallback={instructorSearchCallback} />
              </div>
            </div>
            <hr />
            <div className="space-y-2">
              <p className="text-xl font-medium">Price</p>
              <div className="flex gap-2 items-center">
                <OutlinedInput
                  placeholder="Min Price"
                  fullWidth={true}
                  sx={{
                    '& input': {
                    paddingY: '7px'
                  },
                  borderRight: '0px'
                  }}
                  endAdornment={<InputAdornment position="start">₫</InputAdornment>}
                  value={minPriceSearch}
                  type="number"
                  onChange={(e) => setMinPriceSearch(e.target.value)}
                />
                <svg className="size-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 12L21 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <OutlinedInput
                  placeholder="Max Price"
                  fullWidth={true}
                  type="number"
                  sx={{
                    '& input': {
                    paddingY: '7px'
                  },
                  borderRight: '0px'
                  }}
                  endAdornment={<InputAdornment position="start">₫</InputAdornment>}
                  value={maxPriceSearch}
                  onChange={(e) => setMaxPriceSearch(e.target.value)}
                />
              </div>
              <p className={`${isTrustPriceRange ? 'invisible' : 'visible'} text-red-500 text-xs text-center italic`}>Min Price must be less than Max Price</p>
              <Button variant="contained" fullWidth={true} sx={{
                padding: '10px',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#000',
                backgroundColor: '#f7b204',
                '&:hover': {
                  backgroundColor: '#4c1864',
                  color: '#fff'
                }
              }}
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams)
                  if(!minPriceSearch) {
                    setIsTrustPriceRange(true)
                    newParams.delete('minPrice')

                    if(!maxPriceSearch) {
                      newParams.delete('maxPrice')
                      newParams.set('page', 1)
                      setSearchParams(newParams)
                    } else {
                      newParams.set('maxPrice', maxPriceSearch)
                      setSearchParams(newParams)
                      setIsTrustPriceRange(true)
                    }
                  } else {
                    newParams.set('minPrice', minPriceSearch)

                    if(!maxPriceSearch) {
                      newParams.delete('maxPrice')
                      newParams.set('page', 1)
                      setSearchParams(newParams)
                      setIsTrustPriceRange(true)
                    } else if (minPriceSearch <= maxPriceSearch){
                      newParams.set('maxPrice', maxPriceSearch)
                      newParams.set('page', 1)
                      setSearchParams(newParams)
                      setIsTrustPriceRange(true)
                    } else {
                      setIsTrustPriceRange(false)
                    }
                  }
                }}
              >
                Apply
              </Button>
            </div>
            <p className="text-2xl font-semibold text-[#4c1864]">Sort By</p>
            <div>
              <div className="space-x-1">
                <input type="checkbox" name="sortBy" id="title_a-z" value={1} checked={selectedSortingCheckbox === '1'} onChange={handleSortingCheckboxChange} />
                <label htmlFor="title_a-z">Title A-Z</label>
              </div>
              <div className="space-x-1">
                <input type="checkbox" name="sortBy" id="title_z-a" value={2} checked={selectedSortingCheckbox === '2'} onChange={handleSortingCheckboxChange} />
                <label htmlFor="title_z-a">Title Z-A</label>
              </div>
              <div className="space-x-1">
                <input type="checkbox" name="sortBy" id="price-increase" value={3} checked={selectedSortingCheckbox === '3'} onChange={handleSortingCheckboxChange} />
                <label htmlFor="price-increase">Ascending Price</label>
              </div>
              <div className="space-x-1">
                <input type="checkbox" name="sortBy" id="price-decrease" value={4} checked={selectedSortingCheckbox === '4'} onChange={handleSortingCheckboxChange} />
                <label htmlFor="price-decrease">Descending Price</label>
              </div>
              <div className="space-x-1">
                <input type="checkbox" name="sortBy" id="rating-increase" value={5} checked={selectedSortingCheckbox === '5'} onChange={handleSortingCheckboxChange} />
                <label htmlFor="rating-increase">Ascending Rating</label>
              </div>
              <div className="space-x-1">
                <input type="checkbox" name="sortBy" id="rating-decrease" value={6} checked={selectedSortingCheckbox === '6'} onChange={handleSortingCheckboxChange} />
                <label htmlFor="rating-decrease">Descending Rating</label>
              </div>
            </div>
            <div>
              <Button variant="contained" fullWidth={true} sx={{
                padding: '10px',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#000',
                backgroundColor: '#f7b204',
                '&:hover': {
                  backgroundColor: '#4c1864',
                  color: '#fff'
                }
              }}
              onClick={() => {
                setPage(1)
                setIsTrustPriceRange(true)
                setTitleSearch('')
                setInstructorSearch(null)
                setCategorySearch(null)
                setMinPriceSearch('')
                setMaxPriceSearch('')
                setSearchParams(new URLSearchParams())
              }}  
              >
                Remove All
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4 space-y-8 mt-5 md:mt-10">
          { !isLoading ? (<>
              { courseList.length === 0 ? <p className="text-center w-full">Don't have any course</p> :
                <div className=' grid sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full pt-7'>
                  {courseList.map(course => <CourseCard key={course.courseId} courseId={course.courseId}  instructorName={course.instructor.name} instructorImage={course.instructor.avtUrl} thumbnail={course.courseThumbnail} score={course.avgRating} title={course.title} category={course.categoryName} amountReview={course.totalReviews} oldPrice={course.prePrice} newPrice={course.aftPrice} />)}
                </div>
              }
              </>
            ) : <div className="text-center"><CircularProgress /></div>
          }
          <div className="w-fit mx-auto">
            <Pagination
              variant="outline"
              shape="rounded"
              color="#4c1864"
              count={totalPages}
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

export default CourseSearch;
