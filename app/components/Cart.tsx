"use client";
import React from 'react'
import Loadder from './Loadder'
import { useGlobalContext } from '../context/ContextProvider';
import { CartProduct } from '../lib/types';
import Image from 'next/image';

const Cart = () => {
  const {cartItem , onAddToCart , onRemoveProduct , onCartEmpty , loading} = useGlobalContext();
  return (
    <div className='flex flex-col items-center justify-center z-[-1] pt-20'>
      {
            loading &&  <div className='fixed w-screen h-[90vh] bg-transparent flex items-center justify-center z-10'>
                              <Loadder />
                        </div>
           }
         <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-1 md:gap-6 p-2 mx-3 md:mx-10'>
            {
                cartItem.map((item : CartProduct)=>{
                
                    return(                   
                        <div key={item?.id} className='flex flex-col items-center justify-between p-2 shadow mx-3 my-1  bg-black/5 text-center gap-1 rounded '>
                        <Image src={item?.url} alt='product_in_cart' className={`sm:h-[200px] sm:w-[200px] h-[150px] w-[150px] bg-black/0 `} width={208} height={192}/>
                        <div className='flex flex-col md:flex-row items-start md:items-center justify-around w-full gap-3'>
                        <p className='text-base sm:text-lg leading-5 md:leading-6 text-slate-700 font-sans font-semibold text-left'>{item.name}</p>
                        <p className='text-base sm:text-lg leading-5 md:leading-6 text-slate-700 font-semibold font-mono text-right'>{item.price}$</p>
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                        <button onClick={()=> onAddToCart(item.id , 1) } className='px-2 py-1 shadow-lg hover:scale-75 text-md font-serif duration-300 rounded-lg bg-white'>+</button>
                        <p>{item.qnt}</p>
                        <button onClick={()=> {
                          if(item.qnt <= 0){
                            onRemoveProduct(item.id)
                          }else{
                            onAddToCart(item?.id , -1)
                          }
                        }  } className='px-2 py-1 shadow-lg hover:scale-75 text-md font-serif duration-300 rounded-lg bg-white'>-</button>
                        </div>
                        <button onClick={()=> onRemoveProduct(item.id)} className='px-2 py-1 bg-red-500 text-white hover:scale-75 shadow rounded duration-300'>Remove</button>
                    </div>
                    )
                   
                })
            }
        </div>
        <div className='flex items-center justify-end mt-8 pb-16  gap-4'>
            <button onClick={()=> onCartEmpty()} className='w-32  py-2 bg-red-500 text-white hover:scale-75 shadow-lg rounded duration-300 text-xl font-semibold'>Clear</button>
            <button className='w-32 py-2 bg-cyan-700 text-white rounded shadow-lg hover:scale-75 duration-300 text-xl font-semibold'>Checkout</button>
        </div>
        </div>
  )
}

export default Cart

// const totalPrice = cartItem.reduce((acc , item)=> acc + item.price * item.qnt , 0)