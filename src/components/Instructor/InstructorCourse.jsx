import {
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
  Pagination,
  styled,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import test_img from "../../assets/courses/pic1.jpg";
import test_ppl_img from "../../assets/test_profile_img/pic3.jpg";
import React, { useEffect, useState } from "react";
import IconCourse from "../../assets/IconCourse";
import IconLearningHours from "../../assets/IconLearningHours";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BreadCrumbsDashboard from "../BreadCrumbsDashboard";
import useOpen from "@/hooks/useOpen";
import { grey, red } from "@mui/material/colors";
import { Toast } from "@/configs/SweetAlert";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setSelectedIndex } from "@/features/slices/selectedIndex";
import { useGetInstructorCoursesQuery } from "@/apis/InstructorDashboardApi";
import Loader from "../Loader";
import { Star } from "@mui/icons-material";
import { useGetCourseListQuery } from "@/apis/CourseApi";

const rows = [
  {
    id: 1,
    courseCode: "CO3001",
    name: "Nguyên lý ngôn ngữ lập trình",
    classCode: "L01",
    price: 500000,
    publishDate: "2021-10-10",
    status: "Active",
    totalStudents: 50,
  },
  {
    id: 2,
    courseCode: "CO3002",
    name: "Cấu trúc dữ liệu và giải thuật",
    classCode: "L02",
    price: 600000,
    publishDate: "2021-10-10",
    status: "Active",
    totalStudents: 50,
  },
];
const listStudents = [
  {
    id: 1,
    name: "Nguyễn Văn A",
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
  },
  {
    id: 3,
    name: "Nguyễn Văn A",
  },
  {
    id: 4,
    name: "Nguyễn Văn A",
  },
  {
    id: 5,
    name: "Nguyễn Văn A",
  },
  {
    id: 6,
    name: "Nguyễn Văn A",
  },
];
const SaveButton = styled(Button)(({ theme }) => ({
  border: "1px solid",
  borderColor: "#4d0a91",
  borderRadius: "25px",
  rounded: "true",
  color: "#4d0a91",
  backgroundColor: "#ffffff",
  "&:hover": {
    color: theme.palette.getContrastText("#4d0a91"),
    backgroundColor: "#4d0a91",
  },
}));
const DeleteButton = styled(Button)(({ theme }) => ({
  border: "1px solid",
  borderColor: red[900],
  borderRadius: "25px",
  rounded: "true",
  color: red[900],
  backgroundColor: theme.palette.getContrastText(red[900]),
  "&:hover": {
    color: theme.palette.getContrastText(red[900]),
    backgroundColor: red[900],
  },
}));
const CreateButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#d8a409"),
  backgroundColor: "#d8a409",
  "&:hover": {
    color: theme.palette.getContrastText("#4d0a91"),
    backgroundColor: "#4d0a91",
  },
}));
const InstructorCourse = () => {
  const [id, setId] = React.useState(null);
  const [courseDetail, setCourseDetail] = React.useState(null);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const {
    detailOpen,
    updateOpen,
    deleteOpen,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
  } = useOpen();
  const handleClickOpen = (id) => {
    setId(id);
  };
  const handleClose = () => {
    setId(null);
    setOpen(false);
  };
  // const handleClickUpdateOpen = (id) => {
  //   handleUpdateOpen();
  //   setId(id);
  // };
  // const handleClickDeleteOpen = (id) => {
  //   handleDeleteOpen();
  //   setId(id);
  // };
  const [activePage, setActivePage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const handleActivePage = (event, value) => {
    setActivePage(value);
  };
  const [subActivePage, setSubActivePage] = React.useState(1);
  const handleSubActivePage = (event, value) => {
    setSubActivePage(value);
  };
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
  React.useEffect(() => {
    if (deleteOpen) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#f50057",
        cancelButtonColor: "#2962ff",
      }).then((result) => {
        if (result.isConfirmed) {
          Toast.fire({
            icon: "success",
            title: "Xóa thành công",
          });
        }
        handleDeleteOpen();
      });
    }
  }, [deleteOpen, handleDeleteOpen]);
  const {
    data: courses,
    isLoading,
    isError,
  } = useGetInstructorCoursesQuery({ page: activePage - 1, size: pageSize });
  const {
    data: sections,
    isLoading: loadingSection,
    isError: errorSection,
  } = useGetCourseListQuery(id, {
    skip: !id,
  });
  useEffect(() => {
    if (id) {
      setCourseDetail(sections);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [sections, id]);
  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;
  const page = courses.metadata.pagination.totalPages;
  return (
    <div className="mt-5">
      <BreadCrumbsDashboard name="Course" />

      <Card className="my-5">
        <CardContent>
          <div className="flex justify-between gap-8">
            {!isMobile && (
              <div className="flex my-auto gap-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 my-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                <Typography
                  variant={isTablet ? "h6" : "h5"}
                  className="my-auto"
                >
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
        <Typography variant="small" className="!my-auto">
          {courses.metadata.pagination.totalItems} courses
        </Typography>
        {/* <FormControl className="w-1/5">
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            data-testid="demo-simple-select"
            value={filter}
            label="Status"
            onChange={handleFilterChange}
          >
            <MenuItem data-testid="select-option" value={"all"}>
              All
            </MenuItem>
            <MenuItem data-testid="select-option" value={true}>
              Completed
            </MenuItem>
            <MenuItem data-testid="select-option" value={false}>
              On going
            </MenuItem>
          </Select>
        </FormControl> */}
      </div>
      {/* <TableContainer component={Paper} className="mt-10">
        <Table aria-label="simple table">
          <TableHead>
            {isMobile ? (
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mx-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </TableCell>
              </TableRow>
            ) : isTablet ? (
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Course</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Student</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Created Date</TableCell>
                <TableCell align="center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mx-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Course</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Student</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Created Date</TableCell>
                <TableCell align="center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mx-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {courses?.payload?.content?.slice(0, pageSize).map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {isMobile ? (
                  <>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => handleClickOpen(index)}
                    >
                      {index + activePage * 8 - 7}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => handleClickOpen(index)}
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex flex-col justify-around">
                        <Button
                          variant="outlined"
                          style={{
                            color: "black",
                            border: "none",
                          }}
                          onClick={() => handleClickUpdateOpen(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </Button>
                        <Button
                          variant="outlined"
                          style={{
                            color: "black",
                            border: "none",
                          }}
                          onClick={() => handleClickDeleteOpen(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </Button>
                      </div>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => handleClickOpen(index)}
                    >
                      {index + activePage * 8 - 7}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => handleClickOpen(index)}
                    >
                      {row.categoryId}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => handleClickOpen(index)}
                    >
                      {row.courseId}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="w-[200px]"
                      onClick={() => handleClickOpen(index)}
                    >
                      {row.title}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => handleClickOpen(index)}
                    >
                      {row.studentList.length}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => handleClickOpen(index)}
                    >
                      {row.status}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => handleClickOpen(index)}
                    >
                      {row.createDate}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex justify-around">
                        <Button
                          variant="outlined"
                          style={{
                            color: "black",
                            border: "none",
                          }}
                          onClick={() => dispatch(setSelectedIndex(2))}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </Button>
                        <Button
                          variant="outlined"
                          style={{
                            color: "black",
                            border: "none",
                          }}
                          onClick={() => handleClickDeleteOpen(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </Button>
                      </div>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      {courses?.payload?.content?.slice(0, pageSize).map((course, index) => (
        <Card className="my-5">
          <CardContent>
            <div className="flex flex-col md:flex-row gap-5 items-center text-center md:text-left md:items-start">
              <div>
                <div
                  className="w-full min-w-60 h-60 box-border overflow-hidden rounded-md"
                  onClick={() => handleClickOpen(course.courseId)}
                >
                  <img src={course.courseThumbnail} className=" w-full h-60" />
                </div>
                <div className="w-full flex flex-row gap-2 mt-4">
                  <SaveButton className="w-full text-sm px-3 py-2 rounded-full border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white">
                    Create Section
                  </SaveButton>
                  <DeleteButton className="w-full text-sm px-3 py-2 rounded-full border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white">
                    Delete Course
                  </DeleteButton>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <div className="flex flex-col gap-4 w-full md:min-h-60">
                  <div
                    className="text-xl font-semibold"
                    onClick={() => handleClickOpen(course.courseId)}
                  >
                    {course.title}
                  </div>
                  <div className="grid grid-col-1 md:flex md:flex-wrap md:justify-around md:gap-20 md:items-center gap-4">
                    {/* <div className="flex flex-row gap-3 items-center">
                      <img
                        src={test_ppl_img}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <div className="text-xs font-medium text-gray-500">
                          Teacher
                        </div>
                        <div className="text-base font-medium">KENY WHITE</div>
                      </div>
                    </div> */}
                    {/* <div className="flex flex-col">
                      <div className="text-xs font-medium text-gray-500">
                        ID:
                      </div>
                      <div className="text-base font-medium">
                        {course.courseId}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xs font-medium text-gray-500">
                        Category:
                      </div>
                      <div className="text-base font-medium">
                        {course.categoryId}
                      </div>
                    </div> */}
                    <div className="flex flex-col">
                      <div className="text-xs font-medium text-gray-500">
                        Created at:
                      </div>
                      <div className="text-base font-medium">
                        {course.createDate}
                      </div>
                    </div>
                    {/* <div className="flex flex-col">
                      <div className="text-xs font-medium text-gray-500">
                        3 Review
                      </div>
                      <div className="flex flex-row gap-1">
                        {Array.from({ length: 5 }, (_, index) => (
                          <RatingStart
                            point={3 - 1}
                            index={index}
                            key={index}
                          />
                        ))}
                      </div>
                    </div> */}

                    <button className="rounded-full bg-teal-400 text-white text-sm px-2 py-1 w-1/5 md:w-1/12 mx-auto">
                      {course.status}
                    </button>
                    {/* 
                      <div className="flex flex-col ml-auto">
                        <div className="text-xs line-through font-medium text-gray-500">
                          $190
                        </div>
                        <div className="text-lg font-semibold">$120</div>
                      </div> */}
                    <div className="flex flex-col md:ml-auto">
                      <div className="text-lg font-semibold">
                        {Number(course.price).toLocaleString("en-US")} đ
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-base font-semibold">
                      Course Description
                    </div>
                    <p className="text-sm h-[150px]  overflow-auto">
                      {course.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-between w-full mt-3">
        {page > 1 && (
          <div className="flex w-60 md:w-72 my-auto ">
            <div className="my-auto">Page: {activePage}</div>
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
              <InputLabel id="demo-simple-select-autowidth-label">
                Page size
              </InputLabel>
              <Select
                value={pageSize}
                label="Page size"
                autoWidth
                onChange={(e) => setPageSize(e.target.value)}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
        {page > 1 && (
          <Pagination
            count={page}
            page={activePage}
            onChange={handleActivePage}
            className="mt-5"
          />
        )}
      </div>
      {courses?.payload.content.length > 0 && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title" className="!font-bold !text-2xl">
            Course #{id}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 h-full gap-4 leading-10">
                  <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                    <Typography variant="h6" className="font-bold text-center ">
                      Course Info
                    </Typography>
                  </div>
                  <div className="md:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 text-center">
                      <Typography variant="medium" className="font-bold">
                        Name:
                      </Typography>
                      <Typography variant="small">
                        {
                          courses?.payload?.content.find(
                            (e) => e.courseId === id
                          )?.title
                        }
                      </Typography>
                    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 text-center">
                      <Typography variant="medium" className="font-bold">
                        Category ID:
                      </Typography>
                      <Typography variant="small">
                        {
                          courses?.payload?.content.find(
                            (e) => e.courseId === id
                          )?.categoryId
                        }
                      </Typography>
                    </div> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 text-center">
                      <Typography variant="medium" className="font-bold">
                        Price:
                      </Typography>
                      <Typography variant="small">
                        {Number(
                          courses?.payload?.content.find(
                            (e) => e.courseId === id
                          )?.price
                        ).toLocaleString("en-US")}{" "}
                        đ
                      </Typography>
                    </div>
                  </div>
                  <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                    <Typography variant="h6" className="font-bold text-center ">
                      Course Detail
                    </Typography>
                  </div>
                  <div className="md:col-span-3">
                    <div className="md:col-span-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 text-center">
                        <Typography variant="medium" className="font-bold">
                          Created At
                        </Typography>
                        <Typography variant="small">
                          {
                            courses?.payload?.content.find(
                              (e) => e.courseId === id
                            )?.createDate
                          }
                        </Typography>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 text-center">
                      <Typography variant="medium" className="font-bold">
                        Number of students
                      </Typography>
                      <Typography variant="small">
                        {
                          courses?.payload?.content.find(
                            (e) => e.courseId === id
                          )?.studentList.length
                        }
                      </Typography>
                    </div>
                  </div>
                  <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                    <Typography variant="h6" className="font-bold text-center ">
                      Appendix
                    </Typography>
                  </div>
                  <div className="md:col-span-3">
                    {sections?.payload.sections.map((section, index) => (
                      <div className="md:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2  text-center">
                          <Typography variant="medium" className="font-bold">
                            Lesson {index + 1}:
                          </Typography>
                          <Typography variant="small">
                            {section.sectionName}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                    <Typography variant="h6" className="font-bold text-center ">
                      Students List
                    </Typography>
                  </div>
                  <div className="md:col-span-3">
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">No.</TableCell>
                          <TableCell align="center">Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {courses?.payload?.content
                          .find((e) => e.courseId === id)
                          ?.studentList?.slice(
                            (subActivePage - 1) * 4,
                            subActivePage * 4
                          )
                          .map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
                                {index + subActivePage * 4 - 3}
                              </TableCell>
                              <TableCell align="center">{row.name}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    <div className="flex justify-between mt-5">
                      {Math.ceil(
                        courses?.payload?.content[id]?.studentList.length / 4
                      ) > 1 && (
                        <div className="my-auto">Page: {subActivePage}</div>
                      )}
                      {Math.ceil(
                        courses?.payload?.content[id]?.studentList.length / 4
                      ) > 1 && (
                        <Pagination
                          count={Math.ceil(
                            courses?.payload?.content[id]?.studentList.length /
                              4
                          )}
                          page={subActivePage}
                          onChange={handleSubActivePage}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Container>
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions> */}
        </Dialog>
      )}
      {/* {courses?.payload.content.length > 0 && (
        <Dialog
          open={updateOpen}
          onClose={handleUpdateOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title" className="!font-bold !text-2xl">
            Chỉnh sửa lớp + {courses?.payload?.content[id]?.courseId}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 h-full gap-4 leading-10">
                  <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                    <Typography variant="h6" className="font-bold text-center ">
                      Thông tin khóa học
                    </Typography>
                  </div>
                  <div className="md:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4  text-center">
                      <Typography variant="medium" className="font-bold">
                        Name:
                      </Typography>
                      <form autoComplete="off" className="w-full md:col-span-2">
                        <FormControl className="w-full" size="small">
                          <OutlinedInput
                            value={courses?.payload?.content[id]?.title}
                          />
                        </FormControl>
                      </form>
                      <Typography variant="medium" className="font-bold">
                        Category:
                      </Typography>
                      <form autoComplete="off" className="w-full md:col-span-2">
                        <FormControl className="w-full" size="small">
                          <OutlinedInput
                            value={courses?.payload?.content[id]?.categoryId}
                          />
                        </FormControl>
                      </form>
                      <Typography variant="medium" className="font-bold">
                        Course:
                      </Typography>
                      <form autoComplete="off" className="w-full md:col-span-2">
                        <FormControl className="w-full" size="small">
                          <OutlinedInput
                            value={courses?.payload?.content[id]?.courseId}
                          />
                        </FormControl>
                      </form>
                    </div>
                  </div>
                  <div className="md:col-span-4 flex gap-4 justify-end">
                    <SaveButton variant="contained">Save</SaveButton>
                    <DeleteButton
                      variant="contained"
                      onClick={handleUpdateOpen}
                    >
                      Cancel
                    </DeleteButton>
                  </div>
                </div>
              </Container>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )} */}
    </div>
  );
};

export default InstructorCourse;
