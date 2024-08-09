import img1 from "../../../../img/BannerImg/man.jpeg";
import img2 from "../../../../img/BannerImg/woman.jpg";
import img3 from "../../../../img/BannerImg/man.jpeg";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

const ImgUrls = [img1, img2, img3];
const tags = ['Men', 'Women', 'Jewelry']


const buttonVariants = {
    click: {
      backgroundColor: "#414141",
      color: "#000",
      transition: {
        duration: 0.1
      }
    },
  };
const Category = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-12 gap-5 mt-12">
      {ImgUrls.map((ImgUrl, index) => {
        return (
          <div className="relative col-span-12 lg:col-span-4" key={index}>
            <img src={ImgUrl} alt="" className="relative w-full h-[350px] lg:h-[500px] object-cover rounded-2xl"/>
            <div className="absolute top-[70%] left-[3%]">
              <p className=" text-4xl md:text-5xl text-white pb-1">{tags[index]}</p>
              <motion.button onClick={() => navigate('/men') } variants={buttonVariants} whileTap='click' className=" text-3xl text-white bg-tertiary px-10 py-2 rounded-full ">See detail</motion.button>

            </div>
            
          </div>
        );
      })}
    </div>
  );
};

export default Category;
