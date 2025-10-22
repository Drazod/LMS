import BuyNowButton from "@/components/shopping/BuyNowButton";
import {
	Card,
	CardHeader,
	CardContent
} from "@/components/ui/card";

type CourseDetail = {
	courseId: string;
	title: string;
	description: string;
	price: number;
	instructor: {
		userId: string;
		name: string;
	};
	category: {
		categoryId: string;
		name: string;
	};
	totalRating: string;
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
					<div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
						<span className="text-purple-600 font-semibold text-lg">
							{course.instructor.name.charAt(0).toUpperCase()}
						</span>
					</div>
					<div className='flex flex-col gap-0.5'>
						<h5>{course.instructor.name}</h5>
						<span className='text-xs text-gray-600'>{course.category.name} Teacher</span>
					</div>
				</div>
				<div className="flex w-full flex-row justify-between mt-6">
					<div className='flex flex-col gap-0.5'>
						<span className='text-xs'>{course.totalRating} Review{parseInt(course.totalRating) !== 1 ? 's' : ''}</span>
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
						<h5 className="text-purple-900">{course.category.name}</h5>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default CourseDetailBox;