import React, { useContext, useState } from "react";
import axios from "axios";
import bg from "../assets/bg.jpeg";
import { Eye, EyeOff } from "lucide-react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { serverUrl } = useContext(userDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${serverUrl}/api/auth/signin`, formData, { withCredentials: true });
      console.log(res);

      setMessage("✅ Login successful!");
      setLoading(false);
      setFormData({ email: "", password: "" });

      // You can redirect after login success here
      // navigate("/dashboard"); // example route
    } catch (err) {
      setMessage("❌ Login failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#00000062] shadow-lg shadow-black-950 backdrop-blur w-full max-w-md p-8 rounded-2xl  space-y-6 transition-all duration-300"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-400">Welcome </h2>

        {message && (
          <div
            className={`text-center text-sm font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
          >
            {message}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-400">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block mb-1 text-sm font-medium text-gray-400">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-400 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          {loading ? "Loading..." : "Sign In"}
          
        </button>

        {/* Redirect to Sign Up */}
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-200 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
