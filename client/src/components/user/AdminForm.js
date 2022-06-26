import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Button } from "react-bootstrap";

function AdminForm(props) {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roll: "Admin",
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
    <div>
      <h1 className="d-flex justify-content-center mt-5"> </h1>
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
          <Form.Label>Grocery ID:</Form.Label>
          <Form.Control
            type="text"
            value={user.GroceryID}
            name="groceryID"
            onChange={changeHandler}
          ></Form.Control>
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
    </div>
  );
}

export default AdminForm;
