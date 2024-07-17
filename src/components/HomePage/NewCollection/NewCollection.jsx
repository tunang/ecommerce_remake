import fetchProducts from "../../../services/usersServices/ProductsService";

import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ProductBox from "../../Products/ProductBox";
import CircleLoading from "../../Loading/CircleLoading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const buttonVariants = {
  hover: {
    backgroundColor: "#414141",
    color: "#D8D8D8",
  },
};

const NewCollection = () => {
  let [isHover, setIsHover] = useState(false);
  let [productIndex, setProductIndex] = useState("");
  const {
    products: newProducts,
    loading,
    error,
  } = fetchProducts("/category/mens-shirts?limit=4");

  // console.log(newProducts);

  return (
    <>
      {loading && <CircleLoading />}
      <div>
        <div className="grid grid-cols-12 gap-5 pt-12">
          <div className="flex flex-col items-center col-start-1 col-end-13 lg:col-start-3 lg:col-end-11 ">
            <h1>New Collection</h1>
            <p className="pt-2 text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint
              saepe deserunt, similique corporis eveniet neque odit numquam
              cupiditate
            </p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5 pt-12">
            {newProducts?.products?.map((product, index) => {
              return (
                <div className="col-span-12 md:col-span-6 lg:col-span-3">
                  <ProductBox
                    product={product}
                    index={index}
                    productIndex={productIndex}
                    setProductIndex={setProductIndex}
                  />
                </div>
              );
            })}
        </div>

        <div className="text-center">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className="mt-7 border-2 border-tertiary px-4 py-2"
          >
            View more
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default NewCollection;
