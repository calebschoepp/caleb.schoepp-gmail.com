import React, { useState } from "react";

import InfiniteScroller from "./InfiniteScroller.js";

const NUMBER_LOADING_CARDS = 3;

function InfiniteScrollerContainer({ postIDs }) {
  const [posts, setPosts] = useState({});
  const [postsLength, setPostsLength] = useState(0);

  const loadNextPost = ({ startIndex, stopIndex }) => {
    return new Promise((resolve, reject) => {
      let newPosts = posts;
      setTimeout(() => {
        for (let i = startIndex; i <= stopIndex; ++i) {
          // console.log(startIndex, stopIndex);
          if (!!posts[i]) {
            console.log("overlap");
            // Post is already loaded
            continue;
          }
          newPosts[i] = { url: "test/a.jpg", maxHeight: 791 };
        }
        setPosts(newPosts);
        setPostsLength(postsLength + (stopIndex - startIndex + 1));
        resolve("Done");
      }, 2000);
    });
  };

  const rowCount = () => {
    // console.log(posts);
    // const postsLength = Object.keys(posts).length;
    // console.log(Object.keys(posts));
    if (postsLength < postIDs.length) {
      return Math.min(postsLength + NUMBER_LOADING_CARDS, postIDs.length);
    } else {
      return postIDs.length;
    }
  };

  return (
    <InfiniteScroller
      posts={posts}
      loadNextPost={loadNextPost}
      rowCount={rowCount()}
    />
  );
}

export default InfiniteScrollerContainer;
