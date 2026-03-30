import axios from "axios";
import React, { useState } from "react";
import { emailUrl } from "../repo/api_path";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const SendOtp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const emailHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${emailUrl}/send-otp`, {
        name,
        email,
      });

      toast.success("OTP sent to your email 📩");

      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name);

      setName("");
      setEmail("");

      navigate("/verify-otp");
    } catch (error) {
      toast.error("Failed to send OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 ">

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Login / Signup
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Enter your details to receive OTP
        </p>

        {/* Form */}
        <form onSubmit={emailHandler} className="flex flex-col gap-4">

          {/* Name */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default SendOtp;