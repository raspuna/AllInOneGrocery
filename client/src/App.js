import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import GoogleMapAPI from "./components/util/GoogleMapPlace";
import Index from "./components/Index";
import NewAdmin from "./components/user/NewAdmin";
import AddStore from "./components/store/AddStore";
<<<<<<< HEAD
import GroceryList from "./components/items/groceryList";
=======
import CreateProduct from "./components/items/addGrocery";
>>>>>>> 84e1f1ec32e6a1412ff3ec0ca019599202d0609f

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          {/* user login path */}
          <Route path="/" element={<Index />}></Route>
          <Route path="/newAdmin" element={<NewAdmin />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/mapAPI" element={<GoogleMapAPI />}></Route>
          <Route path="/newStore" element={<AddStore />}></Route>
<<<<<<< HEAD
          <Route path = "/allGroceries" element = {<GroceryList />}></Route>
=======
          <Route path = "/newItem" element = {<CreateProduct />}></Route>
>>>>>>> 84e1f1ec32e6a1412ff3ec0ca019599202d0609f
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
