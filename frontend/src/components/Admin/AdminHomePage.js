import React from "react";
import AdminHeader from "./AdminHeader";
import { motion } from "framer-motion";

const AdminHomepage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="h-screen w-screen relative bg-cover bg-center bg-[url('https://res.cloudinary.com/drygl5o4k/image/upload/v1733333722/sodoskjiwdjq0xxpv1pj.png')]">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-80"></div>
        {/* Content Layer */}
        <div className=" ">
          <div className="relative h-screen flex flex-row justify-between items-center ">
            {/* Main Heading */}
            <div className="w-6/12">
              <motion.h1
                initial={{ opacity: 0, y: -50 }} // Starting position (above and hidden)
                animate={{ opacity: 1, y: 0 }} // Ending position (centered and visible)
                transition={{ duration: 1 }} // Animation duration
                className="text-4xl mt-[-150px] text-center font-bold text-white mb-5"
              >
                Welcome Admin
              </motion.h1>

              {/* Subheading */}
              <motion.h2
                initial={{ opacity: 0, y: 50 }} // Starting position (below and hidden)
                animate={{ opacity: 1, y: 0 }} // Ending position (centered and visible)
                transition={{ duration: 1, delay: 0.5 }} // Animation duration with delay
                className="text-2xl text-white text-sm text-center"
              >
                Your Admin Control Starts Here
              </motion.h2>
            </div>
            <div className="w-6/12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30201.470177285704!2d77.90893232073985!3d18.878926792681693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcde1f278ab727d%3A0xd10f8a504e6e7871!2sBasar%2C%20Telangana!5e0!3m2!1sen!2sin!4v1733410910664!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-[-50px] mr-10"
                title="BASAR Village"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;