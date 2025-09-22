import BuyNowButton from "@/components/BuyNowButton";
import {
	Card,
	CardHeader,
	CardFooter,
	CardContent
} from "@/components/ui/card";

type CourseDetail = {
	courseId: number;
	title: string;
	description: string;
	price: number;
	instructor: {
		firstName: string;
		lastName: string;
		avtUrl?: string;
	};
	category: {
		categoryName: string;
	};
	totalReviews: number;
};

const CourseDetailBox = ({ course, courseId }: { course: CourseDetail; courseId: number }) => {
	return (
		<Card>
			<CardHeader className="space-y-2">
				<p className="text-center text-4xl font-bold">{course.price.toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</p>
				<BuyNowButton courseId={courseId} />
			</CardHeader>
			<CardContent className="flex items-center flex-col">
				<div className='flex items-center gap-4'>
					<img src={course.instructor.avtUrl || ""} alt="Instructor Avatar" className="w-12 h-12 rounded-full object-cover" />
					<div className='flex flex-col gap-0.5'>
						<h5>{course.instructor.firstName} {course.instructor.lastName}</h5>
						<span className='text-xs text-gray-600'>{course.category.categoryName} Teacher</span>
					</div>
				</div>
				<div className="flex w-full flex-row justify-between mt-6">
					<div className='flex flex-col gap-0.5'>
						<span className='text-xs'>{course.totalReviews} Review</span>
						<ul className="flex space-x-1">
							<li className="inline-block text-yellow-700 text-[10px] md:text-[13px]">★</li>
							<li className="inline-block text-yellow-700 text-[10px] md:text-[13px]">★</li>
							<li className="inline-block text-yellow-700 text-[10px] md:text-[13px]">★</li>
							<li className="inline-block text-gray-400 text-[10px] md:text-[13px]">★</li>
							<li className="inline-block text-gray-400 text-[10px] md:text-[13px]">★</li>
						</ul>
					</div>
					<div className="text-right flex flex-col gap-0.5">
						<span className="text-xs">Categories</span>
						<h5 className="text-purple-900">{course.category.categoryName}</h5>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default CourseDetailBox;