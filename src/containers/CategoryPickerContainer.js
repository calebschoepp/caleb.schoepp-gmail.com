import React, { useState, useEffect } from "react";

import DesktopCategoryPicker from "../components/DesktopCategoryPicker";

import { getCategory } from "../api/api.js";

const categories = [
  "hot",
  "top:day",
  "top:week",
  "top:month",
  "top:year",
  "top:all",
  "rising",
];

function CategoryPickerContainer({ setPostIDs }) {
  const [category, setCategory] = useState("hot");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategory(category);
      setPostIDs(res.posts);
    };
    fetchData();
  }, [category, setPostIDs]);
  return (
    <DesktopCategoryPicker
      category={category}
      setCategory={setCategory}
      categories={categories}
    />
  );
}

export default CategoryPickerContainer;
