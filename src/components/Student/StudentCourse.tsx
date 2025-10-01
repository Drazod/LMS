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
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BreadCrumbsDashboard from "../common/BreadcrumbsDashboard";
import { useGetStudentCoursesQuery } from "@/apis/StudentDashboardApi";
import Loader from "../common/Loader";
import { Star } from "@mui/icons-material";
import test_img from "../../assets/courses/pic1.jpg";
import test_ppl_img from "../../assets/test_profile_img/pic3.jpg";
import { array } from "yup";
import { useNavigate } from "react-router-dom";
import { useGetCourseListQuery } from "@/apis/CourseApi";

const RatingStart = ({ point, index }) => {
  return index <= point ? (
    <Star sx={{ fontSize: 20, color: "#4c1864" }} />
  ) : (
    <Star sx={{ fontSize: 20, color: "#9e9e9e" }} />
  );
};
// const rows = [
//   {
//     id: 1,
//     courseCode: "CO3001",
//     name: "Nguyên lý ngôn ngữ lập trình",
//     instructor: "Nguyễn Hứa Phùng",
//     classCode: "L01",
//     price: 500000,
//     purchasedDate: "2021-10-10",
//     status: "Qua môn",
//     midTerm: 5,
//     finalTerm: 7,
//   },
//   {
//     id: 2,
//     courseCode: "CO3002",
//     name: "Cấu trúc dữ liệu và giải thuật",
//     instructor: "Trần Ngọc Bảo Duy",
//     classCode: "L02",
//     price: 500000,
//     purchasedDate: "2021-10-10",
//     status: "Qua môn",
//     midTerm: 5,
//     finalTerm: 7,
//   },
//   {
//     id: 3,
//     courseCode: "CO3003",
//     name: "Lập trình hướng đối tượng",
//     instructor: "Nguyễn Hứa Phùng",
//     classCode: "L03",
//     price: 500000,
//     purchasedDate: "2021-10-10",
//     status: "Qua môn",
//     midTerm: 5,
//     finalTerm: 7,
//   },
//   {
//     id: 4,
//     courseCode: "CO3004",
//     name: "Cơ sở dữ liệu",
//     instructor: "Trần Ngọc Bảo Duy",
//     classCode: "L04",
//     price: 500000,
//     purchasedDate: "2021-10-10",
//     status: "Qua môn",
//     midTerm: 5,
//     finalTerm: 7,
//   },
//   {
//     id: 5,
//     courseCode: "CO3005",
//     name: "Lập trình web",
//     instructor: "Nguyễn Hứa Phùng",
//     classCode: "L05",
//     price: 500000,
//     purchasedDate: "2021-10-10",
//     status: "Qua môn",
//     midTerm: 5,
//     finalTerm: 7,
//   },
//   {
//     id: 6,
//     courseCode: "CO3006",
//     name: "Hệ điều hành",
//     instructor: "Trần Ngọc Bảo Duy",
//     classCode: "L06",
//     price: 500000,
//     purchasedDate: "2021-10-10",
//     status: "Qua môn",
//     midTerm: 5,
//     finalTerm: 7,
//   },
//   {
//     id: 7,
//     courseCode: "CO3007",
//     name: "Mạng máy tính",
//     instructor: "Nguyễn Hứa Phùng",
//     classCode: "L07",
//     price: 500000,
//     purchasedDate: "2021-10-10",
//     status: "Qua môn",
//     midTerm: 5,
//     finalTerm: 7,
//   },
//   {
//     id: 8,
//     courseCode: "CO3008",
//     name: "An toàn thông tin",
//     instructor: "Trần Ngọc Bảo Duy",
//     classCode: "L08",
//     price: 500000,
//     purchasedDate: "2021-10-10",
//     status: "Qua môn",
//     midTerm: 5,
//     finalTerm: 7,
//   },
//   {
//     id: 9,
//     courseCode: "CO3008",
//     name: "An toàn thông tin",
//     instructor: "Trần Ngọc Bảo Duy",
//     classCode: "L08",
//     price: 500000,
//     purchasedDate: "2021-10-10",
//     status: "Qua môn",
//     midTerm: 5,
//     finalTerm: 7,
//   },
// ];
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
const StudentCourse = () => {
  const [id, setId] = React.useState(null);
  const navigate = useNavigate();
  const [course, setCourse] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [courseDetail, setCourseDetail] = React.useState(null);
  const handleClose = () => {
    setId(null);
    setOpen(false);
  };
  const [filter, setFilter] = useState("all");

  const handleChange = (event, newValue) => {
    setValue(newValue.props.value);
  };
  const [activePage, setActivePage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const handleActivePage = (event, value) => {
    setActivePage(value);
  };
  const {
    data: studentCourses,
    isLoading,
    isError,
  } = useGetStudentCoursesQuery({ page: activePage - 1, size: pageSize });
  const {
    data: sections,
    isLoading: loadingSection,
    isError: errorSection,
  } = useGetCourseListQuery(id, {
    skip: !id,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth < 1024 && window.innerWidth >= 768
  );
  // const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024 && window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (filter === "all") {
      setFilteredCourses(studentCourses?.payload);
    } else {
      const filtered = studentCourses?.payload.filter(
        (course) => course.isComplete === (filter === true)
      );
      setFilteredCourses(filtered);
    }
  }, [filter, studentCourses]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
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
  const handleClickOpen = (id) => {
    setId(id);
    setCourse(
      studentCourses?.payload.find((item) => item.course.courseId === id)
    );
  };
  const handleStudyBtn = (id) => {
    navigate("/student/" + id);
  };
  const handleTakeCertBtn = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="mt-5">
      <BreadCrumbsDashboard name="Course" />
      {/* <TableContainer component={Paper} className="mt-10">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {isMobile ? (
                <>
                  <TableCell>STT</TableCell>
                  <TableCell align="center">Course Id</TableCell>
                  <TableCell align="center">Enrollment Id</TableCell>
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
                </>
              ) : isTablet ? (
                <>
                  <TableCell>STT</TableCell>
                  <TableCell align="center">Course Id</TableCell>
                  <TableCell align="center">Enrollment Id</TableCell>
                  <TableCell align="center">Enrollment Date</TableCell>
                  <TableCell align="center">Status</TableCell>
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
                </>
              ) : (
                <>
                  <TableCell>STT</TableCell>
                  <TableCell align="center">Course Id</TableCell>
                  <TableCell align="center">Enrollment Id</TableCell>
                  <TableCell align="center">Enrollment Date</TableCell>
                  <TableCell align="center">Status</TableCell>
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
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {studentCourses.payload
              .slice((activePage - 1) * 10, activePage * 10)
              .map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => handleClickOpen(row.courseId)}
                  >
                    {index + 1}
                  </TableCell>
                  {isMobile ? (
                    <>
                      <TableCell
                        align="center"
                        onClick={() => handleClickOpen(row.courseId)}
                      >
                        {row.courseId}
                      </TableCell>
                      <TableCell align="center">{row.enrollmentId}</TableCell>
                    </>
                  ) : isTablet ? (
                    <>
                      <TableCell
                        align="center"
                        onClick={() => handleClickOpen(row.courseId)}
                      >
                        {row.courseId}
                      </TableCell>
                      <TableCell align="center">{row.enrollmentId}</TableCell>
                      <TableCell align="center">
                        {Date(row.enrollmentDate).slice(0, 15)}
                      </TableCell>
                      <TableCell align="center">{row.isComplete}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell
                        align="center"
                        onClick={() => handleClickOpen(row.courseId)}
                      >
                        {row.courseId}
                      </TableCell>
                      <TableCell align="center">{row.enrollmentId}</TableCell>
                      <TableCell align="center">
                        {Date(row.enrollmentDate).slice(0, 15)}
                      </TableCell>
                      <TableCell align="center">
                        {row.isComplete ? "Hoàn thành" : "Đang học"}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <div className="flex justify-between my-auto mt-5">
        <Typography variant="small" className="!my-auto">
          {studentCourses.metadata.pagination.totalItems} courses
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
      <div className="flex flex-col gap-4 mt-4">
        {filteredCourses?.map((course, index) => (
          <Card key={course?.course?.courseId || index}>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-5 justify-center items-center md:items-start">
                <div>
                  <div
                    data-testid="img"
                    className="w-full h-60 box-border overflow-hidden rounded-md"
                    onClick={() => handleClickOpen(course?.course?.courseId)}
                  >
                    <img
                      src={course?.course?.courseThumbnail}
                      className="w-full h-60"
                    />
                  </div>
                  <div className="w-full flex flex-row justify-between gap-2 mt-4">
                    {course.isComplete === true && (
                      <SaveButton
                        className="text-sm px-3 py-2 w-full rounded-full border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white break-all"
                        data-testid="take-cert-btn"
                        onClick={() =>
                          handleTakeCertBtn(course?.certificateLink)
                        }
                      >
                        Certificate
                      </SaveButton>
                    )}
                    <button
                      className="text-sm px-3 py-2 rounded-full w-full border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white"
                      data-testid="study-btn"
                      onClick={() => handleStudyBtn(course.course.courseId)}
                    >
                      Enter Class
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:w-11/12 xl:w-5/6 2xl:w-2/3">
                  <div className="flex flex-col gap-4 w-full md:min-h-60">
                    <div
                      data-testid="title"
                      className="text-xl font-semibold"
                      onClick={() => handleClickOpen(course?.course?.courseId)}
                    >
                      {course?.course?.title}
                    </div>
                    <div className="grid grid-col-1 md:flex md:flex-wrap md:justify-around md:gap-20 md:items-center gap-4">
                      <div className="flex flex-row gap-3 items-center">
                        <div className="flex flex-col">
                          <div className="text-xs font-medium text-gray-500">
                            Teacher
                          </div>
                          <div className="text-base font-medium">
                            {course?.course?.instructorName}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-xs font-medium text-gray-500">
                          Catagories
                        </div>
                        <div className="text-base font-medium">
                          {course?.course?.categoryName}
                        </div>
                      </div>
                      {course.isComplete === true ? (
                        <button className="rounded-full bg-teal-400 text-white text-sm px-2 py-1">
                          Completed
                        </button>
                      ) : (
                        <button className="rounded-full bg-teal-400 text-white text-sm px-2 py-1">
                          On-going
                        </button>
                      )}
                      {/* 
                      <div className="flex flex-col ml-auto">
                        <div className="text-xs line-through font-medium text-gray-500">
                          $190
                        </div>
                        <div className="text-lg font-semibold">$120</div>
                      </div> */}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-base font-semibold ">
                        Course Description
                      </div>
                      <p className="text-sm h-[150px] overflow-auto">
                        {course?.course?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-5">
        {studentCourses.metadata.pagination.totalPages > 1 && (
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
        {studentCourses.metadata.pagination.totalPages > 1 && (
          <Pagination
            count={studentCourses.metadata.pagination.totalPages}
            page={activePage}
            onChange={handleActivePage}
          />
        )}
      </div>
      {course && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg"
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-title" className="!font-bold !text-2xl">
            {course.courseId}
          </DialogTitle>
          <DialogContent>
            {loadingSection ? (
              <Loader />
            ) : (
              <DialogContentText id="alert-dialog-description">
                <Container>
                  <div className="grid grid-cols-1 md:grid-cols-4 h-full gap-4 leading-10">
                    <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                      <Typography variant="h6" className="font-bold ">
                        Course Information
                      </Typography>
                    </div>
                    <div className="md:col-span-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 text-center">
                        <Typography variant="medium" className="font-bold ">
                          Name:
                        </Typography>
                        <Typography variant="small">
                          {course.course.title}
                        </Typography>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2  text-center">
                        <Typography variant="medium" className="font-bold">
                          Course Id:
                        </Typography>
                        <Typography variant="small">
                          {course.course.courseId}
                        </Typography>
                      </div>
                      {/* <div className="grid grid-cols-1 md:grid-cols-2  text-center">
                      <Typography variant="medium" className="font-bold">
                        Giá tiền:
                      </Typography>
                      <Typography variant="small">
                        {rows[id].price.toLocaleString("en-US")} đ
                      </Typography>
                    </div> */}
                    </div>
                    <Divider className="md:col-span-4" />
                    <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                      <Typography variant="h6" className="font-bold">
                        Class Information
                      </Typography>
                    </div>
                    <div className="md:col-span-3">
                      {/* <div className="grid grid-cols-1 md:grid-cols-2  text-center">
                      <Typography variant="medium" className="font-bold">
                        Giảng viên phụ trách
                      </Typography>
                      <Typography variant="small">
                        {rows[id].instructor}
                      </Typography>
                    </div> */}
                      <div className="grid grid-cols-1 md:grid-cols-2  text-center">
                        <Typography variant="medium" className="font-bold">
                          Enrollment Id:
                        </Typography>
                        <Typography variant="small">
                          {course.enrollmentId}
                        </Typography>
                      </div>
                      <div className="md:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2  text-center">
                          <Typography variant="medium" className="font-bold">
                            Enrollment Date
                          </Typography>
                          <Typography variant="small">
                            {Date(course.enrollmentDate).slice(0, 15)}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <Divider className="md:col-span-4" />
                    <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                      <Typography variant="h6" className="font-bold">
                        Appendix
                      </Typography>
                    </div>
                    <div className="md:col-span-3">
                      {courseDetail?.payload.sections.map((section, index) => (
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
                    {/* <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                    <Typography variant="h6" className="font-bold text-center ">
                      Bảng điểm
                    </Typography>
                  </div>
                  <div className="md:col-span-3">
                    <div className="grid grid-cols-2 md:grid-cols-4">
                      <div className="flex flex-col items-center justify-around">
                        <Typography variant="medium" className="font-bold">
                          Giữa kì
                        </Typography>
                        <Typography variant="small">
                          {rows[id].midTerm ? rows[id].midTerm : <></>}
                        </Typography>
                      </div>
                      <div className="flex flex-col items-center justify-around">
                        <Typography variant="medium" className="font-bold">
                          Cuối kì
                        </Typography>
                        <Typography variant="small">
                          {rows[id].midTerm ? rows[id].finalTerm : <></>}
                        </Typography>
                      </div>
                      <div className="flex flex-col items-center justify-around">
                        <Typography variant="medium" className="font-bold">
                          Tổng kết
                        </Typography>
                        <Typography variant="small">
                          {rows[id].midTerm && rows[id].finalTerm ? (
                            rows[id].midTerm * 0.4 + rows[id].finalTerm * 0.6
                          ) : (
                            <></>
                          )}
                        </Typography>
                      </div>
                      <div className="flex flex-col items-center justify-around">
                        <Typography variant="medium" className="font-bold">
                          Đánh giá
                        </Typography>
                        <Typography variant="small">
                          {rows[id].midTerm && rows[id].finalTerm ? (
                            rows[id].midTerm * 0.4 + rows[id].finalTerm * 0.6 >=
                            5 ? (
                              "Đạt"
                            ) : (
                              "Không đạt"
                            )
                          ) : (
                            <></>
                          )}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="h-full flex items-center border-b-2 mx-auto md:border-r-2 md:border-b-0 md:mx-4 text-left">
                    <Typography variant="h6" className="font-bold text-center ">
                      Chứng chỉ
                    </Typography>
                  </div>
                  <div className="md:col-span-3 mx-auto">
                    <a href="https://www.google.com/">
                      https://www.google.com/
                    </a>
                  </div> */}
                  </div>
                </Container>
              </DialogContentText>
            )}
          </DialogContent>
          {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
        </Dialog>
      )}
    </div>
  );
};

export default StudentCourse;
