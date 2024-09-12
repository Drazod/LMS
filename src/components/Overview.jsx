import React from 'react';

const Overview = ({ course }) => {
    return (
        <div className="scroll-smooth">
            <h4 className="mt-10 mb-5 text-xl md:text-2xl font-semibold">Overview</h4>
            <ul className="curriculum-list">
                {course.courseOverview.map((level, index) => (
                    <li key={index}>
                        <ul>
                                <li className="border-b align-middle">
                                    <div className="my-4 grid grid-cols-2 text-sm ">
                                        <span className="ms-4 text-gray-800 ">{level.title}</span> 
                                        <span className="ml-20 text-left">{level.duration}</span>
                                    </div>
                                </li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Overview;