import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import {
  Container,
  FormControl,
  Nav,
  Navbar,
  Form,
  // Button,
  Image,
  Offcanvas,
  OffcanvasBody,
} from "react-bootstrap";
import LoginButton from "./user/LoginButton";
import Logout from "./user/Logout";
import axios from "axios";
import OrderDetail from "./orders/OrderDetail";

function Header(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);
  const [searchText, setSearchText] = useState("");
  const { user, setUser } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (!("cart" in cookies)) {
      setCookie("cart", {}, { path: "/" });
    }
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/user/getLoggedInUser`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    props.submitHandler(searchText);
  };
  return (
    <Navbar bg="light" className="that-container">
      <Container className="that-container">
        <LinkContainer to="/">
          <Navbar.Brand>
            <Image
              src="/img/logo.png"
              style={{ width: 200, height: 50 }}
              alt="logo"
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ justifyContent: "flex-end" }}
        >
          <Form onSubmit={submitHandler} className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="search-input"
              value={searchText}
              onChange={(e) => {
                var lowerCase = e.target.value.toLowerCase();
                setSearchText(lowerCase);
              }}
            />
            {/* <Button variant="info">Search</Button> */}
          </Form>
          <Nav style={{ margin: "0 2rem" }}>
            {/* zip code autofill */}
            <Nav.Item>
              &nbsp; &nbsp; <FontAwesomeIcon icon={faLocationDot} /> &nbsp;
              {user && (
                <div>
                  {user.city}, {user.zipCode}
                </div>
              )}
            </Nav.Item>

            <Nav.Link style={{ margin: "0 2rem" }}>
              {user ? <Logout /> : <LoginButton />}
            </Nav.Link>
            <Nav.Link>
              {/*cart*/}{" "}
              <FontAwesomeIcon
                icon={faShoppingCart}
                onClick={handleShow}
              ></FontAwesomeIcon>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {user ? user.firstName : "please log in"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <OffcanvasBody>{user && <OrderDetail user={user} />}</OffcanvasBody>
      </Offcanvas>
    </Navbar>
  );
}

export default Header;
