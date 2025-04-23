import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems:[]
    },
    reducers:{
        addTocart:(state,action)=>{
            state.cartItems.push(action.payload)
        },
        removeFromCart:(state,action)=>{
           state.cartItems = state.cartItems.filter(item => item.id !==action.payload)
        },
    },
})
export const {addTocart,removeFromCart}=cartSlice.actions
export default cartSlice.reducer