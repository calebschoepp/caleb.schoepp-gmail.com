import React from "react";
import PreviewImage from "./PreviewImage";
import MainImage from "./MainImage";

function Gallery() {
  return (
    <div>
      <PreviewImage alt={"alt text here"} url={"/test/1.jpg"} />
      <div className="flex flex-row justify-center items-center">
        <PreviewImage alt={"alt text here"} url={"/test/2.jpg"} />
        <MainImage alt={"alt text here"} url={"/test/original.jpg"} />
        <PreviewImage alt={"alt text here"} url={"/test/3.jpg"} />
      </div>
      <PreviewImage alt={"alt text here"} url={"/test/4.gif"} />
    </div>
  );
}

export default Gallery;
