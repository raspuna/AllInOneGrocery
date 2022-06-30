import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ViewItems from "./ViewItems";

function OneStore() {
  const { storeId, category } = useParams();
  console.log(storeId, category);
  const [groceries, setGroceries] = useState([]);
  useEffect(() => {
    const url = category
      ? `${process.env.REACT_APP_SERVER_ADDRESS}/api/store/${storeId}/items/category/${category}`
      : `${process.env.REACT_APP_SERVER_ADDRESS}/api/items/${storeId}`;
    axios
      .get(url)
      .then((res) => {
        console.log("ItemList", res.data);
        setGroceries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);

  return (
    <Container>
      <ViewItems
        storeId={storeId}
        groceries={groceries}
        setGroceries={setGroceries}
      />
    </Container>
  );
}

export default OneStore;
