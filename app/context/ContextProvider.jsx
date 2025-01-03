"use client"
import { useContext , createContext, useState , useEffect } from 'react';
import { products } from '../lib/data';
import { s } from 'framer-motion/client';

const Context = createContext();

 const ContextProvider = ({ children }) => {
  const [ AllProducts , setAllProducts ] = useState([])
  const [ cartValue , setCartValue ] = useState(0)
  const [ cartItem , setCartItem ] = useState([])
  const [loading , setLoading ] = useState(false)
  useEffect(()=>{
   fetchProducts()
  },[])

  const fetchProducts = async()=>{
    setLoading(true)
    setAllProducts(products)
    setLoading(false)
   }

   const addToCart = (productId , quantity ) => {
    setLoading(true)
    console.log(productId , "productId" , quantity , "quantity")
 const product = AllProducts.find((product) => product?.id === productId)
 console.log(product , "this is the product")
 if(product){
    const item_in_cart = cartItem.find((item) => item?.id === productId)
    console.log(item_in_cart , "this is the item in cart")
    if(item_in_cart){
      cartItem.map(item => {
        if(item.id === productId){
          item.qnt = item.qnt + quantity
        }
      })
    }else{
      setCartItem([...cartItem , {...product , qnt : quantity}])
      setCartValue(state => state + 1)
    }
 }

    console.log(cartItem , "cartItem")
    setLoading(false)
   }

   const onAddToCart = (productId , quantity) => {
    setLoading(true)
    const item_in_cart = cartItem.map((item) => {
      if(item.id === productId){
        return {...item , qnt : item.qnt + quantity}
      }else{
        return item
      }
    })
    setCartItem(item_in_cart)
    setLoading(false)
   }
   const onRemoveProduct = (productId) => {
    setLoading(true)
    const products = cartItem.filter((item) => item.id !== productId)
    setCartItem(products)
    setCartValue(state => state - 1)
    setLoading(false)
   }
   const onCartEmpty = async() => {
    
    setCartItem([])
    setCartValue(0)

   }

  return (
    <Context.Provider value={{ AllProducts, loading , cartItem ,cartValue ,addToCart,setAllProducts ,onAddToCart ,onRemoveProduct ,onCartEmpty }}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider

export const useGlobalContext = () => useContext(Context);