import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardContent,
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

const SaveButton = styled(Button)({
  border: "1px solid",
  borderColor: "#4d0a91",
  borderRadius: 25,
  color: "#4d0a91",
  backgroundColor: "#ffffff",
  "&:hover": { color: "#fff", backgroundColor: "#4d0a91" },
});

const DeleteButton = styled(Button)({
  border: "1px solid",
  borderColor: red[900],
  borderRadius: 25,
  color: red[900],
  backgroundColor: "#fff",
  "&:hover": { color: "#fff", backgroundColor: red[900] },
});

const CreateButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#d8a409"),
  backgroundColor: "#d8a409",
  "&:hover": {
    color: theme.palette.getContrastText("#4d0a91"),
    backgroundColor: "#4d0a91",
  },
}));

type Section = { id: number; name: string; description?: string };

const InstructorCourse: React.FC = () => {
  const dispatch = useDispatch();
  const [openAddSession, setOpenAddSession] = useState<boolean>(false);
  const [addSessionCourseId, setAddSessionCourseId] = useState<number | null>(null);
  // (Removed unused sections state for cleaner code)
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
  const instructorCoursesQuery = useGetInstructorCoursesQuery({
    page: activePage - 1,
    size: pageSize,
  } as any);
  const coursesRes = (instructorCoursesQuery as any).data;
  const isLoading = (instructorCoursesQuery as any).isLoading;
  const isError = (instructorCoursesQuery as any).isError;

  const courseList: Course[] = (coursesRes as CoursesResponse | undefined)?.payload?.content ?? [];
  const totalItems = (coursesRes as CoursesResponse | undefined)?.metadata?.pagination?.totalItems ?? 0;
  const totalPages = (coursesRes as CoursesResponse | undefined)?.metadata?.pagination?.totalPages ?? 0;

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
    
    <div className="mt-5">
      <BreadCrumbsDashboard name="Course" />
      
      <Card className="my-5">
        <CardContent>
          <div className="flex justify-between gap-8">
            {!isMobile && (
              <div className="flex my-auto gap-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" strokeWidth={1.5}
                  stroke="currentColor" className="size-6 my-auto">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <Typography variant={isTablet ? "h6" : "h5"} className="my-auto">
                  Jump Into Course Creation
                </Typography>
              </div>
            )}
            <CreateButton
              className="w-full md:w-1/2 lg:w-1/5"
              onClick={() => dispatch(setSelectedIndex(2))}
            >
              Create Your Course
            </CreateButton>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between my-auto mt-5">
        <Typography variant="body2" className="!my-auto">
          {totalItems} courses
        </Typography>
      </div>

      {courseList.map((course) => (
        <Card key={course.courseId} className="my-5">
          <CardContent>
            <div className="flex flex-col md:flex-row gap-5 items-center text-center md:text-left md:items-start">
              <div>
                <div
                  className="w-full min-w-60 h-60 box-border overflow-hidden rounded-md cursor-pointer"
                  onClick={() => handleClickOpen(course.courseId)}
                >
                  <img
                    src={course.courseThumbnail || "/placeholder.jpg"}
                    className="w-full h-60 object-cover"
                    alt={course.title}
                  />
                </div>
                <div className="w-full flex flex-row gap-2 mt-4">
                  <SaveButton
                    type="button"
                    onClick={() => {
                      setAddSessionCourseId(course.courseId);
                      setOpenAddSession(true);
                    }}
                  >
                    Add New Section
                  </SaveButton>
                  
                  <DeleteButton
                    className="w-full text-sm px-3 py-2 rounded-full"
                    onClick={() => onDeleteCourse(course.courseId)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete Course"}
                  </DeleteButton>
                </div>
               
              </div>

              <div className="flex flex-col w-full">
                <div className="flex flex-col gap-4 w-full md:min-h-60">
                  <div
                    className="text-xl font-semibold cursor-pointer"
                    onClick={() => handleClickOpen(course.courseId)}
                  >
                    {course.title}
                  </div>

                  <div className="grid grid-col-1 md:flex md:flex-wrap md:justify-around md:gap-20 md:items-center gap-4">
                    <div className="flex flex-col">
                      <div className="text-xs font-medium text-gray-500">Created at:</div>
                      <div className="text-base font-medium">
                        {course.createDate ?? course.createdAt ?? "—"}
                      </div>
                    </div>

                    <button className="rounded-full bg-teal-400 text-white text-sm px-2 py-1 w-1/5 md:w-1/12 mx-auto">
                      {course.status ?? "—"}
                    </button>

                    <div className="flex flex-col md:ml-auto">
                      <div className="text-lg font-semibold">
                        {Number(course.price ?? 0).toLocaleString("en-US")} đ
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="text-base font-semibold">Course Description</div>
                    <p className="text-sm max-h-[150px] overflow-auto">
                      {course.description ?? "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* AddSession Dialog for this course */}
            {openAddSession && addSessionCourseId === course.courseId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full relative">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
                    onClick={() => setOpenAddSession(false)}
                  >
                    ×
                  </button>
                  <AddSession
                    name={""}
                    setFunc={() => setOpenAddSession(false)}
                    index={Date.now()} // Use timestamp as unique id for new section
                    courseId={course.courseId}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

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
  );
};

export default InstructorCourse;
