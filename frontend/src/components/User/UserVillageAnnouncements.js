import React, { useEffect } from "react";
import { useState } from "react";
import UserHeader from "./userHeader";
import { BASE_URL } from "../../helper";
const UserVillageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);

  // Fetch announcements from backend
  useEffect(() => {
    const url = `${BASE_URL}/api/v1/users/getannouncements`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Announcements");
        }
        return res.json();
      })
      .then((data) => {
        //  console.log("Fetched Complaints:", data); // Debug log
        setAnnouncements(data); // Ensure correct data structure
      })
      .catch((err) => console.error("Error fetching complaints:", err));
  }, []);

  {
    // const [announcements] = useState([
    //   {
    //     id: 1,
    //     title: "Health Camp in the Village",
    //     description:
    //       "A free health camp will be organized by the local hospital this Sunday.",
    //     fullDescription:
    //       "A free health camp will be organized by the local hospital this Sunday (07-12-2024) at the community center. Services include general check-ups, eye exams, and blood pressure screening. All villagers are encouraged to attend.",
    //     image:
    //       "https://media.gettyimages.com/id/1498907921/video/doctor-administers-polio-dosage-to-small-boy-during-a-rural-health-care-camp.jpg?s=640x640&k=20&c=-3fm4RrJ_yDNEJXRizPbnqq6c5Gpvg_gU0nl3O_CvCk=", // Optional image
    //     date: "2024-12-06 9:00 AM",
    //     author: "Local Hospital",
    //   },
    //   {
    //     id: 2,
    //     title: "Ration Distribution Schedule",
    //     description:
    //       "Ration distribution will follow a slot-based system according to card serial numbers.",
    //     fullDescription:
    //       "Ration distribution will follow a slot-based system according to card serial numbers. Ration distribution will occur on 06-12-2024 in 4 slots each day:\n- Slot 1 (9 AM - 11 AM): Card numbers 1-50\n- Slot 2 (11 AM - 1 PM): Card numbers 51-100\n- Slot 3 (2 PM - 4 PM): Card numbers 101-150\n- Slot 4 (4 PM - 6 PM): Card numbers 151-200\nPlease adhere to your assigned slot to ensure smooth distribution.",
    //     image: "https://etimg.etb2bimg.com/photo/93962847.cms",
    //     date: "2024-12-05 9:00 AM",
    //     author: "Ration Distributor",
    //   },
    //   {
    //     id: 3,
    //     title: "Panchayat Meeting",
    //     description:
    //       "Upcoming panchayat meeting to discuss development projects.",
    //     fullDescription:
    //       "The panchayat meeting is scheduled for Friday at 3 PM in the village hall. The agenda includes discussions on road repair, water supply, and education projects. All residents are invited to share their opinions.",
    //     image:
    //       "https://www.pradan.net/sampark/wp-content/uploads/2019/04/Scaling-up-Gram-Panchayat.jpg",
    //     date: "2024-12-05 2:30 PM",
    //     author: "Grama Panchayat Secretary",
    //   },
    //   {
    //     id: 4,
    //     title: "Pension Distribution Notice",
    //     description:
    //       "Pension distribution for elderly citizens will follow specific time slots on  04-12-2024.",
    //     fullDescription:
    //       "Pension distribution for elderly citizens will follow specific time slots on  04-12-2024. Pension distribution will be as follows:\n- 9 AM - 11 AM: Senior citizen pensions (Age 70+)\n- 11 AM - 1 PM: Widow pensions\n- 2 PM - 4 PM: Disability pensions\nPlease bring your pension card and ID for verification. Distribution will take place at the village hall.",
    //     image:
    //       "https://www.deccanchronicle.com/h-upload/2024/03/31/1081930-pensions.webp",
    //     date: "2024-12-03 9:00 AM",
    //     author: "Village Pension Office",
    //   },
    // ]);
  }

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
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

  return (
    <div>
      <UserHeader />
      <div className="container mx-auto p-4 w-8/12 bg-green-50">
        <h1 className="text-2xl font-bold mb-4 text-center text-green-700">
          Village Announcements
        </h1>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="border p-4 pl-8 pr-8 rounded-xl shadow-2xl relative bg-gray-50"
            >
              {/* Date and Time Display */}
              <p className="absolute top-2 right-4 text-sm text-gray-600">
                {formatDateAndTime(announcement.createdAt)}
              </p>

              <h2 className="text-xl font-semibold mb-2">
                {announcement.title}
              </h2>

              {/* Image with adjusted dimensions */}
              {announcement.image && (
                <img
                  src={announcement.image}
                  alt="Announcement"
                  className="w-[750px] h-[250px] object-cover mr-auto  mb-2 rounded" // Fixed height and responsive width
                />
              )}

              {/* Announcement description */}
              <p className="text-gray-700 mb-2">
                {expandedId === announcement.id
                  ? announcement.description
                  : announcement.description}
              </p>

              {/* Author information */}
              <p className="text-lg  text-orange-700 mt-2">
                <span className="text-green-700 font-semibold">
                  Published by :{" "}
                </span>
                {announcement.fullname}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserVillageAnnouncements;
