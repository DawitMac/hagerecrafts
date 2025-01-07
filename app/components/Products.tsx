"use client";
import React, { useRef, useState} from 'react'
import {motion } from 'framer-motion'
import { Product } from '../lib/types'
import Image from 'next/image';
import Detail from './Detail';
import { products } from '../lib/data';
import { useDispatch } from 'react-redux';
import { addToCart } from '../lib/features/cart/cartSlice';

const Products = () => {
  const [ detail , setDetail] = useState(false)
  const [ detailProduct , setDetailProduct] = useState({ 
    id: '',
    name: '',
    description: '',
    price: 0,
    more_info: '',
    category: '',
    weight: 0,
    currency: '',
    size: 0,
    quantity: 0,
    url: ''
})
    const slider = useRef(null)
    const [ search ,setSearch] = useState('')
      const dispatch = useDispatch();

    const handleDetail = (data : Product) =>{
      setDetailProduct(data)
      handleToggle()
    }

    const handleToggle = ()=>{
      setDetail(!detail)
    }

    const handleAddToCart = ( e:React.MouseEvent<HTMLButtonElement> , product:Product) => {
      e.stopPropagation();
      dispatch(addToCart({ productId: product.id, quantity: 1 }));
    };

    const productWidth = 100; // Width of each product card
    const totalProductsWidth = products.length * (productWidth + 10); // 10px for margin betwee

  return (
    <motion.div
    initial={{opacity : 0}}
    animate={{opacity : "100%"}}
    exit={{opacity : 0}}  className='flex flex-col items-center justify-center z-[-1] pt-20'>
                  { detail && <Detail detailProduct={detailProduct} handleToggle={handleToggle} />}
        <div className='flex items-center justify-center my-10'>
          <div className='flex items-center w-72 md:w-96  rounded-3xl shadow-lg border bg-white gap-2 '>
            <input onChange={(e)=> setSearch(e.target.value)} type='text' className='w-2/3  p-2 px-6 rounded-3xl caret-orange-500 focus:caret-orange-500 outline-none' />
            <button className='bg-black w-1/3  text-white font-sans font-semibold py-2 rounded-3xl drop-shadow-md'>Search</button>
          </div>
        </div>
            {/* <div className='text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-normal font-mono my-10 text-slate-800'>New Arrivals</div> */}
            
            <div className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-1 md:gap-6 p-2 mx-3 md:mx-10'>
                    {
                         products.filter((item : Product) => item.name.toLowerCase().includes(search.toLowerCase())).length === 0 ?
                            <div className='flex flex-col gap-5 items-center justify-center w-[80dvw] md:w-[90dvw] h-[50dvh]'>
                              <Image src="/no-results.png" alt='not_found' width={100} height={100}  />
                              <h1 className='text-3xl font-mono font-light whitespace-pre-wrap text-center'>No product found with This name</h1>
                              </div>
                          :
                        products.filter((item : Product) => search === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())).slice(0,10).map((item:Product)=>{
                            const newDescription = item.description.replace(/<\/?p>/g, "")
                    return(
                        <div key={item?.id} onClick={()=>handleDetail(item)} className='flex flex-col items-center justify-between p-2 shadow mx-3 my-1  bg-black/5 text-center gap-1 rounded '>
                        <Image alt='trending_products' src={item?.url}  className={`sm:h-[200px] sm:w-[200px] h-[150px] w-[150px] bg-black/0 `} width={208} height={192}/>
                        <div className='flex flex-col md:flex-row items-start md:items-center justify-around w-full gap-3'>
                          <p className='text-base sm:text-lg leading-5 md:leading-6 text-slate-700 font-sans font-semibold text-left'>{item.name}</p>
                          <p className='text-base sm:text-lg leading-5 md:leading-6 text-slate-700 font-semibold font-mono text-right'>{item.price}$</p>
                        </div>
                        <p className='text-sm font-light w-full hidden md:block'>{newDescription}</p>
                        <button onClick={(e)=>handleAddToCart(e,item)} className='px-2 py-1 shadow-lg hover:scale-75 text-md font-serif duration-300 bg-orange-500 rounded-lg w-full text-white mt-0 md:mt-2'>Add</button>
                    </div>
                    )})
                    }   
                    
                </div>
                <div className='text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-normal font-mono text-slate-800 my-10'>Trending Products</div>
                <motion.div
      ref={slider}
      className='overflow-x-hidden cursor-grab w-[95vw] bg-[#F5E5D4]'
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 50, left: - totalProductsWidth }} 
        className='flex mx-3 my-1 gap-5 py-4 cursor-grab bg-[#F5E5D4]'
      >
        {products.map((item: Product) => (
          <motion.div
            key={item?.id}
            className='flex items-center flex-col justify-between border-2 rounded drop-shadow-xl hover:bg-light-gray p-2 shadow w-[400px] mr-[10px] bg-black/5 text-center gap-2'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={()=>handleDetail(item)}
          >
            <Image
              src={item?.url}
              alt='trending_products'
              className='sm:h-[150px] sm:w-[200px] h-[150px] w-[150px] bg-black/0'
              width={208}
              height={192}
              draggable="false"
            />
            <motion.div
              className='flex items-center justify-around w-full gap-2'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className='text-md font-sans font-semibold text-left'>{item.name}</p>
              <p className='text-lg font-bold font-mono text-right'>{item.price}$</p>
            </motion.div>
            <motion.button
              onClick={(e)=>handleAddToCart(e,item)}
              className='px-2 py-1 shadow-lg hover:scale-75 text-md font-serif duration-300 bg-orange-500 rounded-lg w-full text-white'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              Add
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
            
            <div className='text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-normal font-mono my-10 text-slate-800'>Top Categories</div>

            <div className='flex flex-col md:flex-row items-center justify-center gap-5'>
                  <div className='flex flex-row md:flex-col gap-3'>
                  <div className='relative bg-slate-50 m-3'>
                    <div className="  h-full relative shadow-2xl overflow-hidden group ">
                    <div className=" absolute -bottom-10 group-hover:top-0 left-0 w-full h-full group-hover:bg-[#F59D34] transition-all ease-in-out duration-500  ">
                        <div className="w-full h-full   p-5   relative">
                            <div className="absolute bottom-0 group-hover:bottom-24 text-white  text-left   transition-all ease-in-out duration-500 ">
                                <h2 className="text-2xl font-bold  text-white mb-0 pb-1">Men Gabi</h2>
                                <p className="text-lg font-light text-white">Lorem ipsum dolor sit amet brands</p>
                            </div>
                        </div>
                    </div>
                    <Image  src="/gabi_1.png" alt='trending_products' className='bg-transparent h-32 w-32 md:h-52 md:w-52' width={200} height={200}/>
                    </div>
                    </div>
                    <div className='relative bg-slate-50 m-3'>
                    <div className="h-full relative shadow-2xl overflow-hidden group ">
                    <div className="absolute -bottom-10 group-hover:top-0 left-0 w-full h-full group-hover:bg-[#F59D34] transition-all ease-in-out duration-500  ">
                        <div className="w-full h-full   p-5   relative">
                            <div className="absolute bottom-0 group-hover:bottom-20 text-white  text-left   transition-all ease-in-out duration-500 ">
                                <h2 className="text-2xl font-bold  text-white mb-0 pb-1">Habesha Men Cloth</h2>
                                <p className="text-lg font-light text-white">Lorem ipsum dolor sit amet, #brands</p>
                            </div>
                        </div>
                    </div>
                    <Image  src="/habesha_men.png" alt='trending_products' className='bg-transparent h-32 w-32 md:h-52 md:w-52' width={200} height={200}/>
                    </div>
                    </div>
                    </div>
                <div className='h-full'>
                    <div className='relative bg-slate-50 m-3'>
                    <div className="  h-full relative shadow-2xl overflow-hidden group ">
                    <div className=" absolute -bottom-10 group-hover:top-0 left-0 w-full h-full group-hover:bg-[#F59D34] transition-all ease-in-out duration-500  ">
                        <div className="w-full h-full   p-5   relative">
                            <div className="absolute bottom-0 group-hover:bottom-24 text-white  text-left   transition-all ease-in-out duration-500 ">
                                <h2 className="text-2xl font-bold  text-white mb-0 pb-1">Habesha Kemis</h2>
                                <p className="text-lg font-light text-white">Lorem ipsum dolor sit amet brands</p>
                            </div>
                        </div>
                    </div>
                    <Image  src="/habesha_kemis_3.png" alt='trending_products' className='bg-transparent w-full h-full' width={200} height={200}/>
                    </div>
                    </div>
                </div> 
                <div className='flex flex-row md:flex-col gap-3'>
                    <div className='relative bg-slate-50 m-3'>
                    <div className="  h-full relative shadow-2xl overflow-hidden group ">
                    <div className=" absolute -bottom-10 group-hover:top-0 left-0 w-full h-full group-hover:bg-[#F59D34] transition-all ease-in-out duration-500  ">
                        <div className="w-full h-full   p-5   relative">
                            <div className="absolute bottom-0 group-hover:bottom-24 text-white  text-left   transition-all ease-in-out duration-500 ">
                                <h2 className="text-2xl font-bold  text-white mb-0 pb-1">Traditional Kirar</h2>
                                <p className="text-lg font-light text-white">Lorem ipsum dolor sit amet brands</p>
                            </div>
                        </div>
                    </div>
                    <Image  src="/Kirar_1.png" alt='trending_products' className='bg-transparent h-32 w-32 md:h-52 md:w-52' width={200} height={200}/>
                    </div>
                    </div>
                    {/* //h-32 w-32 md:h-52 md:w-52 p-3 */}
                    <div className='relative bg-slate-50 m-3'>
                    <div className="  h-full relative shadow-2xl overflow-hidden group ">
                    <div className=" absolute -bottom-10 group-hover:top-0 left-0 w-full h-full group-hover:bg-[#F59D34] transition-all ease-in-out duration-500  ">
                        <div className="w-full h-full   p-5   relative">
                            <div className="absolute bottom-0 group-hover:bottom-20 text-white  text-left   transition-all ease-in-out duration-500 ">
                                <h2 className="text-2xl font-bold  text-white mb-0 pb-1">Traditional Kebero</h2>
                                <p className="text-lg font-light text-white">Lorem ipsum dolor sit amet brands</p>
                            </div>
                        </div>
                    </div>
                    <Image  src="/kebero_1.png" alt='trending_products' className='bg-transparent h-32 w-32 md:h-52 md:w-52' width={200} height={200}/>
                    </div>
                    </div>
                    </div>
                    <a href="#" className=" shadow-2xl relative ">
                
            </a>
            </div>
        </motion.div>
  )
}

export default Products