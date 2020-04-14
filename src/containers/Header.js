import React from "react";
import { FONT_COLOR, BORDER_COLOR } from "../util/constants.js";

function Header() {
  return (
    <div
      className={`border-b border${BORDER_COLOR} fixed top-0 w-full z-50 bg-white`}
    >
      <div className="mx-auto max-w-2xl">
        <h1 className={`text-3xl text${FONT_COLOR} font-semibold`}>
          r/photoshopbattles
        </h1>
      </div>
    </div>
  );
}

export default Header;
