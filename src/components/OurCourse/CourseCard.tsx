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

interface CourseCardProps {
  courseId: number;
  title: string;
  category: string;
  amountReview: number;
  oldPrice: number | "free" | null;
  newPrice: number | "free" | null;
  score: number | null;
  thumbnail: string | null;
  instructorName: string;
  instructorImage: string | null;
}

const CourseCard = ({
  courseId,
  title,
  category,
  amountReview,
  oldPrice,
  newPrice,
  score,
  thumbnail,
  instructorName,
  instructorImage
}: CourseCardProps) => {
  const [listStar, setListStar] = useState([0, 0, 0, 0, 0])

  useEffect(() => {
    setListStar(convertScoreToListStar(score))
  }, [score]);

  return (
    <Link to={'/course/' + courseId} className='flex'>
      <Card className='pt-0 pb-6 overflow-clip hover:bg-accent/10 transition-colors duration-50 ease-in-out'>
        <div className='flex flex-col flex-1 gap-2'>
          <CardHeader className='px-0'>
            <img src={thumbnail} className='aspect-3/2 object-contain object-center rounded-t-md' />
            <div className='px-6 mt-3 w-full overflow-hidden'>
              <p className='flex gap-4 justify-between items-baseline text-xl font-semibold text-ellipsis'>
                {title}
                <Badge>{category}</Badge>
              </p>
              <div className='flex mt-2 items-center'>
                {listStar.map((n, index) => n === 1 ? <StarIcon key={index} sx={{ color: '#f7b204' }} fontSize='small' /> : n === 0 ? <StarOutlineIcon key={index} sx={{ color: '#f7b204' }} fontSize='small' /> : <StarHalfIcon key={index} sx={{ color: '#f7b204' }} fontSize='small' />)}
                <p className='ml-1 text-gray-800 text-opacity-80'>({amountReview})</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aenean luctus et justo vel aliquet. Suspendisse eleifend
              lacus sit amet enim.
            </p>
          </CardContent>
        </div>
        <CardFooter className='flex flex-col gap-4 items-start'>
          <div className='flex items-center gap-2'>
            <img src={instructorImage || avatarIcon} alt="avatar icon" className='w-8 rounded-full border-2 border-gray-600 border-opacity-45' />
            <p className='text-sm font-normal text-gray-700 text-opacity-75'>by <span className='font-semibold'>{instructorName}</span></p>
          </div>
          <div className='flex justify-between gap-2 items-center'>
            <del className='font-semibold text-xs text-gray-600 text-opacity-70'>{oldPrice?.toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</del>
            <h5 className={`text-lg font-semibold ${newPrice != 0 ? 'text-gray-600 text-opacity-70' : 'text-green-800'}`}>{newPrice != 0 ? newPrice?.toLocaleString('en-US', { style: 'currency', currency: 'VND' }) : 'Free'}</h5>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default CourseCard;