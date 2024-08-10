import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

// import store from "../../redux/store";

import { handleLogout } from "../../redux/Reducer/userReducer";
import { resetCart } from "../../redux/Reducer/cartReducer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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