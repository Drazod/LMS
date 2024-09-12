import React, { useEffect, useState } from "react";
import BreadCrumbsDashboard from "../BreadCrumbsDashboard";
import DashboardSidebar from "../Dashboard/DashboardSidebar";
import DashboardNavBar from "../admin_dashboard/DashboardNavBar";
import {
  useGetCourseDetailsQuery,
  useGetCourseListQuery,
  useGetSectionQuery,
  useUpdateCompletedSectionMutation,
} from "@/apis/CourseApi";
import Loader from "../Loader";
import { useLocation, useParams } from "react-router-dom";
import StudySidebar from "../Dashboard/StudySidebar";
import { useSelector } from "react-redux";
import { Button, Card, CardContent, CardMedia, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
const NextButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#d8a409"),
  backgroundColor: "#d8a409",
  "&:hover": {
    color: theme.palette.getContrastText("#4d0a91"),
    backgroundColor: "#4d0a91",
  },
}));
const PrevButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[800]),
  backgroundColor: grey[800],
  "&:hover": {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
  },
}));
const StudentStudy = () => {
  const [menuToggle, setMenuToggle] = useState(true);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [position, setPosition] = useState(null);
  const [onEnd, setOnEnd] = useState(false);
  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };
  const handleOnEnd = () => {
    setOnEnd(true);
  };

  const { courseId } = useParams();

  const {
    data: sections,
    isLoading: isLoadingCourseList,
    isError: isErrorCourseList,
  } = useGetCourseListQuery(courseId);

  const {
    data: courseDetails,
    isLoading: isLoadingCourseDetails,
    isError: isErrorCourseDetails,
  } = useGetCourseDetailsQuery(courseId);

  const {
    data: section,
    isLoading: isLoadingSection,
    isError: isErrorSection,
    refetch: refetchSection,
  } = useGetSectionQuery(selectedSectionId, {
    skip: !selectedSectionId,
  });

  useEffect(() => {
    if (courseDetails?.payload.courseCompleted === true) {
      setSelectedSectionId(
        sections?.payload.sections[sections?.payload.sections.length - 1]
          .sectionId
      );
    } else if (courseDetails) {
      setSelectedSectionId(courseDetails.payload.sectionId);
    }
  }, [courseDetails, sections]);

  const handleItemClick = (sectionId) => {
    setSelectedSectionId(sectionId);
    refetchSection();
  };

  const [updateCompletedSection, { isLoading: isUpdated, error: updateError }] =
    useUpdateCompletedSectionMutation();
  if (isLoadingCourseDetails || isLoadingCourseList || isLoadingSection)
    return <Loader />;
  if (isErrorCourseDetails || isErrorCourseList || isErrorSection)
    return <div>Error</div>;
  const handleNextSection = async () => {
    const nextSection =
      sections?.payload.sections.find(
        (section) => section.sectionId === selectedSectionId
      ).position + 1;
    if (
      nextSection > courseDetails.payload.position &&
      courseDetails.payload.courseCompleted === false
    ) {
      await updateCompletedSection(selectedSectionId);
    } else {
      setSelectedSectionId(
        sections?.payload.sections.find(
          (section) => section.position === nextSection
        ).sectionId
      );
    }
  };
  const handlePreviousSection = () => {
    const previousSection =
      sections?.payload.sections.find(
        (section) => section.sectionId === selectedSectionId
      )?.position - 1;
    setSelectedSectionId(
      sections?.payload.sections.find(
        (section) => section.position === previousSection
      ).sectionId
    );
  };
  // const List_sections = sections?.payload.sections?.map((section, index) => ({
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth={1.5}
  //       stroke="currentColor"
  //       className="size-6"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  //       />
  //     </svg>
  //   ),
  //   position: section.position,
  //   disable: section.position > courseDetails.payload.position,
  //   name: "Section " + (index + 1) + ": " + section.sectionName,
  // }));
  return (
    <div className="w-full h-screen flex flex-col">
      <DashboardNavBar
        menuToggle={menuToggle}
        handleMenuToggle={handleMenuToggle}
      />
      <div className="flex flex-col lg:flex-row flex-grow overflow-auto w-full">
        <div className="w-full lg:w-fit">
          <StudySidebar
            open={menuToggle}
            onClose={handleMenuToggle}
            // sidebar={List_sections}
            position={
              courseDetails.payload.courseCompleted === true
                ? sections.payload.sections.length
                : courseDetails.payload.position
            }
            select={
              selectedSectionId
                ? selectedSectionId
                : sections.payload.sections[
                    sections.payload.sections.length - 1
                  ].sectionId
            }
            sections={sections}
            onItemClick={handleItemClick}
          />
        </div>
        <div className="w-full h-full p-9 overflow-y-auto">
          <div className="mt-5 mb-15">
            <BreadCrumbsDashboard name={"Study Courses"} />
            <div className="mt-5 mb-5">
              {/* {section?.payload} */}
              <div className="w-full">
                <Card className="!mx-auto" sx={{ maxWidth: "95%" }}>
                  {section?.payload?.contents?.map((item) => {
                    if (item.type === "DOCUMENT") {
                      return (
                        <CardContent className="!p-4">
                          <div
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        </CardContent>
                      );
                    }
                    if (item.type === "VIDEO") {
                      return (
                        <CardContent className="!p-4">
                          <div className="video-container">
                            <iframe
                              width="100%"
                              height="512"
                              src={item.content}
                              title="Video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </CardContent>
                      );
                    }
                  })}
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 w-full mt-5 flex justify-around bg-white py-4">
          <PrevButton
            variant="contained"
            color="warning"
            disabled={
              sections.payload.sections.find(
                (section) => section.sectionId === selectedSectionId
              )?.position === 0
            }
            className="!rounded-lg"
            onClick={handlePreviousSection}
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
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            Previous Section
          </PrevButton>
          <NextButton
            className="!rounded-lg"
            onClick={handleNextSection}
            disabled={
              sections?.payload.sections?.find(
                (section) => section.sectionId === selectedSectionId
              )?.position ===
              sections?.payload.sections[sections.payload.sections.length - 1]
                ?.position
            }
          >
            Next Section
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
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </NextButton>
        </div>
      </div>
    </div>
  );
};

export default StudentStudy;
