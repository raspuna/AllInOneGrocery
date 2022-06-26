import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    e.preventDefault();
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/user/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        console.log("success");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <Button onClick={logoutHandler}>Logout</Button>;
}

export default Logout;
