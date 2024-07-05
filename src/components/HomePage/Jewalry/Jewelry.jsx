import panel from "../../../../img/BannerImg/jewelry.jpg";

import { motion } from "framer-motion";
const buttonVariants = {
    click: {
      backgroundColor: "#414141",
      color: "#000",
      transition:{
        duration: 0.1
      }
    },
  };



const Jewelry = () => {
  return (
    <div className="grid grid-cols-12 mt-12">
      <img
        src={panel}
        alt=""
        className="col-span-12 h-[350px] w-full object-cover rounded-lg"
      />
      <div className="col-start-4 col-end-10 text-center mt-12">
        <h1>New Collection</h1>
        <p className="mt-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint saepe
          deserunt, similique corporis eveniet neque odit numquam cupiditate
          vero vel.
        </p>
        <motion.button variants={buttonVariants} whileTap='click' className="text-xl bg-tertiary text-quinary px-8 py-3 mt-4 rounded-full" >Check now</motion.button>
      </div>
    </div>
  );
};

export default Jewelry;
