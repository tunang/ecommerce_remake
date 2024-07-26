import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

// import store from "../../redux/store";

import { handleLogout } from "../../redux/Reducer/userReducer";
import { resetCart } from "../../redux/Reducer/cartReducer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// let authTokens = localStorage?.getItem("AccessToken");
// let refreshToken = localStorage?.getItem("RefreshToken");

const axiosInstance = axios.create({
  baseURL: "https://ecom-server-ymra.onrender.com",
  // headers: {Authorization: `Bearer ${authTokens}`},
  timeout: 60000,
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
      
      const RefreshToken = localStorage.getItem("RefreshToken");
      if (!RefreshToken) {
        // No refresh token, handle logout permanently
        console.log('check')
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

      if (status === 500) {
        // Handle server errors (logout, reset cart, etc.)
        toast.error("Your login session timed out");
        dispatch(handleLogout());
        dispatch(resetCart());
      } else if (status === 403) {
        // Handle authentication errors with token refresh
        console.log(response.data.message === 'Cant find' ? 'check' : 'uncheck');
        if(response.data.message === 'Cant find'){
          toast.error("Your login session timed out");
          dispatch(handleLogout());
          dispatch(resetCart());
          return Promise.reject(err)
        }

        

        if (!hasRetried) {
          hasRetried = true; // Mark the request as retried

          console.log("Old RefreshToken: ", RefreshToken);
          const newResponse = await axios.post(
            "https://ecom-server-ymra.onrender.com/api/auth/token",
            { refreshToken: RefreshToken }
          );

          // console.log("New access token: ", newResponse.data.tokens.accessToken);
          // console.log("New refresh token: ", newResponse.data.tokens.refreshToken);

          localStorage.setItem("AccessToken", newResponse.data.tokens.accessToken);
          localStorage.setItem("RefreshToken", newResponse.data.tokens.refreshToken);

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
          console.log(res);
          return res; // Return the response from the retried request
        }
      }

      console.log(originalRequest.headers.Authorization);
      return Promise.reject(err);
    }
  );
};


const setupAxiosInterceptors__ = () => {
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  const onRequestSuccess = async (req) => {
    req.headers["Content-Type"] = "application/json";
    authTokens = localStorage?.getItem("AccessToken");

    req.headers.Authorization = `Bearer ${authTokens}`;

    const user = jwtDecode(authTokens);
    const isAccessTokenExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log("Access token het han: ", isAccessTokenExpired);
    if (!isAccessTokenExpired) {
      return req;
    }

    // refreshToken = localStorage.getItem("RefreshToken");
    refreshToken = localStorage.getItem("RefreshToken");
    console.log("Refresh token: ", refreshToken);
    const response = await axios.post(
      "https://ecom-server-ymra.onrender.com/api/auth/token",
      {
        refreshToken: refreshToken,
      }
    );
    console.log(response);
    localStorage.setItem("AccessToken", response.data.tokens.accessToken);
    localStorage.setItem("RefreshToken", response.data.tokens.refreshToken);
    req.headers.Authorization = `Bearer ${response.data.tokens.accessToken}`;
    return req;
  };
  const onRequestFail = (error) => {
    console.log("request error", error);
    return Promise.reject(error);
  };
  axiosInstance.interceptors.request.use(onRequestSuccess, onRequestFail);

  const onResponseSuccess = (response) => {
    // console.log("response success", response);
    return response;
  };

  const onResponseFail = (error) => {
    console.log("response error", error);
    const status = error.status || error.response.status;
    if (status === 500 || status === 403) {
      // status === 403 || status === 401 ||
      toast.error("Your loggin session timeout");
      dispatch(handleLogout());
      dispatch(resetCart());
    }
    return Promise.reject(error);
  };
  axios.interceptors.response.use(onResponseSuccess, onResponseFail);
};

let isRefreshing = false;
let failedQueue = [];

const setupAxiosInterceptors_ = () => {
  axiosInstance.interceptors.request.use(
    async (req) => {
      const AccessToken = localStorage.getItem("AccessToken");
      if (AccessToken) {
        req.headers.Authorization = `Bearer ${AccessToken}`;
      }
      return req;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  async function subscribeTokenRefresh(cb) {
    failedQueue.push(cb);
  }

  async function onRefreshed(token) {
    for (const cb of failedQueue) {
      await cb(token);
    }
    failedQueue = [];
  }

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      console.log(err);
      const { config, response } = err;
      const originalRequest = config;

      // console.log(respond.status);

      if (response && response.status === 403 && !originalRequest._retry) {
        if (!isRefreshing) {
          try {
            const response = await axios.post(
              "https://ecom-server-ymra.onrender.com/api/auth/token",
              {
                refreshToken: refreshToken,
              }
            );
            localStorage.setItem(
              "AccessToken",
              response.data.tokens.accessToken
            );
            localStorage.setItem(
              "RefreshToken",
              response.data.tokens.refreshToken
            );
            req.headers.Authorization = `Bearer ${response.data.tokens.accessToken}`;
            isRefreshing = false;
            await onRefreshed(response.data.tokens.accessToken);
            return await axios(originalRequest);
          } catch (error) {
            const dispatch = useDispatch();
            const navigate = useNavigate();
            isRefreshing(false);
            dispatch(handleLogout());
            dispatch(resetCart());
            return Promise.reject(error);
          } finally {
            failedQueue = [];
          }
        }

        originalRequest._retry = true;
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh(async (token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(await axios(originalRequest));
          });
        });
      }
    }
  );
};

export { axiosInstance, setupAxiosInterceptors };
