import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, FormGroup, Button, Container, Row, Col } from "react-bootstrap";
import Header from "../Header";

function LogIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/user/login`,
        loginInfo,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        console.log("login success");
        if (res.data.roll && res.data.roll === "Admin") {
          navigate("/Admin");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          setError(err.response.data.message);
        }
      });
  };
  const changeHandler = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    setError("");
  };
  return (
    <Container>
      <Header />
      <Row className="ppy-3">
        <Col md={10} className="mt-3">
          <Form onSubmit={submitHandler}>
            <FormGroup className="mb-1" controlId="formBasicEmail">
              <Form.Label>Email (ID)</Form.Label>
              <Form.Control
                required
                type="email"
                value={loginInfo.email}
                name="email"
                onChange={changeHandler}
              />
            </FormGroup>
            <FormGroup className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={loginInfo.password}
                name="password"
                autoComplete="on"
                onChange={changeHandler}
              />
            </FormGroup>
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
            <div className="d-flex ppy-2 btn-log">
              <Button className="btn-dark" type="submit">
                Login
              </Button>
              <div className="ppy-2">
                <p className="text-center">
                  Don't have an account? <Link to="/signup"> Signup</Link>
                </p>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LogIn;
