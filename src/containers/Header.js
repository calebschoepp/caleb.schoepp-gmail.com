import React from "react";
import { FONT_COLOR, BORDER_COLOR } from "../util/constants.js";

function Header({ setHamburgerOpen }) {
  return (
    <div
      className={`border-b border${BORDER_COLOR} fixed top-0 w-full z-30 bg-white`}
    >
      <div className="mx-auto max-w-2xl">
        <div className="flex flew-row justify-between">
          <div>
            <span className={`text-3xl text-gray-500 pl-1 lg:pl-0`}>r/</span>
            <span className={`text-3xl text${FONT_COLOR}`}>
              photoshopbattles
            </span>
          </div>
          <img
            className="pr-1 lg:hidden"
            src="/menu.svg"
            onClick={() => setHamburgerOpen(true)}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Header;
