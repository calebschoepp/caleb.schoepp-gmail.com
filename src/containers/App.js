import React, { useState } from "react";
import Header from "./Header.js";
import CategoryPickerContainer from "./CategoryPickerContainer.js";
import InfiniteScrollerContainer from "./InfiniteScrollerContainer.js";
import Footer from "./Footer.js";

function App() {
  const [postIDs, setPostIDs] = useState([]);
  const [scrollerWidth, setScrollerWidth] = useState([]);
  return (
    <>
      <Header />
      <CategoryPickerContainer
        setPostIDs={setPostIDs}
        scrollerWidth={scrollerWidth}
      />
      <InfiniteScrollerContainer
        postIDs={postIDs}
        setScrollerWidth={setScrollerWidth}
      />
      <Footer />
    </>
  );
}

export default App;
