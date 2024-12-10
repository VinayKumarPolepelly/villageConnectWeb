import UserHeader from "./userHeader";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../helper";
import { toast, ToastContainer } from "react-toastify";

const UserComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    description: "",
  });
  //const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${BASE_URL}/api/v1/users/addComplaint`;
    const data = {
      category: formData.category,
      description: formData.description,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Complaint added successfully");
      const responseData = await response.json();
      //console.log(responseData);
      // navigate("/employeeLeaveReport");

      // Assuming responseData.accessToken contains the access token
      document.cookie = `accessToken=${responseData.data.accessToken}; Secure; SameSite=None; Path=/`;
    } catch (error) {
      if (error.message === "Network response was not ok") {
        console.log("network Response not ok");
      }
      //console.error("Submission error:", error);
      // Handle submission error
    }

    // Reset form fields to their default values
    setFormData({ category: "", description: "" });
    setFormVisible(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, [complaints]); // Re-fetch leave details when formSubmitted changes

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/users/getComplaints`, {
        method: "GET",
        credentials: "include", // Include credentials (cookies)
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      if (json?.complaint) {
        setComplaints(json.complaint);
        // console.log(json.leaves);
      } else {
        throw new Error("No Leaves field in response");
      }
    } catch (error) {
      setError("Error fetching Leaves data");
    }
  };

  const formatDateAndTime = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  return (
    <div className="bg-green-50 h-screen">
      <UserHeader />
      <ToastContainer />
      <div className="container mx-auto p-4 w-9/12">
        <h1 className="text-2xl font-bold mb-4 text-green-800 text-center">
          Village Complaint Management
        </h1>
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
        >
          Raise Complaint
        </button>

        {formVisible && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-4 rounded shadow-lg mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Complaint Category:
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Category</option>
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Hospital">Hospital</option>
                <option value="Pension">Pension</option>
                <option value="Pension">Ration</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-700   text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit Complaint
            </button>
          </form>
        )}

        <h2 className="text-xl font-semibold mb-2">Complaint History</h2>
        <table className="min-w-full bg-white border rounded shadow-lg">
          <thead>
            <tr className="w-full bg-green-600 text-white">
              <th className="py-2 px-4">Complaint ID</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 text-center">{complaint.id}</td>
                <td className="py-2 px-4 text-center">
                  {formatDateAndTime(complaint.createdAt)}
                </td>
                <td className="py-2 px-4 text-center">{complaint.category}</td>
                <td className="py-2 px-4 text-center text-yellow-600">
                  {complaint.status}
                </td>
              </tr>
            ))}
            {complaints.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No complaints submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserComplaint;