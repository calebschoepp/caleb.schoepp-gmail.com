import React, { useState, useEffect, useRef } from "react";

import InfiniteScroller from "../components/InfiniteScroller.js";

import { getPost } from "../util/api.js";

const NUMBER_LOADING_CARDS = 3;

function InfiniteScrollerContainer({ postIDs, setWidth }) {
  const [posts, setPosts] = useState({});
  const [postsLength, setPostsLength] = useState(0);

  const infiniteLoaderRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    setPosts({});
    setPostsLength(0);
    infiniteLoaderRef.current.resetLoadMoreRowsCache(false);
  }, [postIDs]);

  useEffect(() => {
    const handleResize = () => listRef.current.recomputeRowHeights(0);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const loadNextPost = ({ startIndex, stopIndex }) => {
    return new Promise((resolve, reject) => {
      const fetchData = async () => {
        let newPosts = posts;
        for (let i = startIndex; i <= stopIndex; ++i) {
          if (!!posts[i]) {
            // Post is already loaded
            continue;
          }
          const res = await getPost(postIDs[i]); // TODO catch errors
          newPosts[i] = { ...res };
        }
        setPosts(newPosts);
        setPostsLength(postsLength + (stopIndex - startIndex + 1));
        console.log("newPosts", newPosts);
        listRef.current.recomputeRowHeights(startIndex);
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
      listRef={listRef}
      setWidth={setWidth}
    />
  );
}

export default InfiniteScrollerContainer;
