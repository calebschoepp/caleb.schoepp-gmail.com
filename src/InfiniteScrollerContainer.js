import React, { useState, useEffect, useRef } from "react";

import InfiniteScroller from "./InfiniteScroller.js";

import { getPost } from "./api.js";

const NUMBER_LOADING_CARDS = 3;

function InfiniteScrollerContainer({ postIDs }) {
  const [posts, setPosts] = useState({});
  const [postsLength, setPostsLength] = useState(0);

  const infiniteLoaderRef = useRef(null);

  useEffect(() => {
    console.log("effect");
    setPosts({});
    setPostsLength(0);
    infiniteLoaderRef.current.resetLoadMoreRowsCache(false);
  }, [postIDs]);

  const loadNextPost = ({ startIndex, stopIndex }) => {
    return new Promise((resolve, reject) => {
      const fetchData = async () => {
        console.log(startIndex, stopIndex);
        let newPosts = posts;
        for (let i = startIndex; i <= stopIndex; ++i) {
          if (!!posts[i]) {
            // Post is already loaded
            continue;
          }
          const res = await getPost(i); // TODO catch errors
          console.log(res);
          newPosts[i] = { url: "test/a.jpg", maxHeight: 791 };
        }
        setPosts(newPosts);
        setPostsLength(postsLength + (stopIndex - startIndex + 1));
        resolve("Done");
      };
      fetchData();
    });
  };

  const rowCount = () => {
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
      infiniteLoaderRef={infiniteLoaderRef}
    />
  );
}

export default InfiniteScrollerContainer;
