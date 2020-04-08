import React from "react";

function CategoryLink(props) {
  let { name, onClick, selected } = props;
  return (
    <span
      onClick={onClick}
      className={`text-2xl text-gray-800 hover:underline my-4 mx-2 ${
        selected ? "underline" : null
      }`}
    >
      {name}
    </span>
  );
}

export default CategoryLink;
