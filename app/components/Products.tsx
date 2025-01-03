"use client";
import React, { useRef, useState} from 'react'
import {motion } from 'framer-motion'
import { useGlobalContext } from '../context/ContextProvider'
import { Product } from '../lib/types'
import Image from 'next/image';
const Products = () => {
    const slider = useRef(null)
    const [ search ,setSearch] = useState('')
    const { AllProducts , addToCart , loading} = useGlobalContext()
   
  return (
    <motion.div
    initial={{opacity : 0}}
    animate={{opacity : "100%"}}
    exit={{opacity : 0}}  className='flex flex-col items-center justify-center z-[-1] pt-20'>
        <div className='flex items-center justify-center my-10'>
          <div className='flex items-center w-72 md:w-96  rounded-3xl shadow-lg border bg-white gap-2 '>
            <input onChange={(e)=> setSearch(e.target.value)} type='text' className='w-2/3  p-2 px-6 rounded-3xl caret-orange-500 focus:caret-orange-500 outline-none' />
            <button className='bg-black w-1/3  text-white font-sans font-semibold py-2 rounded-3xl drop-shadow-md'>Search</button>
          </div>
        </div>
            {/* <div className='text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-normal font-mono my-10 text-slate-800'>New Arrivals</div> */}
            
            <div className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-1 md:gap-6 p-2 mx-3 md:mx-10'>
                    {
                         AllProducts.filter((item : Product) => item.name.toLowerCase().includes(search.toLowerCase())).length === 0 ?
                            <div className='flex items-center justify-center w-[90dvw] h-[50dvh]'><h1 className='text-4xl font-serif font-normal whitespace-pre-wrap'>No product found with This name</h1></div>
                          :
                        AllProducts.filter((item : Product) => search === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())).slice(0,10).map((item:Product ,index : number)=>{
                            const newDescription = item.description.replace(/<\/?p>/g, "")
                    return(
                        <div key={item?.id} className='flex flex-col items-center justify-between p-2 shadow mx-3 my-1  bg-black/5 text-center gap-1 rounded '>
                        <Image alt='trending_products' src={item?.url} className={`sm:h-[200px] sm:w-[200px] h-[150px] w-[150px] bg-black/0 `} width={208} height={192}/>
                        <div className='flex flex-col md:flex-row items-start md:items-center justify-around w-full gap-3'>
                          <p className='text-base sm:text-lg leading-5 md:leading-6 text-slate-700 font-sans font-semibold text-left'>{item.name}</p>
                          <p className='text-base sm:text-lg leading-5 md:leading-6 text-slate-700 font-semibold font-mono text-right'>{item.price}$</p>
                        </div>
                        <p className='text-sm font-light w-full hidden md:block'>{newDescription}</p>
                        <button onClick={()=>{
                            addToCart(item?.id , 1 ,index) 
                        } } className='px-2 py-1 shadow-lg hover:scale-75 text-md font-serif duration-300 bg-orange-500 rounded-lg w-full text-white mt-0 md:mt-2'>Add</button>
                    </div>
                    )})
                    }   
                    
                </div>
                <div className='text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-normal font-mono text-slate-800 my-10'>Trending Products</div>
                <motion.div ref={slider} className='overflow-x-hidden cursor-grab  w-[95dvw] bg-[#F5E5D4] '>
                <motion.div  drag="x" dragConstraints={{right :222 , left: -222}} className='flex mx-3 my-1 gap-5 py-4 cursor-grab bg-[#F5E5D4] '>
            {   
                AllProducts.map((item: Product)=>{
                    return(
                        <motion.div key={item?.id} className='flex items-center flex-col justify-between  border-2 rounded drop-shadow-xl hover:bg-light-gray p-2 shadow w-[400px] mr-[10px]  bg-black/5 text-center gap-2' 
                        >
                           <Image src={item?.url} alt='trending_products' className={`sm:h-[150px] sm:w-[200px] h-[150px] w-[150px] bg-black/0 `} width={208} height={192} />
                        <div className='flex items-center justify-around w-full gap-2'>
                          <p className='text-md font-sans font-semibold text-left'>{item.name}</p>
                          <p className='text-lg font-bold font-mono text-right'>{item.price}$</p>
                        </div>
                        <button onClick={()=>{
                            addToCart(item?.id , 1) 
                        } } className='px-2 py-1 shadow-lg hover:scale-75 text-md font-serif duration-300 bg-orange-500 rounded-lg w-full text-white'>Add</button>
                        </motion.div>
                    )
                   
                })
            }
             </motion.div>
            </motion.div>
            
            <div className='text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-normal font-mono my-10 text-slate-800'>Top Categories</div>

            <div className='flex flex-col md:flex-row items-center justify-center gap-5'>
                  <div className='flex flex-row md:flex-col gap-3'>
                      <div className='relative h-32 w-32 md:h-52 md:w-52 p-1 bg-slate-50 m-3'>
                        <Image  src="/gabi_1.png" alt='trending_products' className='bg-transparent w-full h-full' width={200} height={200}/>
                    </div>
                    <div className='relative h-32 w-32 md:h-52 md:w-52 p-3 bg-slate-50 m-3'>
                        <Image  src="/habesha_men.png" alt='trending_products' className='bg-transparent w-full h-full' width={200} height={200}/>
                    </div>
                    </div>
                <div className='h-full'>
                       <div className='relative h-64 md:h-full p-3 bg-slate-50 m-3'>
                        <Image  src="/habesha_kemis_3.png" alt='trending_products' className='bg-transparent w-full h-full' width={200} height={200}/>
                    </div>
                </div> 
                <div className='flex flex-row md:flex-col gap-3'>
                      <div className='relative h-32 w-32 md:h-52 md:w-52 p-3 bg-slate-50 m-3'>
                        <Image  src="/Kirar_1.png" alt='trending_products' className='bg-transparent w-full h-full' width={200} height={200}/>
                    </div>
                    <div className='relative h-32 w-32 md:h-52 md:w-52 p-3 bg-slate-50 m-3'>
                        <Image  src="/kebero_1.png" alt='trending_products' className='bg-transparent w-full h-full' width={200} height={200}/>
                    </div>
                    </div>
            </div>
        </motion.div>
  )
}

export default Products