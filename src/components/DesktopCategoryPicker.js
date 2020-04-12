import React from "react";

function CategoryPickerContainer({
  category,
  setCategory,
  categories,
  leftPosition,
}) {
  return (
    <div className="fixed" style={{ left: `${leftPosition}px`, top: "100px" }}>
      {categories.map((c) => {
        const textContent = c === category ? <b>{c}</b> : c;
        return (
          <div key={c}>
            <button className="text-xl" onClick={() => setCategory(c)}>
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
