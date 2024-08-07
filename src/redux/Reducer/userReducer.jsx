import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { loginApi } from "../../services/usersServices/UserService";
import { fetchCart } from "../../redux/Reducer/cartReducer";

import toast from "react-hot-toast";

const INITIAL_STATE = {
  account: { email: "", auth: false, token: "" },
  isLoading: false,
  isError: false,
};

export const fetchUser = createAsyncThunk(
  "fetchUser",
  async ({email, password}, thunkApi) => {
    // const res2 = await axios.get('https://ecom-server-ymra.onrender.com/api/auth/');
    // console.log(res2);
    // const res = await loginApi(email, password);
    const { data } = await loginApi(email, password);
    console.log(data);

    if (data && data.tokens) {
      localStorage.setItem("AccessToken", data.tokens.accessToken);
      localStorage.setItem("RefreshToken", data.tokens.refreshToken);
    }

    return { data, infomation: {email}};
  }
);

export const userReducer = createSlice({
  name: "user",
  initialState: {...INITIAL_STATE, account: {
    email: "",
    auth: localStorage.getItem("RefreshToken") !== null, // Check for RefreshToken
    token: localStorage.getItem("RefreshToken"),
  },},
  reducers: {
    handleLogout: (state, action) => {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");

      state.account.email = "";
      state.account.token = "";
      state.account.auth = false;

      // toast.success("Logout success");

    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.account.token = action.payload.data.tokens.refreshToken;
        state.account.email = action.payload.infomation.email;

        state.account.auth = true;
        state.isLoading = false;
        state.isError = false;

        toast.success("Login success");

      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.account.auth = false;
        state.isLoading = false;
        state.isError = true;

        toast.error("Wrong email or password");

      });
  },
});

export const { handleLogout } = userReducer.actions;

export default userReducer.reducer;
