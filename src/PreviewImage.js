import React from "react";

function PreviewImage(props) {
  let { url, alt, onClick, display } = props;
  if (display) {
    return (
      <img
        className="w-64 mx-auto my-32"
        src={url}
        alt={alt}
        onClick={onClick}
      ></img>
    );
  }
  return <div className="bg-gray-500 w-64 h-64 mx-auto my-32"></div>;
}

export default PreviewImage;
