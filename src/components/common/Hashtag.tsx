import React from "react";

export interface IHashtagProps {
  text: string;
}

const Hashtag = ({ text }: IHashtagProps) => {
  return (
    <div
      className="fs-14 hashtag bg-100 w-fit py-4 px-8 mr-4 mt-4 tc-600 br-4"
      style={{ cursor: "pointer" }}
    >
      {text}
    </div>
  );
};

export default Hashtag;
