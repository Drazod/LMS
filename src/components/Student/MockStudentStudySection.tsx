import { useState } from "react"
import { H3, H4 } from "@/components/ui/typography"
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { RecordIcon, DotsThreeOutlineVerticalIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "../ui/button"

const questionItems = [
  {
    "id": 1,
    "question": "Thời tiết buổi sáng ở Hà Nội như thế nào?",
    "options": [
      "A. Nắng gắt",
      "B. Có sương mù nhẹ",
      "C. Mưa rào",
      "D. Gió mạnh"
    ],
    "answer": "B"
  },
  {
    "id": 2,
    "question": "Nhiệt độ cao nhất ở Hà Nội được dự báo là bao nhiêu?",
    "options": [
      "A. 23°C",
      "B. 25°C",
      "C. 27°C",
      "D. 30°C"
    ],
    "answer": "C"
  },
  {
    "id": 3,
    "question": "Thành phố nào có mưa rào rải rác cả ngày?",
    "options": [
      "A. Hà Nội",
      "B. Đà Nẵng",
      "C. TP. Hồ Chí Minh",
      "D. Hải Phòng"
    ],
    "answer": "B"
  },
  {
    "id": 4,
    "question": "Nhiệt độ cao nhất dự kiến ở TP. Hồ Chí Minh là bao nhiêu?",
    "options": [
      "A. 30°C",
      "B. 32°C",
      "C. 34°C",
      "D. 36°C"
    ],
    "answer": "C"
  },
  {
    "id": 5,
    "question": "Khu vực nào cần chuẩn bị áo mưa do khả năng mưa giông vào chiều tối?",
    "options": [
      "A. Vùng núi phía Bắc",
      "B. Trung Bộ",
      "C. Tây Nguyên",
      "D. Đồng bằng sông Cửu Long"
    ],
    "answer": "A"
  },
  {
    "id": 6,
    "question": "Ngày dự báo thời tiết được nhắc đến là ngày nào?",
    "options": [
      "A. Thứ Hai",
      "B. Thứ Ba",
      "C. Thứ Tư",
      "D. Thứ Năm"
    ],
    "answer": "B"
  },
  {
    "id": 7,
    "question": "Buổi trưa ở Hà Nội có hiện tượng thời tiết gì?",
    "options": [
      "A. Trời chuyển nắng",
      "B. Trời nhiều mây",
      "C. Mưa phùn",
      "D. Gió lớn"
    ],
    "answer": "A"
  },
  {
    "id": 8,
    "question": "Đà Nẵng được dự báo có mức nhiệt trong khoảng nào?",
    "options": [
      "A. 20-25°C",
      "B. 22-28°C",
      "C. 25-30°C",
      "D. 27-32°C"
    ],
    "answer": "C"
  },
  {
    "id": 9,
    "question": "Người dân vùng núi phía Bắc được khuyên mang theo gì khi ra ngoài?",
    "options": [
      "A. Ô dù",
      "B. Áo mưa",
      "C. Khẩu trang",
      "D. Nước uống"
    ],
    "answer": "B"
  },
]

export function MockStudentStudySectionListening() {
  return (
    <div className="py-5 flex flex-col gap-4 flex-grow">
      <H3>Phần 2: Kỹ năng nghe</H3>
      <main>
        <section>
          <H4 id="activity-1">Hoạt động 1</H4>
          <p>Em hãy theo dõi đoạn video sau và trả lời các câu hỏi bên dưới:</p>
          <iframe
            className="aspect-16/9 p-10"
            src="https://www.youtube-nocookie.com/embed/y_xmMWaNsbg?si=RwD3gKrhI2Al-7F6"
            title="YouTube video player" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="grid grid-cols-3 gap-3">
            {
              questionItems.map((item) => (
                <Card key={item.id} className="flex flex-col gap-3">
                  <CardHeader>
                    <CardTitle>Câu hỏi số {item.id}</CardTitle>
                    <CardDescription>{item.question}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup className="grid gap-0">
                      {item.options.map((option, idx) => (
                        <div key={idx} className="hover:bg-blue-50 flex items-center gap-3 rounded-lg p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-100 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                          <RadioGroupItem id={`question-${item.id}-option-${idx}`} value={option.charAt(0)} />
                          <Label htmlFor={`question-${item.id}-option-${idx}`} className="leading-tight">{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </section>
      </main>
    </div>
  )
}

export function MockStudentStudySectionSpeaking() {
  const [isRecording, setIsRecording] = useState(false);
  const debateTopics = [
    "Giới trẻ lựa chọn nghề nghiệp dựa trên nhu cầu của thị trường lao động",
    "Văn hóa đọc của học sinh trung học đang có xu hướng giảm",
    "Học sinh được phép sử dụng trí tuệ nhân tạo khi làm bài kiểm tra hoặc bài tập",
    "Học sinh “hóng hớt drama” trên các nền tảng mạng xã hội",
    "Người nổi tiếng, người có sức ảnh hưởng quảng cáo thông tin sai lệch đến người tiêu dùng",
    "Vấn nạn tin giả và vai trò của giới trẻ trong việc xác thực thông tin",
  ]
  const feedback = {
    "topic": "Văn hóa đọc của học sinh trung học đang có xu hướng giảm",
    "feedback": {
      "strengths": {
        "content": "Chủ đề thời sự, gần gũi với lứa tuổi học sinh. Bạn đã nêu được thực trạng rõ ràng và đưa ra các số liệu minh họa thuyết phục.",
        "argument": "Bài nói có bố cục hợp lý (mở - thân - kết), lý giải nguyên nhân và đề xuất giải pháp cụ thể như xây dựng góc đọc, tổ chức câu lạc bộ sách.",
        "language": "Sử dụng từ ngữ trong sáng, dễ hiểu, có một số câu nhấn mạnh mang tính gợi mở, giúp người nghe suy nghĩ.",
        "nonVerbal": "Giọng nói rõ ràng, âm lượng ổn định; ánh mắt giao tiếp với khán giả tốt, tạo cảm giác tự tin."
      },
      "suggestions": {
        "speedAndEmphasis": "Ở vài đoạn giải pháp, bạn nói hơi nhanh, khiến người nghe khó theo kịp.",
        "gestures": "Tay hơi ít động tác, có thể sử dụng thêm những cử chỉ minh họa để tăng sức thuyết phục.",
        "conclusion": "Phần kết cần thêm câu kêu gọi hành động mạnh mẽ hơn, chẳng hạn khuyến khích các bạn cùng chung tay xây dựng thói quen đọc."
      },
      "overall": "Bài thuyết trình của bạn đã thể hiện sự chuẩn bị nghiêm túc, lập luận mạch lạc và tạo được sự quan tâm của người nghe. Chỉ cần điều chỉnh nhịp độ, bổ sung cử chỉ minh họa và câu kết ấn tượng hơn, bài nói sẽ hoàn thiện và cuốn hút hơn nữa."
    }
  }


  return (
    <div className="py-5 flex flex-col gap-4 flex-grow">
      <H3>Phần 1: Kỹ năng nói</H3>
      <main>
        <section>
          <H4 id="activity-1">Hoạt động 1</H4>
          <Card className="mt-2 mb-4">
            <CardContent className="flex flex-col gap-4">
              <p>
                <span className="font-bold">Tình huống:</span> Trường em tổ chức một cuộc thi hùng biện, tranh luận để tìm kiếm đại diện tham gia cuộc thi Trường Teen 2025.
              </p>
              <div className="flex flex-col gap-2">
                <p>
                  <span className="font-bold">Yêu cầu:</span> Để tham gia cuộc thi cấp Trường, em cần lựa chọn một trong những vấn đề xã hội bên dưới và thực hiện thuyết trình có sử dụng kết hợp phương tiện ngôn ngữ và giao tiếp phi ngôn ngữ.
                </p>
                <ul className="list-disc list-inside">
                  {debateTopics.map((topic, idx) => (
                    // change right margin of li::marker to 0px
                    <li className="ml-6 list-item" key={idx}>{topic}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          <div className="mb-4">
            <Card>
              <CardContent className="flex flex-col gap-4 items-center justify-center">
                <img src="/src/assets/waveform.jpg" alt="Recording" className={`${isRecording ? 'block' : 'hidden'}`} />
                <div className="flex w-full justify-between gap-3">
                  <Button>Nộp bản ghi âm</Button>
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
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-3">
            {/* Feedback Card */}
            <Card className="flex flex-col gap-3 bg-gradient-to-r from-amber-100 to-yellow-200">
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
          </div>
        </section>
      </main>
    </div>
  )
}