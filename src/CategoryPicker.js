import React from "react";
import CategoryLink from "./CategoryLink.js";

const categories = ["hot", "new", "top:week", "rising"];

function CategoryPicker(props) {
  const { category: currentCategory, setCategory } = props;
  return (
    <div className="flex flex-row justify-center content-center">
      {categories.map(category => {
        return (
          <CategoryLink
            name={category.toUpperCase()}
            onClick={() => setCategory(category)}
            selected={currentCategory === category}
            key={category}
          />
        );
      })}
    </div>
  );
}

export default CategoryPicker;
