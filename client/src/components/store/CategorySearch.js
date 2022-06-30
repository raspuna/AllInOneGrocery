import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Header from "../Header";
import Category from "./Category";

function CategorySearch() {
  const { storeId, category } = useParams();
  console.log(storeId, category);
  const [user, setUser] = useState(null);
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
  const submitHandler = () => {};
  return (
    <Container>
      <Header user={user} setUser={setUser} submitHandler={submitHandler} />
      {user && storeId === user.storeId && user.roll === "Admin" && (
        <Link to="/newItem">Add Grocery</Link>
      )}
      <div className="d-flex">
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
                    {grocery.itemQuantity < 1 && <div>sold out</div>}
                    <div>$ {grocery.itemPrice}</div>
                    <img src={grocery.itemImage} alt="" />
                    <br />
                  </Card.Text>
                  <Link to={`/item/${grocery._id}`}>Details</Link>
                  <Link to={`/item/${grocery._id}/edit`}> edit</Link>
                  {/* Here we need to add buttons that can add a particular item to the users "shopping cart" */}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default CategorySearch;
