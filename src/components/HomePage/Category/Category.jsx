import img1 from "../../../../img/BannerImg/man.jpeg";
import img2 from "../../../../img/BannerImg/man.jpeg";
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
          <div className="relative col-span-12" key={index}>
            <img src={ImgUrl} alt="" className="relative w-full h-[100px] lg:h-[500px] object-cover rounded-2xl"/>
            <p className="absolute text-4xl lg:text-5xl text-white top-[70%] left-[3%]">{tags[index]}</p>
            <motion.button onClick={() => navigate('/men') } variants={buttonVariants} whileTap='click' className="absolute top-[82%] left-[3%] text-3xl text-white bg-tertiary px-10 py-2 rounded-full ">See detail</motion.button>
            
          </div>
        );
      })}
    </div>
  );
};

export default Category;
