import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '../store/slices/registerSlice';
import productReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice'
import counterReducer from './slices/counterSlice';

const store = configureStore({
  reducer: {
    register: registerReducer,
    product: productReducer,
    cart: cartReducer,
    counter: counterReducer
  },
});

export default store;
