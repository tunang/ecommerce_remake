import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import NavBar from "./components/NavBar/Navbar";
import Home from "./components/HomePage/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Cart from "./components/Cart/Cart";
import MenPage from "./components/MenPage/MenPage";
import WomenPage from "./components/WomanPage/WomenPage";
import DetailProduct from "./components/Products/DetailProduct";
import Profile from "./components/Profile/Profile";

import { fetchCart } from "./redux/Reducer/cartReducer";
import Orders from "./components/Profile/Orders";
import Address from "./components/Profile/Address";

const AppLayout = () => (
  <div>
    <NavBar />
    <div className="mt-[100px] mx-12">
      <Outlet />
    </div>
  </div>
);

const ProfileLayout = () => (
  
  <div>
    <NavBar />
    <div className="mt-[100px] mx-12">
      <div className="grid grid-cols-12 pt-12 gap-5">
        <Profile/>

        <Outlet />
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/product/:id" element={<DetailProduct />} />
          </Route>

          <Route element={<ProfileLayout />}>
            <Route path="/profile/orders" element={<Orders/>}/>
            <Route path="/profile/address" element={<Address/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
