// setupAxiosInterceptors();

// axiosInstance.interceptors.request.use(async (req) => {
//   let authTokens = localStorage.getItem("AccessToken");
//   req.headers.Authorization = `Bearer ${authTokens}`;

//   const user = jwtDecode(authTokens);
//   const isAccessTokenExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
//   console.log("Access token het han: ", isAccessTokenExpired);
//   if (!isAccessTokenExpired) {
//     return req;
//   }

//   let refreshToken = localStorage.getItem("RefreshToken");

//   const response = await axios.post(
//     "https://ecom-server-ymra.onrender.com/api/auth/token",
//     {
//       refreshToken: refreshToken,
//     }
//   );
//   localStorage.setItem("AccessToken", response.data.tokens.accessToken);
//   localStorage.setItem("RefreshToken", response.data.tokens.refreshToken);
//   req.headers.Authorization = `Bearer ${response.data.tokens.accessToken}`;
//   req.headers["Content-Type"] = "application/json";
//   return req;
// });