import UserHeader from "./userHeader";
import { useState } from "react";
const UseSchemes = () => {
  // Using useState for managing schemes
  const [schemes, setSchemes] = useState([
    {
      name: "Pradhan Mantri Awas Yojana",
      description: "Affordable housing scheme for rural residents.",
      eligibility: [
        "BPL category families",
        "No pucca house ownership",
        "Rural residents only",
      ],
    },
    {
      name: "Pradhan Mantri Jan Dhan Yojana",
      description: "Financial inclusion scheme for banking services.",
      eligibility: [
        "Indian citizen",
        "Age 10 or above",
        "No existing bank account",
      ],
    },
    {
      name: "National Rural Employment Guarantee Act (NREGA)",
      description: "Employment scheme providing 100 days of wage employment.",
      eligibility: ["Rural households", "Willing to do unskilled manual labor"],
    },
  ]);

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
                {scheme.name}
              </h2>
              <p className="text-gray-700 mb-4">{scheme.description}</p>
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                Eligibility Criteria:
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {scheme.eligibility.map((criteria, i) => (
                  <li key={i}>{criteria}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default UseSchemes;