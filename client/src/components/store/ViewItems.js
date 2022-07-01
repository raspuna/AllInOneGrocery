import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Header from "../Header";
import Category from "./Category";
import axios from "axios";
import CartButton from "../orders/CartButton";

function ViewItems(props) {
  const { storeId, groceries, setGroceries } = props;
  const [groceryCart, setGroceryCart] = useState({});
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/store/${storeId}`)
      .then((res) => {
        setStore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [storeId]);
  //for the text search
  const submitHandler = (searchText) => {
    console.log("search:", searchText);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/store/${storeId}/items/search/${searchText}`
      )
      .then((res) => {
        console.log(res.data);
        setGroceries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Header
        user={user}
        setUser={setUser}
        submitHandler={submitHandler}
        groceryCart={groceryCart}
        setGroceryCart={setGroceryCart}
      />
      <h2>{store && store.storeName}</h2>
      {user && storeId === user.storeId && user.roll === "Admin" && (
        <Link to="/newItem">Add Grocery</Link>
      )}

      <div>
        <Category storeId={storeId} />
        <div className="d-flex justify-content-around flex-wrap">
          {groceries.map((grocery) => (
            <div key={grocery._id}>
              <Card style={{ width: "200px" }}>
                <Card.Header>
                  <h4>{grocery.itemName}</h4>
                </Card.Header>
                <Card.Body md={6}>
                  <Card.Text>
                    {grocery.itemQuantity < 1 && <div>sold out</div>}${" "}
                    {grocery.itemPrice}
                    <img src={grocery.itemImage} alt="" />
                    <br />
                  </Card.Text>
                  <Link to={`/item/${grocery._id}`}>Details</Link>
                  <Link to={`/item/${grocery._id}/edit`}> edit</Link>
                  <CartButton grocery={grocery} isCart={false} />
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default ViewItems;
