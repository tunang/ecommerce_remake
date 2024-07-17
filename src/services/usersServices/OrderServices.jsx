import {axiosInstance} from "../axios/CustomAxiosWithHeader";
import { useState, useEffect } from "react";

const getOrders = async () => {
    const res = await axiosInstance.get('/api/order');
    console.log(res);
    return res;

    // const [orders, setOrders] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');

    // let getOrders = async () => {
    //     try{
    //         setLoading(true);
    //         const res = await axiosInstance.get('/api/order');
    //         setOrders(res);
    //         console.log(res);
    //         setLoading(false);
    //     }
    //     catch(err){
    //         setError(err.message);
    //     }
    // }

    // useEffect(() => {
    //     getOrders();
    // }, []);

    // return {orders, loading, error};
  };


  const createOrder = async ({products, country, city, province, detail, phonenumber, paymentOption, name, email }) => {
    

    const orderData = {
      products: [...products],
      address:{
        country : country,
        city : city,
        province : province,
        detail : detail,
        payment: paymentOption
      },
      phonenumber : phonenumber,
      name : name,
      email : email,
      
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/api/order',
      headers: { 
        
      },
      data: orderData
    };
   
    const res = await axiosInstance.request(config);
    
    return res;
  }

  const deleteOrder = async(id) => {
    console.log(id);
    const res = await axiosInstance.delete(`/api/order/${id}`);
    return res;
  }

  export {getOrders, createOrder, deleteOrder};