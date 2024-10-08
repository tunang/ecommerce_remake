import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

// import store from "../../redux/store";

import { handleLogout } from "../../redux/Reducer/userReducer";
import { resetCart } from "../../redux/Reducer/cartReducer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {axiosTokenInstance} from "./CustomGetTokenAxios";

// let authTokens = localStorage?.getItem("AccessToken");
// let refreshToken = localStorage?.getItem("RefreshToken");

const axiosInstance = axios.create({
  baseURL: "https://ecom-server-fuq2.onrender.com",
  // headers: {Authorization: `Bearer ${authTokens}`},
});

let hasRetried = false;

const setupAxiosInterceptors = () => {
  const dispatch = useDispatch();

  axiosInstance.interceptors.request.use(
    async (req) => {
      console.log("Request interceptors ran");
      console.log(req);
      const AccessToken = localStorage.getItem("AccessToken");
      if (AccessToken) {
        req.headers.Authorization = `Bearer ${AccessToken}`;
      }
      console.log(req);
      return req;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (respond) => {
      console.log("Respond success");
      return respond;
    },
    async (err) => {
      console.log("Fail Respond interceptors ran");
      const { config, response } = err;
      const originalRequest = config;
      console.log()

      const RefreshToken = localStorage.getItem("RefreshToken");
      if (!RefreshToken) {
        // No refresh token, handle logout permanently
        console.log("check");
        toast.error("Your login session timed out");
        // dispatch(handleLogout());
        return Promise.reject(err); // Don't retry without a refresh token
      }

      const RefreshTokenExpire = jwtDecode(RefreshToken);
      const isRefreshTokenExpired = dayjs.unix(RefreshTokenExpire.exp).diff(dayjs()) < 1;
      console.table("isRefreshTokenExpired", isRefreshTokenExpired);
      // **Improved retry logic:** Use a dedicated retry flag for clarity
      // let hasRetried = false;
      if (isRefreshTokenExpired) {
        // Refresh token expired, handle permanent logout
        toast.error("Your login session timed out");
        dispatch(handleLogout());
        dispatch(resetCart());
        return Promise.reject(err); // Don't retry with an expired refresh token
      }

      const status = err.status || response?.status; // Handle potential undefined response object
      console.log(status);
      if (status === 500) {
        // Handle server errors (logout, reset cart, etc.)
        toast.error("Your login session timed out");
        dispatch(handleLogout());
        dispatch(resetCart());
      } 
      else if (status === 403) {
        console.log('error 403')
        // Handle authentication errors with token refresh
        // if (response.data.message === "Cant find") {
        //   console.log(1);
        //   dispatch(handleLogout());
        //   dispatch(resetCart());
        //   toast.error("Your login session timed out");
        //   return Promise.reject(err);
        // }

        if (!hasRetried) {
          hasRetried = true; // Mark the request as retried
          console.log("Old RefreshToken: ", RefreshToken);
          const newResponse = await axiosTokenInstance.post(
            "/api/auth/token",
            { refreshToken: RefreshToken }
          );

          console.log(newResponse.data.message);

          localStorage.setItem(
            "AccessToken",
            newResponse?.data.tokens.accessToken
          );
          localStorage.setItem(
            "RefreshToken",
            newResponse?.data.tokens.refreshToken
          );

          const updatedRequest = {
            ...originalRequest,
            headers: {
              ...originalRequest.headers,
              Authorization: `Bearer ${newResponse.data.tokens.accessToken}`,
            },
          };
          hasRetried = false;
          console.log(updatedRequest);
          const res = await axios(updatedRequest);
          return res; // Return the response from the retried request
        }
      }

      // console.log(originalRequest.headers.Authorization);
      return Promise.reject(err);
    }
  );
};

export { axiosInstance, setupAxiosInterceptors };
