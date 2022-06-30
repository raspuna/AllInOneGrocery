import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ViewItems from "./ViewItems";

function CategorySearch() {
  const { storeId, category } = useParams();
  console.log(storeId, category);
  const [groceries, setGroceries] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/store/${storeId}/items/category/${category}`
      )
      .then((res) => {
        console.log(res.data);
        setGroceries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);
  return (
    <ViewItems
      storeId={storeId}
      groceries={groceries}
      setGroceries={setGroceries}
    />
  );
}

export default CategorySearch;
