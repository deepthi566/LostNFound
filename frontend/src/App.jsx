import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyItems from "./pages/MyItems";
import CreateItem from "./pages/CreateItem";
import UpdateItem from "./pages/Update";
import Items from "./pages/Items";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-items" element={<MyItems />} />
        <Route path="/items" element={<Items />} />
        <Route path="/create" element={<CreateItem />} />
        <Route path="/update-item/:id" element={<UpdateItem />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
