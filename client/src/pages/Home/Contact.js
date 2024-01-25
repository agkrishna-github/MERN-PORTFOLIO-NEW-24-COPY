import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

const Contact = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;
  return (
    <div>
      <SectionTitle title="Say Hello" />
      <div className="flex sm:flex-col item-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-tertiary">{"{"}</p>
          {Object.keys(contact).map(
            (key, index) =>
              key !== "_id" && (
                <p className="ml-5" key={index}>
                  <span className="text-tertiary">{key} :</span>
                  <span className="text-tertiary"> {contact[key]}</span>
                </p>
              )
          )}
          <p className="text-tertiary">{"}"}</p>
        </div>
        <div className="h-[400px] w-full bg-white">
          <img src="" alt="no image" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
