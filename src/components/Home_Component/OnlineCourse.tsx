import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  StudentIcon,
  BooksIcon,
  StackIcon
} from "@phosphor-icons/react/dist/ssr";

const OnlineCourse = () => {
  const dataMap = [
    {
      icon: <StudentIcon weight="duotone" size={`6rem`} />,
      data: "5M+",
      object: "Students",
    },
    {
      icon: <BooksIcon weight="duotone" size={`6rem`} />,
      data: "30K+",
      object: "Books",
    },
    {
      icon: <StackIcon weight="duotone" size={`6rem`} />,
      data: "20K+",
      object: "Online courses",
    },
  ]

  return (
    <div className="">
      <div className="container mx-auto px-14 py-20 flex flex-col gap-4 justify-center">
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-4xl font-bold">Online Course To Learn</h1>
          <p> Own Your Feature Learning New Skill Online</p>
        </div>
        <div className="sm:w-1/2 sm:mx-auto my-6 flex gap-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit" variant="secondary">
            Subscribe
          </Button>
        </div>
        <div className="flex flex-row gap-20 mx-auto">
          {
            dataMap.map((data) => (
              <div key={data.data} className="flex flex-col gap-2 justify-center">
                <span className="flex items-center gap-2 font-extralight text-6xl">
                  {data.icon} {data.data}
                </span>
                <p className="text-2xl font-bold text-center">{data.object}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default OnlineCourse;
