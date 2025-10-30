import SliderComponent from "@/components/home/HeroSlider";
import Sections from "@/components/home/Section";
import PopularCourses from "@/components/home/PopularCourses";
import OnlineCourse from "@/components/home/OnlineCourse";

const Home = () => {
  return (
    <div>
      <div className="h-screen">
        <SliderComponent />
      </div>
      <Sections />
      <PopularCourses />
      {/* <OnlineCourse /> */}
    </div>
  );
};

export default Home;
