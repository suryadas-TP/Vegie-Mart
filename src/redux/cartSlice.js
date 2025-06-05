import { createSlice } from "@reduxjs/toolkit";

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
                existingItem.qty += 1; // Increase quantity if already in cart
            } else {
                state.cartItems.push({ ...newItem, qty: 1 }); // Add new item with qty 1
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload)
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
        }
    },
})
export const { addTocart, removeFromCart,increaseQty,decreaseQty } = cartSlice.actions
export default cartSlice.reducer