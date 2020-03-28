import React from "react";

function Gallery() {
  return (
    <div>
      <p className="text-center">Up</p>
      <div className="flex flex-row justify-center content-center">
        <p>Left</p>
        <img alt="Test Image"></img>
        <p>Right</p>
      </div>
      <p className="text-center">Down</p>
    </div>
  );
}

export default Gallery;
