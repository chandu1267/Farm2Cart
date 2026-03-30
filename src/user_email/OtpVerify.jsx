import axios from "axios";
import React, { useState } from "react";
import { emailUrl } from "../repo/api_path";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { FaShieldAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const OtpVerify = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [email] = useState(userEmail);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const { login } = useAuthStore.getState();

  const otpHandler = async (e) => {
    e.preventDefault();
    const userName = localStorage.getItem("userName");

    try {
      const res = await axios.post(`${emailUrl}/verify-otp`, {
        email,
        otp,
      });

      login(userName, res.data.token);
      toast.success("Verification successful ✅");
      navigate("/");
    } catch (error) {
      toast.error("Invalid OTP ❌");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-4 text-green-600 text-3xl">
          <FaShieldAlt />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          OTP Verification
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Enter the OTP sent to your email
        </p>

        {/* Form */}
        <form onSubmit={otpHandler} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-sm outline-none"
            />
          </div>

          {/* OTP */}
          <div>
            <label className="text-sm text-gray-600">OTP</label>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Warning */}
          <p className="text-xs text-red-500 text-center">
            OTP valid only for 5 minutes
          </p>

          {/* Button */}
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Verify OTP
          </button>

        </form>
      </div>
    </div>
  );
};

export default OtpVerify;