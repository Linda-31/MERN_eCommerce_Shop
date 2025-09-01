import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartcount: Number(localStorage.getItem('cartcount')) || 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      state.cartcount = action.payload; 
       localStorage.setItem('cartcount', action.payload);
    },
  },
});

export const { setCartCount } = productSlice.actions;
export default productSlice.reducer;

