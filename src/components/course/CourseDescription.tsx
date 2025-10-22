import '../../configs/style.css';

interface CourseDescriptionProps {
	course: {
		description: string;
		certificate?: string;
		learningOutcomes?: string[];
	};
}

const CourseDescription = ({ course }: CourseDescriptionProps) => {
	return (
		<div className="mt-1 md:mt-10 " id="course-description">
			<h4 className="mt-5 text-xl font-semibold">Course Description</h4>
			<p className="mt-2 text-base text-gray-800 font-light">
				<div dangerouslySetInnerHTML={{ __html: course.description }} />
			</p>

			{course.certificate && (
				<>
					<h5 className="mt-5 text-xl font-semibold">Certification</h5>
					<p className="mt-2 text-base text-gray-800 font-light">{course.certificate}</p>
				</>
			)}

			{course.learningOutcomes && course.learningOutcomes.length > 0 && (
				<>
					<h5 className="mt-5 text-xl font-semibold">Learning Outcomes</h5>
					<ul className="list-image-checkmark space-y-1 text-base text-gray-800 font-light">
						{course.learningOutcomes.map((outcome, index) => (
							<li key={index}>{outcome}</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default CourseDescription;
