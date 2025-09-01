import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId) => {
    const res = await axios.get(`http://localhost:4000/api/wishlists/${userId}`);
    return res.data;
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, productId }) => {
    const res = await axios.post(`http://localhost:4000/api/wishlists/add`, {
      userId,
      productId
      
    });
   
    return res.data;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ userId, productId }) => {
    const res = await axios.delete(`http://localhost:4000/api/wishlists/remove`, {
      data: { userId, productId }
    });
    return res.data;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  }
});

export default wishlistSlice.reducer;
