// import axios from "../../services/axios/CustomAxiosWithHeader";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { fetchCart, resetCart } from "../../redux/Reducer/cartReducer";
import { createOrder } from "../../services/usersServices/OrderServices";
import { updateCart } from "../../services/usersServices/CartService";

const sizechart = ["X", "S", "M", "XL"];

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const cartState = useSelector((state) => state.cart);

  const [name, setname] = useState("");
  const [email, setemail] = useState(userState.account.email);
  const [phonenumber, setphonenumber] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [province, seteprovince] = useState("");
  const [detail, setdetail] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  const [checkOutStatus, setCheckOutStatus] = useState(false);

  const [total, setTotal] = useState(0);

  console.log(paymentOption);

  useEffect(() => {
    let initialValue = 0;
    cartState.products.forEach((product) => {
      initialValue += product.price * product.qty;
      console.log(product.price * product.qty);
    });
    setTotal(initialValue);
  }, [cartState.products]);

  useEffect(() => {
    console.log("update cart");
    dispatch(fetchCart());
  }, []);

  const handleCheckOutButton = async () =>{
    setCheckOutStatus(true);
    await createOrder({products: cartState.products,country, city, province, detail, phonenumber, paymentOption, name, email })
    setCheckOutStatus(false);
    dispatch(resetCart());
    await updateCart([]);
    navigate('/')
  }
  return (
    <>
      {userState.account.auth === true ? (
        <div className="grid grid-cols-12 gap-5">
          <div className="text col-span-12 border-b-2 border-quinary pb-4 mt-6">
            <h3 className="">Checkout</h3>
          </div>

          <div className="col-start-1 col-end-4">
            <h4 className="font-light mb-2">Order infomation</h4>
            {/* <p className="mb-2">Email: {userState.account.email}</p> */}

            <div className="">
              <input
                className="w-full bg-quinary p-2 mt-[2px] rounded-md"
                type="text"
                placeholder="Name"
                value={email}
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            <div className="mt-1">
              <input
                className="w-full bg-quinary p-2 mt-[6px] rounded-md"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-1">
              <input
                className="w-full bg-quinary p-2 mt-[6px] rounded-md"
                type="text"
                placeholder="Phone number"
                value={phonenumber}
                onChange={(e) => setphonenumber(e.target.value)}
              />
            </div>

            <div className="mt-1">
              <input
                className="w-full bg-quinary p-2 mt-[6px] rounded-md"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setcountry(e.target.value)}
              />
            </div>

            <div className="mt-1">
              <input
                className="w-full bg-quinary p-2 mt-[6px] rounded-md"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setcity(e.target.value)}
              />
            </div>

            <div className="mt-1">
              <input
                className="w-full bg-quinary p-2 mt-[6px] rounded-md"
                type="text"
                placeholder="Province"
                value={province}
                onChange={(e) => seteprovince(e.target.value)}
              />
            </div>

            <div className="mt-1">
              <input
                className="w-full bg-quinary p-2 mt-[6px] rounded-md"
                type="text"
                placeholder="Detail address"
                value={detail}
                onChange={(e) => setdetail(e.target.value)}
              />
            </div>
          </div>

          <div className="col-start-4 col-end-9 ml-12">
            <h4 className="font-light mb-2">Payment</h4>

            <div className="flex flex-col">
              <div className="flex align-middle border-2 w-fit px-8 py-4">
                <input
                  className="w-6 h-6"
                  type="radio"
                  id="payment"
                  name="drone"
                  value="CASH"
                  checked={paymentOption === "CASH"}
                  onChange={(e) => setPaymentOption(e.target.value)}
                />
                <label className="ml-6" for="huey">
                  Cash on delivery (COD)
                </label>
              </div>

              <div className="flex align-middle border-2 w-1/2 px-8 py-4 mt-2">
                <input
                  className="w-6 h-6"
                  type="radio"
                  id="payment"
                  name="drone"
                  value="CARD"
                  checked={paymentOption === "CARD"}
                  onChange={(e) => setPaymentOption(e.target.value)}
                />
                <label className="ml-6" for="dewey">
                  Debit card
                </label>
              </div>
            </div>
          </div>

          <motion.div className={`static col-start-9 col-end-13 mt-6`}>
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

                <h3 className="mt-6">{total}$</h3>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => handleCheckOutButton()}
                className="w-full text-xl text-white bg-quaternary py-3 mt-2"
              >
                Check out
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <h1>Chua dang nhap</h1>
      )}
    </>
  );
};

export default CheckOut;
