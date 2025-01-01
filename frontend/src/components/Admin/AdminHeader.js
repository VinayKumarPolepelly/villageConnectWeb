import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const UserProfileIcon = ({ si }) => (
  <div>
    <FaUser size={si} />
  </div>
);

const Logout = ({ handleLogout, user }) => (
  <div className="flex justify-end ">
    <div className="w-[200px]  h-[200px] text-center p-5 bg-gray-100 border-4 border-green-200 shadow-2xl mt-[45px] mr-[65px]  absolute rounded-xl rounded-tr-none ">
      <div className="ml-[46px] h-[65px] w-[65px] mt-[-6px] text-green-700 rounded-full border-solid border-green-600   border-4 p-1 cursor-pointer active:border-gray-400 ">
        <UserProfileIcon si={48} />
      </div>
      <h1 className="mt-4 ml-1 mb-3">{user}</h1>
      <button
        onClick={handleLogout}
        className="text-sm text-white ml-1 border-2 p-[7px] bg-green-700 hover:bg-green-600 hover:shadow-lg active:bg-green-800 rounded-lg active:border-collapse active:font-semibold active:shadow-2xl"
      >
        LogOut
      </button>
    </div>
  </div>
);

const AdminHeader = () => {
  const [showItem, setShowItem] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    // try {
    //   const response = await fetch(`${BASE_URL}/api/v1/admins/logout`, {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }
    // if (response.ok) {
    navigate("/"); // Redirect to the login page after successful logout
    //   } else {
    //     // console.error("Logout failed:", response.statusText);
    //   }
    // } catch (error) {
    //   // console.error("Error logging out:", error);
    // }
  };
  return (
    <div className="sticky top-0  z-20 w-screen">
      <div className=" flex border-3 border bg-green-700 shadow-3xl rounded-b-2xl shadow-lg sticky ">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-KtVCNhRMNAhopfmJepp5xAX-RJsqMFJTA&s"
          className="w-[55px]  mb-2 rounded-2xl m-1 "
          alt="This is villagconnect logo"
        />
        <ul className="mt-1 flex justify-between px-10 py-4 text-center  w-full">
          <Link to="/admin">
            <li className="active:font-semibold text-white hover:underline">
              Home
            </li>
          </Link>
          <Link to="/admin/AddAnnouncement/">
            <li className="text-white active:font-semibold link-underline link-underline-black">
              Add Announcements
            </li>
          </Link>
          <Link to="/admin/ViewComplaints/">
            <li className="text-white active:font-semibold link-underline link-underline-black">
              View Complaints
            </li>
          </Link>
          <Link to="/admin/AddActivity">
            <li className="text-white active:font-semibold link-underline link-underline-black">
              Add Activities
            </li>
          </Link>
          <Link to="/admin/AddScheme">
            <li className="text-white active:font-semibold link-underline link-underline-black">
              Add Schemes
            </li>
          </Link>
          <Link to="/admin/ViewUsers">
            <li className="text-white active:font-semibold link-underline link-underline-black">
              View Users
            </li>
          </Link>

          <div
            className="h-9 w-10 mt-[-6px] text-white rounded-3xl border-solid border-4 p-1 cursor-pointer active:border-gray-400"
            onClick={() => setShowItem(!showItem)}
          >
            <UserProfileIcon si={25} />
          </div>
        </ul>

        {showItem && <Logout handleLogout={handleLogout} user={user} />}
      </div>
    </div>
  );
};

export default AdminHeader;
