import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();

  const { addAddress, prevAddress, getAddress } = useContext(AppContext);

  useEffect(() => {
    getAddress();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value });
    setFormData({ ...formData, [name]: value });
  };

  const { name, address, city, country, phone } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add  address logic here
    const result = await addAddress(name, address, city, country, phone);

    if (result.success === true) {
      navigate("/checkout");
    }
    setFormData({
      name: "",
      address: "",
      city: "",
      country: "",
      phone: "",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Shipping Address</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your Address"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* City Field */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter Your City"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>
          {/* Country Field */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter Your Country"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>
          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Your Phone Number"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Submit
          </button>
          {prevAddress && Object.keys(prevAddress).length > 0 && (
            <button
              onClick={() => navigate("/checkout")}
              type="button"
              //   onClick={handleUsePrevAddress}
              className="w-full bg-green-600 text-white py-3 rounded-lg"
            >
              Use Previous Address
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Address;
