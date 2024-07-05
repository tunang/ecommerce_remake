import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

let authTokens = localStorage.getItem("AccessToken");
let refreshToken = localStorage.getItem("RefreshToken");

const axiosInstance = axios.create({
  baseURL: "https://ecom-server-ymra.onrender.com",
  // headers: { Authorization: `Bearer ${authTokens}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  authTokens = localStorage.getItem("AccessToken");
  req.headers.Authorization = `Bearer ${authTokens}`;

  const user = jwtDecode(authTokens);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  console.log("Het han: ", isExpired);
  if (!isExpired) {
    return req;
  }

  let refreshToken = localStorage.getItem("RefreshToken");
  const response = await axios.post(
    "https://ecom-server-ymra.onrender.com/api/auth/token",{
      refreshToken: refreshToken
    }
  );
  localStorage.setItem('AccessToken', response.data.tokens.accessToken);
  localStorage.setItem('RefreshToken', response.data.tokens.refreshToken);
  req.headers.Authorization = `Bearer ${response.data.tokens.accessToken}`;
  req.headers["Content-Type"] = 'application/json';

  return req;
});

export default axiosInstance;
