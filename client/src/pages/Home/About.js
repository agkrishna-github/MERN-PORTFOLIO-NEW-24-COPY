import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";

const About = () => {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { skills, imageUrl, description1, description2 } = portfolioData.about;
  return (
    <div>
      <SectionTitle title="About" />
      <div className="flex sm:flex-col w-full gap-5 items-center">
        <div className="h-[60vh] w-1/2 sm:w-full bg-white rounded-2xl overflow-hidden">
          <img src={imageUrl} alt="DEVELOPER IMAGE" className="h-full w-full" />
        </div>
        <div className="flex flex-col gap-5 w-1/2 sm:w-full">
          <p className="text-white">{description1 || ""}</p>
          <p className="text-white">{description2 || ""}</p>
        </div>
      </div>
      <div className="py-10">
        <h2 className="text-tertiary text-xl">
          Hear are few technogies I have been Working with recently.
        </h2>
        <div className="flex flex-wrap gap-10 mt-5">
          {skills.map((skill, index) => (
            <div key={index} className="border border-tertiary py-3 px-10">
              <h2 className="text-tertiary">{skill}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
