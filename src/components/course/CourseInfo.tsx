const CourseInfo = (
	{ course }: {
		course: {
			title: string;
			description: string;
		};
	}) => {
	return (
		<div className="mx-auto overflow-hidden">
			<div key={course.title} className="my-8">
				<h2 className="text-3xl md:text-5xl font-black">{course.title}</h2>
				<p className="text-gray-800 text-base leading-loose mt-2">
					<div dangerouslySetInnerHTML={{ __html: course.description }} />
				</p>
			</div>
		</div>
	);
};

export default CourseInfo;
