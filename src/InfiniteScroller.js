import React, { useRef } from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
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
  const isRowLoaded = ({ index }) => {
    return !!posts[index];
  };

  // Render a list item or a loading indicator.
  // const rowRenderer = ({ index, key, style }) => {
  //   let content;

  //   if (!isRowLoaded({ index })) {
  //     content = "Loading...";
  //   } else if (posts[index]) {
  //     content = <PostCard post={posts[index]} />;
  //   }

  //   return (
  //     <div className="" key={key} style={style}>
  //       {content}
  //     </div>
  //   );
  // };

  const cache = new CellMeasurerCache({
    defaultHeight: LOADING_CARD_HEIGHT,
    fixedWidth: true,
  });

  function rowRenderer({ index, key, parent, style }) {
    console.log(cache.rowHeight(index));
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure, registerChild }) => {
          let content;

          if (!isRowLoaded({ index })) {
            content = "Loading...";
          } else if (posts[index]) {
            content = <PostCard post={posts[index]} onLoad={measure} />;
          }

          return (
            <div className="" key={key} style={style} ref={registerChild}>
              {content}
            </div>
          );
        }}
      </CellMeasurer>
    );
  }

  // const calculateRowHeight = ({ index }) => {
  //   if (!!posts[index]) {
  //     return posts[index].maxHeight;
  //   } else {
  //     return LOADING_CARD_HEIGHT;
  //   }
  // };

  return (
    <div className="mx-auto max-w-2xl border border-black">
      <AutoSizer disableHeight>
        {({ width }) => {
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
                        deferredMeasurementCache={cache}
                        rowHeight={cache.rowHeight}
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
