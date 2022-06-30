import React from "react";
import { Container } from "react-bootstrap";

function SearchItems(props) {
  const { itemList } = props;
  return <Container>{itemList}</Container>;
}

export default SearchItems;
