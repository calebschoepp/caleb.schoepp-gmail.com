import React, { useState, useEffect } from "react";

import DesktopCategoryPicker from "../components/DesktopCategoryPicker";

import { getCategory } from "../util/api.js";
import { CATEGORIES } from "../util/constants.js";

const DESKTOP_PICKER_GAP = 40;

function CategoryPickerContainer({ setPostIDs, width }) {
  const [category, setCategory] = useState("hot");
  const [desktopPickerLeft, setDesktopPickerLeft] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const leftPosition = (windowWidth + width) / 2 + DESKTOP_PICKER_GAP;
      setDesktopPickerLeft(leftPosition);
    };
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
