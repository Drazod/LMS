import {
  Card,
  CardContent
} from '@/components/ui/card';

import picture from '@/assets/courses/slide1.jpg'

interface BriefCourseCardProps {
  title: string;
  oldPrice: number;
  newPrice: string | number;
  amountReview: number;
}

const BriefCourseCard = ({ title, oldPrice, newPrice, amountReview }: BriefCourseCardProps) => {
  return (
    <Card className='flex overflow-clip'>
      <div className='w-1/3'>
        <img src={picture} alt="recent course image" className='h-full object-cover' />
      </div>
      <CardContent className='px-3.5 py-2'>
        <h1 className='font-black'>{title}</h1>
        <div className='flex items-center gap-1'>
          <del className='text-xs text-gray-700 font-medium'>${oldPrice}</del>
          <span className='font-semibold'>{typeof newPrice === 'number' ? `$${newPrice}` : newPrice}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-gray-400 rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
          <span className='text-gray-600 text-sm'>{amountReview < 10 ? '0' + amountReview : amountReview} Review</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default BriefCourseCard
