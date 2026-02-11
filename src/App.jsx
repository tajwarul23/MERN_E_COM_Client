import React, { useContext } from "react";
import AppContext from "./Context/AppContext.jsx";
import ShowProduct from "./Components/product/ShowProduct.jsx";
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./Components/product/ProductDetails.jsx";
import SearchProduct from "./Components/product/SearchProduct.jsx";
import Register from "./Components/user/Register.jsx";
import Login from "./Components/user/Login.jsx";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Profile from "./Components/user/Profile.jsx";
import Cart from "./Components/Cart.jsx";
import Address from "./Components/Address.jsx";
import Checkout from "./Components/Checkout.jsx";
import Success from "./Components/Success.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
};

export default App;
