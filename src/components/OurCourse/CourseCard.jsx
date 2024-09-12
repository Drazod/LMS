import StarIcon from '@mui/icons-material/Star'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { useEffect, useState } from 'react'
import convertScoreToListStar from '@/utils/convertScoreToListStar'
import Tooltip from '@mui/material/Tooltip'
import avatarIcon from '@/assets/courses/default_avatar.jpg'
import { Link } from 'react-router-dom'
import stringToSnakeCase from '@/utils/stringToSnakeCase'

const CourseCard = ({ courseId, title, category, amountReview, oldPrice, newPrice, score, thumbnail, instructorName, instructorImage }) => {
  const [listStar, setListStar] = useState([0, 0, 0, 0, 0])

  useEffect(() => {
    setListStar(convertScoreToListStar(score))
  }, [score])
  return (
    <div className='group h-max w-full row shadow-2xl rounded-md'>
      <div className='h-fit relative overflow-hidden'>
        <img src={thumbnail} className='w-full h-40 object-cover rounded-t-md' />
        <Link to={'/course/' + courseId} className='absolute py-2.5 px-4 bottom-0 bg-[#f7b204] text-sm -left-28 transition-transform duration-500 group-hover:translate-x-28 hover:text-white hover:bg-[#4c1864]'>
          Read More
        </Link>
      </div>
      <div className='p-3'>
        <div className='h-12.5 w-full overflow-hidden'>
          <h5 className='text-[17px] font-semibold text-ellipsis'>
            <Tooltip title={title}>
              <Link to={'/course/' + courseId} >
                {title}
              </Link>
            </Tooltip>
          </h5>
        </div>
        <div className='flex mt-2 items-center'>
          { listStar.map((n, index) => n === 1 ? <StarIcon key={index} sx={{ color: '#f7b204' }} fontSize='small' /> : n === 0 ? <StarOutlineIcon key={index} sx={{ color: '#f7b204' }} fontSize='small' /> : <StarHalfIcon key={index} sx={{ color: '#f7b204' }} fontSize='small' />) }
          <p className='text-gray-800 text-opacity-80'>({amountReview})</p>
        </div>
        <div className='w-full mt-2 mb-2 flex items-end justify-between'>
          <div>
          <div className='mt-2 text-xs text-white'>
            <p className={`text-center py-2 px-3 w-fit rounded-md bg-${stringToSnakeCase(category)}`} >{category}</p>
          </div>
          <div className='flex gap-1 items-center mt-3'>
            <img src={instructorImage || avatarIcon} alt="avatar icon" className='w-8 rounded-full border-2 border-gray-600 border-opacity-45'/>
            <p className='text-sm font-normal text-gray-700 text-opacity-75'>by <span className='font-semibold'>{instructorName}</span></p>
          </div>
          </div>
          <div className='text-right'>
            <del className='invisible font-semibold text-gray-600 text-opacity-70'>{oldPrice.toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</del>
            <h5 className={`text-lg font-semibold ${newPrice != 0 ? 'text-gray-600 text-opacity-70' : 'text-green-800'}`}>{newPrice != 0 ? newPrice.toLocaleString('en-US', { style: 'currency', currency: 'VND' }) : 'Free'}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard