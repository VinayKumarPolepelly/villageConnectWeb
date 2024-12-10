// import dotenv from "dotenv";
// dotenv.config({
//   path: "./.env",
// });
// import connectDB from "./db/dbindex.js";
// import app from "./app.js";
// //const PORT = process.env.PORT || 8000; // Use the PORT from .env or fallback to 5000
// connectDB()
//   .then(() => {
//     app.listen(process.env.PORT || 8080, () => {
//       console.log(
//         `connection successfull!! server is running at port ${process.env.PORT}`
//       );
//     });
//   })
//   .catch((error) => {
//     console.log("server error", error);
//   });













// // server.js
// import express from "express";
// import cors from "cors";
// // import dotenv from "dotenv";


// import userRoutes from "./src/routes/user.routes.js";
// import connectDB from "./src/db/dbindex.js";

// // dotenv.config();
// import dotenv from 'dotenv';
// dotenv.config();  // Load the .env file




// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect to the database
// connectDB();

// // Use Routes
// app.use("/api/users", userRoutes);

// import { User } from './src/models/user.model.js';
// ``
//   // Make sure the path is correct

// const createUser = async () => {
//   try {
//     const user = new User({
//       username: "sai_kiran",
//       fullname: "Akavaram Sai Kiran",
//       email: "akavaramsaikiran01@gmail.com",
//       password: "sai123",
//       address: "shaligouraram",
//       aadharnumber: 123456789012,
//       mobile: 6301698745,
//       role : "user",
//     });
//     await user.save();
//     console.log("User created successfully!");
//   } catch (error) {
//     console.error("Error creating user:", error);
//   }
// };

//  createUser();

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });














import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv for environment variables
import connectDB from "./src/db/dbindex.js";
import userRoutes from "./src/routes/user.routes.js";
import { Complaint } from "./src/models/complaint.model.js";

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // specify the frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // specify allowed methods
  credentials: true, // allow credentials (cookies, etc.)
};

// Use CORS middleware with the specified options
app.use(cors(corsOptions));

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB database
connectDB()
  .then(() => {
    console.log("Database connected successfully!");
    
    // Start the server once database connection is successful
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });


  //insert complaints
  // const createComplaint = async () => {
  //     try {
  //       const newComplaint = new Complaint({
  //         category: "water",
  //         description:"abcd",
  //         user: "vinay",
  //         status: "pending",
  //       });
  //       await newComplaint.save();
  //       console.log("complaint added successfully!");
  //     } catch (error) {
  //       console.error("Error creating complaint:", error);
  //     }
  //   };
    
  //    createComplaint();

// Use Routes for user API
app.use("/api/v1/users", userRoutes);
