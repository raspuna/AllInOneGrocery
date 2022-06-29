import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminForm from "./AdminForm";

function NewAdmin() {
  const navigate = useNavigate();
  const addUser = (user, setErrors) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/user/register`, user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("success");
        navigate("/newItem");
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
      <AdminForm submitHandler={addUser} isAdmin={true} />
    </div>
  );
}

export default NewAdmin;
