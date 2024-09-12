import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageEntry from "../components/PageEntry";
import Page_trace from "../components/Page_trace";
import Course_info from "../components/Course_info";
import Course_des from "../components/Course_des";
import Curriculum from "../components/Curriculum";
import Instructor from "../components/Instructor";
import Reviews from "../components/Reviews";
import { getCourseById, getCourseRatingById } from "../utils/courseService";
import { templatedata } from "../constants/mockdata";
import '../configs/style.css';
import CourseDetailBox from "../components/CourseDetailBox";
import Overview from "../components/Overview";
import { CircularProgress } from "@mui/material";

const CourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [rating, setRating] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const [selectedCourseData, selectedCourseRating] = await Promise.all([
                    getCourseById(courseId),
                    getCourseRatingById(courseId)
                ]);

                if (!selectedCourseData) {
                    throw new Error('Course not found');
                }

                if (!selectedCourseRating) {
                    throw new Error('Rating not found');
                }

                setCourse(selectedCourseData);
                setRating(selectedCourseRating);
            } catch (error) {
                setError(error.message || 'Failed to fetch course details');
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [courseId]);

    const mockdata = templatedata[0];

    useEffect(() => {
        // JavaScript smooth scroll fallback
        const links = document.querySelectorAll('a[href^="#"]');
        for (const link of links) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const targetPosition = target.getBoundingClientRect().top;
                    const offsetPosition = targetPosition + window.pageYOffset - (window.innerHeight / 2 - target.offsetHeight / 2);
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }, []);

    return (
        <div className="scroll-smooth">
            {isLoading ? (
                <div className="m-auto"><CircularProgress /></div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div className="bg-white">
                    <PageEntry course={course} />
                    <Page_trace />
                    <div className="my-8 grid grid-cols-1 md:grid-cols-10 gap-6">
                        <div className="md:row-start-1 md:col-start-8 md:col-span-2">
                            <div className="sticky top-24 mb-8 mx-4 md:mx-0">
                                <CourseDetailBox course={course} courseId={courseId}/>
                            </div>
                        </div>
                        <div className="ml-4 md:row-start-1 md:col-start-2 md:col-span-6 mr-4 md:mr-0">
                            <div
                                className="h-[200px] md:h-[500px] bg-cover bg-center w-full md:w-auto text-left rounded-md overflow-hidden object-fill"
                                style={{
                                    backgroundImage: `url(${course.courseThumbnail})`,
                                }}
                            ></div>
                            <Course_info  course={course} />
                            <div className="md:grid md:grid-cols-5 md:gap-24">
                                <div className="col-start-1 col-span-2">
                                    <div className="sticky top-24 mb-8">
                                        <Overview course={mockdata} />
                                    </div>
                                </div>
                                <div id="overview"  className="my-29 col-start-3 col-span-3">
                                    <Course_des  tempcourse={mockdata} course={course} />
                                </div>
                            </div>
                            <div id="curriculum">
                                <Curriculum curriculumData={course.sections} />
                            </div>
                            <div id="instructor">
                                <Instructor course={course} />
                            </div>
                            <div>
                                <Reviews course={rating} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetail;
