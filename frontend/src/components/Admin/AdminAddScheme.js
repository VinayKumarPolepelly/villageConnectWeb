import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../helper";
import AdminHeader from "./AdminHeader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddScheme() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = JSON.parse(localStorage.getItem("currentUser"));
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("username", username);
    try {
      const response = await fetch(`${BASE_URL}/api/v1/admins/addScheme`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add Scheme");

      toast.success("Scheme added successfully!");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add Scheme");
    }
  };

  return (
    <div>
      <AdminHeader />
      <ToastContainer />
      <div className="p-8 bg-green-50 min-h-screen">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
          Add Scheme
        </h1>
        <form
          className="bg-white p-8 rounded-md shadow-lg max-w-3xl mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-green-800 font-bold mb-2">Title</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-green-800 font-bold mb-2">
              Description
            </label>
            <textarea
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md font-bold hover:bg-green-700"
          >
            Add Scheme
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddScheme;
