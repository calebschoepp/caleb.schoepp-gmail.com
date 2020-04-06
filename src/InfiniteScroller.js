import React from "react";
import { InfiniteLoader, WindowScroller, List } from "react-virtualized";

import PostCard from "./PostCard.js";

const LOADING_CARD_HEIGHT = 600;

function InfiniteScroller({
  posts,
  loadNextPost,
  rowCount,
  infiniteLoaderRef,
}) {
  const isRowLoaded = ({ index }) => {
    return !!posts[index];
  };

  // Render a list item or a loading indicator.
  const rowRenderer = ({ index, key, style }) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = "Loading...";
    } else {
      content = <PostCard url={posts[index].url} />;
    }

    return (
      <div className="border-4 border-red-900" key={key} style={style}>
        {content}
      </div>
    );
  };

  const calculateRowHeight = ({ index }) => {
    if (!!posts[index]) {
      return posts[index].maxHeight;
    } else {
      return LOADING_CARD_HEIGHT;
    }
  };

  return (
    <div className="mx-auto border-black border-8 max-w-3xl">
      <InfiniteLoader
        ref={infiniteLoaderRef}
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
                  rowHeight={calculateRowHeight}
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
