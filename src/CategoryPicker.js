import React from "react";
import CategoryLink from "./CategoryLink.js";

function CategoryPicker() {
  return (
    <div className="flex flex-row justify-center content-center">
      <CategoryLink name={"Hot"} />
      <CategoryLink name={"New"} />
      <CategoryLink name={"Top"} />
      <CategoryLink name={"Rising"} />
    </div>
  );
}

export default CategoryPicker;
