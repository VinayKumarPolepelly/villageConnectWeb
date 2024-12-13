// import Header from "../Header";
// import CarouselComponent from "./Carousal";
// import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../helper";
// import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
// import "react-toastify/dist/ReactToastify.css";

// const userLogin = () => {
//   const username = useRef();
//   const password = useRef();
//   const [error, setError] = useState();
//   const navigate = useNavigate();
//   const formRef = useRef(null);

//   const handlesubmitform = async (e) => {
//     e.preventDefault();
//     const url = `${BASE_URL}/api/v1/users/login`;

//     const data = {
//       username: username.current.value,
//       password: password.current.value,
//     };

//     try {
//       const response1 = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(data),
//       });
//       const responseData = await response1.json();
//       if (!response1.ok) {
//         // console.log(response1.status);
//         toast.error(responseData.message);
//         //throw new Error("Login failed");
//       }
//       //console.log(responseData.data.accessToken);

//       // Assuming responseData.accessToken contains the access token
//       // Set the accessToken cookie
//       document.cookie = `accessToken=${responseData.data.accessToken}; Secure; SameSite=None; Path=/`;
//       if (responseData.data.user.role === "admin") navigate(`/admin`);
//       else navigate(`/user`);
//     } catch (error) {
//       if (error.message === "Unauthorized request") navigate("/");
//       //console.log("Login error:", error.message);
//       // Handle login error
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <ToastContainer />
//       <div className="h-screen w-screen relative bg-cover bg-center bg-[url('https://res.cloudinary.com/drygl5o4k/image/upload/v1733333722/sodoskjiwdjq0xxpv1pj.png')]">
//         {/* Background Overlay */}
//         <div className="absolute inset-0 bg-black opacity-60"></div>

//         {/* Content Layer */}
//         <div className="relative ">
//           <div className="p-5 flex justify-center ">
//             <div className=" w-6/12 mt-12 bg-green-50 shadow-2xl rounded-lg p-3">
//               <div className="flex flex-row">
//                 <div>
//                   <h1 className="text-green-800 font-bold text-xl mb-3 ml-[120px]">
//                     User Login
//                   </h1>
//                   <form className="flex flex-col "
//                   onSubmit={handlesubmitform}
//                   ref={formRef}  >
//                     <label className="mb-1 ml-7 text-[16px]  text-green-800">
//                       Username
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter Username"
//                       className="mb-2 p-3 ml-7 border-2 border-gray-500 text-md rounded-lg w-[18em]"
//                       ref={username}
//                     />
//                     <label className="mb-1 ml-7 text-[16px] text-green-800">
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       placeholder="Enter Password"
//                       className="mb-6 p-3 border-2 ml-7 border-gray-500 text-md rounded-lg w-[18em]"
//                       ref={password}
//                     />
//                     <button className="p-2 mb-4 font-semibold text-lg w-[100px] ml-[110px] text-white bg-green-700 hover:bg-green-600 hover:shadow-lg  active:bg-green-700 rounded-lg">
//                       Login
//                     </button>
//                   </form>
//                 </div>
//                 <div>
//                   <CarouselComponent />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default userLogin;

import Header from "../Header";
import CarouselComponent from "./Carousal";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../helper";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const username = useRef();
  const password = useRef();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handlesubmitform = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/api/v1/users/login`;

    const data = {
      username: username.current.value,
      password: password.current.value,
    };

    try {
      const response1 = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const responseData = await response1.json();
      if (response1.ok) {
        // Store User Info in LocalStorag
        localStorage.setItem("currentUser", JSON.stringify(data.username));
      }
      if (!response1.ok) {
        // console.log(response1.status);
        toast.error(responseData.message);
        //throw new Error("Login failed");
      }
      //console.log(localStorage.getItem("currentUser"));

      // Assuming responseData.accessToken contains the access token
      // Set the accessToken cookie
      //document.cookie = `accessToken=${responseData.data.accessToken}; Secure; SameSite=None; Path=/`;

      // localStorage.setItem(
      //   "currentUser",
      //   JSON.stringify(responseData.username)
      // );
      // console.log(JSON.parse(localStorage.getItem("currentUser")));
      //const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      //console.log(currentUser);

      if (responseData.data.user.role === "admin") navigate(`/admin`);
      else navigate(`/user`);
    } catch (error) {
      if (error.message === "Unauthorized request") navigate("/");
      //console.log("Login error:", error.message);
      // Handle login error
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
          <div className="p-5 flex justify-center ">
            <div className=" w-6/12 mt-12 bg-green-50 shadow-2xl rounded-lg p-3">
              <div className="flex flex-row">
                <div>
                  <h1 className="text-green-800 font-bold text-xl mb-3 ml-[120px]">
                    User Login
                  </h1>
                  <form
                    className="flex flex-col "
                    onSubmit={handlesubmitform}
                    ref={formRef}
                  >
                    <label className="mb-1 ml-7 text-[16px]  text-green-800">
                      Username
                    </label>
                    <input
                      type="text"
                      ref={username}
                      placeholder="Enter Username"
                      className="mb-2 p-3 ml-7 border-2 border-gray-500 text-md rounded-lg w-[18em]"
                    />
                    <label className="mb-1 ml-7 text-[16px] text-green-800">
                      Password
                    </label>
                    <input
                      type="password"
                      ref={password}
                      placeholder="Enter Password"
                      className="mb-6 p-3 border-2 ml-7 border-gray-500 text-md rounded-lg w-[18em]"
                    />
                    {error && (
                      <div className="text-red-600 font-bold text-md">
                        {error}
                      </div>
                    )}
                    <button className="p-2 mb-4 font-semibold text-lg w-[100px] ml-[110px] text-white bg-green-700 hover:bg-green-600 hover:shadow-lg  active:bg-green-700 rounded-lg">
                      Login
                    </button>
                  </form>
                </div>
                <div>
                  <CarouselComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
