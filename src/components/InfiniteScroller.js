import React from "react";
import {
  AutoSizer,
  InfiniteLoader,
  WindowScroller,
  List,
} from "react-virtualized";
import composeRefs from "@seznam/compose-react-refs";

import PostCard from "./PostCard.js";

const LOADING_CARD_HEIGHT = 300;
const POSTCARD_SPACING = 20;
const TITLE_BAR_SIZE = 40;
const CARD_HEIGHT_EXTRA = 2 * POSTCARD_SPACING + TITLE_BAR_SIZE;

function InfiniteScroller({
  posts,
  loadNextPost,
  rowCount,
  infiniteLoaderRef,
  listRef,
  setWidth,
}) {
  const isRowLoaded = ({ index }) => {
    return !!posts[index];
  };

  // Render a list item or a loading indicator.
  const rowRenderer = ({ index, key, style }) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = "Loading...";
    } else if (posts[index]) {
      content = <PostCard post={posts[index]} titleBarSize={TITLE_BAR_SIZE} />;
    }

    return (
      <div
        key={key}
        style={{
          ...style,
          paddingTop: `${POSTCARD_SPACING}px`,
          paddingBottom: `${POSTCARD_SPACING}px`,
        }} // TODO paramertarize this somewhere
      >
        {content}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-2xl">
      <AutoSizer disableHeight>
        {({ width }) => {
          setWidth(width);
          const photoWindowHeightFromPost = (post) => {
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
              return (
                photoWindowHeightFromPost(posts[index]) + CARD_HEIGHT_EXTRA
              );
            } else {
              return LOADING_CARD_HEIGHT + CARD_HEIGHT_EXTRA;
            }
          };

          return (
            <InfiniteLoader
              ref={infiniteLoaderRef}
              rowCount={rowCount}
              isRowLoaded={isRowLoaded}
              loadMoreRows={loadNextPost}
              minimumBatchSize={2} // TODO tune this value
              threshold={2} // TODO tune this value
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
