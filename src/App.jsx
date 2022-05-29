import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Companies from "./screens/Companies";
import Products from "./screens/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import AddNewProductModal from "./Components/AddNewProductModal";

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
        
            <Route index element={
             <Home/>
            } />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/products" element={<Products />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
