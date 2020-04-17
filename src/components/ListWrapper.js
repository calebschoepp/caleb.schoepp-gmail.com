import React, { useEffect } from "react";
import { List } from "react-virtualized";
import composeRefs from "@seznam/compose-react-refs";

function ListWrapper({
  refs,
  width,
  height,
  isScrolling, // Don't think I need these
  onScroll, // ^
  scrollTop, // ^
  rowCount,
  rowHeight,
  onRowsRendered,
  rowRenderer,
  setScrollerWidth,
}) {
  useEffect(() => {
    setScrollerWidth(width);
  }, [width, setScrollerWidth]);

  return (
    <List
      ref={composeRefs(...refs)}
      width={width}
      autoHeight
      height={height}
      isScrolling={isScrolling} // Don't think I need these
      onScroll={onScroll} // ^
      scrollTop={scrollTop} // ^
      rowCount={rowCount}
      rowHeight={rowHeight}
      onRowsRendered={onRowsRendered}
      rowRenderer={rowRenderer}
      style={{ outline: "none" }}
    />
  );
}

export default ListWrapper;
