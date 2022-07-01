import React from "react";
import { Link } from "react-router-dom";

function Category(props) {
  const { storeId } = props;
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
        <div key={category}>
          <Link to={`/stores/${storeId}/collections/${category}`}>
            {category}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Category;
