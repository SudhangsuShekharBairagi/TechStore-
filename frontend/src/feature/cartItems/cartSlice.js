import { createSlice } from "@reduxjs/toolkit";

const cartItems = JSON.parse(localStorage.getItem('cart')) || [{ productId: '', quantity: 0 }];

export const cartSlice = createSlice({
  name: 'cart',
  initialState: cartItems,
  reducers: {
    addToCart: (state, action) => {
       if (action.payload.productId) {
        const existingProduct = state.find((item) => item.productId === action.payload.productId);  
        
        if (existingProduct) {
          existingProduct.quantity += action.payload.quantity;
        } else {
          state.push(action.payload);
        }
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.filter((item) => item.productId !== action.payload.productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    },
    increaseQuantity: (state, action) => {
      const product = state.find((item) => item.productId === action.payload.productId);
        if (product) {
            product.quantity += 1;
            localStorage.setItem('cart', JSON.stringify(state));
        }
    },
    decreaseQuantity: (state, action) => {
      const product = state.find((item) => item.productId === action.payload.productId);
        if (product && product.quantity > 1) {
            product.quantity -= 1;
            localStorage.setItem('cart', JSON.stringify(state));
        } else if (product && product.quantity === 1) {
            return state.filter((item) => item.productId !== action.payload.productId);
        }
    },
  }
});
export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;