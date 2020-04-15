import React from "react";
import { BORDER_COLOR, CATEGORIES } from "../util/constants";

function CategoryPickerContainer({ category, setCategory, leftPosition }) {
  return (
    <div
      className={`fixed border border${BORDER_COLOR} bg-white p-2`}
      style={{ left: `${leftPosition}px`, top: "80px" }}
    >
      {CATEGORIES.map((c) => {
        const textContent =
          c.internalName === category ? (
            <b>{c.externalName}</b>
          ) : (
            c.externalName
          );
        return (
          <div key={c.internalName}>
            <button
              className="text-xl"
              onClick={() => setCategory(c.internalName)}
            >
              {textContent}
            </button>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default CategoryPickerContainer;
