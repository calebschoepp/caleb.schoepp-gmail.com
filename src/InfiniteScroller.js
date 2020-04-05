import React from "react";
import { InfiniteLoader, WindowScroller, List } from "react-virtualized";

import PostCard from "./PostCard.js";

function InfiniteScroller({ posts, loadNextPost, rowCount }) {
  const isRowLoaded = ({ index }) => {
    return !!posts[index];
  };

  // Render a list item or a loading indicator.
  const rowRenderer = ({ index, key, style }) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = "Loading...";
    } else {
      content = <PostCard url={posts[index]} />;
    }

    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  };

  // TODO find better way to do item height
  const heights = [791, 747, 791, 777, 791];

  const calculateRowHeight = ({ index }) => {
    return heights[index];
  };

  return (
    <div className="mx-auto border-black border-8 max-w-3xl">
      <InfiniteLoader
        rowCount={rowCount}
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadNextPost}
        minimumBatchSize={2} // TODO tune this value
        threshold={1} // TODO tune this value
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
