import React, { useRef } from "react";
import {
  AutoSizer,
  InfiniteLoader,
  WindowScroller,
  List,
} from "react-virtualized";
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
  console.log("propposts", posts);
  const isRowLoaded = ({ index }) => {
    return !!posts[index];
  };

  // Render a list item or a loading indicator.
  const rowRenderer = ({ index, key, style }) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = "Loading...";
    } else if (posts[index]) {
      content = <PostCard post={posts[index]} />;
    }

    return (
      <div className="flex flex-row" key={key} style={style}>
        {content}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-2xl">
      <AutoSizer disableHeight>
        {({ width }) => {
          const heightFromPost = (post) => {
            let maxHeight = 0;
            for (let photo of post.photos) {
              const scaleFactor = width / photo.width;
              const scaledHeight = photo.height * scaleFactor;
              if (scaledHeight > maxHeight) {
                maxHeight = scaledHeight;
              }
            }
            return maxHeight;
          };

          const calculateRowHeight = ({ index }) => {
            if (!!posts[index]) {
              return heightFromPost(posts[index]);
            } else {
              return LOADING_CARD_HEIGHT;
            }
          };

          return (
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
                        width={width}
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
          );
        }}
      </AutoSizer>
    </div>
  );
}

export default InfiniteScroller;
