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
    <Card className='flex flex-row gap-0 py-0 overflow-clip hover:bg-accent/10 transition-colors duration-50 ease-in-out'>
      <div className='w-2/5'>
        <img src={picture} alt="recent course image" className='w-full h-full object-cover' />
      </div>
      <CardContent className='w-full flex flex-col gap-1 pl-3 pr-2 py-2'>
        <h1 className='font-black text-sm leading-tight'>{title}</h1>
        <span className='text-gray-600 text-xs'>{amountReview < 10 ? '0' + amountReview : amountReview} Review</span>
        <div className='flex items-center gap-1'>
          <del className='text-xs text-gray-700 font-medium'>${oldPrice}</del>
          <span className='font-semibold text-sm'>{typeof newPrice === 'number' ? `$${newPrice}` : newPrice}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default BriefCourseCard
