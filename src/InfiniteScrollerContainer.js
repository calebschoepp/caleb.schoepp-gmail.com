import React, { useState } from "react";

import InfiniteScroller from "./InfiniteScroller.js";

function InfiniteScrollerContainer({ postIDs }) {
  const [posts, setPosts] = useState({});

  const loadNextPost = ({ startIndex, stopIndex }) => {
    console.log(`start:${startIndex} stop:${stopIndex}`);
    return new Promise((resolve, reject) => {
      let postsToAdd = {};
      setTimeout(() => {
        for (let i = startIndex; i <= stopIndex; ++i) {
          console.log(posts);
          if (!!posts[i]) {
            // Post is already loaded
            console.log("overlap");
            continue;
          }
          postsToAdd[i] = "test/a.jpg";
        }
        setPosts({ ...posts, ...postsToAdd });
        resolve("Done");
      }, 800);
    });
  };

  return (
    <InfiniteScroller posts={posts} loadNextPost={loadNextPost} rowCount={20} />
  );
}

export default InfiniteScrollerContainer;
