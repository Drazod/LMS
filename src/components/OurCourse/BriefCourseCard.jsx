import picture from '@/assets/courses/slide1.jpg'

const BriefCourseCard = ({ title, oldPrice, newPrice, amountReview }) => {
  return (
    <div className='flex my-4 gap-4'>
      <div>
        <img src={picture} alt="recent course image" className='w-[80px] h-16 object-cover' />
      </div>
      <div>
        <h5 className='font-semibold text-sm'>{title}</h5>
        <div className='flex items-center gap-1'>
          <del className='text-xs text-gray-700 font-medium'>${oldPrice}</del>
          <span className='font-semibold text-sm'>${newPrice}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-gray-400 rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
          <span className='text-gray-600 text-sm'>{amountReview < 10 ? '0' + amountReview : amountReview} Review</span>
        </div>
      </div>
    </div>
  )
}

export default BriefCourseCard
