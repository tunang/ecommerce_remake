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
import ProtectedRoute from "./utils/ProtectedRoute";

import { fetchCart } from "./redux/Reducer/cartReducer";
import Orders from "./components/Profile/Orders";

import CheckOut from "./components/CheckOut/CheckOut";
import { setupAxiosInterceptors } from "./services/axios/CustomAxiosWithHeader";

import Favorite from "./components/Favorite/Favorite";
import Infomation from "./components/Profile/Infomation";

const AppLayout = () => (
  <div>
    <NavBar />
    <div className="mt-[85px] lg:mt-[100px] mx-4 lg:mx-12">
      <Outlet />
    </div>
  </div>
);

const ProfileLayout = () => (
  
  <div>
    <NavBar />
    <div className="mt-[85px] lg:mt-[100px] mx-6 lg:mx-1">
      <div className="grid grid-cols-12 pt-12 gap-5">
        <Profile/>

        <Outlet />
      </div>
    </div>
  </div>
);

function App() {
  
    setupAxiosInterceptors();
  

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
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/favorite" element={<Favorite />} />
          </Route>

          <Route element={<ProfileLayout />}>
            
            <Route path="/profile/orders" element={
              <ProtectedRoute>
                <Orders/>
              </ProtectedRoute>
              }/>
            <Route path="/profile/infomation" element={
              <ProtectedRoute>
                <Infomation/>
              </ProtectedRoute>
              }/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
