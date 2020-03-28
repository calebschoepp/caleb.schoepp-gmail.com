import React from "react";

function PreviewImage(props) {
  let { url, alt } = props;
  return <img className="w-64 mx-auto my-32" src={url} alt={alt}></img>;
}

export default PreviewImage;
