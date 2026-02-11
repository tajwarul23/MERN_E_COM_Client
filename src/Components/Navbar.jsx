import React, { useState } from "react";
import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../Context/AppContext";

const Navbar = () => {
  const { setFilteredData, products, logoutUser, token, isAuthenticated } =
    useContext(AppContext);

  //for hamburger menu
  const [open, setOpen] = useState(false);
  //for search
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();

  //function for filtered data
  const filterByCategory = (cat) => {
    setFilteredData(
      products.filter((pr) => pr.category.toLowerCase() === cat.toLowerCase()),
    );
    navigate("/");
  };
  //for navigating through search term
  const navigate = useNavigate();
  //submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      <nav className="bg-white  shadow-md px-6 py-4 sticky top-0 w-full z-10">
        <div className="  flex items-center justify-around ">
          {/* Brand */}
          <div>
            <button
              onClick={() => {
                setFilteredData(products);
                navigate("/");
              }}
            >
              <NavLink to={"/"}>MERN E-Commerce</NavLink>
            </button>
          </div>

          {/* search-bar */}

          <form
            onSubmit={submitHandler}
            className="hidden sm:flex border-2 border-black p-1 rounded-lg w-50 md:w-50  "
          >
            <input
              type="text"
              placeholder="🔍 Search Your Product"
              className=" w-full focus:outline-none  "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <div>
            {/* Desktop menu */}
            <ul className="hidden md:flex gap-6 text-gray-600">
              <li className="hover:text-blue-600">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-semibold" : "text-gray-600"
                  }
                >
                  {" "}
                  Home
                </NavLink>
              </li>
              {localStorage.getItem("token") && (
                <>
                  {" "}
                  <li className="hover:text-blue-600">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "text-gray-600"
                      }
                      to={"/profile"}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="hover:text-blue-600">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "text-gray-600"
                      }
                      to={"/cart"}
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li className="hover:text-blue-600">
                    <button
                      onClick={() => {
                        logoutUser();
                        navigate("/");
                      }}
                    >
                      <NavLink className="text-red-500" to={"/"}>
                        Logout
                      </NavLink>
                    </button>
                  </li>
                </>
              )}
              {!localStorage.getItem("token") && (
                <>
                  <li className="hover:text-blue-600">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "text-gray-600"
                      }
                      to={"/login"}
                    >
                      Login
                    </NavLink>
                  </li>

                  <li className="hover:text-blue-600">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "text-gray-600"
                      }
                      to={"/registration"}
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Mobile Menu */}

            <button
              className="md:hidden text-3xl ml-2 cursor-pointer"
              onClick={() => {
                setOpen(!open);
              }}
            >
              ☰
            </button>
            {open && (
              <ul className="absolute right-6 top-16 bg-white shadow-lg p-4 rounded-lg sm:hidden">
                <li className="hover:text-blue-600 mt-1">
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li className="hover:text-blue-600 mt-1">
                  <NavLink to={"/profile"}>Profile</NavLink>
                </li>
                <li className="hover:text-blue-600 mt-1">
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
                <li className="hover:text-blue-600 mt-1">
                  <NavLink to={"/cart"}>Cart</NavLink>
                </li>
                <li className="hover:text-blue-600 mt-1">
                  <NavLink to={"/registration"}>Register</NavLink>
                </li>
                <li className="hover:text-blue-600 mt-1">
                  <NavLink to={"/"}>Logout</NavLink>
                </li>
                <div className=" sm:hidden border-2 border-black p-1 rounded-lg w-48 mt-1  ">
                  <input
                    type="text"
                    placeholder="🔎 Search Your Product"
                    className="text-center w-full  "
                  />
                </div>
              </ul>
            )}
          </div>
        </div>
      </nav>
      {/* Sub menu */}
      {location.pathname == "/" && (
        <div className="flex justify-around m-2 ">
          <button
            onClick={() => {
              setFilteredData(products);
              navigate("/");
            }}
            className="cursor-pointer bg-gray-200 p-2 rounded-md hover:bg-gray-500 hover:text-white"
          >
            All Products
          </button>
          <button
            onClick={() => filterByCategory("mobiles")}
            className="cursor-pointer bg-gray-200 p-2 rounded-md hover:bg-gray-500 hover:text-white"
          >
            Mobiles
          </button>
          <button
            onClick={() => filterByCategory("laptops")}
            className="cursor-pointer bg-gray-200 p-2 rounded-md hover:bg-gray-500 hover:text-white"
          >
            Laptops
          </button>
          <button
            onClick={() => filterByCategory("cameras")}
            className="cursor-pointer bg-gray-200 p-2 rounded-md hover:bg-gray-500 hover:text-white"
          >
            Cameras
          </button>
          <button
            onClick={() => filterByCategory("accessories")}
            className="cursor-pointer bg-gray-200 p-2 rounded-md hover:bg-gray-500 hover:text-white"
          >
            Accessories
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
