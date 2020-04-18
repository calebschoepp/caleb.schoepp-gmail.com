import React, { useState, useEffect } from "react";

import DesktopCategoryPicker from "../components/DesktopCategoryPicker.js";
import MobileCategoryPicker from "../components/MobileCategoryPicker.js";

import { getCategory } from "../util/api.js";
import { DESKTOP_PICKER_GAP } from "../util/constants.js";

function CategoryPickerContainer({
  setPostIDs,
  scrollerWidth,
  hamburgerOpen,
  setHamburgerOpen,
}) {
  const [category, setCategory] = useState("top:day");
  const [desktopPickerLeft, setDesktopPickerLeft] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const leftPosition =
        (windowWidth + scrollerWidth) / 2 + DESKTOP_PICKER_GAP;
      setDesktopPickerLeft(leftPosition);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollerWidth]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategory(category);
      setPostIDs(res.posts);
    };
    fetchData();
  }, [category, setPostIDs]);

  if (window.innerWidth >= 1024) {
    return (
      <DesktopCategoryPicker
        category={category}
        setCategory={setCategory}
        leftPosition={desktopPickerLeft}
      />
    );
  }

  return (
    <MobileCategoryPicker
      category={category}
      setCategory={setCategory}
      isOpen={hamburgerOpen}
      close={() => setHamburgerOpen(false)}
    />
  );
}

export default CategoryPickerContainer;
