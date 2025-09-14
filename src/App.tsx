import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/Login";
import Register from "@/pages/Register";
import ForgetPassword from "@/pages/ForgetPassword";

import Layout from "@/layouts/Layout";
import Home from "@/pages/Home";

// import StudentDashboardpage from "@/pages/StudentDashboardpage";
// import DashboardLayout from "../layouts/DashboardLayout";
// import InstructorDashboardpage from "../pages/InstructorDashboardpage";
// import RegisterPage from "../pages/Registerpage";
// import { Dashboard } from "@mui/icons-material";
// import CourseSelectionPage from "../pages/MockCourseSelect";

// import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
// import AdminDashboard from "../pages/AdminDashboard";
// import AdminCourseView from "../pages/AdminCourseView";
// import CourseSearch from "@/pages/CourseSearch";
// import Section from "@/pages/Section";
// import AddVideo from "@/components/create_course/Video";
// import OurCourse from "../pages/OurCourse";
// import OurCourse from "../pages/MockCourseSelect";
// import CourseDetail from "@/pages/CourseDetail";
// import StudentAndInstructorLayout from "@/layouts/StudentAndInstructorLayout";
// import StudentCart from "../pages/StudentCart";
// import StudentStudy from "@/components/Student/StudentStudy";
// import CreateCourse from "@/pages/CreateCourse";

// import PaymentSuccess from "@/pages/PaymentSuccess";
// import PaymentFailed from "@/pages/PaymentFailed";
// import { RequireAuth } from "react-auth-kit";
// import PrivateRoute from "@/components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/dashboard/" element={<StudentAndInstructorLayout />}>
          <Route element={<PrivateRoute allowedRoles={['S']} />}>
            <Route path="student" element={<StudentDashboardpage />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['I']} />}>
            <Route path="instructor" element={<InstructorDashboardpage />} />
          </Route>
        </Route> */}
        {/* <Route path="/student/:courseId" element={<StudentStudy />} /> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="/course" element={<OurCourse />} /> */}
          {/* <Route path="/course/search" element={<CourseSearch />} /> */}
          {/* <Route path="/course/:courseId" element={<CourseDetail />} /> */}
          {/* <Route path="/payment-success" element={<PaymentSuccess />} /> */}
          {/* <Route path="/payment-failed" element={<PaymentFailed />} /> */}
          {/* <Route
            path="/cart/"
            element={
              <RequireAuth loginPath="/auth/login">
                <StudentCart />
              </RequireAuth>
            }
          /> */}
        </Route>
        {/* <Route path="/create/" element={<AdminDashboardLayout />}>
          <Route path="course" element={<CreateCourse />} />
          <Route path="lession/:lessionId" element={<Section />} />
          <Route path="video" element={<AddVideo />} />
        </Route> */}
        {/* <Route element={<PrivateRoute allowedRoles={['A']} />}>
          <Route path="/admin/" element={<AdminDashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="course" element={<AdminCourseView />} />
          </Route>
        </Route> */}
        <Route path="/auth/" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
