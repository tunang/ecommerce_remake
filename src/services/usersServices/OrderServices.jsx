import {axiosInstance} from "../axios/CustomAxiosWithHeader";

import { useState, useEffect } from "react";

const getOrders = async () => {
    const res = await axiosInstance.get('/api/order');
    console.log(res);
    return res;

    // const [orders, setOrders] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');

    // let getOrders = async() => {
    //     try{
    //         setLoading(true);
    //         const res = await axiosInstance.get('/api/order');
    //         setOrders(res.data.userOrders);
    //         setLoading(false);
    //     }
    //     catch(err){
    //         setError(err.message);
    //     }
    // }

    // useEffect(() => {
    //     getOrders();
    // }, []);

    // return { orders, loading, error };
  };


  const createOrder = async ({products, country, city, province, detail, phonenumber, paymentOption, name, email }) => {
    console.log
    
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

  export {getOrders, createOrder};