import React, { useEffect, useMemo, useState } from "react";
import {
  // Button,
  // Card,
  // CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Pagination,
  Select,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
// @ts-ignore
import BreadCrumbsDashboard from "../BreadCrumbsDashboard";
// @ts-ignore
// import useOpen from "@/hooks/useOpen";
import { AddSession } from "@/components/create_course/addSession";
// @ts-ignore
import { Toast } from "@/configs/SweetAlert";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setSelectedIndex } from "@/features/slices/selectedIndex";
import { useGetInstructorCoursesQuery, useDeleteInstructorCourseMutation } from "@/apis/InstructorDashboardApi";
// @ts-ignore
import Loader from "../Loader";
import { useGetCourseListQuery } from "@/apis/CourseApi";
import { red } from "@mui/material/colors";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  RowsPlusBottomIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useNavigate } from "react-router-dom";

type Student = { id?: number; name: string };
type Course = {
  courseId: number;
  title: string;
  price: number;
  status?: string;
  courseThumbnail?: string;
  description?: string;
  createDate?: string;
  createdAt?: string;
  studentList?: Student[];
};

type CoursesResponse = {
  payload: { content: Course[] };
  metadata: { pagination: { totalPages: number; totalItems: number } };
};

type SectionsResponse = {
  payload: { sections: { sectionId: number; sectionName: string }[] };
};

const InstructorCourse: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteCourse, { isLoading: isDeleting }] = useDeleteInstructorCourseMutation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth < 1024 && window.innerWidth >= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024 && window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // dialogs + selection
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);

  const handleClickOpen = (courseId: number) => {
    setId(courseId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setId(null);
  };

  const onDeleteCourse = async (courseId: number) => {
    const { isConfirmed } = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#f50057",
      cancelButtonColor: "#2962ff",
    });
    if (!isConfirmed) return;

    try {
      await deleteCourse(courseId).unwrap();
      Toast.fire({ icon: "success", title: "Xóa khóa học thành công" });
      refetch();
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.error ||
        "Xóa khóa học thất bại. Vui lòng thử lại.";
      await Swal.fire("Lỗi", msg, "error");
    }
  };


  // pagination (server-driven)
  const [activePage, setActivePage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const handleActivePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setActivePage(value);
  };

  // main list
  const {
    data: coursesRes,
    isLoading,
    isError,
    refetch,
  } = useGetInstructorCoursesQuery({
    page: activePage - 1,
    size: pageSize,
  } as any);
  const coursesRes = (instructorCoursesQuery as any).data;
  const isLoading = (instructorCoursesQuery as any).isLoading;
  const isError = (instructorCoursesQuery as any).isError;

  const courseList: Course[] = (coursesRes as CoursesResponse | undefined)?.payload?.content ?? [];
  const totalItems = (coursesRes as CoursesResponse | undefined)?.metadata?.pagination?.totalItems ?? 0;
  const totalPages = (coursesRes as CoursesResponse | undefined)?.metadata?.pagination?.totalPages ?? 0;

  console.log(courseList);

  // selected course + sections
  const selectedCourse = useMemo(
    () => courseList.find((c) => c.courseId === id) ?? null,
    [courseList, id]
  );

  const sectionsQuery = useGetCourseListQuery(id as number, { skip: !id });
  const sectionsRes = (sectionsQuery as any).data;

  // students sub-paging inside dialog
  const [subActivePage, setSubActivePage] = useState<number>(1);
  const handleSubActivePage = (_: React.ChangeEvent<unknown>, value: number) =>
    setSubActivePage(value);

  const students = selectedCourse?.studentList ?? [];
  const studentsPerPage = 4;
  const totalStudentPages = Math.max(1, Math.ceil(students.length / studentsPerPage));
  const pagedStudents = students.slice(
    (subActivePage - 1) * studentsPerPage,
    subActivePage * studentsPerPage
  );

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;

  return (
    totalItems === 0 ? (
      <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-8rem)] gap-6">
        <div className="flex flex-col items-center gap-6">
          <img src="/src/assets/course-stockAsset.svg" alt="No courses" className="h-96" />
          <div className="text-center space-y-0.5">
            <p className="text-lg font-semibold text-gray-700">You have not created any courses yet.</p>
            <p className="text-center text-gray-500">Create your first course and start sharing your knowledge with the world!</p>
          </div>
          <Button onClick={() => navigate("/dashboard/instructor/courses/create")}>
            Create your first course
          </Button>
        </div>
      </div>
    ) : (
      <div>
        <p>Total courses: <span className="font-bold">{totalItems} courses</span></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-5">
          {courseList.map((course) => (
            <Card className='pt-0 pb-6 overflow-clip hover:bg-accent/10 transition-colors duration-50 ease-in-out'>
              <div className='flex flex-col flex-1 gap-2'>
                <CardHeader onClick={() => handleClickOpen(course.courseId)} className='px-0 hover:cursor-pointer'>
                  <img src={course.courseThumbnail || "/placeholder.jpg"} className='aspect-3/2 object-cover rounded-t-md' />
                  <div className='px-6 mt-3 w-full overflow-hidden'>
                    <p className='flex gap-4 justify-between items-baseline text-xl font-semibold text-ellipsis'>
                      {course.title}
                    </p>
                    {Number(course.price ?? 0).toLocaleString("en-US")} đ
                  </div>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="line-clamp-3 text-left" dangerouslySetInnerHTML={{ __html: course.description ?? "No description." }} />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md">
                      <div className="text-base" dangerouslySetInnerHTML={{ __html: course.description ?? "No description." }} />
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </div>
              <CardFooter className="flex flex-col items-start gap-3">
                <div className="flex flex-col">
                  <div className="text-xs font-medium text-gray-500">Created at:</div>
                  <div className="text-base font-medium">
                    {course.createDate ?? course.createdAt ?? "—"}
                  </div>
                </div>
                <div className='flex flex-row gap-1.5'>
                  <Button>
                    <RowsPlusBottomIcon className="!size-5" weight="duotone" /> Create section
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDeleteCourse(course.courseId)}
                    disabled={isDeleting}
                  >
                    <TrashIcon className="!size-5" weight="duotone" /> {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-between w-full mt-3">
          {totalPages > 1 && (
            <div className="flex w-60 md:w-72 my-auto ">
              <div className="my-auto">Page: {activePage}</div>
              <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <InputLabel id="page-size-label">Page size</InputLabel>
                <Select
                  labelId="page-size-label"
                  value={pageSize}
                  label="Page size"
                  autoWidth
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={activePage}
              onChange={handleActivePage}
              className="mt-5"
            />
          )}
        </div>

        {selectedCourse && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="course-dialog-title"
            aria-describedby="course-dialog-desc"
            maxWidth="md"
            fullWidth
          >
            <DialogTitle id="course-dialog-title" className="!font-bold !text-2xl">
              Course #{selectedCourse.courseId}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="course-dialog-desc" component="div">
                <Container>
                  <div className="grid grid-cols-1 md:grid-cols-4 h-full gap-4 leading-10">
                    <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                      <Typography variant="h6" className="font-bold text-center ">
                        Course Info
                      </Typography>
                    </div>
                    <div className="md:col-span-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 text-center">
                        <Typography variant="body1" className="font-bold">Name:</Typography>
                        <Typography variant="body2">{selectedCourse.title}</Typography>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 text-center">
                        <Typography variant="body1" className="font-bold">Price:</Typography>
                        <Typography variant="body2">
                          {Number(selectedCourse.price ?? 0).toLocaleString("en-US")} đ
                        </Typography>
                      </div>
                    </div>

                    <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                      <Typography variant="h6" className="font-bold text-center ">
                        Course Detail
                      </Typography>
                    </div>
                    <div className="md:col-span-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 text-center">
                        <Typography variant="body1" className="font-bold">Created At</Typography>
                        <Typography variant="body2">
                          {selectedCourse.createDate ?? selectedCourse.createdAt ?? "—"}
                        </Typography>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 text-center">
                        <Typography variant="body1" className="font-bold">Number of students</Typography>
                        <Typography variant="body2">
                          {(selectedCourse.studentList ?? []).length}
                        </Typography>
                      </div>
                    </div>

                    <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                      <Typography variant="h6" className="font-bold text-center ">
                        Appendix
                      </Typography>
                    </div>
                    <div className="md:col-span-3">
                      {(sectionsRes as SectionsResponse | undefined)?.payload?.sections?.map((section) => (
                        <div key={section.sectionId} className="grid grid-cols-1 md:grid-cols-2 text-center">
                          <Typography variant="body1" className="font-bold">
                            Lesson {section.sectionId}:
                          </Typography>
                          <Typography variant="body2">{section.sectionName}</Typography>
                        </div>
                      ))}
                    </div>

                    <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                      <Typography variant="h6" className="font-bold text-center ">
                        Students List
                      </Typography>
                    </div>
                    <div className="md:col-span-3">
                      <table className="w-full text-center">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pagedStudents.map((st, idx) => (
                            <tr key={st.id ?? idx}>
                              <td>{(subActivePage - 1) * studentsPerPage + idx + 1}</td>
                              <td>{st.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {totalStudentPages > 1 && (
                        <div className="flex justify-between mt-5">
                          <div className="my-auto">Page: {subActivePage}</div>
                          <Pagination
                            count={totalStudentPages}
                            page={subActivePage}
                            onChange={handleSubActivePage}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Container>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        )}
      </div>
    )
  )
};

export default InstructorCourse;
