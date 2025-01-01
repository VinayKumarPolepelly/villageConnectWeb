import AdminHeader from "./AdminHeader";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../helper";

function AdminViewUsers() {
  const [users, setUsers] = useState([]);

  // Fetch complaints from backend

  useEffect(() => {
    const url = `${BASE_URL}/api/v1/admins/getallusers`;
    console.log("fetch called");
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data); // Ensure correct data structure
        //console.log("Fetched Users:", users); // Debug log
      })
      .catch((err) => console.error("Error fetching Users:", err));
  }, []);

  return (
    <div>
      <AdminHeader />
      <div className="p-8 bg-green-50 min-h-screen">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
          Village Users
        </h1>
        <div className="ml-auto">
          <h2 className="font-bold ">Total Users : {users.length}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left bg-white rounded-md shadow-lg">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-4">Username</th>
                <th className="p-4">FullName</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Created On</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`${
                      index % 2 === 0 ? "bg-green-100" : "bg-green-50"
                    }`}
                  >
                    <td className="p-4">{user.username}</td>
                    <td className="p-4">{user.fullname}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.role}</td>
                    <td className="p-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 text-center text-red-600 font-semibold"
                  >
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminViewUsers;
