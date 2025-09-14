import React from "react";
import SliderComponent from "@/components/Home_Component/swiper";
import Sections from "@/components/Home_Component/Section";
import PopularCourses from "@/components/Home_Component/PopularCourses";
import OnlineCourse from "@/components/Home_Component/OnlineCourse";

const Home = () => {
  return (
    <div>
      <div className="h-screen">
        <SliderComponent />
      </div>
      <Sections />
      <PopularCourses />
      <OnlineCourse />
    </div>
  );
};

export default Home;
