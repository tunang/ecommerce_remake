import axiosInstance from "../axios/CustomAxiosWithHeader";

const getOrders = async () => {
    const res = await axiosInstance.get('/api/order');
    // console.log(res);
    return res;
  };

  export {getOrders};