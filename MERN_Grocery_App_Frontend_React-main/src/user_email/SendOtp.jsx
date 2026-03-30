// import axios from 'axios'
// import React, { useState } from 'react'
// import { emailUrl } from '../repo/api_path'
// import { useNavigate } from 'react-router-dom'
// import useAuthStore from '../store/useAuthStore'


// const SendOtp = () => {
//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")

//     const navigate = useNavigate()

//     const emailHandler = async(e)=>{
//         e.preventDefault()
//         try {
//             const res = axios.post(`${emailUrl}/send-otp`,{
//                 name, email
//             })
//             console.log(res.data)
//             alert("OTP sent to ur email")
//             localStorage.setItem("userEmail", email)
//             localStorage.setItem('userName', name)
//             setName("")
//             setEmail("")
//             navigate("/verify-otp")
//         } catch (error) {
//             alert("failed to send otp")
//         }
//     }

//   return (
//     <div className='emailSection'>
//         <div className="emailHeading">
//             *Please enter your Name and Email for OTP
//         </div>
//         <form onSubmit={emailHandler}
//         className='emailForm'
//         >
//             <h3>Name</h3>
//             <input type="text" 
//             placeholder='please enter your Name'
//             value={name}
//             onChange={(e)=>setName(e.target.value)}
//             />
//             <h3>Email</h3>
//             <input type="email" 
//             placeholder='please enter your Name'
//             value={email}
//             onChange={(e)=>setEmail(e.target.value)}
//             />
//             <button type='submit'>Send OTP</button>
//         </form>
//     </div>
//   )
// }

// export default SendOtp



import axios from "axios";
import React, { useState } from "react";
import { emailUrl } from "../repo/api_path";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

const SendOtp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const emailHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${emailUrl}/send-otp`, {
        name,
        email,
      });

      alert("OTP sent successfully ✅");

      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name);

      setName("");
      setEmail("");

      navigate("/verify-otp");
    } catch (error) {
      alert("Failed to send OTP ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center text-green-600">
            <Mail size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Login / Signup
          </h2>
          <p className="text-sm text-gray-500">
            Enter your details to receive OTP
          </p>
        </div>

        {/* Form */}
        <form onSubmit={emailHandler} className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition shadow-md"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendOtp;