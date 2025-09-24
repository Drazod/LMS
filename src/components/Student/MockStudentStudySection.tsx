import { H3, H4 } from "@/components/ui/typography"
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

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

export default function MockStudentStudySection() {
  return (
    <div className="py-5 flex flex-col gap-4 flex-grow">
      <H3>Phần 1: Kỹ năng nói</H3>
      <main>
        <section>
          <H4 id="activity-1">Hoạt động 1</H4>
          <p>Em hãy theo dõi đoạn video sau và trả lời các câu hỏi bên dưới:</p>
          <iframe
            className="aspect-16/9 p-10"
            src="https://www.youtube-nocookie.com/embed/y_xmMWaNsbg?si=RwD3gKrhI2Al-7F6"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
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