import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { addFavoriteProduct } from "../../redux/Reducer/favoriteReducer";
import toast from "react-hot-toast";
import { updateFavoriteList } from "../../services/usersServices/FavoriteService";
import { useEffect, useState } from "react";

const buttonVariants = {
  hidden: {
    x: "-50%",
    y: -10,
    opacity: 0,
  },

  visible: {
    x: "-50%",
    y: 0,
    opacity: 1,
    transition: {},
  },

  hover:{
    scale: 1.1
  },

  click: {
    backgroundColor: "#FFFFFF",
    color: "#000",
    transition: {
      duration: 0.1,
    },
  },
};

const imageVariants = {
  visible: {
    x: 0,
    opacity: 1,
  },

  hover: {
    x: 0,
    opacity: 0.5,
    scale: 1.1,
  },
};

const iconVariants = {
  hidden: {
    x: -10,
    opacity: 0,
  },

  visible: {
    x: 0,
    opacity: 1,
  },

  hover: {
    scale: 1.3,
  },
};

const ProductBox = ({ product, index, productIndex, setProductIndex }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const userState = useSelector((state) => state.user);
  const favoriteProductsState = useSelector((state) => state.favoriteProducts)

  const favProductsId = useState([]);


  useEffect(() => {
    favoriteProductsState.products.map((product, index) => {
      
    },[favoriteProductsState.products])
  })
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddCartButton = (product, event) => {
    if (event && event.stopPropagation) {
        event.stopPropagation();
    }
    // dispatch(handleFavButtonRedux(film));
}

  const handleHeartButton = (event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

      if(userState.account.auth){
        dispatch(addFavoriteProduct(product));
        updateFavoriteList(favoriteProductsState.products);
        toast.success('Added')
      }
      else{
        toast.error('Login first');
      }
  };

  return (
    <div
      // border-2 border-tertiary
      className="relative col-span-6 md:col-span-4 lg:col-span-3 w-full bg-white"
      onClick={() => handleClick()}
      onMouseOver={() => setProductIndex(index)}
      onMouseLeave={() => setProductIndex("")}
    >
      <motion.img
        variants={imageVariants}
        initial="visible"
        animate={index === productIndex ? "hover" : ""}
        exit="visible"
        className="relative min-h-[400px] w-full object-none overflow-hidden cursor-pointer"
        src={product.thumbnail}
        alt=""
      />

      <AnimatePresence>
        {index === productIndex ? (
          <>
            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileTap="click"
              whileHover='hover'
              exit="hidden"
              className="absolute top-[40%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-quinary bg-tertiary px-4 py-2 rounded-full cursor-pointer"
            >
              View detail
            </motion.button>

            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover='hover'
              whileTap="click"
              exit="hidden"

              onClick={(e) => { handleAddCartButton(product, e) }}
              className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-quinary bg-tertiary px-4 py-2 rounded-full cursor-pointer"
            >
              Add to cart
            </motion.button>
          </>
        ) : (
          ""
        )}
      </AnimatePresence>

      
      <motion.i
        variants={iconVariants}
        initial="hidden"
        whileHover="hover"
        whileInView="visible"
        className="absolute top-[10%] left-[3%]"
        onClick={(e) => handleHeartButton(e)}
      >
        <IoHeartOutline className="w-8 h-8" />
      </motion.i>

      <div className="flex flex-col justify-center ">
        <h4>{product.title}</h4>
        <p>{product.price}$</p>
      </div>

      {/* <p>{product.description}</p> */}
    </div>
  );
};

export default ProductBox;
