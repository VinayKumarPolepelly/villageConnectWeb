import Header from "../Header";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../helper";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";
const UserReg = () => {
  const [error, setError] = useState(null);
  const username = useRef();
  const fullname = useRef();
  const email = useRef();
  const password = useRef();
  const mobile = useRef();
  const address = useRef();
  const aadhar = useRef();
  const formRef = useRef(null); // Add a reference to the form element
  const navigate = useNavigate();

  const handlesubmitform = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/api/v1/users/register`;
   
    const data = {
      username: username.current.value,
      password: password.current.value,
      fullname: fullname.current.value,
      email: email.current.value,
      mobile: mobile.current.value,
      aadhar: aadhar.current.value,
      address: address.current.value,
      role: "user",
    };

    const userDetails = JSON.stringify(data);
    console.log(userDetails);
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: userDetails,
    });
    const data2 = await response.json();
    if (response.ok === true) {
      toast.success("Registered successfully");
      formRef.current.reset(); // Reset the form upon successful submission
    } else {
      if (error === "Network response was not ok") navigate("/");
      toast.error(data2.message);
    }
  };
  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="h-screen w-screen relative bg-cover bg-center bg-[url('https://res.cloudinary.com/drygl5o4k/image/upload/v1733333722/sodoskjiwdjq0xxpv1pj.png')]">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content Layer */}
        <div className="relative ">
          <div className="p-6 flex justify-center">
            <div className="w-7/12 mt-12 bg-green-50 shadow-2xl rounded-lg p-3">
              <h2 className="text-green-800 ml-[-29px] font-bold text-xl mb-3 text-center ">
                User Registration
              </h2>
              <form
                className="flex flex-col"
                onSubmit={handlesubmitform}
                ref={formRef}
              >
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <label className="mb-1 ml-7 text-[16px]  text-green-800">
                      Full Name:
                    </label>
                    <input
                      className="mb-2 p-3 ml-7 border-2 border-gray-500 text-md rounded-lg w-[18em]"
                      type="text"
                      placeholder="Enter your name"
                      ref={fullname}
                      required
                    />
                  </div>
                  <div className="ml-[100px]">
                    <div className="flex flex-col">
                      <label className="mb-1 text-[16px]  text-green-800">
                        Email
                      </label>
                      <input
                        className="mb-2 p-3  border-2 border-gray-500 text-md rounded-lg w-[18em]"
                        type="text"
                        ref={email}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div>
                    <label className="mb-1 ml-7 text-[16px]  text-green-800">
                      Mobile
                    </label>
                    <input
                      type="tel"
                      className="mb-2 p-3 ml-7 border-2 border-gray-500 text-md rounded-lg w-[18em]"
                      placeholder="Enter your mobile number"
                      ref={mobile}
                      required
                    />
                  </div>
                  <div className="mr-1">
                    <label className="mb-1 ml-7 text-[16px]  text-green-800">
                      Aadhar Number
                    </label>
                    <input
                      type="tel"
                      className="mb-2 p-3 ml-7 border-2 border-gray-500 text-md rounded-lg w-[18em]"
                      placeholder="Enter your aadhar number"
                      ref={aadhar}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <div>
                    <label className="mb-1 ml-7 text-[16px]  text-green-800">
                      Username
                    </label>
                    <input
                      type="text"
                      className="mb-2 p-3 ml-7 border-2 border-gray-500 text-md rounded-lg w-[18em]"
                      placeholder="Create username"
                      ref={username}
                      required
                    />
                  </div>
                  <div className="mr-[75px]">
                    <label className="mb-1 ml-7 text-[16px]  text-green-800">
                      Address
                    </label>
                    <input
                      type="text"
                      className="mb-2 p-3 ml-7 border-2 border-gray-500 text-md rounded-lg w-[18em]"
                      placeholder="Enter your address"
                      ref={address}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <div>
                    <label className="mb-1 ml-7 text-[16px]  text-green-800">
                      Create Password
                    </label>
                    <input
                      type="password"
                      className="mb-2 p-3 ml-7 border-2 border-gray-500 text-md rounded-lg w-[18em]"
                      placeholder="Create password"
                      name="password"
                      ref={password}
                      required
                    />
                  </div>
                  <div className="mr-[54px]">
                    <label className="mb-1 ml-7 text-[16px]  text-green-800">
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      className="mb-2 p-3 ml-7 border-2 border-gray-500 text-md rounded-lg w-[18em]"
                      name="confirmPassword"
                      placeholder="Re-enter password"
                      required
                    />
                    
                  </div>
                </div>
                {error && (
                  <div className="text-red-600 ml-5 text-center  w-[90%] mt-3 mb-[-25px] font-bold">
                    <h2>{error}</h2>
                  </div>
                )}
                <button className="p-2 mb-4 ml-[300px] mt-5 font-semibold text-lg w-[100px] ml-8 text-white bg-green-700 hover:bg-green-600 hover:shadow-lg  active:bg-green-700 rounded-lg">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReg;
