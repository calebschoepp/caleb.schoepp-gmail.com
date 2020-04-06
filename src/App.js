import React, { useState } from "react";
import Header from "./Header.js";
import CategoryPickerContainer from "./CategoryPickerContainer.js";
import InfiniteScrollerContainer from "./InfiniteScrollerContainer.js";
import Footer from "./Footer.js";

function App() {
  const [postIDs, setPostIDs] = useState([]);
  console.log(postIDs);
  return (
    <>
      <Header />
      <CategoryPickerContainer setPostIDs={setPostIDs} />
      <InfiniteScrollerContainer postIDs={postIDs} />
      <Footer />
    </>
  );
}

export default App;
