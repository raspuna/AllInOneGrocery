import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

function NewUser() {
  const navigate = useNavigate();
  const addUser = (user, setErrors) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/user/register`, user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("success");
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.errors);
          setErrors(err.response.data.errors);
        }
        console.log(err);
      });
  };
  return (
    <div>
      <UserForm submitHandler={addUser} />
    </div>
  );
}

export default NewUser;
