import React from "react";
import Header from "./Header.js";
import InfiniteScrollerContainer from "./InfiniteScrollerContainer.js";
import Footer from "./Footer.js";

function App() {
  return (
    <>
      <Header />
      <InfiniteScrollerContainer postIDs={[1, 2, 3, 4, 5, 1, 2, 3, 4, 5]} />
      <Footer />
    </>
  );
}

export default App;
