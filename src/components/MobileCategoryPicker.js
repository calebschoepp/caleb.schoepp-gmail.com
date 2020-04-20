import React from "react";
import { BORDER_COLOR, CATEGORIES } from "../util/constants";

const offCSS =
  "text-lg select-none bg-white hover:bg-_purple text-_purple font-semibold hover:text-white py-2 px-4 rounded-full my-1 inline-block shadow-lg";
const onCSS =
  "text-lg select-none bg-_purple font-semibold text-white py-2 px-4 rounded-full my-1  inline-block";

function CategoryPickerContainer({ category, setCategory, isOpen, close }) {
  if (isOpen) {
    return (
      <>
        <div className="bg-gray-900 opacity-50 h-full w-full fixed inset-0 z-40"></div>
        <div className="fixed z-40 inset-0">
          <div className="flex flex-row justify-center items-center content-center h-full w-full">
            <div className={`p-2 text-center z-50`}>
              <h1 className="text-lg text-gray-800 font-semibold my-1 bg-gray-200 border border-_purple shadow-lg rounded-full py-2 px-4">
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
                      onClick={() => {
                        setCategory(c.internalName);
                        close();
                      }}
                    >
                      <span>{c.externalName}</span>
                    </div>
                  </div>
                );
              })}
              <p className={offCSS} onClick={() => close()}>
                X
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
}

export default CategoryPickerContainer;
