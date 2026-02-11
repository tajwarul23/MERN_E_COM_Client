import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, prevAddress, name, getAddress, init, url } =
    useContext(AppContext);
  useEffect(() => {
    getAddress();
  }, []);
  const navigate = useNavigate();
  let total = 0;
  for (let index = 0; index < cart.length; index++) {
    total += cart[index].price;
  }

  // const addressObj = Array.isArray(prevAddress) ? prevAddress[0] : prevAddress;
  // const addressObj = Array.isArray(prevAddress) ? prevAddress[0] : prevAddress;
  const check = Array.isArray(prevAddress) ? "array" : "object";
  console.log(check);
  let n = prevAddress?.length;

  //for formatting the total price
  let text = "";
  let test = total.toString();
  let j = 0;
  let first = false;

  for (let index = test.length - 1; index >= 0; index--) {
    text += test[index];
    j++;

    if (j === 3 && index !== 0 && !first) {
      text += ",";
      j = 0;
      first = true;
    } else if (j === 2 && index !== 0 && first) {
      text += ",";
      j = 0;
    }
  }
  text = text.split("").reverse().join("");

  return (
    <div className="min-h-screen p-6 w-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center">Order Summary</h1>
        <div className="max-w-5xl grid grid-cols-3  gap-6 justify-center">
          {cart?.map((cr) => (
            <div
              key={cr.productId}
              className="bg-white shadow-lg rounded-md p-4 text-center flex items-center justify-center"
            >
              {/* img */}
              <div className="w-full h-64 flex  overflow-hidden rounded-xl bg-gray-50">
                <img
                  src={cr?.imgSrc}
                  alt={cr?.title}
                  style={{ height: "250px", width: "200px" }}
                  className="object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex justify-center items-center gap-2.5">
                {/* price and quantity */}
                <div className="flex flex-col gap-2 ml-2.5">
                  <h1>{cr?.title}</h1>
                  <h1 className="font-semibold">Quantity:{cr.qty}</h1>
                  <h1 className="text-green-600 font-bold  text-xl">
                    Total:{cr.price}
                  </h1>
                </div>
                {/* Buttons */}
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-center mt-5 text-2xl font-bold text-green-700">
          Grand Total: {text}
        </h1>
        {/* Address */}
        <div className="text-center text-">
          <h2 className="text-2xl font-bold mt-6">Shipping Address</h2>

          {prevAddress ? (
            <div className="mt-2 text-gray-700 text-xl">
              <p>
                <strong>Name:</strong> {prevAddress[n - 1].fullName}
              </p>
              <p>
                <strong>Address:</strong> {prevAddress[n - 1].address}
              </p>
              <p>
                <strong>City:</strong> {prevAddress[n - 1].city}
              </p>
              <p>
                <strong>Country:</strong> {prevAddress[n - 1].country}
              </p>
              <p>
                <strong>Phone:</strong> {prevAddress[n - 1].phone}
              </p>
              <button
                onClick={init}
                className="bg-green-500 p-5 rounded-lg text-white mt-2 cursor-pointer font-bold"
              >
                Proceed to Pay
              </button>
            </div>
          ) : (
            <p className="text-gray-400 mt-2">Loading address...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
