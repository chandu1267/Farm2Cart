
// import axios from 'axios'
// import React, { useState } from 'react'
// import { emailUrl } from '../repo/api_path'
// import { useNavigate } from 'react-router-dom'
// import useAuthStore from '../store/useAuthStore'

// const OtpVerify = () => {

//   const userEmail = localStorage.getItem("userEmail")
//     const [email, setEmail] = useState(userEmail)
//     const [otp, setOtp] = useState("")

//     const navigate = useNavigate()
//     const {login} = useAuthStore.getState()

//     const otpHandler = async(e)=>{
//         e.preventDefault()
//         const userName = localStorage.getItem("userName")
//         try {
//             const res = await axios.post(`${emailUrl}/verify-otp`,{
//                 email, otp
//             })
//             console.log(res.data)
//             alert("verification successfull")
//             login(userName, res.data.token)
//             navigate("/")
//         } catch (error) {
//             alert("wrong otp")
//         }
//     }

//   return (
//     <div className='emailSection'>
//         <div className="emailHeading verify">
//             OTP Verification
//         </div>
//         <form onSubmit={otpHandler} className='emailForm'>
    
//           <div className="" style={{color:"red"}}>
//             OTP valid only for 5mins
//           </div>
          
//                 <h3>Email</h3>
//                 <input type="email" defaultValue={email} />
         
          
//                 <h3>OTP</h3>
//                 <input type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} />
      
//             <button type='submit'>Verify</button>
//         </form>
//     </div>
//   )
// }

// export default OtpVerify





import axios from "axios";
import React, { useState } from "react";
import { emailUrl } from "../repo/api_path";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { ShieldCheck } from "lucide-react";

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

      alert("Verification successful ✅");
      login(userName, res.data.token);
      navigate("/");
    } catch (error) {
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center text-green-600">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            OTP Verification
          </h2>
          <p className="text-sm text-gray-500">
            Enter the OTP sent to your email
          </p>
        </div>

        {/* Notice */}
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center">
          OTP valid only for 5 minutes
        </div>

        {/* Form */}
        <form onSubmit={otpHandler} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 text-gray-500"
            />
          </div>

          {/* OTP */}
          <div>
            <label className="text-sm text-gray-600">Enter OTP</label>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-center tracking-widest"
              maxLength={6}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition shadow-md"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerify;