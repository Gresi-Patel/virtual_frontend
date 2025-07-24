import React, { useContext, useState } from "react";
import axios from "axios";
// import bg from "../assets/bgImg1.jpeg"; 
import bg from "../assets/bg.jpeg"; 
import { Eye, EyeOff } from "lucide-react"; // Optional for icons
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {serverUrl}=useContext(userDataContext)
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
      const res = await axios.post(`${serverUrl}/api/auth/signup`, formData,{withCredentials:true});
      console.log(res);
      setMessage(" Signup successful!");
      setLoading(false);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage("✅  Signup failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover px-4" style={{backgroundImage:`url(${bg})`}}>
      <form
        onSubmit={handleSubmit}
        className="bg-[#00000062] shadow-lg shadow-black-950 backdrop-blur w-full max-w-md p-8 rounded-2xl shadow-xl space-y-6 transition-all duration-300"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600">Create Account</h2>

        {message && (
          <div
            className={`text-center text-sm font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-400">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />
        </div>

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
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        {/* Optional redirect or footer */}
        <p className="text-center text-sm text-gray-400">
  Already have an account?{" "}
  <span
    onClick={()=>navigate("/signin")}
    className="text-indigo-200 hover:underline cursor-pointer"
  >
    Log in
  </span>
</p>

      </form>
    </div>
  );
}
