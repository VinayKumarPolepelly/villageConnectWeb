import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../helper";
import AdminHeader from "./AdminHeader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddActivity() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBkVwKIQMqHgVjJV5_PDgwLfhqOdpiSgIY7Q&s"
  );

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = JSON.parse(localStorage.getItem("currentUser"));
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("username", username);
    formData.append("image", image);

    try {
      const response = await fetch(`${BASE_URL}/api/v1/admins/addActivity`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add Activity");

      toast.success("Activity added successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add Activity");
    }
  };

  return (
    <div>
      <AdminHeader />
      <ToastContainer />
      <div className="p-8 bg-green-50 min-h-screen">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
          Add Activity
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Select Image (optoinal)
            </label>
            <select
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Image</option>
              <option value="https://stgcmd.com/wp-content/uploads/2017/11/vision.jpg">
                Cultural Festval
              </option>
              <option value="https://pbs.twimg.com/media/EExHf6aU0AAtBtf.jpg:large">
                Guest Visit
              </option>
              <option value="https://i0.wp.com/kidsvillageschool.com/wp-content/uploads/2023/02/Sports-Day-2023-kidsvillageschool-8.jpg?w=581&h=327&ssl=1">
                Sports Day Event
              </option>
              <option value="https://csisindia.com/wp-content/uploads/2022/09/bathukamma-photo1.jpg">
                Traditional Ceremony
              </option>
              <option value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu0ExWxBLBYaknmeoA_T7u5eyleEPCu96uUw&s">
                Youth Talent Show
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md font-bold hover:bg-green-700"
          >
            Add Activity
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddActivity;
