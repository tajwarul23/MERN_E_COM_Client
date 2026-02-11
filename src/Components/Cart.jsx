import React, { useContext } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, deleteItem, addToCart, clearCart } =
    useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen p-6 w-screen">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-5xl flex flex-col gap-6 items-center">
          {cart?.map((cr) => (
            <div
              key={cr.productId}
              className="bg-white shadow-lg rounded-md p-4 text-center flex items-center justify-center"
            >
              {/* img */}
              <div className="w-full h-64 flex  overflow-hidden rounded-xl bg-gray-50">
                <img
                  src={cr.imgSrc}
                  alt={cr.title}
                  style={{ height: "250px", width: "200px" }}
                  className="object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex justify-center items-center gap-2.5">
                {/* price and quantity */}
                <div className="flex flex-col gap-2 ml-2.5">
                  <h1 className="font-semibold">Quantity:{cr.qty}</h1>
                  <h1 className="text-blue-400 font-bold text-xl">
                    Total:{cr.price}
                  </h1>
                </div>
                {/* Buttons */}
                <div className="flex ">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure?")) {
                        decreaseQty(cr?.productId, 1);
                      }
                    }}
                    className="bg-gray-400 rounded-lg p-1"
                  >
                    Reduce
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure?")) {
                        deleteItem(cr.productId);
                      }
                    }}
                    className="bg-red-600 rounded-lg p-1 ml-3 text-white"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure?")) {
                        addToCart(
                          cr?.productId,
                          cr?.title,
                          cr?.price,
                          1,
                          cr?.imgSrc,
                        );
                      }
                    }}
                    className="bg-green-600 rounded-lg p-1 ml-3 text-white"
                  >
                    Increase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart?.length > 0 ? (
          <>
            {" "}
            <div className="text-center mt-5">
              <button
                className="bg-red-500 rounded-lg p-3 text-white"
                onClick={() => {
                  if (window.confirm("Are you sure?")) clearCart();
                }}
              >
                Clear Cart
              </button>
              <button
                className="bg-green-500 rounded-lg p-3 text-white ml-5"
                onClick={() => {
                  navigate("/shipping");
                }}
              >
                Check Out
              </button>
            </div>
          </>
        ) : (
          <div className="text-center mt-5">
            <button
              className="bg-green-500 rounded-lg p-3 text-white ml-5"
              onClick={() => {
                navigate("/");
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
