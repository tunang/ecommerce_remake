import axios from "axios";
import { useDispatch } from "react-redux";

import { handleLogout } from "../../redux/Reducer/userReducer";
import { resetCart } from "../../redux/Reducer/cartReducer";
const axiosTokenInstance = axios.create({
    baseURL: "https://ecom-server-ymra.onrender.com",
    // headers: {Authorization: `Bearer ${authTokens}`},
    timeout: 60000,
  });

  const setupAxiosTokenInterceptors = () => {
    const dispatch = useDispatch();
  
    axiosTokenInstance.interceptors.request.use(
      async (req) => {
        return req;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  
    axiosTokenInstance.interceptors.response.use(
      (respond) => {
        console.log("Respond success");
        return respond;
      },
      async (err) => {
        console.log("Fail Respond interceptors ran");
        const { config, response } = err;
        const originalRequest = config;
  
        const status = err.status || response?.status; // Handle potential undefined response object
        console.log(status);
        if (status === 403) {
          // Handle authentication errors with token refresh
          console.log(response);
          console.log(
            response.data.message === "Cant find" ? "check" : "uncheck"
          );
          if (response.data.message === "Cant find") {
            console.log(1);
            dispatch(handleLogout());
            dispatch(resetCart());
            toast.error("Your login session timed out");
            return Promise.reject(err);
          }
        }
  
        return Promise.reject(err);
      }
    );
  };


  export  {axiosTokenInstance, setupAxiosTokenInterceptors};