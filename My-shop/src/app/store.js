import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice';
import wishlistReducer from '../features/wishlistSlice';

const store = configureStore({
  reducer: {
      product: productReducer,
      wishlist: wishlistReducer,
  },
});

export default store;