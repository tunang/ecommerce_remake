import {axiosInstance} from '../axios/CustomAxiosWithHeader';
// import axios from "axios";

const getCart = async () => {
  const res = await axiosInstance.get('/api/cart');
  console.log(res.data.cart.products);
  return res;
};

const createCart = async () => {
  const res = await axiosInstance.post('/api/cart');
  return res;
};



const updateCart = async (products) => {
  const test = {
    products: [...products]
  }
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: '/api/cart',
    headers: { 
      
    },
    data: test
  };

  const res = await axiosInstance.request(config);
  return res;
}

export {createCart, getCart, updateCart };
