"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <motion.div
    initial={{opacity : 0}}
    animate={{opacity : "100%"}}
    exit={{opacity : 0}}
     className='flex flex-col sm:flex-row text-center justify-around bg-black/80 md:p-15 p-6 gap-10 dark:bg-slate-800 dark:border-t dark:border-slate-100 rounded-tr-3xl rounded-tl-3xl mt-20 max-w-full t'>
      <div className='flex flex-col  gap-6'>
      <Link href='/' ><span className='flex items-center justify-center gap-2'><Image src="/Hagere.png" alt='logo' width={40} height={40} className='cursor-pointer w-12 h-12' /><p className='text-white text-2xl font-serif font-normal'>HagereCrafts</p></span></Link>
      <div className='flex items-center justify-center gap-6'>
            <a href='https://github.com/DawitMac' target="_tab"  className=''>
            <Image src='/twitter.png' alt='twitter'  className='h-8 w-8' width={32} height={32} />
          </a>
          <a href='https://github.com/DawitMac' target="_tab"  className=''>
          <Image src="/gmail.png" alt='gmail' className='h-8 w-8' width={32} height={32} />
          </a>
          <a href='https://github.com/DawitMac' target="_tab"  className=''>
          <Image src='/telegram.png' alt='telegram' className='h-8 w-8' width={32} height={32}/>
          </a>    
         </div>
      </div>
     <div className='flex flex-col sm:flex-row gap-20'>
     <div className='flex flex-col'>
        <h1 className='text-xl font-bold text-white mb-4'>Shop</h1>
        <p className='text-lg font-normal text-gray-400 cursor-pointer hover:scale-105 duration-300 hover:text-gray-200 mb-2'>About Us</p>
        <p className='text-lg font- text-gray-400 cursor-pointer hover:scale-105 duration-300 hover:text-gray-200 mb-2'>Contact</p>
        <p className='text-lg font- text-gray-400 cursor-pointer hover:scale-105 duration-300 hover:text-gray-200 mb-2'>FAQ</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-xl font-bold text-white mb-4'>Categories</h1>
        <p className='text-lg font- text-gray-400 cursor-pointer hover:scale-105 duration-300 hover:text-gray-200 mb-2'>Electronics</p>
        <p className='text-lg font- text-gray-400 cursor-pointer hover:scale-105 duration-300 hover:text-gray-200 mb-2'>Shoes</p>
        <p className='text-lg font- text-gray-400 cursor-pointer hover:scale-105 duration-300 hover:text-gray-200 mb-2'>Summer</p>
        <p className='text-lg font-normal text-gray-400 cursor-pointer hover:scale-105 duration-300 hover:text-gray-200 mb-2'>Cosmotics</p>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-xl font-bold text-white mb-4'>Contact</h1>
        <p className='text-lg font-normal text-gray-400 cursor-pointer hover:scale-105 duration-300 hover:text-gray-200 mb-2'>+251 938247798</p>
        <p className='text-lg font-normal text-gray-400 cursor-pointer hover:scale-105 duration-300 hover:text-gray-200 mb-2'>mekonendawit5@gmail.com</p>
      </div>
     </div>
     </motion.div>
  )
}

export default Footer