// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";
// const connectDB = async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     console.log("MongoDB connected succesfully!!");
//   } catch {
//     (error) => {
//       console.log(`Mongo db connection error`, error);
//       process.exit(1);
//     };
//   }
// };

// export default connectDB;



import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 20000,  // Increase connection timeout to 20 seconds
      socketTimeoutMS: 20000,   // Increase socket timeout to 20 seconds
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
};

export default connectDB;
