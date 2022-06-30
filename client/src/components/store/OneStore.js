import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ViewItems from "./ViewItems";

function OneStore() {
  const { storeId } = useParams();
  console.log(storeId);
  const [groceries, setGroceries] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/items/${storeId}`)
      .then((res) => {
        console.log("ItemList", res.data);
        setGroceries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
