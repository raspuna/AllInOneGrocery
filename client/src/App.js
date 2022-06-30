import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import GoogleMapAPI from "./components/util/GoogleMapPlace";
import Index from "./components/Index";
import NewAdmin from "./components/user/NewAdmin";
import AddStore from "./components/store/AddStore";
import GroceryList from "./components/items/groceryList";
import AddGrocery from "./components/items/AddGrocery";
import AdminMain from "./components/store/AdminMain";
import OneStore from "./components/store/OneStore";
import EditItem from "./components/items/EditItem";
import ViewItem from "./components/items/viewOneGroceryItem";

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
          <Route path="/adminMain" element={<AdminMain />}></Route>
          <Route path="/newItem" element={<AddGrocery />}></Route>

          <Route path="/stores/:storeId" element={<OneStore />} />
          <Route
            path="/stores/:storeId/collections/:category"
            element={<OneStore />}
          ></Route>

          <Route path="/allGroceries" element={<GroceryList />}></Route>
          <Route path="/item/:id/edit" element={<EditItem />}></Route>
          <Route path="/item/:id" element={<ViewItem />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
