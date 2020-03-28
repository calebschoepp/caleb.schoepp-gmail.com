import React from "react";

function CategoryLink(props) {
  let { name } = props;
  return (
    <span className="text-2xl text-gray-800 hover:underline my-4 mx-2">
      {name}
    </span>
  );
}

export default CategoryLink;
