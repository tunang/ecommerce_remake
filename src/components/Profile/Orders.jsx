import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getOrders } from "../../services/usersServices/OrderServices";

import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import CircleLoading from "../Loading/CircleLoading";

const sizechart = ["X", "S", "M", "XL"];


const buttonVariant = {
    hover: {
        textDecoration: 'underline 1px solid #010101'
    }
}


const Orders = () => {
  const [orders, setOrders] = useState(getOrders());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders); // Update state with fetched data
      setLoading(false);
    };

    fetchOrders();
    
  }, []);

  // const {orders, loading, error} = getOrders();

  // console.log(orders);


  return (
    <>
    <div className="mt-8 col-span-6">
    {loading && <CircleLoading />}
      {orders?.data?.userOrders.map((order, index) => {
        return (
          <div className="border-2 border-quinary mb-4 px-4 py-2">
            <div className="flex justify-between">
              <p className="font-light italic">
                #{index} - order ID: {order._id}
              </p>

              <div className="flex flex-col">
                <motion.div variants={buttonVariant} whileHover='hover' className="flex cursor-pointer">
                  <button>
                    <FaRegTrashCan />
                  </button>
                  <p className="ml-1">Delete</p>
                </motion.div>

                <motion.div variants={buttonVariant} whileHover='hover' className="flex cursor-pointer">
                  <button className="">
                    <FaRegEye />
                  </button>
                  <p className="ml-1">View</p>
                </motion.div>
              </div>
            </div>

            <div className="">
                {order.products.map((product, index) => {
                    return <div className="">
                        <p>{product.title} -SZ: {sizechart[product.size]} - Qty: {product.qty}</p>
                    </div>
                })}
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default Orders;
