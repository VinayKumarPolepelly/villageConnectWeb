import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../helper";
import AdminHeader from "./AdminHeader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddAnnouncement() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [fullname, setFullname] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchfullname();
  }, [fullname]); // Re-fetch leave details when formSubmitted changes

  const fetchfullname = async () => {
    try {
      const username = JSON.parse(localStorage.getItem("currentUser"));
      //console.log(username);
      if (!username) {
        throw new Error("User not logged in or username not found");
      }

      const response = await fetch(
        `${BASE_URL}/api/v1/admins/getfullname/${username}`,
        {
          method: "GET",
          credentials: "include", // Include credentials (cookies)
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();

      if (json?.fullname) {
        setFullname(json.fullname);
        console.log({ fullname, username });
      } else {
        throw new Error("No fullname found");
      }
    } catch (error) {
      console.error("Error fetching fullname:", error);
      setError("Error fetching fullname");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = JSON.parse(localStorage.getItem("currentUser"));
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("username", username);
    formData.append("fullname", fullname);
    formData.append("image", image);

    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/admins/addAnnouncement`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to add announcement");

      toast.success("Announcement added successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add announcement");
    }
  };

  // const announcements = [
  //   {
  //     title: "Ration Distribution",
  //     description:
  //       "Ration distribution will be conducted in slots based on serial numbers. Please arrive according to the following schedule:\n- Serial No. 1-50: 9:00 AM - 10:00 AM\n- Serial No. 51-100: 10:00 AM - 11:00 AM\n- Serial No. 101-150: 11:00 AM - 12:00 PM\nBring your ration cards for verification.",
  //   },
  //   {
  //     title: "Pension Distribution",
  //     description:
  //       "Pension distribution will be held in categories:\n- Senior Citizens Pension: 9:00 AM - 10:00 AM\n- Widow Pension: 10:00 AM - 11:00 AM\n- Disability Pension: 11:00 AM - 12:00 PM\nKindly arrive within your respective time slots with necessary documents.",
  //   },
  //   {
  //     title: "Grama Panchayat Meeting",
  //     description:
  //       "A village meeting will be held tomorrow at 4:00 PM in the Grama Panchayat Hall. All villagers are requested to attend to discuss upcoming development projects and welfare schemes. - By Grama Panchayat Secretary",
  //   },
  //   {
  //     title: "Health Camp Announcement",
  //     description:
  //       "A free health camp will be conducted on 15th December from 8:00 AM to 1:00 PM at the Village Health Center. Services include general check-ups, eye screening, and vaccination drives. All villagers are encouraged to participate.",
  //   },
  //   {
  //     title: "Weather Alert",
  //     description:
  //       "Severe weather alert issued for the village. Heavy rain and strong winds are expected over the next 48 hours. Residents are advised to stay indoors, secure loose objects, and avoid travel unless necessary. Stay safe!",
  //   },
  // ];

  return (
    <div>
      <AdminHeader />
      <ToastContainer />
      <div className="p-8 bg-green-50 min-h-screen">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
          Add Announcement
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
              <option>Select Image</option>
              <option value="https://etimg.etb2bimg.com/photo/93962847.cms">
                Ration Distribution
              </option>
              <option value="https://www.deccanchronicle.com/h-upload/2024/03/31/1081930-pensions.webp">
                Pension Distribution
              </option>
              <option value="https://media.gettyimages.com/id/1498907921/video/doctor-administers-polio-dosage-to-small-boy-during-a-rural-health-care-camp.jpg?s=640x640&k=20&c=-3fm4RrJ_yDNEJXRizPbnqq6c5Gpvg_gU0nl3O_CvCk=">
                Health Camp
              </option>
              <option value="https://www.pradan.net/sampark/wp-content/uploads/2019/04/Scaling-up-Gram-Panchayat.jpg">
                Grama Panchayat Meet
              </option>
              <option value="https://t3.ftcdn.net/jpg/07/83/38/52/360_F_783385242_wudjCe0vCJqqQWB8N5NXdTWdYwbiWN0y.jpg">
                Any Event in Village
              </option>
              <option value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWiB32VvbXgvSTNBtb6ydd1rMkf3FG_4FZCA&s">
                Alert - Important Announcement
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md font-bold hover:bg-green-700"
          >
            Add Announcement
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAnnouncement;
