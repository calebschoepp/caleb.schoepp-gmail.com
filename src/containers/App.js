import React, { useState } from "react";
import Header from "./Header.js";
import CategoryPickerContainer from "./CategoryPickerContainer.js";
import InfiniteScrollerContainer from "./InfiniteScrollerContainer.js";
import Footer from "./Footer.js";

function App() {
  const [postIDs, setPostIDs] = useState([]);
  const [width, setWidth] = useState([]);
  return (
    <>
      <Header />
      <CategoryPickerContainer setPostIDs={setPostIDs} width={width} />
      <InfiniteScrollerContainer postIDs={postIDs} setWidth={setWidth} />
      <Footer />
    </>
  );
}

export default App;
