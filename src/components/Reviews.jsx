const Reviews = ({course}) => {
    return (
<div class="" id="reviews">
    <h4 className="mt-10 mb-5 text-xl md:text-2xl font-semibold">Reviews</h4>

    <div class="flex items-center border-black/10 border-[1px] px-5 py-5 mb-8 ">
        <div class="w-1/4 text-center me-3 border-black/10 border-[1px] px-3 py-3">
            <h2 className="text-2xl md:text-4xl">{course.avgRating !== null ? course.avgRating : 0}</h2>
            <ul class="list-none m-0 p-0">
                <li class="inline-block text-yellow-700 text-[10px] md:text-[13px] ">★</li>
                <li class="inline-block text-yellow-700 text-[10px] md:text-[13px] ">★</li>
                <li class="inline-block text-yellow-700 text-[10px] md:text-[13px] ">★</li>
                <li class="inline-block text-gray-400 text-[10px] md:text-[13px]">★</li>
                <li class="inline-block text-gray-400 text-[10px] md:text-[13px]">★</li>
            </ul>
            <span className="text-xs md:text-lg">{course.totalRating} Rating</span>
        </div>
        <div className="w-3/4">
            <div className="my-1 flex w-full items-center text-xs font-normal text-black">
                <div className="w-1/5 md:w-1/12">
                    <div className="text-xs">5 star</div>
                </div>
                <div className=" w-4/5">
                    <div className="w-full bg-gray-200 dark:bg-purple-900 h-4">
                        <div className="bg-purple-900 h-4" style={{ width: '90%' }}></div>
                    </div>
                </div>
                <div class="text-right w-1/12">
                    <div>{course.ratingDetailDTO.fiveStar}</div>
                </div>
            </div>
            <div className="my-1 flex w-full items-center text-xs font-normal text-black">
                <div className="w-1/5 md:w-1/12">
                    <div>4 star</div>
                </div>
                <div className="w-4/5">
                    <div className="w-full bg-gray-200 dark:bg-purple-900 h-4">
                        <div className="bg-purple-900 h-4" style={{ width: '70%' }}></div>
                    </div>
                </div>
                <div class="text-right w-1/12">
                    <div>{course.ratingDetailDTO.fourStar}</div>
                </div>
            </div>
            <div className="my-1 flex w-full items-center text-xs font-normal text-black">
                <div className="w-1/5 md:w-1/12">
                    <div>3 star</div>
                </div>
                <div className="w-4/5">
                    <div className="w-full bg-gray-200 dark:bg-purple-900 h-4">
                        <div className="bg-purple-900 h-4" style={{ width: '50%' }}></div>
                    </div>
                </div>
                <div class="text-right w-1/12">
                    <div>{course.ratingDetailDTO.threeStar}</div>
                </div>
            </div>
            <div className="my-1 flex w-full items-center text-xs font-normal text-black">
                <div className="w-1/5 md:w-1/12">
                    <div>2 star</div>
                </div>
                <div className="w-4/5">
                    <div className="w-full bg-gray-200 dark:bg-purple-900 h-4">
                        <div className="bg-purple-900 h-4" style={{ width: '40%' }}></div>
                    </div>
                </div>
                <div class="text-right w-1/12">
                    <div>{course.ratingDetailDTO.twoStar}</div>
                </div>
            </div>
            <div className="my-1 flex w-full items-center text-xs font-normal text-black">
                <div className="w-1/5 md:w-1/12">
                    <div>1 star</div>
                </div>
                <div className="w-4/5">
                    <div className="w-full bg-gray-200 dark:bg-purple-900 h-4">
                        <div className="bg-purple-900 h-4" style={{ width: '20%' }}></div>
                    </div>
                </div>
                <div class="text-right w-1/12">
                    <div>{course.ratingDetailDTO.oneStar}</div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default Reviews;