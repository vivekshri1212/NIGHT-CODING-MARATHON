import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(API_PATHS.AUTH.LOGIN, form);
      localStorage.setItem("token", res.data.token);
      navigate(location.state?.from || "/dashboard", { replace: true });
    } catch {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-white to-yellow-50 px-4">
      <form
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
        onSubmit={handleLogin}
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back 👋</h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Login to continue your interview preparation
        </p>

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={handleForm}
          value={form.email}
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={handleForm}
          value={form.password}
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-200 disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <p className="px-3 text-gray-400 text-sm">OR</p>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
