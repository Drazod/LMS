import { Outlet } from "react-router-dom";
import { H4 } from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Card,
  CardHeader,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr";

const introductionItems = [
  {
    title: "Giới thiệu phần học",
    content: [
      "Trong bài học này, các em sẽ được rèn luyện kĩ năng giới thiệu, phân tích và đánh giá một truyện kể dựa trên cả hai phương diện: nội dung (cốt truyện, nhân vật, ý nghĩa) và nghệ thuật (ngôn ngữ, kết cấu, giọng điệu…)."
    ],
  },
  {
    title: "Các em có thể làm được gì sau khi học xong?",
    content: [
      "Giới thiệu mạch lạc một truyện kể: nêu được tên tác phẩm, tác giả, cốt truyện và điểm đặc sắc.",
      "Đánh giá thuyết phục: chỉ ra những giá trị về nội dung và nghệ thuật, đưa ra nhận xét riêng, có bằng chứng cụ thể.",
      "Ứng dụng thực tế: có thể tự tin trình bày cảm nhận trước lớp, viết bài giới thiệu trên mạng xã hội, hoặc tham gia thảo luận, tranh luận về tác phẩm văn học.",
    ]
  },
  {
    title: "Luyện tập nói và nghe như thế nào?",
    content: [
      "Kĩ năng nói: luyện thuyết trình ngắn về một truyện kể đã học hoặc đã đọc thêm; chú ý diễn đạt rõ ràng, có cảm xúc, sử dụng ngôn ngữ phù hợp.",
      "Kĩ năng nghe: tập lắng nghe phần giới thiệu, đánh giá của bạn; ghi lại ý chính, nhận xét, đặt câu hỏi hoặc bổ sung ý kiến để tạo sự tương tác.",
      "Hoạt động kết hợp: thảo luận nhóm, mỗi bạn trình bày một phần, cùng nhau hoàn chỉnh bài đánh giá toàn diện về tác phẩm.",
    ]
  }
]

export default function MockStudentStudy() {
  return (
    <div className="flex flex-row gap-10">
      <div className="sticky flex flex-col gap-4 items-center top-4 self-start w-xs">
        <Card className="h-fit flex flex-col gap-0">
          <CardHeader>
            <H4>Giới thiệu bài học</H4>
          </CardHeader>
          <CardContent>
            <Accordion
              type="single"
              collapsible
              className="w-full h-fit"
              defaultValue="item-0"
            >
              {introductionItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="py-3">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="pt-0 pb-4">
                    <div className="flex flex-col gap-2">
                      {item.content.map((point, idx) => (
                        <p key={idx}>
                          <span className="font-black">--</span> {point}
                        </p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        <HoverCard>
          <HoverCardTrigger className="w-full">
            <Button
              variant="ghost"
              className="w-full hover:cursor-pointer ai-gradient-border flex items-center gap-2"
            >
              <SparkleIcon className="size-4" />
              Trợ giúp AI
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-2xl bg-gradient-to-r from-fuchsia-50 to-cyan-50 text-xs text-justify leading-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur consequat hendrerit felis sed cursus. Vivamus
            tincidunt purus et libero elementum egestas. Maecenas ut
            sapien sed nisi pretium luctus. Vivamus elementum consectetur
            magna, id vehicula nibh congue ut. Sed vulputate lacinia
            lacus ut porttitor. Suspendisse venenatis mauris nunc, non
            finibus quam mollis id. Quisque egestas dui feugiat magna
            aliquet pharetra. Ut tempor rhoncus lectus, ac iaculis ligula
            sollicitudin ac.
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  )
}