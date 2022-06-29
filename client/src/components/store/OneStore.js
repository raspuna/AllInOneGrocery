import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useParams } from "react-router-dom";
import Header from "../Header";

function OneStore() {
  const [user, setUser] = useState(null);
  const [store, setStore] = useState({})
  const { storeId } = useParams();
  console.log(storeId)
  const [groceries, setGroceries] = useState([]);
  useEffect(()=> {
    axios.get(`http://localhost:8000/api/store/${storeId}`)
    .then((res) => {
      console.log('ItemList', res.data);
      setStore(res.data);
  })
  .catch((err) => {
      console.log(err);
  });
    axios.get(
    `http://localhost:8000/api/items/${storeId}`)
    .then((res) => {
        console.log('ItemList', res.data);
        setGroceries(res.data);
    })
    .catch((err) => {
        console.log(err);
    });
}, []);

  const { id } = useParams();
  return (
    <div>
      <Header user={user} setUser={setUser} />
      <h2>{store.storeName}</h2>
      {groceries.map((grocery) => (
        <div key={grocery._id}>
          <h4>{grocery.itemName}</h4>
          {grocery.itemQuantity <1 && <div>sold out</div>}
          <div>{grocery.itemPrice}</div>
          {/* <img src = {grocery.itemImage} alt = "" /> */}
          <br />
          <Link to={`/item/${grocery._id}`}>Details</Link>
          {/* Here we need to add buttons that can add a particular item to the users "shopping cart" */}
        </div>
      ))}
    </div>
  );
}

export default OneStore;
