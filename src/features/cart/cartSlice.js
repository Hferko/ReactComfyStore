import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {  
  return JSON.parse(localStorage.getItem('cart')) || defaultState;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((stuff) => stuff.cartId === product.cartId);
      if (item) {
        item.amount += product.amount;
      }
      else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
     
      cartSlice.caseReducers.calculateTotals(state)

      toast.success(`${product.amount}db  "${product.title}" hozzáadva a kosárhoz`);
    },

    clearCart: (state) => { 
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },

    removeItem: (state, action) => {
      const {cartId} = action.payload;
      const searchedProduct = state.cartItems.find((stuff) => stuff.cartId === cartId);
      state.cartItems = state.cartItems.filter((item) => item.cartId !== cartId);

      state.numItemsInCart -= searchedProduct.amount;
      state.cartTotal -= searchedProduct.price * searchedProduct.amount;
      
      cartSlice.caseReducers.calculateTotals(state);
      toast.dark(`${searchedProduct.amount}db  "${searchedProduct.title}" TÖRÖLVE a kosárból`);      
     },

    editItem: (state, action) => { 
      const {cartId, amount} = action.payload;
      const searchedProduct = state.cartItems.find((stuff) => stuff.cartId === cartId);

      state.numItemsInCart += amount - searchedProduct.amount;
      state.cartTotal += searchedProduct.price * (amount - searchedProduct.amount);
      searchedProduct.amount = amount;

      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Kosár tartalma frissítve");      
    },

    calculateTotals: (state) => {
      state.tax = 0.27 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    }
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;