import React, { useState } from "react";

import InfiniteScroller from "./InfiniteScroller.js";

function InfiniteScrollerContainer({ category }) {
  // TODO maybe pull category up one level of abstraction
  const [isNextPostLoading, setIsNextPostLoading] = useState(false);
  const [postObjects, setPostObjects] = useState([
    "test/a.jpg",
    "test/b.jpg",
    "test/c.jpg",
    "test/d.png",
  ]);
  let postIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const loadNextPost = ({ startIndex, stopIndex }) => {
    console.log(`start:${startIndex} stop:${stopIndex}`);
    // console.log(startIndex);
    setIsNextPostLoading(true);
    // console.log("loading");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let toAdd = [];
        for (let i = 0; i < stopIndex - startIndex; ++i) {
          toAdd.push("test/a.jpg");
        }
        setPostObjects([...postObjects, ...toAdd]);
        setIsNextPostLoading(false);
        resolve("Done");
      }, 2000);
    });
  };

  const hasNextPost = () => {
    return true;
  };

  return (
    <InfiniteScroller
      postObjects={postObjects}
      hasNextPost={hasNextPost()}
      isNextPostLoading={isNextPostLoading}
      loadNextPost={loadNextPost}
    />
  );
}

export default InfiniteScrollerContainer;
