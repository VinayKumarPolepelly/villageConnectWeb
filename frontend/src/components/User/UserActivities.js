import UserHeader from "./userHeader";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../helper";
const UserActivities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  // Fetch announcements from backend
  useEffect(() => {
    const url = `${BASE_URL}/api/v1/users/getactivities`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Activities");
        }
        return res.json();
      })
      .then((data) => {
        //  console.log("Fetched Complaints:", data); // Debug log
        setActivities(data); // Ensure correct data structure
      })
      .catch((err) => console.error("Error fetching Activites:", err));
  }, []);

  // const activities = [
  //   {
  //     title: "Cultural Festival",
  //     description:
  //       "Annual village cultural festival featuring music, dance, and traditional attire.",
  //     date: "October 10, 2023",
  //     image: "https://stgcmd.com/wp-content/uploads/2017/11/vision.jpg", // Replace with your image URL
  //     alt: "Village cultural festival with people dancing in traditional attire",
  //   },
  //   {
  //     title: "Guest Visit: District Collector",
  //     description:
  //       "District Collector's visit to discuss development projects and welfare programs.",
  //     date: "November 5, 2023",
  //     image: "https://pbs.twimg.com/media/EExHf6aU0AAtBtf.jpg:large",
  //     alt: "District Collector addressing villagers in a community hall",
  //   },
  //   {
  //     title: "Sports Day Event",
  //     description:
  //       "Inter-village sports competition with events like running, football, and kabaddi.",
  //     date: "August 20, 2023",
  //     image:
  //       "https://i0.wp.com/kidsvillageschool.com/wp-content/uploads/2023/02/Sports-Day-2023-kidsvillageschool-8.jpg?w=581&h=327&ssl=1",
  //     alt: "Village sports day with children participating in a race",
  //   },
  //   {
  //     title: "Traditional Ceremony",
  //     description:
  //       "Celebration of the annual harvest festival with rituals and community feasts.",
  //     date: "October 5, 2022",
  //     image:
  //       "https://csisindia.com/wp-content/uploads/2022/09/bathukamma-photo1.jpg",
  //     alt: "Village elders performing rituals during the traditional harvest ceremony",
  //   },
  //   {
  //     title: "Youth Talent Show",
  //     description: "Youth showcase their talents in singing, dancing, and art.",
  //     date: "December 12, 2023",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu0ExWxBLBYaknmeoA_T7u5eyleEPCu96uUw&s",
  //     alt: "Young villagers performing on stage during a talent show",
  //   },
  // ];

  return (
    <div>
      <UserHeader />
      <div className="container mx-auto p-4 w-11/12 bg-green-50">
        <h1 className="text-2xl font-bold text-green-700 text-center mb-6">
          Village Activities
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-xl overflow-hidden"
            >
              <img
                src={activity.image}
                alt="activity Image"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-green-700">
                  {activity.title}
                </h2>
                <p className="text-gray-600 text-sm mb-2">{activity.date}</p>
                <p className="text-gray-700">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default UserActivities;
