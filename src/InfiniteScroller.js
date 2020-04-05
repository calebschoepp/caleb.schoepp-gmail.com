import React from "react";
import { InfiniteLoader, WindowScroller, List } from "react-virtualized";

import PostCard from "./PostCard.js";

function InfiniteScroller({
  postObjects,
  hasNextPost,
  isNextPostLoading,
  loadNextPost,
}) {
  // console.log(postObjects, hasNextPost, isNextPostLoading);
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const rowCount = hasNextPost ? postObjects.length + 4 : postObjects.length;
  console.log(rowCount);

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = isNextPostLoading ? () => {} : loadNextPost;

  // Every row is loaded except for our loading indicator row.
  const isRowLoaded = ({ index }) => {
    // console.log(`${index}:${!hasNextPost || index < postObjects.length}`);
    return !hasNextPost || index < postObjects.length;
  };

  // Render a list item or a loading indicator.
  const rowRenderer = ({ index, key, style }) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = "Loading...";
    } else {
      content = <PostCard url={postObjects[index]} />;
    }

    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  };

  // TODO find better way to do item height
  const heights = [791, 747, 791, 777, 791];

  // const infiniteLoaderRef = useRef(null);

  const calculateRowHeight = ({ index }) => {
    return heights[index];
  };

  return (
    <div className="mx-auto border-black border-8 max-w-3xl">
      <InfiniteLoader
        // ref={infiniteLoaderRef} TODO remove this I think
        rowCount={rowCount}
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        minimumBatchSize={1}
        threshold={4}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => {
              return (
                <List
                  ref={registerChild}
                  width={640}
                  autoHeight
                  height={height}
                  isScrolling={isScrolling} // Don't think I need these
                  onScroll={onChildScroll} // ^
                  scrollTop={scrollTop} // ^
                  rowCount={rowCount}
                  rowHeight={800}
                  onRowsRendered={onRowsRendered}
                  rowRenderer={rowRenderer}
                />
              );
            }}
          </WindowScroller>
        )}
      </InfiniteLoader>
    </div>
  );
}

export default InfiniteScroller;
