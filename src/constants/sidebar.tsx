import InstructorCourse from "@/components/Instructor/InstructorCourse";
import InstructorDashboard from "@/components/Instructor/InstructorDashboard";
import InstructorProfile from "@/components/Instructor/InstructorProfile";
import StudentCourse from "@/components/Student/StudentCourse";
import StudentDashboard from "@/components/Student/StudentDashboard";
import StudentProfile from "@/components/Student/StudentProfile";
import CreateCourse from "@/pages/CreateCourse";

import {
  SpeedometerIcon,
  BooksIcon,
  UserCircleDashedIcon,
  CirclesThreePlusIcon
} from "@phosphor-icons/react/dist/ssr";

// import StudentStudy from "@/components/Student/StudentStudy";
// import UserProfile from "@/components/UserProfile";

const student_sidebar = [
  {
    name: "Dashboard",
    path: "",
    icon: SpeedometerIcon,
    ele: <StudentDashboard />,
  },
  {
    name: "Courses",
    path: "courses",
    icon: BooksIcon,
    ele: <StudentCourse />,
  },
  {
    name: "Profiles",
    path: "profile",
    icon: UserCircleDashedIcon,
    ele: <StudentProfile />,
  },
];

const instructor_sidebar = [
  {
    name: "Dashboard",
    path: "",
    icon: SpeedometerIcon,
    ele: <InstructorDashboard />,
  },
  {
    name: "Courses",
    path: "courses",
    icon: BooksIcon,
    ele: <InstructorCourse />,
  },
  {
    name: "Create Course",
    path: "courses/create",
    icon: CirclesThreePlusIcon,
    ele: <CreateCourse />,
  },
  {
    name: "Profiles",
    path: "profile",
    icon: UserCircleDashedIcon,
    ele: <InstructorProfile />,
  },
];

export { student_sidebar, instructor_sidebar };
