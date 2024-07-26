// import axios from "axios";
// import axios from "../../services/axios/CustomAxiosWithHeader";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TaskAbortError } from "@reduxjs/toolkit";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { FaRegTrashCan } from "react-icons/fa6";
import { RiH1 } from "react-icons/ri";
import { delCart, fetchCart } from "../../redux/Reducer/cartReducer";
import { getCart, updateCart } from "../../services/usersServices/CartService";
import NotAuth from "../Loading/NotAuth";

const sizechart = ["X", "S", "M", "XL"];

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const cartState = useSelector((state) => state.cart);

  const { scrollY } = useScroll();

  const handleTrashIconButton = (productId) => {
    dispatch(delCart(productId));
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if(userState.account.auth){
      updateCart(cartState.products);
  
      let initialValue = 0;
      cartState.products.forEach((product) => {
        initialValue += product.price * product.qty;
      });
      setTotal(initialValue);
    }
  }, [cartState.products]);

  useEffect(() => {
    if(userState.account.auth){
      dispatch(fetchCart());
    }
  }, []);


  return (
    <>
      {userState.account.auth === true ? (
        <div className="grid grid-cols-12 gap-5">
          <div className="text-center col-span-12 border-b-2 border-quinary pb-4 mt-6">
            <h3 className="">Shopping cart</h3>
          </div>

          <div className="col-start-1 col-end-13 md:col-end-9 mt-6">
            <table className="w-full border-collapse">
              <tr className="hidden md:table-row-group border">
                <td className="border w-[50%]">
                  <p className="text-xl font-semibold leading-[60px] ml-7">
                    Product
                  </p>
                </td>
                <td className="border  w-[25%] text-center">
                  <p className="text-xl font-semibold">Quantity</p>
                </td>
                <td className="border  w-[20%] text-center">
                  <p className="text-xl font-semibold">Total</p>
                </td>

                <td className="border w-[5%] text-center"></td>
              </tr>
              {cartState.products.map((product, index) => {
                return (
                  <tr>
                    <td className="border border-quinary mx-7">
                      <div className="flex flex-col mb-4">
                        <div className="flex">
                          <div>
                            <img className="h-[250px] md:h-full object-cover" src={product.thumbnail} alt="" />
                          </div>

                          <div className="flex flex-col justify-around md:justify-center">
                            <div>
                              <p className="font-medium">{product.title}</p>
                              <p>Size: {sizechart[product.size]}</p>
                              <p>{product.price}$</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex md:hidden items-center justify-around">
                          <div className="text-center">
                            <button className=" w-8 leading-[32px] border-y-2 border-l-2 ">
                              -
                            </button>
                            <button className=" w-8 leading-[32px] border-2 ">
                              {product.qty}
                            </button>
                            <button className=" w-8 leading-[32px] border-y-2 border-r-2 ">
                              +
                            </button>
                          </div>

                          <div className="text-center">
                            <p>{product.price * product.qty}</p>
                          </div>

                          <div className="text-center">
                            <FaRegTrashCan
                              onClick={() => handleTrashIconButton(product.id)}
                              className="m-auto"
                            />
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="hidden md:table-cell border text-center">
                      <button className=" w-8 leading-[32px] border-y-2 border-l-2 ">
                        -
                      </button>
                      <button className=" w-8 leading-[32px] border-2 ">
                        {product.qty}
                      </button>
                      <button className=" w-8 leading-[32px] border-y-2 border-r-2 ">
                        +
                      </button>
                    </td>

                    <td className="hidden md:table-cell border text-center">
                      <p>{product.price * product.qty}</p>
                    </td>

                    <td className="hidden md:table-cell border text-center">
                      <FaRegTrashCan
                        onClick={() => handleTrashIconButton(product.id)}
                        className="m-auto"
                      />
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>

          <motion.div
            className={`static col-start-1 md:col-start-9 col-end-13 mt-6`}
          >
            <div className="border-4 border-secondary p-6">
              <h2 className="font-normal">Paycheck</h2>

              {cartState.products.map((product, index) => {
                return (
                  <div>
                    <div className="flex justify-between">
                      <div>
                        <p>
                          {product.title} - {sizechart[product.size]}{" "}
                        </p>
                        <p className="font-extralight italic">
                          {product.price}$ - Qty: {product.qty}
                        </p>
                      </div>
                      <p>{product.price * product.qty}$</p>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between">
                <h3 className="mt-6">Total: </h3>

                <h3 className="mt-6">{total.toFixed(2)}$</h3>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/checkout")}
                className="w-full text-xl text-white bg-quaternary py-3 mt-2"
              >
                Check out
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <NotAuth />
      )}
    </>
  );
};

export default Cart;
