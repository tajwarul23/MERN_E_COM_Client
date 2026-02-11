import React, { useEffect, useState } from "react";
import AppContext from "./AppContext.jsx";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";

const AppState = (props) => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [prevAddress, setPrevAddress] = useState("");
  const [url, setUrl] = useState("");

  //Runs ONCE on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);
  //fetching data
  useEffect(() => {
    const url = "https://mern-e-com-api.onrender.com/api";

    const fetchProducts = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
      });
      // console.log(api.data.products);
      setProducts(api.data.products);
      setFilteredData(api.data.products);
    };
    profile();
    fetchProducts();
    getUserCart();
    getAddress();
  }, [token, reload]);

  //register user
  const registerUser = async (name, email, password) => {
    const regApi = await axios.post(
      "https://mern-e-com-api.onrender.com/api/user/register",
      {
        name,
        email,
        password,
      },
      {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true,
      },
    );
    console.log("User Register API : ", regApi);

    toast(regApi.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return regApi.data;
  };

  //login user
  const loginUser = async (email, password) => {
    const logApi = await axios.post(
      "https://mern-e-com-api.onrender.com/api/user/login",
      { email, password },
      {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true,
      },
    );
    console.log("Use login API", logApi.data);
    toast(logApi.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setToken(logApi.data.token);
    localStorage.setItem("token", logApi.data.token);
    setIsAuthenticated(true);
    return logApi.data;
  };

  //logout user
  const logoutUser = () => {
    setIsAuthenticated(false);
    setToken(false);
    localStorage.removeItem("token");

    toast("User Log out successfully..!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //user profile
  const profile = async () => {
    try {
      const api = await axios.get(
        "https://mern-e-com-api.onrender.com/api/user/profile",
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        },
      );
      console.log(api?.data?.user);
      setUser(api?.data?.user);
    } catch (error) {
      console.log("Error fetching data", error.message);
    }
  };

  //add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    try {
      const api = await axios.post(
        "https://mern-e-com-api.onrender.com/api/cart/add",
        {
          productId,
          title,
          price: Number(price),
          qty: Number(qty),
          imgSrc,
        },
        {
          headers: { "Content-Type": "application/json", Auth: token },
          withCredentials: true,
        },
      );
      toast(api.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.log("my cart", api.data.cart);
      setReload(!reload);
    } catch (error) {
      console.log("Error in add to cart", error.message);
    }
  };

  //get user cart
  const getUserCart = async () => {
    try {
      const api = await axios.get(
        "https://mern-e-com-api.onrender.com/api/cart/user",
        {
          headers: { "Content-Type": "application/json", Auth: token },
          withCredentials: true,
        },
      );
      console.log("User's whole cart", api.data.cart.items || []);

      setCart(api.data.cart.items || []);
    } catch (error) {
      console.log("Error in get user cart", error.message);
    }
  };
  //decrease quantity
  const decreaseQty = async (productId, qty) => {
    try {
      const api = await axios.post(
        `https://mern-e-com-api.onrender.com/api/cart/--qty`,
        { productId, qty },
        {
          headers: { "Content-Type": "application/json", Auth: token },
          withCredentials: true,
        },
      );
      toast(api.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setReload(!reload);
      console.log(api.data.message);
    } catch (error) {}
  };

  //reduce item from the cart
  const deleteItem = async (id) => {
    const api = await axios.delete(
      `https://mern-e-com-api.onrender.com/api/cart/remove/${id}`,

      {
        headers: { "content-type": "application/json", auth: token },
        withCredentials: true,
      },
    );
    toast(api.data.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setReload(!reload);
  };

  //clear whole cart
  const clearCart = async () => {
    try {
      const api = await axios.delete(
        "https://mern-e-com-api.onrender.com/api/cart/clear",
        {
          headers: { "Content-Type": "application/json", Auth: token },
          withCredentials: true,
        },
      );
      console.log(api);
      toast(api.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setReload(!reload);
    } catch (error) {
      console.log("Error in clearing cart", error.message);
    }
  };

  //add address
  const addAddress = async (fullName, address, city, country, phone) => {
    try {
      const api = await axios.post(
        "https://mern-e-com-api.onrender.com/api/address/add",
        {
          fullName,
          address,
          city,
          country,
          phone,
        },
        {
          headers: { "Content-Type": "application/json", Auth: token },
          withCredentials: true,
        },
      );
      console.log("Address added", api.data);

      toast(api.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return api.data;
    } catch (error) {
      console.log("error in adding address", error);
    }
  };

  //get address
  const getAddress = async () => {
    try {
      const api = await axios.get(
        "https://mern-e-com-api.onrender.com/api/address/get",
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        },
      );

      console.log("user address", api.data.UserAddress);

      // // Only set if UserAddress exists and has properties
      // if (
      //   api.data.UserAddress &&
      //   Object.keys(api.data.UserAddress).length > 0
      // ) {
      //   setPrevAddress(api.data.UserAddress);
      // } else {
      //   setPrevAddress(null);
      // }
      setPrevAddress(api.data.UserAddress);
      // setReload(!reload);
    } catch (error) {
      console.log("Error fetching address:", error);
      setPrevAddress(null);
    }
  };

  //payment init
  const init = async (req, res) => {
    try {
      const api = await axios.post(
        "https://mern-e-com-api.onrender.com/api/order/order",
        {},
        {
          headers: { "Content-Type": "application/json", Auth: token },
          withCredentials: true,
        },
      );
      const paymentUrl = api.data.url;

      if (paymentUrl) {
        window.location.replace(paymentUrl);
      }
      console.log(api.data.url);
      setUrl(api.data.url);
    } catch (error) {
      console.log("Error in payment init");
    }
  };
  return (
    <AppContext.Provider
      value={{
        products,
        registerUser,
        loginUser,
        token,
        isAuthenticated,
        filteredData,
        setFilteredData,
        logoutUser,
        user,
        addToCart,
        cart,
        decreaseQty,
        deleteItem,
        clearCart,
        addAddress,
        prevAddress,
        getAddress,
        init,
        url,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
