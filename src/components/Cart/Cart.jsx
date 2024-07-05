// import axios from "axios";
import { getCart, updateCart } from "../../services/usersServices/CartService";
import axios from "../../services/axios/CustomAxiosWithHeader";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiH1 } from "react-icons/ri";
import { fetchCart } from "../../redux/Reducer/cartReducer";
import { TaskAbortError } from "@reduxjs/toolkit";

import { FaRegTrashCan } from "react-icons/fa6";

const sizechart = ["X", "S", "M", "XL"];

const Cart = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const cartState = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let initialValue = 0;
    cartState.products.forEach((product) => {
      initialValue += (product.price * product.qty);
      console.log(product.price * product.qty);
    })
    setTotal(initialValue);

  
  }, [cartState.products]);


  useEffect(() => {
    console.log("update cart")
    updateCart(cartState.products);
  })



  console.log(cartState.products)
  return (
    <>
      {userState.account.auth === true ? (
        <div className="grid grid-cols-12 gap-5">
          <div className="text-center col-span-12 border-b-2 border-quinary pb-4 mt-6">
            <h3 className="">Shopping cart</h3>
          </div>

          <div className="col-start-1 col-end-9 mt-6">
            <table className="w-full border-collapse">
              <tr className="border ">
                <td className="border  w-[50%]">
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

                <td className="border  w-[5%] text-center"></td>
              </tr>
              {cartState.products.map((product, index) => {
                return (
                  <tr>
                    <td className="border border-quinary">
                      <div className="flex ml-7">
                        <div>
                          <img src={product.thumbnail} alt="" />
                        </div>

                        <div className="flex flex-col justify-center">
                          <p className="font-medium">{product.title}</p>
                          <p>Size: {sizechart[product.size]}</p>
                          <p>{product.price}$</p>
                        </div>
                      </div>
                    </td>

                    <td className="border  text-center">
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

                    <td className="border  text-center">
                      <p>{product.price * product.qty}</p>
                    </td>

                    <td className="border text-center">
                      <FaRegTrashCan className="m-auto" />
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>

          <div className="col-start-9 col-end-13 mt-6 ">
            <div className="border-4 border-secondary p-6 rounded-2xl">
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

                <h3 className="mt-6">{total}$</h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Chua dang nhap</h1>
      )}
    </>
  );
};

export default Cart;
