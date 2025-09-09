import { useEffect, useRef } from "react";
import CourseCardView from "@/components/admin_dashboard/CourseCardView";
import {
  approveCourse,
  rejectCourse,
  fetchCoursesUnapproved,
} from "@/slices/adminCourseViewSlice";
import { House } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardBreadcrumb from "@/components/admin_dashboard/DashboardBreadcrumb";
import { CircularProgress, Skeleton } from "@mui/material";

const AdminCourseView = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const { courses, loading, haveCourses } = useSelector(
    (state) => state.adminCourseView
  );

  useEffect(() => {
    // console.log("eff");
    // dispatch(fetchCoursesUnapproved());

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // console.log("Element is visible");
          dispatch(fetchCoursesUnapproved());
          // console.log(page);
        }
        // else {
        //   console.log("Element is not visible");
        // }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const handleApproveButton = (index, id) => {
    dispatch(approveCourse({ index, id }));
  };

  const handleRejectButton = (index, id) => {
    dispatch(rejectCourse({ index, id }));
  };

  return (
    <div className="w-full flex flex-col gap-7">
      <DashboardBreadcrumb homePath="/admin" name="Courses" />
      <div className="flex flex-col w-full shadow-lg py-4 [&>*]:px-4">
        <div className="text-lg font-semibold pl-4 pb-border-b">Courses</div>
        <div className="flex flex-col divide-y divide-solid divide-gray-300 gap-7 py-7 [&>*]:pt-7">
          {courses.length != 0 ? (
            courses.map((course, index) => (
              <div className="flex flex-col" key={index}>
                <CourseCardView
                  courseId={course.courseId}
                  courseThumbnail={course.courseThumbnail}
                  description={course.description}
                  instructorName={course.instructorName}
                  title={course.title}
                  price={course.price}
                />
                <div className="flex flex-row gap-2 mt-2 ml-auto">
                  {course.isUpdateStatus ? (
                    <CircularProgress />
                  ) : (
                    <>
                      <button
                        className="text-sm px-3 py-2 rounded-full border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white"
                        onClick={() =>
                          handleApproveButton(index, course.courseId)
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="text-sm px-3 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() =>
                          handleRejectButton(index, course.courseId)
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>NO THING HERE</div>
          )}
        </div>
        {haveCourses && <div ref={ref}></div>}
        {loading && (
          <Skeleton animation="wave" className="p-7 m-7" height={240} />
        )}
      </div>
    </div>
  );
};

export default AdminCourseView;
