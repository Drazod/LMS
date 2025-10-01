import { useEffect, useState } from "react";
import {
  useGetCourseDetailsQuery,
  useGetCourseListQuery,
  useGetSectionQuery,
  useUpdateCompletedSectionMutation,
} from "@/apis/CourseApi";
import { useParams } from "react-router-dom";

import Loader from "@/components/Loader";
import StudySidebar from "@/components/Dashboard/StudySidebar";
import DashboardNavBar from "@/components/admin_dashboard/DashboardNavBar";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";

const StudentStudy = () => {
  const [menuToggle, setMenuToggle] = useState(true);
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const handleMenuToggle = () => setMenuToggle(!menuToggle);
  const handleCourseComplete = () => setIsCourseCompleted(true);

  const { courseId } = useParams();

  const {
    data: courseSectionList,
    isLoading: isLoadingSectionList,
    isError: isErrorSectionList,
  } = useGetCourseListQuery(courseId);

  const {
    data: studentCourseProgress,
    isLoading: isLoadingStudentProgress,
    isError: isErrorStudentProgress,
  } = useGetCourseDetailsQuery(courseId);

  const {
    data: section,
    isLoading: isLoadingSection,
    isError: isErrorSection,
    refetch: refetchSection,
  } = useGetSectionQuery(currentSectionId, {
    skip: !currentSectionId,
  });

  useEffect(() => {
    if (studentCourseProgress?.payload.courseCompleted === true) {
      setCurrentSectionId(
        courseSectionList?.payload.sections[courseSectionList?.payload.sections.length - 1]?.sectionId
      );
      setIsCourseCompleted(true);
    } else if (studentCourseProgress) {
      setCurrentSectionId(studentCourseProgress.payload.sectionId);
      setIsCourseCompleted(false);
    }
  }, [studentCourseProgress, courseSectionList]);

  const handleItemClick = (sectionId) => {
    setCurrentSectionId(sectionId);
    refetchSection();
  };

  const [updateCompletedSection, { isLoading: isUpdated, error: updateError }] =
    useUpdateCompletedSectionMutation();

  if (isLoadingStudentProgress || isLoadingSectionList || isLoadingSection)
    return <Loader />;
  if (isErrorStudentProgress || isErrorSectionList || isErrorSection)
    return <div>Error</div>;

  const handleNextSection = async () => {
    const nextSection =
      courseSectionList?.payload.sections.find(
        (section) => section.sectionId === currentSectionId
      )?.position + 1;
    if (
      nextSection > studentCourseProgress.payload.position &&
      studentCourseProgress.payload.courseCompleted === false
    ) {
      await updateCompletedSection(currentSectionId);
    } else {
      setCurrentSectionId(
        courseSectionList?.payload.sections.find(
          (section) => section.position === nextSection
        )?.sectionId
      );
    }
  };

  const handlePreviousSection = () => {
    const previousSection =
      courseSectionList?.payload.sections.find(
        (section) => section.sectionId === currentSectionId
      )?.position - 1;
    setCurrentSectionId(
      courseSectionList?.payload.sections.find(
        (section) => section.position === previousSection
      )?.sectionId
    );
  };

  return (
    <div className="w-full h-screen flex flex-row">
      <StudySidebar
        open={menuToggle}
        onClose={handleMenuToggle}
        position={isCourseCompleted
          ? courseSectionList.payload.sections.length
          : studentCourseProgress.payload.position}
        select={currentSectionId
          ? currentSectionId
          : courseSectionList.payload.sections[courseSectionList.payload.sections.length - 1].sectionId}
        sections={courseSectionList}
        onItemClick={handleItemClick} sidebar={[]}
      />
      <div className="flex flex-col flex-grow">
        <DashboardNavBar
          menuToggle={menuToggle}
          handleMenuToggle={handleMenuToggle}
        />
        <div className="flex p-7 flex-col lg:flex-row flex-grow overflow-auto w-full">
          <div className="w-full lg:w-fit">
            {/* Progress Indicator */}
            <div className="mb-4 flex items-center gap-4">
              <div className="font-semibold text-lg">
                Progress: Section {courseSectionList?.payload?.sections?.findIndex(s => s.sectionId === currentSectionId) + 1} / {courseSectionList?.payload?.sections?.length}
              </div>
              {isCourseCompleted && (
                <span className="text-green-600 font-bold">Course Completed!</span>
              )}
            </div>
          </div>
          <div className="w-full h-full p-9 overflow-y-auto">
            <div className="mt-5 mb-15">
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
            <Button
              variant="outline"
              color="warning"
              disabled={
                courseSectionList.payload.sections.find(
                  (section) => section.sectionId === currentSectionId
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
            </Button>
            <Button
              className="!rounded-lg"
              onClick={handleNextSection}
              disabled={
                courseSectionList?.payload.sections?.find(
                  (section) => section.sectionId === currentSectionId
                )?.position ===
                courseSectionList?.payload.sections[courseSectionList.payload.sections.length - 1]
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
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStudy;
