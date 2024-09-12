import React from 'react';

const groupSectionsIntoLevels = (sections) => {
    const levels = [];
 
    for (let i = 0; i < sections.length; i += 3) {
        const levelSections = sections.slice(i, i + 3);
        levels.push({
            title: `Level ${levels.length + 1}`,
            lessons: levelSections.map(section => ({
                title: section.sectionName,
                duration: section.contents // Assuming duration data would be added later
            }))
        });
    }
    return levels;
};

const Curriculum = ({ curriculumData }) => {
    console.log(curriculumData);
    const groupedLevels = groupSectionsIntoLevels(curriculumData);

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
