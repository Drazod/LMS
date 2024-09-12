import React, { useState, useEffect } from "react";
import '../configs/color.css';
import BuyNowButton from "./BuyNowButton"; // Adjust the path as needed

const CourseDetailBox = ({ course, courseId }) => {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
      const handleScroll = () => {
        const sections = document.querySelectorAll("section");
        let active = "";
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= window.innerHeight - window.innerHeight * 0.5 ) {
                active = section.id;
            }
        });
        setActiveSection(active);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);


    return (
        <div className="items-center border-black/10 border-[1px] py-5 mb-8">
            <div className="text-center pt-[10px] pb-5">
                <h4 className="text-center inline-block leading-7 font-bold text-4xl">{course.price.toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</h4>
            </div>
            <div className="text-center">
                <BuyNowButton course={courseId} />
            </div>
            <div className="items-center border-black/10 border-y-[1px] px-5 py-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="w-16 h-16 rounded-full object-cover" src="/src/assets/CourseDetail/pic1.jpg" alt="" />
                    </div>
                    <div className='ml-2'>
                        <h5>{course.instructor.lastName} {course.instructor.firstName}</h5>
                        <span className='text-xs text-gray-600'>{course.category.categoryName} Teacher</span>
                    </div>
                </div>
            </div>
            <div className="items-center border-black/10 border-b-[1px] grid grid-cols-2">
                <div className='items-center border-black/10 border-r-[1px] px-5 py-5 col-span-1'>
                    <span className='text-xs'>{course.totalReviews} Review</span>
                    <ul className="flex space-x-1">
                        <li className="inline-block text-yellow-700 text-[10px] md:text-[13px]">★</li>
                        <li className="inline-block text-yellow-700 text-[10px] md:text-[13px]">★</li>
                        <li className="inline-block text-yellow-700 text-[10px] md:text-[13px]">★</li>
                        <li className="inline-block text-gray-400 text-[10px] md:text-[13px]">★</li>
                        <li className="inline-block text-gray-400 text-[10px] md:text-[13px]">★</li>
                    </ul>
                </div>
                <div className="col-start-2 px-5 text-right">
                    <span className="text-xs">Categories</span>
                    <h5 className="text-purple-900">{course.category.categoryName}</h5>
                </div>
            </div>
            <div className="pt-5">
                <ul className="relative flex-wrap items-center justify-between w-full">
                    <li className={`hover:bg-deep-purple-700 transition-colors text-gray-600 hover:text-white duration-300 ${activeSection === "overview" ? "bg-deep-purple-700 text-white" : ""}`}>
                        <a className="block pl-5" href="#overview"><i className="ti-zip"></i>Overview</a>
                    </li>
                    <li className={`hover:bg-deep-purple-700 transition-colors text-gray-600 hover:text-white duration-300 ${activeSection === "curriculum" ? "bg-deep-purple-700 text-white" : ""}`}>
                        <a className="block pl-5" href="#curriculum"><i className="ti-bookmark-alt"></i>Curriculum</a>
                    </li>
                    <li className={`hover:bg-deep-purple-700 transition-colors text-gray-600 hover:text-white duration-300 ${activeSection === "instructor" ? "bg-deep-purple-700 text-white" : ""}`}>
                        <a className="block pl-5" href="#instructor"><i className="ti-user"></i>Instructor</a>
                    </li>
                    <li className={`hover:bg-deep-purple-700 transition-colors text-gray-600 hover:text-white duration-300 ${activeSection === "reviews" ? "bg-deep-purple-700 text-white" : ""}`}>
                        <a className="block pl-5" href="#reviews"><i className="ti-comments"></i>Reviews</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CourseDetailBox;