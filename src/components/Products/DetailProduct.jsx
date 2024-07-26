import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { RiWeightLine } from "react-icons/ri";
import { RxDimensions } from "react-icons/rx";

import { updateCart } from "../../services/usersServices/CartService";
import fetchProducts from "../../services/usersServices/ProductsService";
import { addCart } from "../../redux/Reducer/cartReducer";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import CircleLoading from "../Loading/CircleLoading";
const sizeChart = ['X','S','M','XL']


const AddToCartButtonVariants = {
    click: {
        backgroundColor: "#FFFFFF",
        color: "#000",
        transition: {
          duration: 0,
        },
    },
}



const DetailProduct = () => {

  const dispatch = useDispatch();
  
  const { id } = useParams();
  
  const userState = useSelector((state) => state.user)
  const cartState = useSelector((state) => state.cart);

  const { products: product, loading, error } = fetchProducts(`/${id}`);

  const [Index, setIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(-1);
  const [total, setTotal] = useState(1);
  

  function handleRight(event) {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    if (Index === product.images.length - 1) {
      setIndex(0);
    } else {
      setIndex(Index + 1);
    }
  }

  function handleLeft(event) {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    if (Index === 0) {
      setIndex(product.images.length - 1);
    } else {
      setIndex(Index - 1);
    }
  }

  const addProductToCart = () => {
    if(userState.account.auth){
      if(sizeIndex >= 0){
        dispatch(addCart({product, sizeIndex, total}));
        toast.success('Added')
      }
      else{
        toast.error("Didn't choose size")
      }
    }
    else{
      toast.error("Didn't login")
    }
  }

  useEffect(() => {
    if(userState.account.auth){
      console.log("update cart")
      updateCart(cartState.products);
  }
  },[cartState.products])

  return (
    <>
      {loading ? <CircleLoading /> :
      <div className="grid grid-cols-12 gap-5 lg:pt-12">

        {/* Handle Image */}
        <div className="col-start-1 col-end-13 lg:col-start-2 lg:col-end-7 flex relative w-full h-full overflow-hidden border border-quinary">
          {product?.images?.map((image, index) => {
            return (
              <div
                className="w-full h-full shrink-0 grow-0 transition duration-500"
                style={{ transform: `translateX(${-Index * 100}%)` }}
              >
                <img
                  className="w-full h-full object-cover rounded"
                  src={image}
                  alt=""
                />
              </div>
            );
          })}
          <FaChevronLeft
            onClick={(e) => handleLeft(e)}
            className="absolute h-full left-0 top-0 w-12 pl-5 text-black cursor-pointer "
          />
          <FaChevronRight
            onClick={(e) => handleRight(e)}
            className="absolute h-full top-0 right-0 w-12 pr-5 text-black cursor-pointer"
          />
        </div>


        {/* Handle Information */}
        <div className="col-start-1 col-end-13 lg:col-start-7 lg:col-end-12 lg:ml-12 mt-4"> 
            <div className=" border-b-2 border-quinary pb-2">
                <h1 className="font-normal">{product.title}</h1>
                <h4 className="mt-4">{product.price}$</h4>
            </div>

            <div className="mt-4">
                <h4 className="font-normal">Brand: {product.brand}</h4>
                <p className="font-light italic mt-2">{product.description}</p>

            </div>

            <div className="mt-2">
                <div className="flex items-center mt-2">
                    <RiWeightLine className="inline w-8 h-8 " />
                    <p className="text-xl mt-1 ml-3">{product.weight}</p>
                </div>
                <div className="flex items-center mt-2">
                    <RxDimensions className="inline w-8 h-8 " />
                    <p className="text-xl mt-1 ml-3">{product?.dimensions?.width} x </p>
                    <p className="text-xl mt-1 ml-3">{product?.dimensions?.height} x </p>
                    <p className="text-xl mt-1 ml-3">{product?.dimensions?.depth}</p>
                </div>
            </div>

            {/* Size information */}
            <div className="mt-6">
                <h4 className="font-normal mb-2">Size</h4>
                {sizeChart.map((size, index) => { 
                    return <button className={`text-2xl w-12 h-12 mr-3 border-2 ${index === sizeIndex ? 'border-primary' : ''}`} onClick={() => setSizeIndex(index)}>{size}</button>
                })}
            </div>

            <div className="hidden lg:flex mt-6 justify-between">
                <div className="basis-[25%] ">
                    <button className="text-xl w-12 leading-[48px] border-y-2 border-l-2 border-primary" onClick={() => total === 1 ? setTotal(1) : setTotal(total - 1)}>-</button>
                    <button className="text-xl w-12 leading-[48px] border-2 border-primary">{total}</button>
                    <button className="text-xl w-12 leading-[48px] border-y-2 border-r-2 border-primary" onClick={() => setTotal(total + 1)}>+</button>
                </div>


                <motion.button variants={AddToCartButtonVariants} whileTap='click' className="text-xl text-quinary bg-primary font-medium basis-[60%] leading-[48px] border-2 border-primary" onClick={() => addProductToCart()} >Add to cart</motion.button>
                
                <button className=" text-3xl basis-[10%] leading-[48px] border-2 border-primary"><IoHeartOutline className="m-auto" /></button>
            </div>

            <div className="lg:hidden flex-wrap mt-6 justify-between">

                <h4 className=" font-normal mb-2">Quantity</h4>
                <div className="basis-[25%] ">
                    <button className="text-xl w-12 leading-[48px] border-y-2 border-l-2 border-primary" onClick={() => total === 1 ? setTotal(1) : setTotal(total - 1)}>-</button>
                    <button className="text-xl w-12 leading-[48px] border-2 border-primary">{total}</button>
                    <button className="text-xl w-12 leading-[48px] border-y-2 border-r-2 border-primary" onClick={() => setTotal(total + 1)}>+</button>
                </div>

                <div className="flex justify-between mt-4">
                  <motion.button variants={AddToCartButtonVariants} whileTap='click' className="text-xl text-quinary bg-primary font-medium basis-[90%] leading-[48px] border-2 border-primary" onClick={() => addProductToCart()} >Add to cart</motion.button>
                  
                  <button className=" text-3xl w-16 leading-[48px] border-2 border-primary"><IoHeartOutline className="m-auto" /></button>
                </div>
            </div>
        </div>
        
      </div>
    }
    </>
  );
};

export default DetailProduct;
