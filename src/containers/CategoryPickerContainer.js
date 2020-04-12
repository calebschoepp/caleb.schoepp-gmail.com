import React, { useState, useEffect } from "react";

import DesktopCategoryPicker from "../components/DesktopCategoryPicker";

import { getCategory } from "../util/api.js";
import { CATEGORIES, DESKTOP_PICKER_GAP } from "../util/constants.js";

function CategoryPickerContainer({ setPostIDs, width }) {
  const [category, setCategory] = useState("hot");
  const [desktopPickerLeft, setDesktopPickerLeft] = useState(1355);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const leftPosition = (windowWidth + width) / 2 + DESKTOP_PICKER_GAP;
      setDesktopPickerLeft(leftPosition);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      console.log("cleanup");
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

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
      categories={CATEGORIES}
      leftPosition={desktopPickerLeft}
    />
  );
}

export default CategoryPickerContainer;
