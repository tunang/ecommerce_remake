import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { deleteOrder, getOrders } from "../../services/usersServices/OrderServices";

import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import CircleLoading from "../Loading/CircleLoading";

const sizechart = ["X", "S", "M", "XL"];


const orderDetailsVariant = {
  hidden: { opacity: 1,},
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3, stiffness: 0 } },
};

const buttonVariant = {
  hover: {
    textDecoration: 'underline 1px solid #010101'
  }
}


const Orders = () => {
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);

  // const {orders, loading, error} = getOrders();
  
  const handleDeleteOrderButton = async (order, event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    await deleteOrder(order._id);
    window.location.reload();

  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { orders, loading, error } = await getOrders();
  //     setOrders(orders);
  //     setLoading(loading);
  //   };
  //   fetchData();
  // }, []); 

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders); // Update state with fetched data
      setLoading(false);
    };

    fetchOrders();
    
  }, []);


  // console.log(orders);


  return (
    <>
    <div className="mt-8 col-span-12 lg:col-span-6">
    {loading && <CircleLoading />}
      {orders?.data?.userOrders.map((order, index) => {
        return (
          <motion.div onClick={() => order._id === selectedOrderId ? setSelectedOrderId('') : setSelectedOrderId(order._id)} className=" border-2 border-quinary mb-4 px-4 py-2">
            <div className="flex justify-between">
              <p className="font-light italic">
                #{index} - order ID: {order._id}
              </p>

              <div className="flex flex-col">
                <motion.div onClick={(e) => {handleDeleteOrderButton(order ,e)}} variants={buttonVariant} whileHover='hover' className="flex cursor-pointer">
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
            {
              order._id === selectedOrderId ? 
            <div className="mt-4 border-t-2 border-dashed border-quinary">
                  <p className="mt-2">Payment: {order.payment}</p>
                  <p>Address: {order.address.country} - {order.address.city} - {order.address.province}</p>
                  <p>Detail address: {order.address.detail}</p>
                  <p>Phone number: {order.phonenumber}</p>

            </div>
            : ''
            }
          </motion.div>
        );
      })}
    </div>
    </>
  );
};

export default Orders;
