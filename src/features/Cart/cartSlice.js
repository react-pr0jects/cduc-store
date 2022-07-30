import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      showMiniCart: false,
      cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    },
    reducers: {
      showMiniCart(state) {
        state.showMiniCart = true;
      },
      hideMiniCart(state) {
        state.showMiniCart = false;
      },
      addToCart(state, action) {
        const newItem = action.payload // newItem = { id (product.id), product, quantity}
        const index = state.cartItems.findIndex(x => x.id === newItem.id)
        if(index >= 0){
          // increase quantity
          state.cartItems[index].quantity += newItem.quantity;
        }else{
          //add to cart
          state.cartItems.push(newItem);
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
      setQuantity(state, action) {
        const { id, quantity} = action.payload
        //check if product is available in cart
        const index = state.cartItems.findIndex(x => x.id === id)
        if(index >= 0){
          state.cartItems[index].quantity = quantity;
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
      removeFromCart(state, action) {
        const idNeedToRemove = action.payload
        state.cartItems = state.cartItems.filter(x => x.id !== idNeedToRemove)
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
    },
});

const { actions, reducer: cartReducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart} = actions
export default cartReducer;