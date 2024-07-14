import { axiosInstance } from "../axios/CustomAxiosWithHeader";


const getFavoriteList = async () => {
  const res = await axiosInstance.get('/api/favorite')
  console.log(res);
  return res;
};

const createFavoriteList = async () => {
  const res = await axiosInstance.post("/api/favorite");
  return res;
};

const updateFavoriteList = async (products) => {
  const test = {
    products: [...products],
  };
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: "/api/favorite",
    headers: {},
    data: test,
  };

  const res = await axiosInstance.request(config);
  return res;
};

export { getFavoriteList, createFavoriteList, updateFavoriteList };
