import React from "react";
import { Container, Row } from "react-bootstrap";
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
    <Container>
      {categories.map((category) => (
        <Row>
          <div key={category}>
            <Link to={`/stores/${storeId}/collections/${category}`}>
              {category}
            </Link>
          </div>
        </Row>
      ))}
      <div> </div>
    </Container>
  );
}

export default Category;
