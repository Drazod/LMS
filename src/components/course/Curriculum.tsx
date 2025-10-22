import React from 'react';

interface Section {
	title: string;
	sectionName?: string;
	contents: any[];
}

interface CurriculumProps {
	curriculumData: Section[];
}

const groupSectionsIntoLevels = (sections: Section[]) => {
	// Handle case where sections might be undefined or null
	if (!sections || !Array.isArray(sections)) {
		return [];
	}

	const levels = [];

	for (let i = 0; i < sections.length; i += 3) {
		const levelSections = sections.slice(i, i + 3);
		levels.push({
			title: `Level ${levels.length + 1}`,
			lessons: levelSections.map(section => ({
				title: section.title || section.sectionName || 'Untitled Section',
				duration: Array.isArray(section.contents) ? `${section.contents.length} items` : 'No content'
			}))
		});
	}
	return levels;
};

const Curriculum: React.FC<CurriculumProps> = ({ curriculumData }) => {
	console.log('Curriculum data:', curriculumData);
	const groupedLevels = groupSectionsIntoLevels(curriculumData);

	// Handle empty curriculum data
	if (!groupedLevels || groupedLevels.length === 0) {
		return (
			<div className="scroll-smooth">
				<h4 className="mt-10 mb-5 text-xl md:text-2xl font-semibold">Curriculum</h4>
				<p className="text-gray-600">No curriculum data available for this course.</p>
			</div>
		);
	}

	return (
		<div className="scroll-smooth">
			<h4 className="mt-10 mb-5 text-xl md:text-2xl font-semibold">Curriculum</h4>
			<ul className="curriculum-list">
				{groupedLevels.map((level, index) => (
					<li key={index}>
						<h5 className="mt-4 text-sm md:text-base uppercase text-purple-900 font-bold">{level.title}</h5>
						<ul>
							{level.lessons.map((lesson, idx) => (
								<li key={idx} className="border-b align-middle">
									<div className="my-4 curriculum-list-box grid grid-cols-2 text-xs md:text-sm font-medium">
										<span className="ms-6 text-gray-800 ">{lesson.title}</span>
										<span className="text-right  text-gray-800">{lesson.duration}</span>
									</div>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Curriculum;
