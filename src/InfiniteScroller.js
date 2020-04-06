import React, { useRef } from "react";
import { InfiniteLoader, WindowScroller, List } from "react-virtualized";
import composeRefs from "@seznam/compose-react-refs";

import PostCard from "./PostCard.js";

const LOADING_CARD_HEIGHT = 300;

function InfiniteScroller({
  posts,
  loadNextPost,
  rowCount,
  infiniteLoaderRef,
  listRef,
}) {
  const isRowLoaded = ({ index }) => {
    return !!posts[index];
  };

  // Render a list item or a loading indicator.
  const rowRenderer = ({ index, key, style }) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = "Loading...";
    } else if (posts[index].original) {
      content = <PostCard url={posts[index].original.url} />;
    } else {
      content = "Missing original..."; // TODO handle this case better
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
        {({ onRowsRendered, infiniteLoaderRegisterChild }) => (
          <WindowScroller>
            {({
              height,
              isScrolling,
              windowScrollerRegisterChild,
              onChildScroll,
              scrollTop,
            }) => {
              return (
                <List
                  ref={composeRefs(
                    infiniteLoaderRegisterChild,
                    windowScrollerRegisterChild,
                    listRef
                  )}
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
