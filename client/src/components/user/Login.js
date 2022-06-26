import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Button } from "react-bootstrap";

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
    <div>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label>Email(ID):</Form.Label>
          <Form.Control
            type="text"
            value={loginInfo.email}
            name="email"
            onChange={changeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={loginInfo.password}
            name="password"
            autoComplete="on"
            onChange={changeHandler}
          />
        </FormGroup>
        {error && <Form.Text className="text-danger">{error}</Form.Text>}
        <div className="d-flex justify-content-center">
          <Button variant="info" className="mt-2" type="submit">
            LogIn
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default LogIn;
