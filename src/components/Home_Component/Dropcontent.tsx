import { Link } from "react-router-dom";

export default function DropContentHome() {
  return (
    <div className="w-44">
      <div className="mb-3">
        <a href="#" className="block mt-3 p-2 hover:bg-gray-200 text-sm b">
          Home 1
        </a>
        <a href="#" className="block p-2 hover:bg-gray-200 text-sm">
          Home 2
        </a>
      </div>
    </div>
  );
}

export const DropContentDashBoard = () => {
  return (
    <div className="w-44">
      <div className="mb-3">
        <a
          href="#"
          className="block mt-3 p-2 hover:bg-gray-200 text-sm border-dotted "
        >
          Student
        </a>
        <a href="#" className="block p-2 hover:bg-gray-200 text-sm">
          Instructor
        </a>
      </div>
    </div>
  );
};

export const DropContentCourses = () => {
  return (
    <div className="w-44">
      <div className="mb-3">
        <a
          href="/course"
          className="block mt-3 p-2 hover:bg-gray-200 text-sm border-dotted "
        >
          Our Courses
        </a>
        <a
          href="course"
          className="block p-2 hover:bg-gray-200 text-sm border-dotted "
        >
          Courses
        </a>
        <a
          href="#"
          className="block p-2 hover:bg-gray-200 text-sm border-dotted "
        >
          Profile
        </a>
        <a
          href="#"
          className="block p-2 hover:bg-gray-200 text-sm border-dotted "
        >
          Upcoming Event
        </a>
        <a href="#" className="block p-2 hover:bg-gray-200 text-sm">
          Membership
        </a>
      </div>
    </div>
  );
};
