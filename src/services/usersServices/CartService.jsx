import axiosInstance from '../axios/CustomAxiosWithHeader';
// import axios from "axios";


const createCart = async () => {
  const res = await axiosInstance.post('/api/cart');
  return res;
};

const getCart = async () => {
  const res = await axiosInstance.get('/api/cart');
  return res;
};


const updateCart = async (products) => {
  const test = {
    products: [...products]
  }
  console.log(test);
  // let data = JSON.stringify(products);
  // console.log(data);
  // let data = JSON.stringify(test);
  // console.log(data);
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: '/api/cart',
    headers: { 
      'Content-Type': 'application/json', 
    },
    data: test
  };

  const res = await axiosInstance.request(config);
  return res;
}

export { getCart, updateCart };
