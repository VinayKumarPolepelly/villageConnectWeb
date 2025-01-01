import UserHeader from "./userHeader";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../helper";
const UseSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [error, setError] = useState(null);

  // Fetch announcements from backend
  useEffect(() => {
    const url = `${BASE_URL}/api/v1/users/getschemes`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Schemes");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Complaints:", data); // Debug log
        setSchemes(data); // Ensure correct data structure
      })
      .catch((err) => console.error("Error fetching Schemes:", err));
  }, []);

  // Using useState for managing schemes
  // const [schemes, setSchemes] = useState([
  //   {
  //     name: "Rythu Bandhu Scheme",
  //     description:
  //       "Telangana Government has proposed a new scheme for providing investment support to Agriculture and Horticulture crops by way of a grant  Rs.5000/- per Acre per Farmer ",
  //     eligibility: [
  //       "Farmers",
  //       "Should have land for farming",
  //       "Rural residents only",
  //     ],
  //   },
  //   {
  //     name: "Pradhan Mantri Jan Dhan Yojana",
  //     description: "Financial inclusion scheme for banking services.",
  //     eligibility: [
  //       "Indian citizen",
  //       "Age 10 or above",
  //       "No existing bank account",
  //     ],
  //   },
  //   {
  //     name: "National Rural Employment Guarantee Act (NREGA)",
  //     description: "Employment scheme providing 100 days of wage employment.",
  //     eligibility: ["Rural households", "Willing to do unskilled manual labor"],
  //   },
  //   {
  //     name: "Pradhan Mantri Kisan Maan Dhan Yojana ",
  //     description:
  //       "The Government of India has introduced an Old Age Pension Scheme for all land holdingSmall and Marginal Farmers (SMFs) in the country, namely, the “Pradhan Mantri KisanMaan-Dhan Yojana (PM-KMY)”, as a voluntary and contributory pension scheme for theentry age group of 18 to 40 years.",
  //     eligibility: ["Rural households"],
  //   },
  // ]);

  return (
    <div>
      <UserHeader />
      <div className="p-8 bg-green-50 min-h-screen">
        <h1 className="text-2xl font-bold text-center text-green-800 mb-10">
          Government Schemes
        </h1>

        {/* Display Schemes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schemes.map((scheme, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 border-t-4 border-green-800 hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                {scheme.title}
              </h2>
              <p className="text-gray-700 mb-4">{scheme.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default UseSchemes;
