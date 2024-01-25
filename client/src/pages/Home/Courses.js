import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
const Courses = () => {
  const [selectedItemIdex, setSelectedItemIdex] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { course } = portfolioData;

  return (
    <div>
      <SectionTitle title="Courses" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {course.map((course, index) => (
            <div
              key={index}
              onClick={() => setSelectedItemIdex(index)}
              className="cursor-pointer"
            >
              <h2
                className={`text-xl px-5 ${
                  selectedItemIdex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a28] py-3"
                    : "text-white"
                }`}
              >
                {course.title}
              </h2>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <div className="flex flex-col gap-5">
            <h2 className="text-secondary text-xl">
              {course[selectedItemIdex].title}
            </h2>
            <p className="text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
              veritatis ab. Dolor obcaecati placeat beatae ipsam, praesentium ex
              deserunt repellendus.
            </p>
          </div>
          <img
            src={course[selectedItemIdex].image}
            alt=""
            className="h-52 w-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;
