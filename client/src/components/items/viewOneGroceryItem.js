import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import { Container, Row, Col } from "react-bootstrap";

function Item() {
  const [item, setItem] = useState({});
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("ID", id);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/item/${id}`)
      .then((res) => {
        console.log("Item", res.data);
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHandler = () => {
    console.log(id);
    axios
      .delete(`${process.env.REACT_APP_SERVER_ADDRESS}/api/item/${id}`)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateHandler = () => {
    console.log(id);
    axios
      .put(`${process.env.REACT_APP_SERVER_ADDRESS}/api/item/${id}/edit`)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Header user={user} setUser={setUser} />
          {item && (
            <>
              <Row>
                <Col md={7}>
                  <h2>{item.itemName}</h2>
                  <div>Item Class : {item.itemClass}</div>
                  <div>Item Quantity : {item.itemQuantity}</div>
                  <div>Item description : {item.itemDescription}</div>
                  <div>Item price : {item.itemPrice}</div>
                  <div>Grocery Id : {item.groceryId}</div>
                </Col>

                <Col m={5}>
                  <img src={item.itemImage} alt="photo"></img>
                </Col>
              </Row>

              {/* <DeleteButton id = {item._id} handleDelete = {() => navigate('/')} /> */}
              <button className="deleteButton" onClick={deleteHandler}>
                Delete Item
              </button>
              <button
                style={{ margin: "0 2rem", backgroundColor: "red" }}
                className="updateButton"
                onClick={updateHandler}
              >
                Update Item
              </button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default Item;
