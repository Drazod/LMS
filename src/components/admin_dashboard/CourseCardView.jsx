import { useGetInstructorByIdQuery } from "@/apis/adminApi";
import { Star } from "@mui/icons-material";
import { useEffect } from "react";
import test_img from "../../assets/courses/pic1.jpg";
import test_ppl_img from "../../assets/test_profile_img/pic3.jpg";

const RatingStart = ({ point, index }) => {
  return index <= point ? (
    <Star sx={{ fontSize: 20, color: "#4c1864" }} />
  ) : (
    <Star sx={{ fontSize: 20, color: "#9e9e9e" }} />
  );
};

const CourseCardView = ({
  courseId,
  courseThumbnail,
  title,
  description,
  categoryId,
  instructorName,
  price,
}) => {
  // const { data } = useGetInstructorByIdQuery(instructorId);

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-center items-center md:items-start">
      <div className="w-60 min-w-60 h-60 box-border overflow-hidden rounded-md">
        <img src={courseThumbnail} className="object-cover w-full h-60" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-4 w-full md:min-h-60">
          <div className="text-xl font-semibold">{title}</div>
          <div className="flex flex-wrap gap-5 items-center">
            <div className="flex flex-row gap-3 items-center">
              <img
                src={test_ppl_img}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <div className="text-xs font-medium text-gray-500">Instructor</div>
                <div className="text-base font-medium">
                  {instructorName}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs font-medium text-gray-500">
                {categoryId}
              </div>
              <div className="text-base font-medium">BACKEND</div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs font-medium text-gray-500">3 Review</div>
              <div className="flex flex-row gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <RatingStart point={3 - 1} index={index} key={index} />
                ))}
              </div>
            </div>
            <button className="rounded-full bg-teal-400 text-white text-sm px-2 py-1">
              Pending
            </button>
            <div className="flex flex-col ml-auto">
              {/* <div className="text-xs line-through font-medium text-gray-500">
                $190
              </div> */}
              <div className="text-lg font-semibold">${price}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-base font-semibold">Course Description</div>
            <p className="text-sm">{description}</p>
          </div>
        </div>
        {/* <div className="flex flex-row gap-2 mt-2">
          <button className="text-sm px-3 py-2 rounded-full border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white">
            Approve
          </button>
          <button className="text-sm px-3 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            Cancel
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CourseCardView;
