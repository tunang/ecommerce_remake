import { Link } from "react-router-dom";
import Home from "../HomePage/Home";
import { useDispatch, useSelector } from "react-redux";

import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Login from "../Auth/Login";


import { handleLogout } from "../../redux/Reducer/userReducer";
import { AnimatePresence, motion } from "framer-motion";
import { RxOpacity } from "react-icons/rx";
import { useState } from "react";
import { resetCart } from "../../redux/Reducer/cartReducer";
import { logoutApi } from "../../services/usersServices/UserService";

const dropdownVariants = {
  hidden: {
    opacity: 0,
    transition:{
      duration: 0.2
    }
  },

  visible: {
    opacity: 1,
    transition:{
      duration: 0.2
    }
  },
};

const NavBar = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);

  const [isHover, setIsHover] = useState(false);

  const handleLogoutClick = async () => {
    await logoutApi();
    dispatch(resetCart());
    dispatch(handleLogout());
  };

  return (
    <>
      {/* <div className="absolute w-screen h-screen bg-black z-50"></div> */}
      <nav className="fixed top-0 grid grid-cols-12 h-20 px-12 bg-white shadow-md z-10 ">
        <div className="col-start-1 col-end-2 ">
          <Link to={"/"}>
            <h2 className="leading-[80px]">TunAng</h2>
          </Link>
        </div>

        <div className="flex justify-between items-center col-start-8 col-end-11 ">
          <Link>
            <h4 className="font-normal ">Home</h4>
          </Link>
          <Link to={"/men"}>
            <h4 className="font-normal ">Men</h4>
          </Link>
          <Link to={"/women"}>
            <h4 className="font-normal ">Women</h4>
          </Link>
        </div>

        <div className="relative flex items-center justify-end col-span-2">
          <Link to={"/cart"}>
            <FiShoppingCart className="nav-icon mr-6" />
          </Link>
          <Link>
            <FiSearch className="nav-icon mr-6" />
          </Link>
          <Link
            onClick={() => setIsHover(!isHover)}
            onmouse
            //   onMouseOut={() => setIsHover(false)}
          >
            <CgProfile className="nav-icon " />
          </Link>
          <AnimatePresence>
            {isHover === true ? (
              <>
                {userState.account.auth === true ? (
                  <>
                    <motion.div
                      onClick={() => setIsHover(false)}
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="visible"
                      exit="hidden"
                      className="absolute right-[-10px] bottom-[-140px] bg-quinary rounded-xl px-6 py-2"
                    >
                      <Link to={"/profile/address"} className="text-xl">
                        Profile
                      </Link>
                      <Link to={"/register" } className="block text-xl mt-2">
                        Favorite
                      </Link>
                      <Link to={"/profile/orders" } className="block text-xl mt-2">
                        Your orders
                      </Link>
                      <Link onClick={() => handleLogoutClick()} className="block text-xl mt-2">
                        Logout
                      </Link>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    onClick={() => setIsHover(false)}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="visible"
                    exit="hidden"
                    className="absolute right-[-10px] bottom-[-65px] bg-quinary rounded-xl px-6 py-2"
                  >
                    <Link to={"/login"} className="text-xl">
                      Login
                    </Link>
                    <Link to={"/register"} className="block text-xl mt-2">
                      Register
                    </Link>
                  </motion.div>
                )}
              </>
            ) : (
              ""
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
