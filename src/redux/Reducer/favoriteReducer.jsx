import toast from "react-hot-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getFavoriteList } from "../../services/usersServices/FavoriteService";

const INITIAL_STATE = {
    products: [],
    isLoading: false,
    isError: false,
};

export const fetchFavoriteList = createAsyncThunk(
    "fetchFavoriteList",
    async (_, thunkApi) => {
      const data  = await getFavoriteList();
    //   console.log(data);
      return { data };
    }
  );



const cartReducer = createSlice({
    name: 'favoriteList',
    initialState: INITIAL_STATE,
    reducers: {
        addFavoriteProduct: (state, action) => {
            const respond = action.payload;
            console.log(respond)

            // mutation
            const exist = state.products.find((x) => {
                return x.id === respond.id;
            });

            if (exist) {
                return;
            }
            else {
                state.products.push({
                    ...respond,
                })
            }
        },

        
        delFavoriteProduct: (state, action) => {
            const product = action.payload;
            state.products.forEach((x, index) => {
                if (x.id === product.id) {
                    state.products.splice(index, 1);
                }
            })
        },

        resetFavoriteProduct: (state, action) => {
            state.products = [];
        },
    },

    extraReducers: (builder) => {
        builder
          .addCase(fetchFavoriteList.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(fetchFavoriteList.fulfilled, (state, action) => {
            console.log(action.payload.data.data.favProductsList.products);
            
            state.products = action.payload.data.data.favProductsList.products;
            state.isLoading = false;
            state.isError = false;
            console.log(state)
        })
          .addCase(fetchFavoriteList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            // toast.error("Wrong favorite list");
          });
      },
})

export const { addFavoriteProduct, delFavoriteProduct, resetFavoriteProduct} = cartReducer.actions;

export default cartReducer.reducer;