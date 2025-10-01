import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCourseDetailsQuery,
  useGetCourseListQuery,
  useGetSectionQuery,
  useUpdateCompletedSectionMutation,
} from "@/apis/CourseApi";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  SidebarIcon,
  BookOpenIcon,
  MicrophoneIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from "@phosphor-icons/react";
import Loader from "@/components/Loader";
import logo from '/hoctiengvietai_white.svg';

// Types for the actual API data structure
interface ContentItem {
  type: 'DOCUMENT' | 'VIDEO' | 'IMAGE' | 'TEXT';
  content: string;
  position: number;
  id: number;
}

interface SessionData {
  sectionId: number;
  sectionName: string;
  title?: string;
  description?: string;
  sessionType?: 'LISTEN' | 'READING' | 'SPEAKING';
  position: number;
  contents: ContentItem[];
}

// Session type configuration
const sessionTypeConfig = {
  LISTEN: {
    icon: HeadphonesIcon,
    label: "Listening",
    color: "bg-blue-500",
    description: "Listen and learn"
  },
  READING: {
    icon: BookOpenIcon,
    label: "Reading",
    color: "bg-green-500", 
    description: "Read and understand"
  },
  SPEAKING: {
    icon: MicrophoneIcon,
    label: "Speaking",
    color: "bg-orange-500",
    description: "Practice speaking"
  }
};

function StudySidebar({ sections, currentSectionId, onSectionSelect, studentProgress }: {
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
              {sections?.map((section) => {
                const isActive = section.sectionId === currentSectionId;
                const isCompleted = studentProgress?.position > section.position;
                const isAccessible = section.position <= studentProgress?.position || studentProgress?.courseCompleted;
                const sessionType = section.sessionType || 'READING';
                const config = sessionTypeConfig[sessionType as keyof typeof sessionTypeConfig];
                
                return (
                  <SidebarMenuItem key={section.sectionId}>
                    <SidebarMenuButton
                      asChild={false}
                      isActive={isActive}
                      disabled={!isAccessible}
                      onClick={() => isAccessible && onSectionSelect(section.sectionId)}
                      className={`
                        ${isActive ? "bg-primary/10 text-primary" : ""} 
                        ${!isAccessible ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        relative
                      `}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className={`p-1 rounded-full ${config.color} text-white flex-shrink-0`}>
                          <config.icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            Section {section.position}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {section.sectionName || section.title}
                          </div>
                        </div>
                        {isCompleted && (
                          <CheckCircleIcon size={16} className="text-green-500 flex-shrink-0" />
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
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
    <Button variant="ghost" onClick={toggleSidebar} className="!p-4">
      <SidebarIcon className="!size-8" weight="duotone" />
    </Button>
  );
}

function ContentRenderer({ session }: { session: SessionData }) {
  if (!session || !session.contents) return null;
  
  console.log("Rendering session:", session);
  
  // Use the contents array directly from the API response
  const sortedContents = [...session.contents].sort((a, b) => a.position - b.position);

  return (
    <div className="space-y-6">
      {sortedContents.map((item) => {
        switch (item.type) {
          case 'DOCUMENT':
          case 'TEXT':
            return (
              <Card key={item.id} className="overflow-hidden border-l-4 border-l-primary/20">
                <CardContent className="p-8">
                  {item.type === 'DOCUMENT' ? (
                    <div 
                      className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-li:text-foreground"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  ) : (
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                      {item.content}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
            
          case 'IMAGE':
            return (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src={item.content} 
                    alt={`Session image`}
                    className="w-full h-auto object-cover rounded-lg"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            );
            
          case 'VIDEO':
            return (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <video 
                      src={item.content}
                      controls
                      className="w-full h-full object-contain"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </CardContent>
              </Card>
            );
            
          default:
            return null;
        }
      })}
      
      {/* Interactive Elements Section */}
      <Card className="mt-8 border-2 border-dashed border-muted-foreground/20">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
            >
              📝 Nộp bài ghi âm
            </Button>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="sm" className="rounded-full w-12 h-12 p-0">
                ⏺️
              </Button>
              <Button variant="outline" size="sm" className="rounded-full w-12 h-12 p-0">
                ⋮
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StudyContent({ currentSectionId, setCurrentSectionId }: {
  currentSectionId: number | null;
  setCurrentSectionId: (id: number | null) => void;
}) {
  const { courseId } = useParams();
  
  // API calls
  const {
    data: courseSectionList,
    isLoading: isLoadingSectionList,
    isError: isErrorSectionList,
  } = useGetCourseListQuery(courseId);
  console.log("courseSectionList", courseSectionList);
  const {
    data: studentCourseProgress,
    isLoading: isLoadingStudentProgress,
    isError: isErrorStudentProgress,
  } = useGetCourseDetailsQuery(courseId);

  const {
    data: section,
    isLoading: isLoadingSection,
    isError: isErrorSection,
  } = useGetSectionQuery(currentSectionId, {
    skip: !currentSectionId,
  });
 console.log("section", section);
  const [updateCompletedSection, { isLoading: isUpdatingSection }] =
    useUpdateCompletedSectionMutation();

  // Initialize current section
  useEffect(() => {
    if (studentCourseProgress?.payload.courseCompleted === true) {
      setCurrentSectionId(
        courseSectionList?.payload.sections[courseSectionList?.payload.sections.length - 1]?.sectionId
      );
    } else if (studentCourseProgress) {
      setCurrentSectionId(studentCourseProgress.payload.sectionId);
    }
  }, [studentCourseProgress, courseSectionList]);



  const handleNextSection = async () => {
    const currentSection = courseSectionList?.payload.sections.find(
      (section: any) => section.sectionId === currentSectionId
    );
    
    if (!currentSection) return;
    
    const nextPosition = currentSection.position + 1;
    const nextSection = courseSectionList?.payload.sections.find(
      (section: any) => section.position === nextPosition
    );

    if (nextSection) {
      // If this is a new section for the student, mark current as completed
      if (
        nextPosition > studentCourseProgress?.payload.position &&
        !studentCourseProgress?.payload.courseCompleted
      ) {
        await updateCompletedSection(currentSectionId);
      }
      setCurrentSectionId(nextSection.sectionId);
    }
  };

  const handlePreviousSection = () => {
    const currentSection = courseSectionList?.payload.sections.find(
      (section: any) => section.sectionId === currentSectionId
    );
    
    if (!currentSection) return;
    
    const previousPosition = currentSection.position - 1;
    const previousSection = courseSectionList?.payload.sections.find(
      (section: any) => section.position === previousPosition
    );

    if (previousSection) {
      setCurrentSectionId(previousSection.sectionId);
    }
  };

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

  // Use section.payload directly - it already has all section info + contents
  const currentSection = section?.payload;
  
  const currentIndex = courseSectionList?.payload.sections.findIndex(
    (s: any) => s.sectionId === currentSectionId
  );
  
  const sessionType = currentSection?.sessionType || 'READING';
  const config = sessionTypeConfig[sessionType as keyof typeof sessionTypeConfig];
  const isCompleted = studentCourseProgress?.payload.courseCompleted;
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < (courseSectionList?.payload.sections.length - 1);
  return (
    <div className="min-h-screen flex flex-col px-6 py-4"
    >
      {/* Header */}
      <header className="h-16 flex items-center gap-4 border-b mb-8 bg-background/95 backdrop-blur-sm">
        <SidebarTrigger />
        <div className="flex items-center gap-3 flex-1">
          <div className={`p-2 rounded-lg ${config.color} text-white`}>
            <config.icon size={20} />
          </div>
          <div className="flex-1">
            <H4 className="font-bold text-xl">
              {courseSectionList?.payload?.title || "Course Title"}
            </H4>
          </div>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                <CheckCircleIcon size={12} className="mr-1" />
                Completed
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              {(currentIndex || 0) + 1} / {courseSectionList?.payload.sections.length}
            </Badge>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-20 bg-gray-50/50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {/* Course Description Section - Left Side */}
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
                      {currentSection?.description || courseSectionList?.payload?.description || 
                        "Trong bài học này, các em sẽ được rèn luyện kỹ năng giới thiệu, phân tích và đánh giá một truyện kể dựa trên cả hai phương diện: nội dung (cốt truyện, nhân vật, ý nghĩa) và nghệ thuật (ngôn ngữ, kết cấu, giọng điệu...)."
                      }
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Các em có thể làm được gì sau khi học xong?</h4>
                    <div className="text-sm text-muted-foreground">
                      Rèn luyện kỹ năng phân tích và thuyết trình
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Luyện tập nói và nghe như thế nào?</h4>
                    <div className="text-sm text-muted-foreground">
                      Thực hành qua các hoạt động tương tác
                    </div>
                  </div>
                </div>
                
                {/* AI Helper Button */}
                <div className="mt-6 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-purple-300 hover:from-blue-100 hover:to-purple-100"
                  >
                    <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ✨ Trợ giúp AI
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Section - Right Side */}
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
            ) : section?.payload ? (
              <div className="space-y-8">
                {/* Section Title and Description */}
                <Card className="border-0 bg-white shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${config.color} text-white`}>
                        <config.icon size={24} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {currentSection?.sectionName || `Phần ${(currentIndex || 0) + 1}: ${config.label}`}
                        </h2>
                        <h3 className="text-lg font-medium text-gray-600 mt-1">
                          {currentSection?.title || "Hoạt động 1"}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <h2 className="text-2xl font-bold text-gray-800">
                    {currentSection?.description || "Nội dung bài học"}
                </h2>
                {/* Section Content */}
                <ContentRenderer session={section.payload} />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No content available for this section</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t">
        <div className="flex justify-between items-center p-4 max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePreviousSection}
            disabled={!canGoPrevious}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon size={16} />
            Previous
          </Button>
          
          <div className="text-center">
            <div className="text-sm font-medium">
              Progress: {(currentIndex || 0) + 1} / {courseSectionList?.payload.sections.length}
            </div>
            <div className="w-32 bg-muted rounded-full h-2 mt-1">
              <div 
                className="bg-primary h-2 rounded-full transition-all"
                style={{ 
                  width: `${((currentIndex || 0) + 1) / (courseSectionList?.payload.sections.length || 1) * 100}%` 
                }}
              />
            </div>
          </div>

          <Button
            onClick={handleNextSection}
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

export default function NewStudentStudy() {
  const [open, setOpen] = useState(true);
  const [currentSectionId, setCurrentSectionId] = useState<number | null>(null);
  const { courseId } = useParams();
  
  // Get course data for sidebar
  const {
    data: courseSectionList,
    isLoading: isLoadingSectionList,
  } = useGetCourseListQuery(courseId);

  const {
    data: studentCourseProgress,
    isLoading: isLoadingStudentProgress,
  } = useGetCourseDetailsQuery(courseId);

  const handleSectionSelect = (sectionId: number) => {
    setCurrentSectionId(sectionId);
  };

  // Initialize current section when data loads
  useEffect(() => {
    console.log("Course sections:", courseSectionList?.payload?.sections);
    console.log("Student progress:", studentCourseProgress?.payload);
    
    if (studentCourseProgress?.payload.courseCompleted === true) {
      const lastSection = courseSectionList?.payload.sections[courseSectionList?.payload.sections.length - 1];
      console.log("Setting to last section:", lastSection?.sectionId);
      setCurrentSectionId(lastSection?.sectionId);
    } else if (studentCourseProgress && !currentSectionId) {
      console.log("Setting to current progress section:", studentCourseProgress.payload.sectionId);
      setCurrentSectionId(studentCourseProgress.payload.sectionId);
    }
  }, [studentCourseProgress, courseSectionList, currentSectionId]);

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
          sections={courseSectionList?.payload.sections || []}
          currentSectionId={currentSectionId}
          onSectionSelect={handleSectionSelect}
          studentProgress={studentCourseProgress?.payload}
        />
        <div className="transition-[margin-left] duration-300 ease-in-out" style={{
          marginLeft: open ? 'var(--sidebar-width, 16rem)' : 'var(--sidebar-width-icon, 3rem)'
        }}>
          <StudyContent 
            currentSectionId={currentSectionId}
            setCurrentSectionId={setCurrentSectionId}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}