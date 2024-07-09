import { motion } from "framer-motion";
import { useState } from "react";
const buttonVariants = {
  hover: {
    backgroundColor: "#414141",
    color: "#D8D8D8",
    transition: {
      duration: 0.1,
    },
  },
  click: {
    backgroundColor: "#414141",
    color: "#D8D8D8", // Grey color on click
    transition: {
      duration: 0.2, // Adjust transition duration for click effect
    },
  },
};

const title = ["Your orders", "Address"];

const Profile = () => {
  const [activeIndex, setActiveIndex] = useState(null); // State to track active h3 element

  const handleClick = (index) => {
    setActiveIndex(index); // Update state on click
  };

  return (
    <div className="grid grid-cols-12 pt-12">
      <div className="col-start-2 col-span-11 border-b border-quinary pb-4">
        <h1 className="font-light">Account</h1>
      </div>
      <div className="col-start-2 col-span-3 mt-8">
        {title.map((item, index) => (
          <motion.h3
            key={index} // Add key prop for better performance
            variants={buttonVariants}
            whileHover="hover"
            animate={activeIndex === index ? "click" : ""} // Animate based on state
            onClick={() => handleClick(index)}
            className="px-12 py-6 cursor-pointer" // Add cursor-pointer for hover effect
          >
            {item}
          </motion.h3>
        ))}

        <p
          className="inline-block text-xl cursor-pointer mx-12 my-6 border border-black px-4 py-2 hover:text-red-500 hover:border-red-500"
          onClick={() => handleClick(-1)}
        >
          Log out
        </p>
      </div>
    </div>
  );
};

export default Profile;