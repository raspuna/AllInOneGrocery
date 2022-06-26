import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Button, Container } from "react-bootstrap";
import Header from "../Header";
const STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];
function UserForm(props) {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    props.submitHandler(user, setErrors);
  };
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };
  return (
    <Container>
      <Header />
      <Form onSubmit={submitHandler}>
        <h1>Sign up</h1>
        <FormGroup>
          <Form.Label>
            First Name<span className="text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="text"
            value={user.firstName}
            name="firstName"
            onChange={changeHandler}
          />
          {errors.firstName && (
            <Form.Text className="text-danger">
              {errors.firstName.message}
            </Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>
            Last Name<span className="text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="text"
            value={user.lastName}
            name="lastName"
            onChange={changeHandler}
          />
          {errors.lastName && (
            <Form.Text className="text-danger">
              {errors.lastName.message}
            </Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>
            Email<span className="text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="text"
            value={user.email}
            name="email"
            onChange={changeHandler}
          />
          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>
            Password<span className="text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="password"
            value={user.password}
            name="password"
            onChange={changeHandler}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>
            Confirm Password<span className="text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="password"
            value={user.confirmPassword}
            name="confirmPassword"
            onChange={changeHandler}
          />
          {errors.confirmPassword && (
            <Form.Text className="text-danger">
              {errors.confirmPassword.message}
            </Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            value={user.address}
            name="address"
            onChange={changeHandler}
          />
          {errors.address && (
            <Form.Text className="text-danger">
              {errors.address.message}
            </Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>Address Detail:</Form.Label>
          <Form.Control
            type="text"
            value={user.addressDetail}
            name="addressDetail"
            onChange={changeHandler}
          />
          {errors.addressDetail && (
            <Form.Text className="text-danger">
              {errors.addressDetail.message}
            </Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>City:</Form.Label>
          <Form.Control
            type="text"
            value={user.city}
            name="city"
            onChange={changeHandler}
          />
          {errors.city && (
            <Form.Text className="text-danger">{errors.city.message}</Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>State:</Form.Label>
          <Form.Select name="state" onSelect={changeHandler}>
            {STATES.map((state) => {
              return <option value={state}>{state}</option>;
            })}
          </Form.Select>
          {errors.state && (
            <Form.Text className="text-danger">
              {errors.state.message}
            </Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>Zip code:</Form.Label>
          <Form.Control
            type="text"
            value={user.zipCode}
            name="zipCode"
            onChange={changeHandler}
          />
          {errors.zipCode && (
            <Form.Text className="text-danger">
              {errors.zipCode.message}
            </Form.Text>
          )}
        </FormGroup>
        <div className="d-flex mt-2 justify-content-center">
          <Button variant="success" type="submit">
            Submit
          </Button>
        </div>
        <div className="d-flex justify-content-end">
          Already have an account?{" "}
          <Link className="ms-2" to="/login">
            Log In
          </Link>
        </div>
      </Form>
    </Container>
  );
}

export default UserForm;
