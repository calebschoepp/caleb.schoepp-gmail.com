import React, { useState, useEffect, useRef } from "react";

import InfiniteScroller from "./InfiniteScroller.js";

import { getPost } from "./api.js";

const NUMBER_LOADING_CARDS = 1;

function InfiniteScrollerContainer({ postIDs }) {
  const [posts, setPosts] = useState({});
  const [postsLength, setPostsLength] = useState(0);

  const infiniteLoaderRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    setPosts({});
    setPostsLength(0);
    infiniteLoaderRef.current.resetLoadMoreRowsCache(false);
  }, [postIDs]);

  const loadNextPost = ({ startIndex, stopIndex }) => {
    return new Promise((resolve, reject) => {
      const fetchData = async () => {
        // console.log(startIndex, stopIndex);
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
    />
  );
}

export default InfiniteScrollerContainer;
