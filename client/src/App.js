import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/user/Register";
import Login from "./components/user/Login";

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
