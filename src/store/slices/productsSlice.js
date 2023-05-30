import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.push(action.payload);
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      const index = state.findIndex(product => product.id === productId);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }
  },
});

export const { getProducts, removeProduct } = productSlice.actions;
export default productSlice.reducer;
