import React from "react";
import { BORDER_COLOR, CATEGORIES } from "../util/constants";

function CategoryPickerContainer({ category, setCategory, isOpen, close }) {
  if (isOpen) {
    return (
      <>
        <div className="bg-gray-900 opacity-50 h-full w-full fixed inset-0 z-40"></div>
        <div className="fixed z-40 inset-0">
          <div className="flex flex-row justify-center items-center content-center h-full w-full">
            <div
              className={`border border${BORDER_COLOR} bg-white p-2 text-left z-50`}
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
                      onClick={() => {
                        setCategory(c.internalName);
                        close();
                      }}
                    >
                      {textContent}
                    </button>
                    <br />
                  </div>
                );
              })}
              <img src="/x.svg" onClick={() => close()} />
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
}

export default CategoryPickerContainer;
