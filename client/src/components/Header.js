import React from "react";
import {
  Container,
  FormControl,
  Nav,
  Navbar,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import Logout from "./user/Logout";

function Header() {
  return (
    <Navbar bg="primary" expand="md" className="mb-2">
      <Container fluid>
        <Navbar.Brand>
          <Image fluid src="/img/logo.png" width="50" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="info">Search</Button>
          </Form>
          <Nav className="mr-auto">
            {/* zip code autofill */}
            <Nav.Item>12345</Nav.Item>

            <Nav.Link>
              <Logout />
            </Nav.Link>
            <Nav.Link>{/*cart*/}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
