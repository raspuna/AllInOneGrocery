import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  FormControl,
  Nav,
  Navbar,
  Form,
  // Button,
  Image,
} from "react-bootstrap";
import LoginButton from "./user/LoginButton";
import Logout from "./user/Logout";

function Header(props) {
  const { user } = props;
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
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="search-input"
            />
            {/* <Button variant="info">Search</Button> */}
          </Form>
          <Nav className="mr-auto">
            {/* zip code autofill */}
            <Nav.Item>
              &nbsp; &nbsp; <FontAwesomeIcon icon={faLocationDot} /> &nbsp;
              Avon, 02368
            </Nav.Item>

            <Nav.Link>{user ? <Logout /> : <LoginButton />}</Nav.Link>
            <Nav.Link>
              {/*cart*/}{" "}
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
