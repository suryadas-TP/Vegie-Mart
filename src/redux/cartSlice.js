import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:3000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const normalizedItems = response.data.items.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.imageUrl,
        qty: item.qty,
      }));

      return normalizedItems;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    addTocart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item._id === newItem._id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.cartItems.push({ ...newItem, qty: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
    },
    increaseQty: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload);
      if (item) {
        item.qty += 1;
      }
    },
    decreaseQty: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
  },
});

export const {
  addTocart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  setCartItems
} = cartSlice.actions;

export default cartSlice.reducer;
