import React, { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AppContext);
  const [valid, setValid] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value });
    setFormData({ ...formData, [name]: value });
  };

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add  login logic here
    const result = await loginUser(email, password);

    if (result.success === true) {
      navigate("/");
    } else setValid(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">User Login</h2>
          <p className="text-gray-500 mt-2">Login to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}

          {valid === true ? (
            <>
              {" "}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
            </>
          ) : (
            <>
              {" "}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-red-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
            </>
          )}

          {/* Password Field */}
          {valid === true ? (
            <>
              {" "}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
            </>
          ) : (
            <>
              {" "}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-red-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to={"/registration"}
            className="text-indigo-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
