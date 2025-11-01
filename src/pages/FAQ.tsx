import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "faq-1",
    question: "Ứng dụng này dành cho ai?",
    answer:
      "Ứng dụng này được thiết kế chuyên biệt cho học sinh trung học đang theo học Chương trình Ngữ văn 2018. Mục tiêu chính là giúp các em rèn luyện và nâng cao kỹ năng nghe hiểu, phân tích, cũng như cải thiện khả năng phản hồi bằng kỹ năng nói và nghe trong cả môi trường học tập và đời sống hàng ngày.",
  },
  {
    id: "faq-2",
    question: "Ứng dụng giúp rèn luyện kỹ năng nghe như thế nào?",
    answer:
      "Người học sẽ bắt đầu bằng cách lắng nghe các đoạn âm thanh đa dạng như hội thoại, bản tin, phỏng vấn hoặc bài phát biểu, tất cả đều được tạo tự động bằng công nghệ AI Text-to-Speech. Sau khi nghe, học sinh sẽ thực hành bằng cách trả lời các câu hỏi dưới nhiều hình thức (trắc nghiệm, điền từ, tự luận, hoặc nói lại bằng giọng thật). Hệ thống sẽ cung cấp phản hồi tức thì về độ chính xác, tốc độ phản ứng và phân tích các loại lỗi nghe (như lỗi ý chính, chi tiết, hay suy luận). Dựa trên kết quả này, AI sẽ đưa ra gợi ý về các bài luyện tập tiếp theo phù hợp với trình độ của từng cá nhân.",
  },
  {
    id: "faq-3",
    question: "Ứng dụng sử dụng công nghệ AI nào?",
    answer:
      "Ứng dụng được xây dựng trên ba lớp công nghệ AI chính. Đầu tiên là công nghệ Speech-to-Text (ASR) để nhận diện chính xác giọng nói của học sinh khi trả lời bằng lời. Thứ hai là các Mô hình Ngôn ngữ Lớn (LLM) chịu trách nhiệm tạo ra câu hỏi, chấm điểm tự động, cung cấp phản hồi chi tiết và cá nhân hóa lộ trình học tập cho từng em.",
  },
  {
    id: "faq-4",
    question: "Ứng dụng khác gì so với các app học tiếng Việt hiện nay?",
    answer:
      "Điểm khác biệt lớn nhất là ứng dụng này được thiết kế cho người Việt học tiếng Việt, thay vì cho người nước ngoài. Toàn bộ nội dung và phương pháp đánh giá đều tuân theo chuẩn năng lực Nghe của Chương trình Ngữ văn 2018. Hơn nữa, ứng dụng tích hợp AI để phân tích sâu về hành vi nghe, tự động tạo bài tập cá nhân hóa và xây dựng một hồ sơ năng lực (portfolio) thể hiện sự tiến bộ. Chúng tôi cũng cung cấp một bảng điều khiển (dashboard) riêng cho giáo viên để theo dõi quá trình học tập của học sinh.",
  },
  {
    id: "faq-5",
    question: "Dữ liệu học sinh có được bảo mật không?",
    answer:
      "Có. Chúng tôi rất coi trọng việc bảo mật dữ liệu. Tất cả các bản ghi âm và bản ghi chép (transcript) đều được mã hóa và lưu trữ an toàn trên máy chủ riêng hoặc cục bộ. Học sinh có toàn quyền yêu cầu xóa dữ liệu của mình bất cứ lúc nào. Ứng dụng cũng tuân thủ nghiêm ngặt nguyên tắc xin phép (consent form) trước khi thực hiện bất kỳ hoạt động ghi âm nào.",
  },
  {
    id: "faq-6",
    question: "Làm sao để biết mình tiến bộ thế nào?",
    answer:
      'Mỗi người học sẽ có một "Hồ sơ năng lực nghe" (Listening Portfolio) cá nhân. Bảng hồ sơ này bao gồm biểu đồ trực quan hóa tiến độ theo thời gian và đánh giá mức độ hoàn thành theo bốn bậc (từ Chưa đạt yêu cầu đến Vượt yêu cầu). Dựa trên dữ liệu này, hệ thống sẽ cung cấp các gợi ý cá nhân hóa, ví dụ: "Bạn nên luyện thêm 3 bài Nghe chi tiết cấp độ 3," để giúp bạn tập trung vào đúng kỹ năng cần cải thiện.',
  },
];

export default function FrequentlyAskedQuestionsPage() {
  return (
    <div className="w-full">
      <div className="w-full bg-[url(src/assets/home/school-classroom.jpg)] bg-center bg-no-repeat bg-cover h-96 relative">
        <div className="h-full pt-32 bg-purple-900 opacity-80 text-center flex items-center">
          <p className="text-white m-auto font-bold text-7xl">Câu hỏi thường gặp</p>
        </div>
      </div>
      <section className="max-w-2xl mx-auto p-14">
        <Accordion type="single" className="flex w-full flex-col items-center justify-center gap-3" collapsible>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-none bg-white m-0 w-full rounded-sm px-4 py-2">
              <AccordionTrigger className="font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};
