import React from "react";
import { AutoSizer, InfiniteLoader, WindowScroller } from "react-virtualized";

import ListWrapper from "./ListWrapper.js";
import PostCard from "./PostCard.js";

import {
  LOADING_CARD_HEIGHT,
  POSTCARD_SPACING,
  CARD_HEIGHT_EXTRA,
} from "../util/constants.js";

function InfiniteScroller({
  posts,
  loadNextPost,
  rowCount,
  infiniteLoaderRef,
  listRef,
  setScrollerWidth,
}) {
  const isRowLoaded = ({ index }) => {
    return !!posts[index];
  };

  // Render a list item or a loading indicator.
  const rowRenderer = ({ index, key, style }) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = (
        <div className="flex justify-center items-center content-center h-full">
          <div className="lds-dual-ring"></div>
        </div>
      );
    } else if (posts[index]) {
      content = <PostCard post={posts[index]} />;
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
    <div className="mx-auto max-w-2xl pt-16">
      <AutoSizer disableHeight>
        {({ width }) => {
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
                      <ListWrapper
                        refs={[
                          infiniteLoaderRegisterChild,
                          windowScrollerRegisterChild,
                          listRef,
                        ]}
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
                        setScrollerWidth={setScrollerWidth}
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
