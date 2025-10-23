import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCurrentSectionQuery,
  useGetCourseListQuery,
  useGetSectionQuery,
  useUpdateCompletedSectionMutation,
} from "@/apis/CourseApi";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  SidebarProvider,
  useSidebar,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { H4 } from "@/components/ui/typography";
import {
  HeadphonesIcon,
  Sidebar as SidebarIcon,
  BookOpen as BookOpenIcon,
  Microphone as MicrophoneIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  CheckCircle as CheckCircleIcon,
} from "@phosphor-icons/react";
import Loader from "@/components/common/Loader";
import logo from "/hoctiengvietai_white.svg";

/** ******************************
 * Types & Constants
 *********************************/
export type SessionType = "LISTEN" | "READING" | "SPEAKING";

type ContentItem = {
  type: "DOCUMENT" | "VIDEO" | "IMAGE" | "TEXT";
  content: string;
  position: string | number;
  id: number;
  sectionId: number;
};

type BasicQuestionItem = {
  questionId: number;
  questionText: string;
  sectionId: number;
};

type SectionApiDataV2 = {
  contents: ContentItem[];
  questions?: BasicQuestionItem[];
};

type StudentAnswer = {
  answerId: number;
  studentId: number;
  studentName: string;
  answerText: string;
  score?: number | null;
  note?: string | null;
};

const SESSION_TYPE_CONFIG: Record<
  SessionType,
  { icon: any; label: string; color: string; description: string }
> = {
  LISTEN: {
    icon: HeadphonesIcon,
    label: "Listening",
    color: "bg-blue-500",
    description: "Listen and learn",
  },
  READING: {
    icon: BookOpenIcon,
    label: "Reading",
    color: "bg-green-500",
    description: "Read and understand",
  },
  SPEAKING: {
    icon: MicrophoneIcon,
    label: "Speaking",
    color: "bg-orange-500",
    description: "Practice speaking",
  },
};

/** ******************************
 * Sidebar (left)
 *********************************/
function StudySidebar({
  sections,
  currentSectionId,
  onSectionSelect,
  studentProgress,
}: {
  sections: any[];
  currentSectionId: number | null;
  onSectionSelect: (sectionId: number) => void;
  studentProgress: any;
}) {
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="fixed left-0 top-0 h-screen w-64 sm:w-64 z-40">
      <SidebarHeader>
        <img src={logo} className="px-2 invert w-fit h-10 object-contain" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Course Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Array.isArray(sections) && sections.length > 0 ? (
                sections.map((section) => {
                  const isActive = Number(section.sectionId) === Number(currentSectionId);
                  const isCompleted =
                    Number(studentProgress?.sectionId) === Number(section.sectionId) &&
                    studentProgress?.progress === 100;
                  const isAccessible = !!studentProgress;
                  const sessionType: SessionType = section.sessionType || "READING";
                  const config = SESSION_TYPE_CONFIG[sessionType];

                  return (
                    <SidebarMenuItem key={section.sectionId}>
                      <SidebarMenuButton
                        asChild={false}
                        isActive={isActive}
                        disabled={!isAccessible}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (isAccessible && section.sectionId) onSectionSelect(section.sectionId);
                        }}
                        className={[
                          isActive
                            ? "bg-primary/20 text-primary border-l-4 border-l-primary font-semibold"
                            : "hover:bg-muted/50",
                          !isAccessible ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                          "relative transition-all duration-200",
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className={`p-1 rounded-full ${config.color} text-white flex-shrink-0`}>
                            <config.icon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">Section {section.position}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {section.sectionName || section.title}
                            </div>
                          </div>
                          {isCompleted && <CheckCircleIcon size={16} className="text-green-500 flex-shrink-0" />}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              ) : (
                <div className="p-4 text-center text-muted-foreground">No sections available</div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant="ghost"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSidebar();
      }}
      className="!p-4"
    >
      <SidebarIcon className="!size-8" weight="duotone" />
    </Button>
  );
}

/** ******************************
 * Content (right) renderers
 *********************************/
function DocumentOrText({ item }: { item: ContentItem }) {
  return (
    <Card className="overflow-hidden border-l-4 border-l-primary/20">
      <CardContent className="p-8">
        {item.type === "DOCUMENT" ? (
          <div
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-li:text-foreground"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        ) : (
          <div className="whitespace-pre-wrap text-foreground leading-relaxed">{item.content}</div>
        )}
      </CardContent>
    </Card>
  );
}

function ImageBlock({ src }: { src: string }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <img src={src} alt="Session image" className="w-full h-auto object-cover rounded-lg" loading="lazy" />
      </CardContent>
    </Card>
  );
}

function VideoBlock({ src }: { src: string }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <video src={src} controls className="w-full h-full object-contain" preload="metadata">
            Your browser does not support the video tag.
          </video>
        </div>
      </CardContent>
    </Card>
  );
}

/** ******************************
 * Instructor: answers list + grading
 *********************************/
function AnswersGradingPanel({
  question,
  courseId,
  sectionId,
  studentId,
}: {
  question: BasicQuestionItem;
  courseId?: string;
  sectionId: number;
  studentId?: string;
}) {
  // In real app, replace with your RTK Query hooks to load answers and submit grade.
  // For now, simple local state to demonstrate UI.
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<StudentAnswer[]>([]);
  const [pending, setPending] = useState<Record<number, { score: number | ""; note: string }>>({});

  // Simulated fetch on mount (replace with useGet...Query)
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        // Example: GET /api/instructor/courses/:courseId/sections/:sectionId/questions/:questionId/answers?studentId=...
        // const res = await fetch(...); const data = await res.json();
        // setAnswers(data.answers);
        if (!mounted) return;
        setAnswers([]); // start empty; plug real data here
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [courseId, sectionId, question.questionId, studentId]);

  const handleChange = (answerId: number, field: "score" | "note", value: string) => {
    setPending((prev) => ({
      ...prev,
      [answerId]: {
        score: field === "score" ? (value === "" ? "" : Number(value)) : prev[answerId]?.score ?? "",
        note: field === "note" ? value : prev[answerId]?.note ?? "",
      },
    }));
  };

  const handleSave = async (answer: StudentAnswer) => {
    const { score, note } = pending[answer.answerId] ?? { score: "", note: "" };
    if (score === "" || Number.isNaN(Number(score))) {
      alert("Vui lòng nhập điểm hợp lệ (0-10).");
      return;
    }
    try {
      // Example POST:
      // await fetch(`/api/.../grade`, { method: "POST", body: JSON.stringify({ score, note }) })
      // Update local state
      setAnswers((prev) =>
        prev.map((a) => (a.answerId === answer.answerId ? { ...a, score: Number(score), note } : a))
      );
      alert("Đã lưu điểm.");
    } catch (e) {
      alert("Lưu điểm thất bại.");
    }
  };

  return (
    <Card className="border-2 border-muted bg-white">
      <CardHeader>
        <CardTitle className="text-base">Bài làm của học sinh</CardTitle>
        <CardDescription>Câu hỏi: {question.questionText}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="text-sm text-muted-foreground">Đang tải danh sách trả lời...</div>
        ) : answers.length === 0 ? (
          <div className="text-sm text-muted-foreground">Chưa có câu trả lời nào.</div>
        ) : (
          <div className="space-y-4">
            {answers.map((ans) => (
              <div key={ans.answerId} className="p-4 rounded-md border">
                <div className="text-sm font-medium mb-2">
                  {ans.studentName} {ans.score != null && <span className="text-green-600">— Điểm: {ans.score}</span>}
                </div>
                <div className="text-sm whitespace-pre-wrap mb-3">{ans.answerText}</div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                  <div className="md:col-span-2">
                    <label className="text-xs text-muted-foreground">Điểm (0–10)</label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      step="0.5"
                      className="w-full border rounded-md p-2 text-sm"
                      value={pending[ans.answerId]?.score ?? ans.score ?? ""}
                      onChange={(e) => handleChange(ans.answerId, "score", e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="text-xs text-muted-foreground">Nhận xét</label>
                    <input
                      type="text"
                      className="w-full border rounded-md p-2 text-sm"
                      value={pending[ans.answerId]?.note ?? ans.note ?? ""}
                      onChange={(e) => handleChange(ans.answerId, "note", e.target.value)}
                      placeholder="Nhập nhận xét ngắn…"
                    />
                  </div>
                  <div className="md:col-span-1 flex items-end">
                    <Button className="w-full" onClick={() => handleSave(ans)}>
                      Lưu điểm
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/** ******************************
 * Per-section content + questions
 *********************************/
function ContentRenderer({
  contents,
  questions,
}: {
  contents: ContentItem[];
  questions: BasicQuestionItem[];
}) {
  const sortedContents = useMemo(() => {
    if (!Array.isArray(contents)) return [] as ContentItem[];
    return [...contents].sort((a, b) => {
      const posA = typeof a.position === "string" ? parseInt(a.position) : a.position || 0;
      const posB = typeof b.position === "string" ? parseInt(b.position) : b.position || 0;
      return posA - posB;
    });
  }, [contents]);

  if (!sortedContents.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No content available for this section</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedContents.map((item) => {
        if (item.type === "DOCUMENT" || item.type === "TEXT") {
          return (
            <div key={item.id}>
              <DocumentOrText item={item} />
            </div>
          );
        }
        if (item.type === "IMAGE") return <ImageBlock key={item.id} src={item.content} />;
        if (item.type === "VIDEO") return <VideoBlock key={item.id} src={item.content} />;
        return null;
      })}

      {/* Questions (open-ended) + student answers + grading */}
      {questions?.length > 0 && (
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-semibold">Câu hỏi ôn tập</h3>
          {questions.map((q) => (
            <AnswersGradingPanel
              key={q.questionId}
              question={q}
              // Pass identifiers so you can plug your real endpoints inside the panel
              sectionId={q.sectionId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** ******************************
 * Page main content & logic
 *********************************/
function StudyContent({
  currentSectionId,
  setCurrentSectionId,
  isUserNavigation,
  onUserNavigation,
}: {
  currentSectionId: number | null;
  setCurrentSectionId: (id: number | null) => void;
  isUserNavigation: boolean;
  onUserNavigation?: () => void;
}) {
  const { courseId } = useParams();

  // Queries
  const { data: courseSectionList, isLoading: isLoadingSectionList, isError: isErrorSectionList } =
    useGetCourseListQuery(courseId);
  const { data: studentCourseProgress, isLoading: isLoadingStudentProgress, isError: isErrorStudentProgress } =
    useGetCurrentSectionQuery(courseId);
  const { data: section, isLoading: isLoadingSection, isError: isErrorSection } = useGetSectionQuery(currentSectionId, {
    skip: !currentSectionId,
  });
  const [updateCompletedSection, { isLoading: isUpdatingSection }] = useUpdateCompletedSectionMutation();

  // Derived values
  const sections = courseSectionList?.data?.sections ?? [];
  // Support both legacy array response and new wrapper { contents, questions }
  const rawSection = section?.data as SectionApiDataV2 | ContentItem[] | undefined;
  const contents: ContentItem[] = Array.isArray(rawSection)
    ? (rawSection as ContentItem[])
    : (rawSection?.contents ?? []);
  const questions: BasicQuestionItem[] = Array.isArray(rawSection) ? [] : (rawSection?.questions ?? []);

  const currentSectionMeta = useMemo(
    () => sections.find((s: any) => Number(s.sectionId) === Number(currentSectionId)),
    [sections, currentSectionId]
  );
  const currentIndex = useMemo(
    () => Math.max(0, sections.findIndex((s: any) => Number(s.sectionId) === Number(currentSectionId))),
    [sections, currentSectionId]
  );
  const sessionType: SessionType = (currentSectionMeta?.sessionType as SessionType) || "READING";
  const config = SESSION_TYPE_CONFIG[sessionType];
  const isCompleted = Boolean(
    studentCourseProgress?.data?.isLastSection && studentCourseProgress?.data?.progress === 100
  );
  const sectionsLength = sections.length || 0;
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < Math.max(0, sectionsLength - 1);

  // Effects: sync current section & mark completed on user nav
  useEffect(() => {
    if (studentCourseProgress?.data?.sectionId) setCurrentSectionId(studentCourseProgress.data.sectionId);
  }, [studentCourseProgress?.data?.sectionId, setCurrentSectionId]);

  const [previousSectionId, setPreviousSectionId] = useState<number | null>(null);
  useEffect(() => {
    if (currentSectionId && isUserNavigation && !isUpdatingSection && currentSectionId !== previousSectionId) {
      const timer = setTimeout(() => {
        updateCompletedSection(currentSectionId).catch(() => void 0);
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (currentSectionId !== previousSectionId) setPreviousSectionId(currentSectionId);
  }, [currentSectionId, isUserNavigation, updateCompletedSection, isUpdatingSection, previousSectionId]);

  // Nav handlers
  const handlePreviousSection = useCallback(() => {
    if (!sections.length || currentSectionId == null) return;
    const currentIdx = sections.findIndex((s: any) => Number(s.sectionId) === Number(currentSectionId));
    if (currentIdx <= 0) return;
    onUserNavigation?.();
    setCurrentSectionId(Number(sections[currentIdx - 1].sectionId));
  }, [sections, currentSectionId, onUserNavigation, setCurrentSectionId]);

  const handleNextSection = useCallback(async () => {
    if (!sections.length || currentSectionId == null) return;
    const currentIdx = sections.findIndex((s: any) => Number(s.sectionId) === Number(currentSectionId));
    if (currentIdx < 0 || currentIdx >= sections.length - 1) return;

    const nextId = Number(sections[currentIdx + 1].sectionId);
    onUserNavigation?.();
    setCurrentSectionId(nextId);
    try {
      await updateCompletedSection(currentSectionId);
    } catch {
      /* ignore */
    }
  }, [sections, currentSectionId, onUserNavigation, setCurrentSectionId, updateCompletedSection]);

  // Loading & error states
  if (isLoadingSectionList || isLoadingStudentProgress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }
  if (isErrorSectionList || isErrorStudentProgress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Course</h2>
          <p className="text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-4">
      {/* Header */}
      <header className="h-16 flex items-center gap-4 border-b mb-8 bg-background/95 backdrop-blur-sm">
        <SidebarTrigger />
        <div className="flex items-center gap-3 flex-1">
          <div className={`p-2 rounded-lg ${config.color} text-white`}>
            <config.icon size={20} />
          </div>
          <div className="flex-1">
            <H4 className="font-bold text-xl">{courseSectionList?.data?.title || "Course Title"}</H4>
          </div>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                <CheckCircleIcon size={12} className="mr-1" />
                Completed
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              {currentIndex + 1} / {sectionsLength}
            </Badge>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto pb-20 bg-gray-50/50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {/* Left: lesson intro */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 shadow-lg border-0 bg-white">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpenIcon size={24} className="text-blue-600" />
                  </div>
                  Giới thiệu bài học
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Giới thiệu phần học</h4>
                    <div className="text-sm leading-relaxed">
                      {currentSectionMeta?.description ||
                        courseSectionList?.data?.description ||
                        "Trong bài học này, các em sẽ được rèn luyện kỹ năng giới thiệu, phân tích và đánh giá một truyện kể dựa trên cả hai phương diện: nội dung (cốt truyện, nhân vật, ý nghĩa) và nghệ thuật (ngôn ngữ, kết cấu, giọng điệu...)."}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Các em có thể làm được gì sau khi học xong?</h4>
                    <div className="text-sm text-muted-foreground">Rèn luyện kỹ năng phân tích và thuyết trình</div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Luyện tập nói và nghe như thế nào?</h4>
                    <div className="text-sm text-muted-foreground">Thực hành qua các hoạt động tương tác</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: main section content */}
          <div className="lg:col-span-2">
            {isLoadingSection ? (
              <div className="flex items-center justify-center py-12">
                <Loader />
              </div>
            ) : isErrorSection ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-destructive mb-2">Error Loading Section</h3>
                <p className="text-muted-foreground">Please try again</p>
              </div>
            ) : contents?.length ? (
              <div className="space-y-8">
                <Card className="border-0 bg-white shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${config.color} text-white`}>
                        <config.icon size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {currentSectionMeta?.sectionName || `Phần ${currentIndex + 1}: ${config.label}`}
                        </h2>
                        <h3 className="text-lg font-medium text-gray-600 mt-1">
                          {currentSectionMeta?.title || "Hoạt động 1"}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <h2 className="text-2xl font-bold text-gray-800">
                  {currentSectionMeta?.description || "Nội dung bài học"}
                </h2>

                <ContentRenderer contents={contents} questions={questions} />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No content available for this section</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t">
        <div className="flex justify-between items-center p-4 max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              handlePreviousSection();
            }}
            disabled={!canGoPrevious}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon size={16} />
            Previous
          </Button>

          <div className="text-center">
            <div className="text-sm font-medium">
              Progress: {currentIndex + 1} / {sectionsLength}
            </div>
            <div className="w-32 bg-muted rounded-full h-2 mt-1">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / Math.max(1, sectionsLength)) * 100}%` }}
              />
            </div>
          </div>

          <Button
            onClick={(e) => {
              e.preventDefault();
              handleNextSection();
            }}
            disabled={!canGoNext || isUpdatingSection}
            className="flex items-center gap-2"
          >
            {isUpdatingSection ? "Updating..." : "Next"}
            <ArrowRightIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

/** ******************************
 * Page shell
 *********************************/
export default function NewStudentStudy() {
  const [open, setOpen] = useState(true);
  const [currentSectionId, setCurrentSectionId] = useState<number | null>(null);
  const { courseId } = useParams();

  // Keep track of whether the last section change was user-initiated
  const [lastChangeWasUserNav, setLastChangeWasUserNav] = useState(false);

  const { data: courseSectionList, isLoading: isLoadingSectionList } = useGetCourseListQuery(courseId);
  const { data: studentCourseProgress, isLoading: isLoadingStudentProgress } = useGetCurrentSectionQuery(courseId);

  const handleSectionSelect = useCallback((sectionId: number) => {
    setLastChangeWasUserNav(true);
    setCurrentSectionId(sectionId);
  }, []);

  const handleUserNavigation = useCallback(() => setLastChangeWasUserNav(true), []);

  // Reset the flag shortly after a change so we don't spam the API
  useEffect(() => {
    if (lastChangeWasUserNav && currentSectionId) {
      const timer = setTimeout(() => setLastChangeWasUserNav(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [lastChangeWasUserNav, currentSectionId]);

  useEffect(() => {
    if (studentCourseProgress?.data?.sectionId) {
      setLastChangeWasUserNav(false);
      setCurrentSectionId(studentCourseProgress.data.sectionId);
    }
  }, [studentCourseProgress?.data?.sectionId]);

  if (isLoadingSectionList || isLoadingStudentProgress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="min-h-screen bg-background">
        <StudySidebar
          sections={courseSectionList?.data?.sections || []}
          currentSectionId={currentSectionId}
          onSectionSelect={handleSectionSelect}
          studentProgress={studentCourseProgress?.data}
        />

        <div
          className="transition-[margin-left] duration-300 ease-in-out"
          style={{ marginLeft: open ? "var(--sidebar-width, 16rem)" : "var(--sidebar-width-icon, 3rem)" }}
        >
          <StudyContent
            currentSectionId={currentSectionId}
            setCurrentSectionId={setCurrentSectionId}
            isUserNavigation={lastChangeWasUserNav}
            onUserNavigation={handleUserNavigation}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
