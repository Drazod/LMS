import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";

import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/Login";
import Register from "@/pages/Register";
import ForgetPassword from "@/pages/ForgetPassword";

import Layout from "@/layouts/Layout";
import CourseSearch from "@/pages/CourseSearch";
import OurCourse from "@/pages/OurCourse";
import Home from "@/pages/Home";
import CourseDetail from "@/pages/CourseDetail";
import StudentCart from "@/pages/StudentCart";

import PrivateRoute from "@/components/PrivateRoute";
import StudentAndInstructorLayout from "@/layouts/StudentAndInstructorLayout";

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
// import OurCourse from "../pages/MockCourseSelect";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminCourseView from "@/pages/AdminCourseView";
import DashboardLayout from "@/layouts/DashboardLayout";
// import StudentStudy from "@/components/Student/StudentStudy";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import CreateCourse from "@/pages/CreateCourse";
import Section from "@/pages/Section";
import AddVideo from "@/components/create_course/Video";

import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentFailed from "@/pages/PaymentFailed";
import { student_sidebar, instructor_sidebar } from "./constants/sidebar";

const App = () => {
  const mapChildren = (items: { path: string; ele: React.ReactNode }[]) =>
    items.map((it, i) =>
      i === 0 && (it.path === "" || it.path === ".")
        ? { index: true, element: it.ele }
        : { path: it.path, element: it.ele }
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="course" element={<OurCourse />} />
          <Route path="course/search" element={<CourseSearch />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route
            path="/cart/"
            element={
              <RequireAuth loginPath="/auth/login">
                <StudentCart />
              </RequireAuth>
            } />
        </Route>
        {/* <Route path="/create/" element={<AdminDashboardLayout />}>
          <Route path="course" element={<CreateCourse />} />
          <Route path="lession/:lessionId" element={<Section />} />
          <Route path="video" element={<AddVideo />} />
        </Route> */}
        <Route path="/dashboard/student" element={<StudentAndInstructorLayout />}>
          <Route element={<PrivateRoute allowedRoles={['S']} />}>
            {mapChildren(
              student_sidebar.map((it) => ({ ...it, path: it.path?.replace(/^\/+/, "") }))
            ).map((routeProps, idx) => (
              <Route key={idx} {...routeProps} />
            ))}
          </Route>
        </Route>
        <Route path="/dashboard/instructor" element={<StudentAndInstructorLayout />}>
          <Route element={<PrivateRoute allowedRoles={['I']} />}>
            {mapChildren(
              instructor_sidebar.map((it) => ({ ...it, path: it.path?.replace(/^\/+/, "") }))
            ).map((routeProps, idx) => (
              <Route key={idx} {...routeProps} />
            ))}
          </Route>
        </Route>
        {/* <Route path="/student/:courseId" element={<StudentStudy />} /> */}
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
