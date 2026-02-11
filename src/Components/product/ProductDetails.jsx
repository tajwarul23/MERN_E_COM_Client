import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct.jsx";
import AppContext from "../../Context/AppContext.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const [ProductDetails, setProductDetails] = useState();
  const { addToCart } = useContext(AppContext);
  const url = "http://localhost:3000/api";
  useEffect(() => {
    const fetchProductDetails = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/JSON",
        },
        withCredentials: true,
      });
      console.log(api?.data?.product);
      setProductDetails(api?.data.product);
    };
    fetchProductDetails();
  }, [id]);

  return (
    <div className="bg-linear-to-br from-blue-50 to-indigo-100 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-8">
          {/* Left: Image */}
          <div className="flex items-center justify-center">
            <img
              src={ProductDetails?.imgSrc}
              alt={ProductDetails?.title}
              className="w-80 h-80 object-contain rounded-xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {ProductDetails?.title}
            </h1>

            <p className="text-gray-600 mt-4 leading-relaxed">
              {ProductDetails?.description}
            </p>

            <h2 className="text-2xl font-semibold text-green-600 mt-6">
              ৳{ProductDetails?.price}
            </h2>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition cursor-pointer">
                Buy Now
              </button>

              <button
                onClick={() => {
                  addToCart(
                    ProductDetails?._id,
                    ProductDetails?.title,
                    ProductDetails?.price,
                    1,
                    ProductDetails?.imgSrc,
                  );
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
              >
                Add to Cart
              </button>
            </div>

            {/* Extra Info */}
            <div className="mt-6 text-sm text-gray-500">
              ✔ Free Delivery &nbsp; | &nbsp; ✔ 7 Days Return &nbsp; | &nbsp; ✔
              1 Year Warranty
            </div>
          </div>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProduct category={ProductDetails?.category} />
    </div>
  );
};

export default ProductDetails;
