import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Button, Container } from "react-bootstrap";
import Header from "../Header";

const UpdateItem = (props) => {
  const [user, setUser] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemClass, setItemClass] = useState("");
  const [itemQuantity, setItemQuantity] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState([]);
  const [itemImage, setItemImage] = useState(null);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const validate = (e) => {
    const file = e.target.files[0];
    if (file.size >= 8048576) {
      return alert("Max file size is 8MB");
    } else {
      setItemImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/item/${id}`)
      .then((res) => {
        console.log(res.data.queriedOne);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateHandler = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_SERVER_ADDRESS}/api/item/${id}`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.error.errors);
      });
  };

  return (
    <Container>
      <Header user={user} setUser={setUser} />
      <Form onSubmit={updateHandler}>
        <h3>Add Groceries</h3>
        <FormGroup>
          <Form.Label>Grocery Title : </Form.Label>
          <Form.Control
            type="text"
            value={itemName}
            name="itemName"
            onChange={(e) => setItemName(e.target.value)}
          />
          {errors.itemName && (
            <Form.Text className="text-danger">
              {errors.itemName.message}
            </Form.Text>
          )}
          <br />
        </FormGroup>
        <FormGroup>
          <img src={itemImage} alt="item" />
          <Form.Label htmlFor="image-upload"></Form.Label>
          <Form.Control
            type="file"
            accept="image/png, image/jpeg,"
            onChange={validate}
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>Grocery Class :</Form.Label>
          <Form.Select onChange={(e) => setItemClass(e.target.value)}>
            <option>Please Select The Item Class :</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Meat">Meat</option>
            <option value="Canned Good">Canned Good</option>
            <option value="Dry Food">Dry Food</option>
            <option value="Miscellaneous">Misc.</option>
          </Form.Select>
        </FormGroup>
        <FormGroup>
          <Form.Label> Grocery Quantity : </Form.Label>
          <Form.Control
            type="number"
            value={itemQuantity}
            name="itemQuantity"
            onChange={(e) => setItemQuantity(e.target.value)}
          />
          {errors.itemQuantity && (
            <Form.Text className="text-danger">
              {errors.itemQuantity.message}
            </Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>Grocery Description : </Form.Label>
          <Form.Control
            as="textarea"
            id="itemDescription"
            name="itemDescription"
            rows="4"
            cols="50"
            onChange={(e) => setItemDescription(e.target.value)}
          />
          {errors.itemDescription && (
            <Form.Text className="text-danger">
              {errors.itemDescription.message}
            </Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>Grocery Price : </Form.Label>
          <Form.Control
            type="number"
            value={itemPrice}
            name="itemPrice"
            onChange={(e) => setItemPrice(e.target.value)}
          />
          {errors.itemPrice && (
            <Form.Text className="text-danger">
              {errors.itemPrice.message}
            </Form.Text>
          )}
        </FormGroup>
        {<div>{user && user.storeId}</div>}
        {user && <Button type="submit">{props.buttonText}</Button>}
      </Form>
      {user && <Link to={`/stores/${user.storeId}`}>Go Back </Link>}
    </Container>
  );
};

export default UpdateItem;
