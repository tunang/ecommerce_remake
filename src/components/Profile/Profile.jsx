import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { handleLogout } from "../../redux/Reducer/userReducer";

import { resetCart } from "../../redux/Reducer/cartReducer";
import { logoutApi } from "../../services/usersServices/UserService";
import { useDispatch } from "react-redux";

const buttonVariants = {
  hover: {
    backgroundColor: "#414141",
    color: "#DDDDDD",
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

const title = ["Your orders", "Profile"];
const links = ['/profile/orders', '/profile/infomation'];

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location.pathname);

  const [activeIndex, setActiveIndex] = useState(null); // State to track active h3 element

  const handleLogoutClick = async () => {
    await logoutApi();
    dispatch(resetCart());
    dispatch(handleLogout());
  };

  useEffect(() => {
    links.forEach((link, index) => {
      if(link === location.pathname){
        setActiveIndex(index);
      }
    })  
  },[location.pathname])

  const handleClick = (index) => {
    setActiveIndex(index); // Update state on click
    navigate(links[index]);
  };

  return (
    <>
      <div className="col-start-1 lg:col-start-2 lg:col-span-11 border-b border-quinary pb-4">
        <h1 className="font-light">Account</h1>
      </div>
      <div className="hidden lg:block col-start-2 col-span-3 mt-8">
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
          onClick={() => handleLogoutClick()}
        >
          Log out
        </p>
      </div>
    </>
  );
};

export default Profile;
