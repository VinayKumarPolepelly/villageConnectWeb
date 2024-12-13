import AdminHeader from "./AdminHeader";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../helper";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";
function AdminViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);

  // Fetch complaints from backend

  useEffect(() => {
    const url = `${BASE_URL}/api/v1/admins/getallcomplaints`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch complaints");
        }
        return res.json();
      })
      .then((data) => {
        //  console.log("Fetched Complaints:", data); // Debug log
        setComplaints(data); // Ensure correct data structure
      })
      .catch((err) => console.error("Error fetching complaints:", err));
  }, []);

  const handleStatusSubmit = async (comp_id, user, status) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/admins/updateComplaints`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user,
            status: status,
            comp_id: comp_id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Status updated successfully");
      // Optionally, update the state to reflect the changes without reloading
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === comp_id
            ? { ...complaint, status: status }
            : complaint
        )
      );
    } catch (error) {
      console.log(error);
      setError("Error updating leave status");
    }
  };

  return (
    <div>
      <ToastContainer />
      <AdminHeader />
      <div className="p-8 bg-green-50 min-h-screen">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
          Village Complaints
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left bg-white rounded-md shadow-lg">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Complaint on</th>
                <th className="p-4">Category</th>
                <th className="p-4">Description</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length > 0 ? (
                complaints.map((complaint, index) => (
                  <tr
                    key={complaint._id}
                    className={`${
                      index % 2 === 0 ? "bg-green-100" : "bg-green-50"
                    }`}
                  >
                    <td className="p-4">{complaint.username}</td>
                    <td className="p-4">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">{complaint.category}</td>
                    <td className="p-4">{complaint.description}</td>
                    <td className="p-4 py-4 whitespace-no-wrap font-normal">
                      <select
                        className="p-1 rounded-md"
                        defaultValue={complaint.status}
                        onChange={(e) =>
                          handleStatusSubmit(
                            complaint._id,
                            complaint.username,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Solved">Solved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 text-center text-red-600 font-semibold"
                  >
                    No Complaints Found
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

export default AdminViewComplaints;
