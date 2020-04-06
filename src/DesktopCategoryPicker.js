import React, { useState } from "react";

function CategoryPickerContainer({ category, setCategory, categories }) {
  return (
    <div className="fixed">
      {categories.map((c) => {
        const textContent = c === category ? <b>{c}</b> : c;
        return (
          <div key={c}>
            <button onClick={() => setCategory(c)}>{textContent}</button>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default CategoryPickerContainer;
