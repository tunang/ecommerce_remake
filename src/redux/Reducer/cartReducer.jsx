import toast from "react-hot-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getCart } from "../../services/usersServices/CartService";


const INITIAL_STATE = {
    products: [],
    isLoading: false,
    isError: false,
};

export const fetchCart = createAsyncThunk(
    "fetchCart",
    async (_, thunkApi) => {
      const { data } = await getCart();
    //   console.log(data);
      return { data };
    }
  );



const cartReducer = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        addCart: (state, action) => {
            const respond = action.payload;
            console.log(respond)
            // mutation
            const exist = state.products.find((x) => {
                return x.id === respond.product.id && x.size === respond.sizeIndex;
            });

            if (exist) {
                state.products.forEach((x) => {
                    if (x.id === respond.product.id) {
                        x.qty = x.qty + respond.total;
                    }
                })
            }
            else {
                state.products.push({
                    ...respond.product,
                    qty: respond.total,
                    size: respond.sizeIndex
                })
            }
        },

        decreaseCart: (state, action) => {
            const respond = action.payload;

            //mutation
            const exist1 = state.products.find((x) => {
                return x.id === respond.product.id && x.size === respond.sizeIndex;
            });

            if (exist1.qty === 1) {
                state.products.forEach((x, index) => {
                    if (x.id === respond.product.id) {
                        state.products.splice(index, 1);
                    }
                })
            }
            else {
                state.products.forEach((x) => {
                    if (x.id === respond.product.id) {
                        x.qty = x.qty - 1;
                    }
                })
            }
        },

        delCart: (state, action) => {
            console.log('check');
            console.log(action.payload)
            const productId = action.payload;
            state.products.forEach((x, index) => {
                if (x.id === productId) {
                    state.products.splice(index, 1);
                }
            })
        },

        resetCart: (state, action) => {
            state.products = [];
        },
    },

    extraReducers: (builder) => {
        builder
          .addCase(fetchCart.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(fetchCart.fulfilled, (state, action) => {
            console.log(action.payload.data.cart.products)
            
            state.products = action.payload.data.cart.products;
            state.isLoading = false;
            state.isError = false;
            console.log(state)
        })
          .addCase(fetchCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          });
      },
})

export const { addCart, decreaseCart, delCart, resetCart} = cartReducer.actions;

export default cartReducer.reducer;