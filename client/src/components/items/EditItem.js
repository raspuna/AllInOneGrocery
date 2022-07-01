import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Button, Container } from "react-bootstrap";
import Header from "../Header";

console.log("Accessing edit item component");

const EditItem = (props) => {
  const [user, setUser] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [uploadingProfileImg, setUploadingProfileImg] = useState(false);
  const { id } = useParams();
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemClass, setItemClass] = useState([]);
  const [itemPrice, setItemPrice] = useState("");
  const [errors, setErrors] = useState({}); // we use an object because errors is an object with certain keys in browser terminal
  const [itemNotFoundError, setItemNotFoundError] = useState("");
  console.log(id);
  const navigate = useNavigate();

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", itemImage);
    data.append("upload_preset", "img-api-pager-2");
    try {
      setUploadingProfileImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/img-api-pager-2/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingProfileImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingProfileImg(false);
      console.log(`error: ${error}`);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/items/${id}`)
      .then((response) => {
        console.log(response.data);
        setItemName(response.data.itemName);
        setItemDescription(response.data.itemDescription);
        setItemQuantity(response.data.itemQuantity);
        setItemPrice(response.data.itemPrice);
        setItemClass(response.data.itemClass);
        setItemImage(response.data.itemImage);
      })
      .catch((err) => {
        console.log("ERROR IN GET", err.response);
        setItemNotFoundError(`Item not found using that ID`);
      });
  }, [id]);

  const updateHandler = async (e) => {
    e.preventDefault();

    const url = await uploadImage(itemImage);
    console.log(url);

    axios
      .put(`${process.env.REACT_APP_SERVER_ADDRESS}/api/item/${id}`, {
        itemName,
        itemDescription,
        itemQuantity,
        itemClass,
        itemPrice,
        itemImage,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.error.errors);
        setErrors(err.response.data.error.errors);
      });
  };
  return (
    <Container>
      <Header user={user} setUser={setUser} />
      <Form onSubmit={updateHandler}>
        <h3>Edit Groceries</h3>
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
          <Form.Label htmlFor="image-upload"></Form.Label>
          <Form.Control
            type="file"
            id="image-upload"
            accept="image/png, image/jpeg,"
            onChange={uploadImage}
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

export default EditItem;
