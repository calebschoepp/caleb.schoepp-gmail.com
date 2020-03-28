import React from "react";

function MainImage(props) {
  let { url, alt } = props;
  return <img className="w-2/4" src={url} alt={alt}></img>;
}

export default MainImage;
