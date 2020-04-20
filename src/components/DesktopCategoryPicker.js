import React from "react";
import { BORDER_COLOR, CATEGORIES } from "../util/constants";

const offCSS =
  "text-lg select-none bg-transparent hover:bg-_purple text-_purple font-semibold hover:text-white py-2 px-4 border border-_purple hover:border-transparent rounded-full my-1 border border-transparent inline-block shadow-lg";
const onCSS =
  "text-lg select-none bg-_purple font-semibold text-white py-2 px-4 rounded-full my-1 border border-transparent inline-block";

function CategoryPickerContainer({ category, setCategory, leftPosition }) {
  return (
    <div className={`fixed`} style={{ left: `${leftPosition}px`, top: "80px" }}>
      <h1 className="text-lg text-gray-800 font-semibold my-1">
        Top Posts of:
      </h1>
      {CATEGORIES.map((c) => {
        let css;
        if (c.internalName === category) {
          css = onCSS;
        } else {
          css = offCSS;
        }
        return (
          <div>
            <div
              key={c.internalName}
              className={css}
              onClick={() => setCategory(c.internalName)}
            >
              <span>{c.externalName}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryPickerContainer;
