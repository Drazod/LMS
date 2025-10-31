import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { useMemo } from "react";

import {
  RankingIcon,
  GlobeIcon,
  BookIcon,
  ArrowCircleUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";

import pic1 from "@/assets/home/home_image_speaking.jpg";
import pic2 from "@/assets/home/home_image_listening.jpg";
import pic3 from "@/assets/home/home_image_more.jpg";

const Sections = () => {
  const hasRole = useMemo(() => {
    return !!localStorage.getItem("role");
  }, []);

  const sectionCardData = [
    {
      img: pic1,
      alt: "pic1",
      icon: <RankingIcon weight="duotone" className="w-3/5 h-3/5" />,
      title: "Phòng luyện nói",
      slug: "phan-1-ky-nang-noi"
    },
    {
      img: pic2,
      alt: "pic2",
      icon: <GlobeIcon weight="duotone" className="w-3/5 h-3/5" />,
      title: "Phòng luyện nghe",
      slug: "phan-2-ky-nang-nghe"
    },
    {
      img: pic3,
      alt: "pic3",
      icon: <BookIcon weight="duotone" className="w-3/5 h-3/5" />,
      title: "Các khóa học online",
      slug: "courses"
    },
  ];

  return (
    <div className="container mx-auto px-14 md:grid md:grid-cols-3 gap-12 relative -top-40 z-10">
      {sectionCardData.map((data) => (
        <Card key={data.slug} className="flex flex-col items-center w-full h-80 py-0 overflow-clip">
          <div className="w-full h-1/2">
            <img src={data.img} alt={data.alt} className="w-full h-full object-cover" />
          </div>
          <div className="mx-auto w-fit relative -top-15">
            <div className="bg-gray-100 flex justify-center items-center w-16 h-16 rounded-full leading-16 shadow-2xl">
              {data.icon}
            </div>
          </div>
          <div className="relative -top-15 flex flex-col gap-2 items-center">
            <p className="text-xl font-bold">{data.title}</p>
            {data.slug === "courses" ? (
              <Link to="/course">
                <Button variant="outline" className="w-fit">
                  <ArrowCircleUpRightIcon weight="duotone" className="!size-5"/>
                  Xem tất cả khóa học
                </Button>
              </Link>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block">
                    <Link to={hasRole ? `/mock/student/undefined/${data.slug}` : "#"} className={!hasRole ? "pointer-events-none" : ""}>
                      <Button variant="outline" disabled={!hasRole} className="w-fit">
                        <ArrowCircleUpRightIcon weight="duotone" className="!size-5"/>
                        Chi tiết
                      </Button>
                    </Link>
                  </span>
                </TooltipTrigger>
                {!hasRole && (
                  <TooltipContent>
                    <p>Vui lòng đăng nhập để xem chi tiết.</p>
                  </TooltipContent>
                )}
              </Tooltip>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Sections;
