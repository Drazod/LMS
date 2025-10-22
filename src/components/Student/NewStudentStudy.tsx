import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCurrentSectionQuery,
  useGetCourseListQuery,
  useGetSectionQuery,
  useUpdateCompletedSectionMutation,
} from "@/apis/CourseApi";
import { prepareVideoForAI, saveVideoToDownloads } from "@/utils/fileUtils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  CheckCircleIcon,
  Record as RecordIcon,
  DotsThreeOutlineVertical as DotsThreeOutlineVerticalIcon
} from "@phosphor-icons/react";
import Loader from "@/components/common/Loader";
import logo from '/hoctiengvietai_white.svg';

// Types for the actual API data structure
interface ContentItem {
  type: 'DOCUMENT' | 'VIDEO' | 'IMAGE' | 'TEXT';
  content: string;
  position: string | number;
  id: number;
  sectionId: number;
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
              {Array.isArray(sections) && sections.length > 0 ? sections.map((section) => {
                const isActive = Number(section.sectionId) === Number(currentSectionId);
                console.log("Sidebar comparison:", section.sectionId, currentSectionId, "isActive:", isActive);
                // Check if section is completed: current section with 100% progress
                const isCompleted = (Number(studentProgress?.sectionId) === Number(section.sectionId) && studentProgress?.progress === 100);
                
                // For LMS, allow access to all sections - students should be able to navigate freely
                // Only disable if there's no student progress data at all
                const isAccessible = !!studentProgress;
                const sessionType = section.sessionType || 'READING';
                const config = sessionTypeConfig[sessionType as keyof typeof sessionTypeConfig];
                
                // Debug logging
                console.log(`Section ${section.sectionId}: active=${isActive}, current=${currentSectionId}, accessible=${isAccessible}, completed=${isCompleted}`);
                
                return (
                  <SidebarMenuItem key={section.sectionId}>
                    <SidebarMenuButton
                      asChild={false}
                      isActive={isActive}
                      disabled={!isAccessible}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log(`Section clicked: ${section.sectionId}, accessible: ${isAccessible}`);
                        if (isAccessible && section.sectionId) {
                          onSectionSelect(section.sectionId);
                        }
                      }}
                      className={`
                        ${isActive ? "bg-primary/20 text-primary border-l-4 border-l-primary font-semibold" : "hover:bg-muted/50"} 
                        ${!isAccessible ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        relative transition-all duration-200
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
              }) : (
                <div className="p-4 text-center text-muted-foreground">
                  No sections available
                </div>
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
        console.log("Sidebar trigger clicked");
        toggleSidebar();
      }}
      className="!p-4"
    >
      <SidebarIcon className="!size-8" weight="duotone" />
    </Button>
  );
}

function ContentRenderer({ 
  contents, 
  generatedQuestions, 
  setGeneratedQuestions 
}: { 
  contents: ContentItem[];
  generatedQuestions: any[];
  setGeneratedQuestions: (questions: any[]) => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Sample feedback data - you can replace this with actual API data
  const feedback = {
    topic: "Kỹ năng thuyết trình",
    feedback: {
      strengths: {
        1: "Giọng nói rõ ràng và dễ hiểu",
        2: "Cấu trúc bài nói logic và mạch lạc",
        3: "Sử dụng từ ngữ phù hợp với chủ đề"
      },
      suggestions: {
        1: "Cần cải thiện tốc độ nói, tránh nói quá nhanh",
        2: "Thêm các ví dụ cụ thể để minh họa ý tưởng",
        3: "Sử dụng ngôn ngữ cơ thể tự nhiên hơn"
      },
      overall: "Bài thuyết trình của bạn có nội dung tốt và cấu trúc rõ ràng. Với một số cải thiện nhỏ về cách trình bày, bạn sẽ có thể giao tiếp hiệu quả hơn."
    }
  };

  // Handle audio file upload and speech evaluation
  const handleAudioUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/wave'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Chỉ chấp nhận file MP3 hoặc WAV');
      return;
    }

    // Validate file size (e.g., max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setUploadError('File quá lớn. Vui lòng chọn file nhỏ hơn 10MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setSpeechFeedback(null);

    try {
      // Create FormData for speech evaluation API
      const formData = new FormData();
      formData.append('audio', file);
      
      console.log("Uploading audio file:", {
        name: file.name,
        type: file.type,
        size: file.size
      });

      // Call speech evaluation API
      const response = await fetch('https://lmsaibe-production.up.railway.app/evaluate-speech', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details available');
        throw new Error(`Speech evaluation failed: ${response.status} ${response.statusText}. ${errorText}`);
      }

      const result = await response.json();
      console.log("Speech evaluation response:", result);

      // Extract review from the API response
      if (result.review) {
        setSpeechFeedback(result.review);
      } else {
        throw new Error('Invalid response format: Missing review data');
      }

    } catch (error) {
      console.error("Error in speech evaluation:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setUploadError(`Đánh giá bài nói thất bại: ${errorMessage}`);
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  if (!contents || !Array.isArray(contents)) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No content available for this section</p>
      </div>
    );
  }
  
  console.log("Rendering contents:", contents);
  
  // Sort contents by position
  const sortedContents = [...contents].sort((a, b) => {
    const posA = typeof a.position === 'string' ? parseInt(a.position) : a.position || 0;
    const posB = typeof b.position === 'string' ? parseInt(b.position) : b.position || 0;
    return posA - posB;
  });

  return (
    <div className="space-y-6">
      {sortedContents.map((item) => {
        switch (item.type) {
          case 'DOCUMENT':
          case 'TEXT':
            return (
              <div key={item.id}>
                <Card className="overflow-hidden border-l-4 border-l-primary/20">
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
                
                {/* Recording and Feedback Section for DOCUMENT type */}
                {item.type === 'DOCUMENT' && (
                  <>
                    <div className="my-4">
                      <Card>
                        <CardContent className="flex flex-col gap-4 items-center justify-center p-6">
                          <img src="/src/assets/waveform.jpg" alt="Recording" className={`${isRecording ? 'block' : 'hidden'}`} />
                          
                          {/* Upload Error Display */}
                          {uploadError && (
                            <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
                              <p className="text-red-700 text-sm">{uploadError}</p>
                            </div>
                          )}
                          
                          <div className="flex w-full justify-between gap-3">
                            {/* File Upload Button */}
                            <div className="relative">
                              <input
                                type="file"
                                id="audio-upload"
                                accept=".mp3,.wav,audio/mp3,audio/mpeg,audio/wav,audio/wave"
                                onChange={handleAudioUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={isUploading}
                              />
                              <Button disabled={isUploading} className="relative">
                                {isUploading ? 'Đang xử lý...' : 'Nộp bản ghi âm'}
                              </Button>
                            </div>
                            
                            <Button
                              size={"icon"}
                              variant={isRecording ? "destructive" : "outline"}
                              onClick={() => setIsRecording(!isRecording)}
                            >
                              <RecordIcon className="!size-7" weight="duotone" />
                            </Button>
                            <Button size={"icon"} variant="outline">
                              <DotsThreeOutlineVerticalIcon className="!size-7" weight="duotone" />
                            </Button>
                          </div>
                          
                          {/* Upload Progress Indicator */}
                          {isUploading && (
                            <div className="w-full">
                              <div className="text-sm text-muted-foreground mb-2">Đang đánh giá bài nói...</div>
                              <Progress value={50} className="h-2" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid gap-3">
                      {/* API Feedback Card - Show when we have feedback from API */}
                      {speechFeedback && (
                        <Card className="flex flex-col gap-3 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                          <CardHeader>
                            <CardTitle className="text-blue-800">🎯 Đánh giá bài nói của bạn</CardTitle>
                            <CardDescription className="text-blue-600">Phản hồi từ AI về bài thuyết trình</CardDescription>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-4">
                            <div className="prose prose-sm max-w-none">
                              <div 
                                className="text-gray-800 whitespace-pre-line"
                                dangerouslySetInnerHTML={{ __html: speechFeedback.replace(/\n/g, '<br/>') }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      
                      {/* Sample Feedback Card - Show as example when no API feedback */}
                      {!speechFeedback && (
                        <Card className="flex flex-col gap-3 bg-[url(/src/assets/ai-background-gradient.jpg)]">
                          <CardHeader>
                            <CardTitle>Chủ đề đã chọn</CardTitle>
                            <CardDescription>{feedback.topic}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                              <h5 className="font-semibold">Điểm mạnh:</h5>
                              <ul className="list-disc list-inside">
                                {Object.entries(feedback.feedback.strengths).map(([key, value], idx) => (
                                  <li className="ml-6 list-item" key={idx}>{value}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex flex-col gap-2">
                              <h5 className="font-semibold">Gợi ý cải thiện:</h5>
                              <ul className="list-disc list-inside">
                                {Object.entries(feedback.feedback.suggestions).map(([key, value], idx) => (
                                  <li className="ml-6 list-item" key={idx}>{value}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex flex-col gap-2">
                              <h5 className="font-semibold">Tổng quan:</h5>
                              <p>{feedback.feedback.overall}</p>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </>
                )}
              </div>
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
      
      {/* Generated Questions Display - Below Video */}
      {generatedQuestions.length > 0 && (
        <div className="mt-8">
          <div className="text-lg font-medium text-green-600 mb-6 text-center">
            ✅ Quiz được tạo với {generatedQuestions.length} câu hỏi!
          </div>
          
          {/* Questions Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedQuestions.map((question, index) => (
              <Card key={question.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  {/* Question Header */}
                  <div className="font-medium text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-center">
                    Câu hỏi số {question.id}
                  </div>
                  
                  {/* Question Text */}
                  <div className="text-sm text-gray-800 font-medium leading-relaxed">
                    {question.question}
                  </div>
                  
                  {/* Multiple Choice Options */}
                  {question.options && question.options.length > 0 && (
                    <div className="space-y-2">
                      {question.options.map((option: string, optIndex: number) => (
                        <label 
                          key={optIndex}
                          className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            optIndex === question.correctAnswer 
                              ? 'bg-green-50 border border-green-200' 
                              : 'hover:bg-gray-50 border border-gray-100'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name={`question-${question.id}`}
                            value={optIndex}
                            className="text-blue-600 focus:ring-blue-500"
                            defaultChecked={optIndex === question.correctAnswer}
                            disabled
                          />
                          <span className={`text-sm ${
                            optIndex === question.correctAnswer 
                              ? 'text-green-800 font-medium' 
                              : 'text-gray-700'
                          }`}>
                            {String.fromCharCode(65 + optIndex)}. {option}
                          </span>
                          {optIndex === question.correctAnswer && (
                            <span className="ml-auto text-green-600 text-sm">✓</span>
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {/* Explanation if available */}
                  {question.explanation && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="font-medium text-blue-800">Giải thích:</span>
                      <span className="text-blue-700 ml-2">{question.explanation}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setGeneratedQuestions([])}
              className="px-6 py-2 bg-gray-50 hover:bg-gray-100"
            >
              Xóa câu hỏi
            </Button>
            <Button
              size="lg"
              onClick={() => {
                const questionsText = generatedQuestions.map((q, i) => 
                  `Câu ${q.id}: ${q.question}\n${q.options?.map((opt, idx) => 
                    `${String.fromCharCode(65 + idx)}. ${opt}${idx === q.correctAnswer ? ' (Đáp án đúng)' : ''}`
                  ).join('\n')}\n`
                ).join('\n');
                
                navigator.clipboard.writeText(questionsText).then(() => {
                  alert('Đã sao chép câu hỏi vào clipboard!');
                });
              }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700"
            >
              Sao chép quiz
            </Button>
          </div>
        </div>
      )}
      
      {/* Interactive Elements Section */}
      
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
  } = useGetCurrentSectionQuery(courseId);
  console.log("studentCourseProgress", studentCourseProgress);

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

  // AI Question Generation state
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiStage, setAiStage] = useState<string>('');
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);

  // Set current section based on backend response
  useEffect(() => {
    if (studentCourseProgress?.data?.sectionId) {
      console.log("Setting current section from backend:", studentCourseProgress.data.sectionId);
      setCurrentSectionId(studentCourseProgress.data.sectionId);
    }
  }, [studentCourseProgress?.data?.sectionId, setCurrentSectionId]);

  // Auto-complete section when student enters it (with delay to allow content loading)
  useEffect(() => {
    if (currentSectionId && !isUpdatingSection) {
      console.log("Student entered section:", currentSectionId);
      
      // Add a small delay to ensure the student actually views the content
      const timer = setTimeout(() => {
        console.log("Auto-marking section as completed after viewing...");
        
        // Mark the section as completed when student enters it
        updateCompletedSection(currentSectionId)
          .unwrap()
          .then(() => {
            console.log("Section marked as completed:", currentSectionId);
          })
          .catch((error) => {
            console.error("Failed to mark section as completed:", error);
          });
      }, 2000); // 2 second delay to ensure student is actually viewing the content
      
      return () => clearTimeout(timer);
    }
  }, [currentSectionId, updateCompletedSection, isUpdatingSection]);

  // AI Question Generation function
  const handleAIQuestionGeneration = async () => {
    if (!section?.data || !Array.isArray(section.data)) {
      console.log("No section content available for AI processing");
      return;
    }

    // Find video content in current section
    const videoContent = section.data.find((item: ContentItem) => item.type === 'VIDEO');
    
    if (!videoContent) {
      console.log("No video content found in current section");
      alert("No video content found in this section to generate questions from.");
      return;
    }

    setIsGeneratingQuestions(true);
    setAiProgress(0);
    setAiStage('Preparing...');

    try {
      // Step 1: Download video file
      setAiStage('Downloading video...');
      setAiProgress(20);
      
      console.log("Downloading video from URL:", videoContent.content);
      const videoFile = await prepareVideoForAI(videoContent.content);
      const flag = await saveVideoToDownloads(videoFile);
      setAiStage('Video downloaded successfully');
      setAiProgress(50);
      
      console.log("Video file prepared:", {
        name: videoFile.name,
        size: videoFile.size,
        type: videoFile.type
      });

      // Step 2: Upload to AI API
      setAiStage('Uploading to AI service...');
      setAiProgress(75);
      
      // Create FormData for AI API
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('sectionId', currentSectionId?.toString() || '');
      formData.append('courseId', courseId || '');
      
      console.log("FormData prepared for AI upload:", {
        videoName: videoFile.name,
        sectionId: currentSectionId,
        courseId: courseId
      });

      // Step 3: Call real AI API
      setAiStage('Processing with AI...');
      setAiProgress(90);
      
      console.log("Calling AI API at: https://lmsaibe-production.up.railway.app/generate-quiz");
      console.log("Request details:", {
        method: 'POST',
        formDataEntries: Array.from(formData.entries()).map(([key, value]) => [
          key, 
          value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value
        ])
      });
      
      let response;
      try {
        response = await fetch('https://lmsaibe-production.up.railway.app/generate-quiz', {
          method: 'POST',
          body: formData,
          // Add timeout and error handling
          signal: AbortSignal.timeout(300000) // 5 minute timeout
        });
        
        console.log("Response received:", {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          ok: response.ok
        });
      } catch (fetchError) {
        console.error("Fetch failed:", fetchError);
        if (fetchError.name === 'AbortError') {
          throw new Error('AI request timed out after 5 minutes. Please try again with a shorter video.');
        }
        throw new Error(`Failed to connect to AI service at https://lmsaibe-production.up.railway.app/generate-quiz. Error: ${fetchError instanceof Error ? fetchError.message : 'Network connection failed'}. Please ensure the backend server is running.`);
      }

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details available');
        console.error("API error response:", errorText);
        throw new Error(`AI API request failed: ${response.status} ${response.statusText}. Details: ${errorText}`);
      }

      let result;
      try {
        result = await response.json();
        console.log("AI API response parsed successfully:", result);
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError);
        const responseText = await response.text().catch(() => 'Unable to read response');
        throw new Error(`Invalid JSON response from AI service. Response: ${responseText.substring(0, 200)}...`);
      }
      console.log("AI API response:", result);
      
      // Validate the response structure
      if (!result || typeof result !== 'object') {
        throw new Error('Invalid response format: Response is not an object');
      }
      
      if (!result.questions || !Array.isArray(result.questions)) {
        throw new Error('Invalid response format: Missing or invalid questions array');
      }
      
      // Extract questions from the specific API response format
      const quizTitle = result.quizTitle || "Generated Quiz";
      const apiQuestions = result.questions;
      
      console.log("Extracted quiz data:", {
        quizTitle,
        questionsCount: apiQuestions.length,
        firstQuestion: apiQuestions[0]
      });
      
      // Validate that we have questions
      if (apiQuestions.length === 0) {
        throw new Error('No questions were generated by the AI service');
      }
      
      // Format questions to match our component structure
      const formattedQuestions = apiQuestions.map((q: any, index: number) => {
        // Validate each question structure
        if (!q || typeof q !== 'object') {
          console.warn(`Question ${index + 1} is invalid:`, q);
          return null;
        }
        
        if (!q.question || typeof q.question !== 'string') {
          console.warn(`Question ${index + 1} missing question text:`, q);
          return null;
        }
        
        if (!q.options || !Array.isArray(q.options) || q.options.length === 0) {
          console.warn(`Question ${index + 1} missing options:`, q);
          return null;
        }
        
        const correctAnswerIndex = q.options.findIndex((opt: any) => opt && opt.isCorrect === true);
        const questionOptions = q.options.map((opt: any) => opt?.text || 'Invalid option').filter(Boolean);
        
        if (correctAnswerIndex === -1) {
          console.warn(`Question ${index + 1} has no correct answer marked:`, q);
        }
        
        console.log(`Processing question ${index + 1}:`, {
          questionNumber: q.questionNumber,
          question: q.question,
          optionsCount: questionOptions.length,
          correctAnswerIndex,
          correctOption: questionOptions[correctAnswerIndex]
        });
        
        return {
          id: q.questionNumber || (index + 1),
          question: q.question,
          type: "multiple_choice",
          options: questionOptions,
          correctAnswer: Math.max(0, correctAnswerIndex), // Ensure it's at least 0
          explanation: q.explanation || "",
          // Store original structure for reference
          originalOptions: q.options
        };
      }).filter(Boolean); // Remove any null entries from validation failures
      
      // Final validation
      if (formattedQuestions.length === 0) {
        throw new Error('No valid questions could be processed from the AI response');
      }
      
      console.log(`Successfully processed ${formattedQuestions.length} out of ${apiQuestions.length} questions`);

      setGeneratedQuestions(formattedQuestions);
      setAiStage(`Generated "${quizTitle}" with ${formattedQuestions.length} questions!`);
      setAiProgress(100);
      
      console.log("AI Questions generated and set to state:", {
        questionsCount: formattedQuestions.length,
        questions: formattedQuestions
      });
      
      // Show success message
      setTimeout(() => {
        setAiStage('');
        setAiProgress(0);
      }, 2000);

    } catch (error) {
      console.error("Error in AI question generation:", error);
      setAiStage('Error occurred');
      
      // Provide detailed troubleshooting information
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const troubleshootingSteps = `
Failed to generate questions: ${errorMessage}

Troubleshooting steps:
1. Check if backend server is running at https://lmsaibe-production.up.railway.app
2. Verify the /generate-quiz endpoint exists
3. Check browser console for detailed error logs
4. Ensure CORS is properly configured on the backend
5. Try refreshing the page and attempting again

Technical details logged to console.
      `;
      
      alert(troubleshootingSteps);
      
      setTimeout(() => {
        setAiStage('');
        setAiProgress(0);
      }, 3000); // Longer timeout to read error
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleNextSection = async () => {
    if (!studentCourseProgress?.data?.nextSectionId || studentCourseProgress.data.isLastSection) {
      console.log("No next section available");
      return;
    }
    
    try {
      // Mark current section as completed - this will automatically move to next section
      await updateCompletedSection(currentSectionId);
      console.log("Section completed successfully");
    } catch (error) {
      console.error("Failed to complete section:", error);
    }
  };

  const handlePreviousSection = () => {
    if (!courseSectionList?.data?.sections || !currentSectionId) return;
    
    // Find previous section by position
    const currentSectionData = courseSectionList.data.sections.find(
      (section: any) => Number(section.sectionId) === Number(currentSectionId)
    );
    
    if (!currentSectionData) return;
    
    const previousPosition = (typeof currentSectionData.position === 'string' ? parseInt(currentSectionData.position) : currentSectionData.position) - 1;
    const previousSection = courseSectionList.data.sections.find(
      (section: any) => {
        const sectionPos = typeof section.position === 'string' ? parseInt(section.position) : section.position;
        return sectionPos === previousPosition;
      }
    );

    if (previousSection) {
      console.log("Moving to previous section:", previousSection.sectionId);
      setCurrentSectionId(Number(previousSection.sectionId));
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

  // Get section metadata from course sections list
  const currentSectionMeta = courseSectionList?.data?.sections?.find(
    (s: any) => Number(s.sectionId) === Number(currentSectionId)
  );
  
  const currentIndex = courseSectionList?.data?.sections?.findIndex(
    (s: any) => Number(s.sectionId) === Number(currentSectionId)
  ) || 0;
  
  const sessionType = currentSectionMeta?.sessionType || 'READING';
  const config = sessionTypeConfig[sessionType as keyof typeof sessionTypeConfig];
  // Course is completed if on last section with 100% progress
  const isCompleted = (studentCourseProgress?.data?.isLastSection && studentCourseProgress?.data?.progress === 100) || false;
  const sectionsLength = courseSectionList?.data?.sections?.length || 0;
  const canGoPrevious = currentIndex > 0;
  // Can go next if there's a next section available (not on last section)
  const canGoNext = !studentCourseProgress?.data?.isLastSection && !!studentCourseProgress?.data?.nextSectionId;
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
              {courseSectionList?.data?.title || "Course Title"}
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
              {(currentIndex || 0) + 1} / {sectionsLength}
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
                      {currentSectionMeta?.description || courseSectionList?.data?.description || 
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
                    onClick={handleAIQuestionGeneration}
                    disabled={isGeneratingQuestions}
                  >
                    <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {isGeneratingQuestions ? "🤖 Processing..." : "✨ Trợ giúp AI"}
                    </span>
                  </Button>
                  
                  {/* AI Processing Progress */}
                  {isGeneratingQuestions && (
                    <div className="mt-4 space-y-2">
                      <div className="text-xs text-muted-foreground">{aiStage}</div>
                      <Progress value={aiProgress} className="h-2" />
                    </div>
                  )}
                  

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
            ) : section?.data ? (
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
                          {currentSectionMeta?.sectionName || `Phần ${(currentIndex || 0) + 1}: ${config.label}`}
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
                {/* Section Content */}
                <ContentRenderer 
                  contents={section.data} 
                  generatedQuestions={generatedQuestions}
                  setGeneratedQuestions={setGeneratedQuestions}
                />
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
            onClick={(e) => {
              e.preventDefault();
              console.log("Previous button clicked, canGoPrevious:", canGoPrevious);
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
              Progress: {(currentIndex || 0) + 1} / {sectionsLength}
            </div>
            <div className="w-32 bg-muted rounded-full h-2 mt-1">
              <div 
                className="bg-primary h-2 rounded-full transition-all"
                style={{ 
                  width: `${((currentIndex || 0) + 1) / (sectionsLength || 1) * 100}%` 
                }}
              />
            </div>
          </div>

          <Button
            onClick={(e) => {
              e.preventDefault();
              console.log("Next button clicked, canGoNext:", canGoNext, "isUpdating:", isUpdatingSection);
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

export default function NewStudentStudy() {
  const [open, setOpen] = useState(true);
  const [currentSectionId, setCurrentSectionId] = useState<number | null>(null);
  const { courseId } = useParams();
  
  // Get course data for sidebar
  const {
    data: courseSectionList,
    isLoading: isLoadingSectionList,
  } = useGetCourseListQuery(courseId);
  console.log("courseSectionList", courseSectionList);
  const {
    data: studentCourseProgress,
    isLoading: isLoadingStudentProgress,
  } = useGetCurrentSectionQuery(courseId);
  
  const handleSectionSelect = (sectionId: number) => {
    console.log("Section selected:", sectionId);
    // Just update local state - the backend will handle current section tracking
    setCurrentSectionId(sectionId);
  };

  // Sync current section with backend
  useEffect(() => {
    if (studentCourseProgress?.data?.sectionId) {
      console.log("Main component - Setting current section from backend:", studentCourseProgress.data.sectionId);
      setCurrentSectionId(studentCourseProgress.data.sectionId);
    }
  }, [studentCourseProgress?.data?.sectionId]);

  // Debug logging when data loads
  useEffect(() => {
    console.log("Main component - Course sections:", courseSectionList?.data?.sections);
    console.log("Main component - Student progress:", studentCourseProgress?.data);
    console.log("Main component - Current section ID:", currentSectionId);
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
          sections={courseSectionList?.data?.sections || []}
          currentSectionId={currentSectionId}
          onSectionSelect={handleSectionSelect}
          studentProgress={studentCourseProgress?.data}
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