"use client"
import React from 'react'
import Loadder from '../components/Loadder'
import { useGlobalContext } from '../context/ContextProvider';
import { CartProduct } from '../lib/types';
import Link from 'next/link';

const page = () => {
  const {cartItem , onAddToCart , onRemoveProduct , onCartEmpty , loading} = useGlobalContext();
  if(cartItem.length === 0){
    return <div className='flex flex-col gap-5 items-center justify-center min-h-screen'><h1 className='text-4xl font-serif font-semibold'>Cart is Empty</h1>  <Link href="/" className='px-2 py-1 shadow-lg hover:scale-75 text-md font-serif duration-300 bg-orange-500 rounded-lg '>Add products</Link></div>
  }
  return (
    <div className='flex items-center min-h-screen flex-col pt-20'>
      {
            loading &&  <div className='fixed w-screen h-[90vh] bg-transparent flex items-center justify-center z-10'>
                              <Loadder />
                        </div>
           }
         <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3 p-4'>
            {
                cartItem.map((item : CartProduct , index : number)=>{
                
                    return(
                        <div key={index} className='flex flex-col items-center bg-black/10 justify-center p-2 shadow m-2 text-center gap-5 border-2 rounded'>
                        <img src={item.url} className='h-48 w-48'/>
                        <div className='flex items-center justify-around w-full'>
                          <p className='text-md font-sans font-semibold'>{item.name}</p>
                          <p className='text-lg font-bold font-mono'>{item.price}</p>
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
        <div className='flex items-center justify-end mt-8  gap-4'>
            <button onClick={()=> onCartEmpty()} className='w-32  py-2 bg-red-500 text-white hover:scale-75 shadow-lg rounded duration-300 text-xl font-semibold'>Clear</button>
            <button className='w-32 py-2 bg-cyan-700 text-white rounded shadow-lg hover:scale-75 duration-300 text-xl font-semibold'>Checkout</button>
        </div>
        </div>
  )
}

export default page