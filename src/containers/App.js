import React, { useState } from "react";
import Header from "./Header.js";
import CategoryPickerContainer from "./CategoryPickerContainer.js";
import InfiniteScrollerContainer from "./InfiniteScrollerContainer.js";
import Footer from "./Footer.js";
import { BACKGROUND_COLOR } from "../util/constants.js";

function App() {
  const [postIDs, setPostIDs] = useState([]);
  const [scrollerWidth, setScrollerWidth] = useState([]);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  return (
    <div className={`bg${BACKGROUND_COLOR} font-bitter`}>
      <Header setHamburgerOpen={setHamburgerOpen} />
      <CategoryPickerContainer
        setPostIDs={setPostIDs}
        scrollerWidth={scrollerWidth}
        hamburgerOpen={hamburgerOpen}
        setHamburgerOpen={setHamburgerOpen}
      />
      <InfiniteScrollerContainer
        postIDs={postIDs}
        setScrollerWidth={setScrollerWidth}
      />
      <Footer />
    </div>
  );
}

export default App;
