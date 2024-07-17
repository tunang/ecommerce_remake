import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

// import store from "../../redux/store";

import { handleLogout } from "../../redux/Reducer/userReducer";
import { resetCart } from "../../redux/Reducer/cartReducer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// let authTokens = localStorage.getItem("AccessToken");
// let refreshToken = localStorage.getItem("RefreshToken");

const axiosInstance = axios.create({
  baseURL: "https://ecom-server-ymra.onrender.com",
  timeout: 60000,
});

const setupAxiosInterceptors = () => {
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  const onRequestSuccess = async (req) => {
    let authTokens = localStorage.getItem("AccessToken");
    req.headers.Authorization = `Bearer ${authTokens}`;

    const user = jwtDecode(authTokens);
    const isAccessTokenExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log("Access token het han: ", isAccessTokenExpired);
    if (!isAccessTokenExpired) {
      return req;
    }

    let refreshToken = localStorage.getItem("RefreshToken");

    const response = await axios.post(
      "https://ecom-server-ymra.onrender.com/api/auth/token",
      {
        refreshToken: refreshToken,
      }
    );
    localStorage.setItem("AccessToken", response.data.tokens.accessToken);
    localStorage.setItem("RefreshToken", response.data.tokens.refreshToken);
    req.headers.Authorization = `Bearer ${response.data.tokens.accessToken}`;
    req.headers["Content-Type"] = "application/json";
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
    if (status === 500) {
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

const setupAxiosInterceptors_ = () =>{
  axiosInstance.interceptors.request.use(
    async (req) =>{
      const AccessToken = localStorage.getItem("AccessToken");
      if(AccessToken){
        req.headers.Authorization = `Bearer ${AccessToken}`;
      }
      return req;
    },
    (error) => { Promise.reject(error) }
  )

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
    (res) => {return res},
    async (err) => {
      console.log(err)
      const { config, response} = err;
      const originalRequest = config;

      console.log(respond.status);

      if(response && response.status === 403 && !originalRequest._retry){
        if(!isRefreshing){
          try{
            const response = await axios.post(
              "https://ecom-server-ymra.onrender.com/api/auth/token",
              {
                refreshToken: refreshToken,
              }
            );
            localStorage.setItem("AccessToken", response.data.tokens.accessToken);
            localStorage.setItem("RefreshToken", response.data.tokens.refreshToken);
            req.headers.Authorization = `Bearer ${response.data.tokens.accessToken}`;
            isRefreshing = false;
            await onRefreshed(response.data.tokens.accessToken);
            return await axios(originalRequest);
          }
          catch(error){
            const dispatch = useDispatch();
            const navigate = useNavigate();
            isRefreshing(false);
            dispatch(handleLogout());
            dispatch(resetCart());
            return Promise.reject(error)

          }
          finally{
            failedQueue = [];
          }
        }


        originalRequest._retry = true;
            return new Promise((resolve, reject) => {
                subscribeTokenRefresh(async (token) => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    resolve(await axios(originalRequest));
                });
            });

      }
    }
  )

}

export { axiosInstance, setupAxiosInterceptors };
