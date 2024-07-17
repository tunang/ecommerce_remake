import { Link } from "react-router-dom";
import Home from "../HomePage/Home";
import { useDispatch, useSelector } from "react-redux";


import { LuPanelLeftClose } from "react-icons/lu";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { RiMenuLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

import Login from "../Auth/Login";
import { handleLogout } from "../../redux/Reducer/userReducer";
import { AnimatePresence, delay, motion } from "framer-motion";
import { RxOpacity } from "react-icons/rx";
import { useState } from "react";
import { resetCart } from "../../redux/Reducer/cartReducer";
import { logoutApi } from "../../services/usersServices/UserService";

const dropdownVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const asideVariants = {
  hidden: {
    x: "-100vw",
    opacity: 0,
  },

  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.65,
      type: "spring",
      bounce: 0
    },
  },
};

const exitDivVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 0.45,
    transition: {
      duration: 0.65,
      type: "spring",
      bounce: 0.1,
    },
  },
}

const NavBar = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);

  const [isHover, setIsHover] = useState(false);
  const [isAsideActive, setIsAsideActive] = useState(false);

  const handleLogoutClick = async () => {
    await logoutApi();
    dispatch(resetCart());
    dispatch(handleLogout());
  };

  return (
    <>
      {/* <div className="absolute w-screen h-screen bg-black z-50"></div> */}
      <nav className="fixed top-0 grid grid-cols-12 h-20 px-12 bg-white shadow-md z-10 ">
        <AnimatePresence>
          {isAsideActive && (
            <div className="absolute">
              <div className="absolute flex">
                <motion.div variants={asideVariants} initial='hidden' animate='visible' exit='hidden' className=" bg-white w-60 h-screen px-8 pt-8 z-30">

                  <span
                    onClick={() => setIsAsideActive(!isAsideActive)}
                    className=" mr-2"
                  >
                    <LuPanelLeftClose className="h-6 w-10 scale-[140%]" />
                  </span>

                  <div className="flex flex-col gap-y-4 mt-8">
                    <Link to={'/'}>
                      <h4 className="font-normal">Home</h4>
                    </Link>
                    <Link to={"/men"}>
                      <h4 className="font-normal">Men</h4>
                    </Link>
                    <Link to={"/women"}>
                      <h4 className="font-normal">Women</h4>
                    </Link>
                  </div>
                </motion.div>

              </div>

                <motion.div variants={exitDivVariants} initial='hidden' animate='visible' exit='hidden' onClick={() => setIsAsideActive(false)} className="bg-gray-700 opacity-50 w-screen h-screen z-20">
                    {/* <h1>checkout</h1> */}
                </motion.div>
            </div>
          )}
        </AnimatePresence>
        <div className=" flex items-center">
          <span
            onClick={() => setIsAsideActive(!isAsideActive)}
            className="lg:hidden mr-2"
          >
            <RiMenuLine className="h-6 w-10 scale-[140%]" />
          </span>

          <Link to={"/"}>
            <h2 className="leading-[80px]">TunAng</h2>
          </Link>
        </div>

        <div className="col-start-8 col-end-13 flex justify-end lg:justify-between  ">
          <div className="hidden lg:flex justify-between items-center basis-3/5">
            <Link>
              <h4 className="font-normal">Home</h4>
            </Link>
            <Link to={"/men"}>
              <h4 className="font-normal">Men</h4>
            </Link>
            <Link to={"/women"}>
              <h4 className="font-normal">Women</h4>
            </Link>
          </div>

          <div className="relative flex items-center justify-end basis-2/5">
            <Link to={"/cart"}>
              <FiShoppingCart className="nav-icon mr-6" />
            </Link>
            {/* <Link>
              <FiSearch className="nav-icon mr-6" />
            </Link> */}
            <Link
              onClick={() => setIsHover(!isHover)}

              //   onMouseOut={() => setIsHover(false)}
            >
              <CgProfile className="static nav-icon" />
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
                        // whileHover="visible"
                        exit="hidden"
                        className="absolute right-[-10px] bottom-[-140px] bg-quinary rounded-xl px-6 py-2"
                      >
                        <Link to={"/profile/infomation"} className="text-xl">
                          Information
                        </Link>
                        <Link to={"/favorite"} className="block text-xl mt-2">
                          Favorite
                        </Link>
                        <Link
                          to={"/profile/orders"}
                          className="block text-xl mt-2"
                        >
                          Your orders
                        </Link>
                        <Link
                          onClick={() => handleLogoutClick()}
                          className="block text-xl mt-2"
                        >
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
                      // whileHover="visible"
                      exit="hidden"
                      className="absolute right-[-10px] bottom-[-65px]  bg-quinary rounded-xl px-6 py-2"
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
        </div>
      </nav>
    </>
  );
};

export default NavBar;
