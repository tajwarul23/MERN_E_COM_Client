import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";

const ProductGrid = ({ products, emptyMessage = "No Products Available" }) => {
  const { addToCart } = useContext(AppContext);
  const navigate = useNavigate();
  if (!products || products.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-semibold text-gray-500">{emptyMessage}</h1>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-5 flex flex-col"
        >
          {/* Image */}
          <Link
            to={`/product/${product._id}`}
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
          >
            <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Content */}
          <div className="mt-4 flex flex-col grow">
            <h1 className="text-lg font-semibold text-gray-800">
              {product?.title}
            </h1>

            <p className="text-xl font-bold text-green-600 mt-2">
              {product?.price}
            </p>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-auto pt-4">
              <button
                onClick={() => {
                  addToCart(
                    product?._id,
                    product?.title,
                    product?.price,
                    1,
                    product?.imgSrc,
                  );
                  navigate("/shipping");
                }}
                className="bg-red-500 hover:bg-red-600 text-white rounded-xl py-2 font-semibold transition"
              >
                Buy Now
              </button>
              <button
                onClick={() =>
                  addToCart(
                    product?._id,
                    product?.title,
                    product?.price,
                    1,
                    product?.imgSrc,
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 font-semibold transition"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
