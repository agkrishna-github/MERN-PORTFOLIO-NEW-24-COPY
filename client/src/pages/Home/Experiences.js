import React, { useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";
const Experiences = () => {
  const [selectedItemIdex, setSelectedItemIdex] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { experience } = portfolioData;
  return (
    <div>
      <SectionTitle title="Experiences" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {experience.map((experience, index) => (
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
                {experience.period}
              </h2>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-secondary text-xl">
            {experience[selectedItemIdex].title}
          </h2>
          <h2 className="text-tertiary text-xl">
            {experience[selectedItemIdex].company}
          </h2>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
            veritatis ab. Dolor obcaecati placeat beatae ipsam, praesentium ex
            deserunt repellendus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
