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
    name: "Bảng điều khiển",
    path: "",
    icon: SpeedometerIcon,
    ele: <StudentDashboard />,
  },
  {
    name: "Khóa học của tôi",
    path: "courses",
    icon: BooksIcon,
    ele: <StudentCourse />,
  },
  {
    name: "Hồ sơ",
    path: "profile",
    icon: UserCircleDashedIcon,
    ele: <StudentProfile />,
  },
];

const instructor_sidebar = [
  {
    name: "Bảng điều khiển",
    path: "",
    icon: SpeedometerIcon,
    ele: <InstructorDashboard />,
  },
  {
    name: "Khóa học của tôi",
    path: "courses",
    icon: BooksIcon,
    ele: <InstructorCourse />,
  },
  {
    name: "Tạo khóa học",
    path: "courses/create",
    icon: CirclesThreePlusIcon,
    ele: <CreateCourse />,
  },
  {
    name: "Hồ sơ",
    path: "profile",
    icon: UserCircleDashedIcon,
    ele: <InstructorProfile />,
  },
];

export { student_sidebar, instructor_sidebar };
