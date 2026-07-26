import React from "react";
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import { BrowserRouter, Route } from "react-router";
import Product from "./Component/Product";
import { Routes } from "react-router";
import AddCard from "./Component/AddProduct";
import AddProduct from "./Component/AddProduct";
import UpdateProduct from "./Component/UpdateProduct";

const App = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route element={<Navbar />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<Product />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
