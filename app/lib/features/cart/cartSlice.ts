import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { products } from '../../data';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  more_info: string;
  category: string;
  weight: number;
  currency: string;
  size: number;
  quantity: number;
  url: string;
  qnt: number;
}

const initialState: CartItem[] = [];
const initialCartValue = 0;

export const cartReducer = createSlice({
  name: 'cartItem',
  initialState: { cartItems: initialState, cartValue: initialCartValue },
  reducers: {
        addToCart: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const product = products.find((product) => product?.id === productId)
  
      if(product){
         const item_in_cart = state.cartItems.find((item) => item?.id === productId)
         if(item_in_cart){
           state.cartItems.map(item => {
             if(item.id === productId){
               item.qnt = item.qnt + quantity
             }
           })
         }else{
           state.cartItems= [...state.cartItems , {...product , qnt : quantity}]
           state.cartValue = state.cartValue + 1 
         }
      }
    },

    onAddToCart: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
        const { productId, quantity } = action.payload;
        const item_in_cart = state.cartItems.map((item) => {
      if(item.id === productId){
        return {...item , qnt : item.qnt + quantity}
      }else{
        return item
      }
    })
    state.cartItems =item_in_cart
      },
    onRemoveProduct: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      state.cartValue -= 1;
    },
    onCartEmpty: (state) => {
      state.cartItems = [];
      state.cartValue = 0;
    },
  },
});

export const {addToCart , onAddToCart, onRemoveProduct, onCartEmpty } = cartReducer.actions;

export default cartReducer.reducer;