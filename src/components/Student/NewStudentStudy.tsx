import { useCallback, useEffect, useMemo, useState } from "react";
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
  Sidebar as SidebarIcon,
  BookOpen as BookOpenIcon,
  Microphone as MicrophoneIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  CheckCircle as CheckCircleIcon,
  Record as RecordIcon,
  DotsThreeOutlineVertical as DotsThreeOutlineVerticalIcon,
} from "@phosphor-icons/react";
import Loader from "@/components/common/Loader";
import logo from "/hoctiengvietai_white.svg";

/** ******************************
 * Types & Constants
 *********************************/
export type SessionType = "LISTEN" | "READING" | "SPEAKING";
interface SectionApiDataV2 {
  contents: ContentItem[];
  questions?: BasicQuestionItem[];
}
interface ContentItem {
  type: "DOCUMENT" | "VIDEO" | "IMAGE" | "TEXT";
  content: string;
  position: string | number;
  id: number;
  sectionId: number;
}
interface BasicQuestionItem {
  questionId: number;
  questionText: string;
  sectionId: number;
}

interface GeneratedQuestionOption {
  text: string;
  isCorrect?: boolean;
}

interface GeneratedQuestionRaw {
  questionNumber?: number;
  question: string;
  options: GeneratedQuestionOption[];
  explanation?: string;
}

interface GeneratedQuestionUI {
  id: number;
  question: string;
  type: "multiple_choice";
  options: string[];
  correctAnswer: number;
  explanation?: string;
  originalOptions: GeneratedQuestionOption[];
}

const SESSION_TYPE_CONFIG: Record<SessionType, {
  icon: any; // icon component type from phosphor
  label: string;
  color: string; // tailwind bg color class
  description: string;
}> = {
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
                    Number(studentProgress?.sectionId) === Number(section.sectionId) && studentProgress?.progress === 100;
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

function GeneratedQuestions({ questions, onClear }: { questions: GeneratedQuestionUI[]; onClear: () => void }) {
  if (!questions.length) return null;

  const handleCopy = () => {
    const questionsText = questions
      .map((q) => `Câu ${q.id}: ${q.question}\n${q.options
          .map((opt, idx) => `${String.fromCharCode(65 + idx)}. ${opt}${idx === q.correctAnswer ? " (Đáp án đúng)" : ""}`)
          .join("\n")}\n`)
      .join("\n");

    navigator.clipboard.writeText(questionsText).then(() => alert("Đã sao chép câu hỏi vào clipboard!"));
  };

  return (
    <div className="mt-8">
      <div className="text-lg font-medium text-green-600 mb-6 text-center">
        ✅ Quiz được tạo với {questions.length} câu hỏi!
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((question) => (
          <Card key={question.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="font-medium text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-center">
                Câu hỏi số {question.id}
              </div>

              <div className="text-sm text-gray-800 font-medium leading-relaxed">{question.question}</div>

              {question.options?.length > 0 && (
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <label
                      key={optIndex}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        optIndex === question.correctAnswer
                          ? "bg-green-50 border border-green-200"
                          : "hover:bg-gray-50 border border-gray-100"
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
                      <span className={`text-sm ${optIndex === question.correctAnswer ? "text-green-800 font-medium" : "text-gray-700"}`}>
                        {String.fromCharCode(65 + optIndex)}. {option}
                      </span>
                      {optIndex === question.correctAnswer && <span className="ml-auto text-green-600 text-sm">✓</span>}
                    </label>
                  ))}
                </div>
              )}

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

      <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
        <Button size="lg" variant="outline" onClick={onClear} className="px-6 py-2 bg-gray-50 hover:bg-gray-100">
          Xóa câu hỏi
        </Button>
        <Button size="lg" onClick={handleCopy} className="px-6 py-2 bg-blue-600 hover:bg-blue-700">
          Sao chép quiz
        </Button>
      </div>
    </div>
  );
}
function BasicQuestionsList({
  questions,
  studentId,
}: {
  questions: BasicQuestionItem[];
  studentId: number | null;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState<Record<number, boolean>>({});
  const [submitAllLoading, setSubmitAllLoading] = useState(false);
  const [submittedOk, setSubmittedOk] = useState<Record<number, boolean>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!questions?.length) return null;

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    // clear "submitted" checkmark if they edit again
    setSubmittedOk((prev) => {
      const clone = { ...prev };
      delete clone[id];
      return clone;
    });
  };

  const postAnswer = async (questionId: number, answerText: string) => {
    const res = await fetch(`https://lmsaibe-production.up.railway.app/api/answers/${questionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, answerText }),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || `Submit failed (${res.status})`);
    }
  };

  const handleSubmitOne = async (q: BasicQuestionItem) => {
    if (!studentId) {
      setErrorMsg("Không tìm thấy mã học viên (studentId). Vui lòng đăng nhập lại.");
      return;
    }
    const answerText = (answers[q.questionId] || "").trim();
    if (!answerText) {
      setErrorMsg("Vui lòng nhập câu trả lời trước khi nộp.");
      return;
    }
    setErrorMsg(null);
    setSubmitting((s) => ({ ...s, [q.questionId]: true }));
    try {
      await postAnswer(q.questionId, answerText);
      setSubmittedOk((ok) => ({ ...ok, [q.questionId]: true }));
    } catch (e: any) {
      setErrorMsg(e?.message || "Nộp câu trả lời thất bại.");
    } finally {
      setSubmitting((s) => ({ ...s, [q.questionId]: false }));
    }
  };

  const handleSubmitAll = async () => {
    if (!studentId) {
      setErrorMsg("Không tìm thấy mã học viên (studentId). Vui lòng đăng nhập lại.");
      return;
    }
    setErrorMsg(null);
    setSubmitAllLoading(true);
    try {
      for (const q of questions) {
        const answerText = (answers[q.questionId] || "").trim();
        if (!answerText) continue; // skip unanswered
        await postAnswer(q.questionId, answerText);
        setSubmittedOk((ok) => ({ ...ok, [q.questionId]: true }));
      }
    } catch (e: any) {
      setErrorMsg(e?.message || "Nộp nhiều câu trả lời thất bại.");
    } finally {
      setSubmitAllLoading(false);
    }
  };

  const handleExport = () => {
    const lines = questions.map(
      (q, i) => `${i + 1}. ${q.questionText}\nTrả lời: ${answers[q.questionId] || "(chưa trả lời)"}`
    );
    const blob = new Blob([lines.join("\n\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "answers.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold">Câu hỏi ôn tập</h4>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setAnswers({})}>Xóa tất cả</Button>
          <Button variant="outline" onClick={handleExport}>Tải câu trả lời</Button>
          <Button onClick={handleSubmitAll} disabled={submitAllLoading || !studentId}>
            {submitAllLoading ? "Đang nộp..." : "Nộp tất cả"}
          </Button>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {errorMsg}
        </div>
      )}

      <div className="space-y-4">
        {questions.map((q, i) => {
          const isBusy = !!submitting[q.questionId];
          const ok = !!submittedOk[q.questionId];
          return (
            <Card key={q.questionId} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm font-medium mb-2">
                  <span className="mr-2">{i + 1}.</span>
                  {q.questionText}
                </div>
                {ok && (
                  <Badge variant="secondary" className="text-green-700 border-green-200 bg-green-50">
                    Đã nộp
                  </Badge>
                )}
              </div>

              <textarea
                className="w-full rounded-md border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nhập câu trả lời của bạn..."
                rows={3}
                value={answers[q.questionId] || ""}
                onChange={(e) => handleChange(q.questionId, e.target.value)}
              />

              <div className="mt-3 flex justify-end">
                <Button
                  onClick={() => handleSubmitOne(q)}
                  disabled={isBusy || !studentId}
                >
                  {isBusy ? "Đang nộp..." : "Nộp câu này"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}



function SpeakingPractice({
  isRecording,
  isUploading,
  uploadError,
  selectedFile,
  onToggleRecord,
  onFilePicked,
  onSubmit,
  speechFeedback,
}: {
  isRecording: boolean;
  isUploading: boolean;
  uploadError: string | null;
  selectedFile: File | null;
  onToggleRecord: () => void;
  onFilePicked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  speechFeedback: string | null;
}) {
  return (
    <div className="my-4">
      <Card>
        <CardContent className="flex flex-col gap-4 items-center justify-center p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">🎙️ Thực hành nói</h4>
          <p className="text-sm text-gray-600 text-center mb-4">
            Hãy đọc to đoạn văn bản trên và nộp bản ghi âm để nhận đánh giá từ AI
          </p>

          <img src="/src/assets/waveform.jpg" alt="Recording" className={`${isRecording ? "block" : "hidden"}`} />

          {uploadError && (
            <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{uploadError}</p>
            </div>
          )}

          {selectedFile && (
            <div className="w-full p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">
                📁 Đã chọn file: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          )}

          <div className="flex w-full justify-between items-center gap-3">
            <Button
              disabled={isUploading || !selectedFile}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
              onClick={onSubmit}
            >
              {isUploading ? "Đang nộp bài..." : selectedFile ? "✅ Nộp bản ghi âm" : "📁 Chọn file trước"}
            </Button>

            <div className="flex gap-2">
              <Button size={"icon"} variant={isRecording ? "destructive" : "outline"} onClick={onToggleRecord} title="Ghi âm (Chức năng đang phát triển)">
                <RecordIcon className="!size-7" weight="duotone" />
              </Button>

              <div className="relative">
                <input
                  type="file"
                  id="file-import"
                  accept=".mp3,.wav,audio/mp3,audio/mpeg,audio/wav,audio/wave"
                  onChange={onFilePicked}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                <Button size={"icon"} variant="outline" title="Chọn file từ máy tính (chỉ upload, chưa nộp bài)" disabled={isUploading}>
                  <DotsThreeOutlineVerticalIcon className="!size-7" weight="duotone" />
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p>
              <strong>Hướng dẫn sử dụng:</strong>
            </p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>
                ✅ <strong>Nộp bản ghi âm:</strong> Submit file đã chọn để đánh giá AI
              </li>
              <li>
                🔴 <strong>Nút ghi âm:</strong> Ghi âm trực tiếp (đang phát triển)
              </li>
              <li>
                ⋮ <strong>Menu ba chấm:</strong> Chỉ chọn file từ máy tính (chưa submit)
              </li>
            </ul>
            <div className="mt-2 text-xs text-blue-600">
              <strong>Quy trình:</strong> 1) Chọn file bằng menu ⋮ → 2) Xem thông tin file → 3) Nhấn ✅ để nộp bài
            </div>
          </div>

          {isUploading && (
            <div className="w-full">
              <div className="text-sm text-muted-foreground mb-2">Đang đánh giá bài nói...</div>
              <Progress value={50} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback */}
      <div className="grid gap-3 mt-4">
        {speechFeedback ? (
          <Card className="flex flex-col gap-3 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">🎯 Đánh giá bài nói của bạn</CardTitle>
              <CardDescription className="text-blue-600">Phản hồi từ AI về bài thuyết trình</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="prose prose-sm max-w-none">
                <div className="text-gray-800 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: speechFeedback.replace(/\n/g, "<br/>") }} />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex flex-col gap-3 bg-[url(/src/assets/ai-background-gradient.jpg)]">
            <CardHeader>
              <CardTitle>Chủ đề đã chọn</CardTitle>
              <CardDescription>Kỹ năng thuyết trình</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h5 className="font-semibold">Điểm mạnh:</h5>
                <ul className="list-disc list-inside ml-6">
                  <li>Giọng nói rõ ràng và dễ hiểu</li>
                  <li>Cấu trúc bài nói logic và mạch lạc</li>
                  <li>Sử dụng từ ngữ phù hợp với chủ đề</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="font-semibold">Gợi ý cải thiện:</h5>
                <ul className="list-disc list-inside ml-6">
                  <li>Cần cải thiện tốc độ nói, tránh nói quá nhanh</li>
                  <li>Thêm các ví dụ cụ thể để minh họa ý tưởng</li>
                  <li>Sử dụng ngôn ngữ cơ thể tự nhiên hơn</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="font-semibold">Tổng quan:</h5>
                <p>
                  Bài thuyết trình của bạn có nội dung tốt và cấu trúc rõ ràng. Với một số cải thiện nhỏ về cách trình bày, bạn sẽ
                  có thể giao tiếp hiệu quả hơn.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function ContentRenderer({
  contents,
  generatedQuestions,
  setGeneratedQuestions,
  basicQuestions,
  studentId,
}: {
  contents: ContentItem[];
  generatedQuestions: GeneratedQuestionUI[];
  setGeneratedQuestions: (questions: GeneratedQuestionUI[]) => void;
  basicQuestions?: BasicQuestionItem[];
  studentId: number | null; 
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const sortedContents = useMemo(() => {
    if (!Array.isArray(contents)) return [] as ContentItem[];
    return [...contents].sort((a, b) => {
      const posA = typeof a.position === "string" ? parseInt(a.position) : a.position || 0;
      const posB = typeof b.position === "string" ? parseInt(b.position) : b.position || 0;
      return posA - posB;
    });
  }, [contents]);

  // ====== Speaking: file pick / submit / toggle record ======
  const allowedTypes = useMemo(() => ["audio/mp3", "audio/mpeg", "audio/wav", "audio/wave"], []);
  const validateAudio = useCallback(
    (file: File) => {
      if (!allowedTypes.includes(file.type)) return "Chỉ chấp nhận file MP3 hoặc WAV";
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) return "File quá lớn. Vui lòng chọn file nhỏ hơn 10MB";
      return null;
    },
    [allowedTypes]
  );

  const handleFileImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const validation = validateAudio(file);
    if (validation) {
      setUploadError(validation);
      return;
    }
    setSelectedFile(file);
    setUploadError(null);
    event.target.value = "";
  }, [validateAudio]);

  const handleSubmitRecording = useCallback(async () => {
    if (!selectedFile) {
      setUploadError("Vui lòng chọn file âm thanh trước khi nộp bài");
      return;
    }
    setIsUploading(true);
    setUploadError(null);
    setSpeechFeedback(null);

    try {
      const formData = new FormData();
      formData.append("audio", selectedFile);
      formData.append("exercise_definition", "string");

      const response = await fetch("https://test-s2t-production.up.railway.app/evaluate-speech", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text().catch(() => "No error details available");
        throw new Error(`Speech evaluation failed: ${response.status} ${response.statusText}. ${errorText}`);
      }
      const result = await response.json();
      if (!result?.review) throw new Error("Invalid response format: Missing review data");
      setSpeechFeedback(result.review);
      setSelectedFile(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error occurred";
      setUploadError(`Đánh giá bài nói thất bại: ${msg}`);
    } finally {
      setIsUploading(false);
    }
  }, [selectedFile]);

  const handleRecordingToggle = useCallback(() => {
    setIsRecording((r) => !r);
    alert(
      'Chức năng ghi âm đang được phát triển. Hiện tại vui lòng sử dụng "Nộp bản ghi âm" để tải file từ máy tính.'
    );
  }, []);

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
              {item.type === "DOCUMENT" && (
                <SpeakingPractice
                  isRecording={isRecording}
                  isUploading={isUploading}
                  uploadError={uploadError}
                  selectedFile={selectedFile}
                  onToggleRecord={handleRecordingToggle}
                  onFilePicked={handleFileImport}
                  onSubmit={handleSubmitRecording}
                  speechFeedback={speechFeedback}
                />
              )}
            </div>
          );
        }
        if (item.type === "IMAGE") return <ImageBlock key={item.id} src={item.content} />;
        if (item.type === "VIDEO") return <VideoBlock key={item.id} src={item.content} />;
        return null;
      })}

      <GeneratedQuestions questions={generatedQuestions} onClear={() => setGeneratedQuestions([])} />
      <BasicQuestionsList questions={basicQuestions || []} studentId={studentId} />
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
  studentId,
}: {
  currentSectionId: number | null;
  setCurrentSectionId: (id: number | null) => void;
  isUserNavigation: boolean;
  onUserNavigation?: () => void;
  studentId: number | null;
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

  // AI state
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiStage, setAiStage] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestionUI[]>([]);

  // Derived values
  const sections = courseSectionList?.data?.sections ?? [];
  // Support both legacy array response and new wrapper { contents, questions }
  const rawSection = section?.data as SectionApiDataV2 | ContentItem[] | undefined;
  const contents: ContentItem[] = Array.isArray(rawSection) ? (rawSection as ContentItem[]) : (rawSection?.contents ?? []);
  const basicQuestions: BasicQuestionItem[] = Array.isArray(rawSection) ? [] : (rawSection?.questions ?? []);
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
  const isCompleted = Boolean(studentCourseProgress?.data?.isLastSection && studentCourseProgress?.data?.progress === 100);
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

  // Handlers
  const handleAIQuestionGeneration = useCallback(async () => {
    if (!contents?.length) return;
    const videoContent = contents.find((item: ContentItem) => item.type === "VIDEO");
    if (!videoContent) return alert("No video content found in this section to generate questions from.");

    setIsGeneratingQuestions(true);
    setAiProgress(0);
    setAiStage("Preparing...");

    try {
      setAiStage("Downloading video...");
      setAiProgress(20);
      const videoFile = await prepareVideoForAI(videoContent.content);
      await saveVideoToDownloads(videoFile);
      setAiStage("Video downloaded successfully");
      setAiProgress(50);

      setAiStage("Uploading to AI service...");
      setAiProgress(75);

      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("sectionId", currentSectionId?.toString() || "");
      formData.append("courseId", courseId || "");

      setAiStage("Processing with AI...");
      setAiProgress(90);

      const response = await fetch("https://test-s2t-production.up.railway.app/generate-quiz", {
        method: "POST",
        body: formData,
        signal: AbortSignal.timeout(300000), // 5m timeout
      });
      if (!response.ok) {
        const errorText = await response.text().catch(() => "No error details available");
        throw new Error(`AI API request failed: ${response.status} ${response.statusText}. Details: ${errorText}`);
      }

      const result = await response.json();
      const apiQuestions: GeneratedQuestionRaw[] | undefined = result?.questions;
      if (!apiQuestions || !Array.isArray(apiQuestions) || apiQuestions.length === 0) {
        throw new Error("No questions were generated by the AI service");
      }

      const formatted = apiQuestions
        .map((q, index): GeneratedQuestionUI | null => {
          if (!q || typeof q !== "object" || !q.question || !Array.isArray(q.options) || q.options.length === 0) {
            return null;
          }
          const correctAnswerIndex = q.options.findIndex((opt) => !!opt && opt.isCorrect === true);
          const opts = q.options.map((o) => o?.text || "Invalid option").filter(Boolean) as string[];
          return {
            id: q.questionNumber || index + 1,
            question: q.question,
            type: "multiple_choice",
            options: opts,
            correctAnswer: Math.max(0, correctAnswerIndex),
            explanation: q.explanation || "",
            originalOptions: q.options,
          };
        })
        .filter(Boolean) as GeneratedQuestionUI[];

      if (!formatted.length) throw new Error("No valid questions could be processed from the AI response");

      setGeneratedQuestions(formatted);
      setAiStage(`Generated "${result.quizTitle || "Generated Quiz"}" with ${formatted.length} questions!`);
      setAiProgress(100);
      setTimeout(() => {
        setAiStage("");
        setAiProgress(0);
      }, 2000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      alert(
        `Failed to generate questions: ${message}\n\nTroubleshooting steps:\n1. Check if backend server is running at https://lmsaibe-production.up.railway.app\n2. Verify the /generate-quiz endpoint exists\n3. Check browser console for detailed error logs\n4. Ensure CORS is properly configured on the backend\n5. Try refreshing the page and attempting again`
      );
      setAiStage("Error occurred");
      setTimeout(() => {
        setAiStage("");
        setAiProgress(0);
      }, 3000);
    } finally {
      setIsGeneratingQuestions(false);
    }
  }, [contents, currentSectionId, courseId]);

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
    } catch (error) {
      // ignore
    }
  }, [sections, currentSectionId, onUserNavigation, setCurrentSectionId, updateCompletedSection]);

  // Loading & error states for page
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
                        <h3 className="text-lg font-medium text-gray-600 mt-1">{currentSectionMeta?.title || "Hoạt động 1"}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <h2 className="text-2xl font-bold text-gray-800">{currentSectionMeta?.description || "Nội dung bài học"}</h2>

                <ContentRenderer
                  contents={contents}
                  generatedQuestions={generatedQuestions}
                  setGeneratedQuestions={setGeneratedQuestions}
                  basicQuestions={basicQuestions}
                  studentId={studentId}
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
            <div className="text-sm font-medium">Progress: {currentIndex + 1} / {sectionsLength}</div>
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
  const studentId = localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId") as string, 10) : null;

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
            studentId={studentId}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
