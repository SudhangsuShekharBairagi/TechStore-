import React from "react";
import Home from "./pages/Home";
import Navbar from "./Component/Navbar";
import { BrowserRouter, Route } from "react-router";
import Product from "./pages/Product";
import { Routes } from "react-router";
import AddCard from "./pages/AddProduct";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import Logout from "./auth/Logout";
import AddCard from "./pages/AddCard";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Navbar />}>

        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          } />
        <Route path="/addproduct" element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          } />
        <Route path="/update/:id" element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          } />
           <Route
            path="/addcard"
            element={
              <ProtectedRoute>
                <AddCard />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Route>


        <Route path="/logout" element={<Logout />} />

        <Route path="/register" element={<Registration />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
