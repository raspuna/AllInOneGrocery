import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import StoreForm from "./StoreForm";

function AddStore() {
  const navigate = useNavigate();
  const addStore = (store, setErrors) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/store`, store)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          setErrors(err.response.data.errors);
        }
      });
  };
  return (
    <div>
      <StoreForm submitHandler={addStore} />
    </div>
  );
}

export default AddStore;
