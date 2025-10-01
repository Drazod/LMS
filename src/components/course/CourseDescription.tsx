import '../../configs/style.css';

const CourseDescription = ({ tempcourse, course }) => {
	return (
		<div className="mt-1 md:mt-10 " id="course-description">
			<h4 className="mt-5 text-xl font-semibold">Course Description</h4>
			<p className="mt-2 text-base text-gray-800 font-light">
				<div dangerouslySetInnerHTML={{ __html: course.description }} />
			</p>

			<h5 className="mt-5 text-xl font-semibold">Certification</h5>
			<p className="mt-2 text-base  text-gray-800 font-light">{tempcourse.certificate}</p>

			<h5 className="mt-5 text-xl font-semibold">Learning Outcomes</h5>
			<ul className="list-image-checkmark space-y-1 text-base text-gray-800 font-light">
				{tempcourse.learningOutcomes.map((outcome, index) => (
					<li key={index}>{outcome}</li>
				))}
			</ul>
		</div>
	);
};

export default CourseDescription;
