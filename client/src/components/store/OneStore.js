import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Header from "../Header";

function OneStore() {
  const [user, setUser] = useState(null);
  const [store, setStore] = useState({});
  const { storeId } = useParams();
  const [groceries, setGroceries] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/store/${storeId}`)
      .then((res) => {
        console.log("ItemList", res.data);
        setStore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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

  //for the text search
  const submitHandler = (searchText) => {
    console.log("search:", searchText);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/items/search/${searchText}`
      )
      .then((res) => {
        console.log(res.data);
        setGroceries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { id } = useParams();
  return (
    <Container>
      <Header user={user} setUser={setUser} submitHandler={submitHandler} />
      <h2>{store.storeName}</h2>
      {user && storeId ===user.storeId && user.roll === "Admin" && <Link to="/newItem">Add Grocery</Link>}
      <div className="d-flex justify-content-around flex-wrap" >

      {groceries.map((grocery) => (
        <div key={grocery._id}>
          <Card style={{width:"200px"}}>
            <Card.Header>

          <h4>{grocery.itemName}</h4>
            </Card.Header>
            <Card.Body>

            <Card.Text>
          {grocery.itemQuantity <1 && <div>sold out</div>}
          <div>$ {grocery.itemPrice}</div>
          <img src = {grocery.itemImage} alt = "" />
          <br />

            </Card.Text>
          <Link to={`/item/${grocery._id}`}>Details</Link>
          {/* Here we need to add buttons that can add a particular item to the users "shopping cart" */}

            </Card.Body>
          </Card>

        </div>
      ))}


      </div>
    </Container>
  );
}

export default OneStore;
