import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();
  return (
    <Button
      variant="success"
      onClick={() => {
        navigate("/login");
      }}
    >
      Login
    </Button>
  );
}

export default LoginButton;
