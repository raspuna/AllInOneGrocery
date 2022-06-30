import React from "react";

function Category() {
  const categories = [
    "Vegetable",
    "Fruit",
    "Meat",
    "Canned Good",
    "Dry Food",
    "Miscellaneous",
  ];
  return (
    <div>
      {categories.map((category) => (
        <div>{category}</div>
      ))}
    </div>
  );
}

export default Category;
