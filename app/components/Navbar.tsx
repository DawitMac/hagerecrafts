"use client";
import React from 'react'
import { MdAddShoppingCart } from 'react-icons/md'
import Link from 'next/link'
import { ReactNode } from 'react'
import Image from 'next/image'
import hagere from '../../public/Hagere.png'
import { useSelector } from 'react-redux';
import { CartItem } from '../lib/features/cart/cartSlice';

export interface RootState {
  cart: {
    cartItems: CartItem[];
    cartValue: number;
  };
}

const NavBar = () => {

  const cartValue = useSelector((state: RootState) => state.cart.cartValue)
  console.log(cartValue , "cartValue")
    
  return (
    <div className='fixed z-50 w-screen bg-white'>
    <div className='flex items-center justify-between my-1 md:my-4 px-2 sm:px-8 md:px-20'>
        <Link href='/' ><span className='flex items-center justify-center gap-2'><Image src={hagere} alt='logo' placeholder='blur' width={50} height={50} className='cursor-pointer w-12 h-12' /><p className='text-gray-900 text-xl font-serif font-normal'>HagereCrafts</p></span></Link>
        <DrawOutlineButton>
         <Link href='/cart'  className='flex p-2 shadow rounded relative bg-white'>
          <MdAddShoppingCart size={23} />
          { cartValue > 0 &&<span className="absolute right-0 top-0 rounded-full bg-red-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">{cartValue}</span>}
        </Link>
        </DrawOutlineButton>
    </div>
    </div>
  )
}

const DrawOutlineButton = ({ children, ...rest }: { children: ReactNode }) => {
  return (
    <button
      {...rest}
      className="group relative px-2 py-1 font-medium text-slate-900 transition-colors duration-[400ms] hover:text-indigo-900"
    >
      <span>{children}</span>

      <span className="absolute left-0 top-0 h-[2px] w-0 bg-orange-500 transition-all duration-100 group-hover:w-full" />

      <span className="absolute right-0 top-0 h-0 w-[2px] bg-orange-500 transition-all delay-100 duration-100 group-hover:h-full" />

      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-orange-500 transition-all delay-200 duration-100 group-hover:w-full" />

      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-orange-500 transition-all delay-300 duration-100 group-hover:h-full" />
    </button>
  );
};

export default NavBar