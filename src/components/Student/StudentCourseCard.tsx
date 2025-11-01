import StarIcon from '@mui/icons-material/Star'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { useEffect, useState } from 'react'
import convertScoreToListStar from '@/utils/convertScoreToListStar'
import avatarIcon from '@/assets/courses/default_avatar.jpg'
import { Link } from 'react-router-dom'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'

// Define the Enrollment type based on your second code block
interface Enrollment {
  progress: number;
  enrollmentDate: string; // Or Date
  course: {
    courseId: string;
    courseThumbnail: string;
    title: string;
    price: number;
    instructor: {
      name: string;
      profileImage?: string | null;
    };
    category: {
      name: string;
    };
    description?: string;
    score?: number | null;
    amountReview?: number;
    oldPrice?: number | null;
  };
}

// Update the props to accept the 'enrollment' object and the handler
interface CourseCardProps {
  enrollment: Enrollment;
  handleStudyBtn: (id: string) => void; // New prop for the button
}

// A simple component for the progress bar
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className='w-full'>
    <div className='flex justify-between text-xs text-gray-600 mb-1'>
      <span>Progress</span>
      <span>{progress}%</span>
    </div>
    <div className='w-full bg-gray-200 rounded-full h-2'>
      <div
        className='bg-teal-600 h-2 rounded-full'
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);


const StudentCourseCard = ({ enrollment, handleStudyBtn }: CourseCardProps) => {
  const [listStar, setListStar] = useState([0, 0, 0, 0, 0])

  // Extract data from the enrollment prop
  const { course, progress, enrollmentDate } = enrollment;

  // Get data for the card
  const courseId = course.courseId;
  const title = course.title;
  const category = course.category.name;
  const thumbnail = course.courseThumbnail;
  const description = course.description || 'No description available.';
  const instructorName = course.instructor.name;
  const score = course.score || null;
  const amountReview = course.amountReview || 0;
  const instructorImage = course.instructor.profileImage || null;

  useEffect(() => {
    setListStar(convertScoreToListStar(score))
  }, [score]);

  return (
    // The card is still a Link to the course details page
    // <Link to={'/course/' + courseId} className='flex max-w-md'>
      <Card className='pt-0 pb-6 overflow-clip hover:bg-accent/10 transition-colors duration-50 ease-in-out w-full'> {/* Added w-full */}
        <div className='flex flex-col flex-1 gap-2'>
          <CardHeader className='px-0'>
            <img src={thumbnail} className='aspect-3/2 object-contain object-center rounded-t-md' />
            <div className='px-6 mt-3 w-full overflow-hidden'>
              <p className='flex gap-4 justify-between items-baseline text-xl font-semibold text-ellipsis'>
                {title}
                <Badge>{category}</Badge>
              </p>

              {amountReview > 0 && (
                <div className='flex mt-2 items-center'>
                  {listStar.map((n, index) => n === 1 ? <StarIcon key={index} sx={{ color: '#f7b204' }} fontSize='small' /> : n === 0 ? <StarOutlineIcon key={index} sx={{ color: '#f7b204' }} fontSize='small' /> : <StarHalfIcon key={index} sx={{ color: '#f7b204' }} fontSize='small' />)}
                  <p className='ml-1 text-gray-800 text-opacity-80'>({amountReview})</p>
                </div>
              )}
            </div>
          </CardHeader>

          {/* Replaced Lorem Ipsum with Progress Bar */}
          <CardContent className='flex flex-col gap-4 px-6'>
            <ProgressBar progress={progress} />
            <p className='text-sm text-gray-600'>{description}</p>
          </CardContent>

        </div>

        {/* Updated CardFooter with Enrolled Date and Button */}
        <CardFooter className='flex flex-col gap-3 items-start px-6 w-full'>
          <div className='flex items-center gap-2'>
            <img src={instructorImage || avatarIcon} alt="avatar icon" className='w-8 rounded-full border-2 border-gray-600 border-opacity-45' />
            <p className='text-sm font-normal text-gray-700 text-opacity-75'>by <span className='font-semibold'>{instructorName}</span></p>
          </div>

          <div className='text-xs text-gray-500 w-full'>
            Enrolled: {new Date(enrollmentDate).toLocaleDateString()}
          </div>

          <button
            className='text-sm px-3 py-2 rounded-full w-full border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white cursor-pointer z-10 relative'
            data-testid="study-btn"
            onClick={(e) => {
              // *** IMPORTANT ***
              // This stops the click from navigating to the course page
              e.preventDefault();
              e.stopPropagation();
              handleStudyBtn(courseId);
            }}
          >
            Enter Class
          </button>
        </CardFooter>
      </Card>
    // </Link>
  )
}

export default StudentCourseCard;