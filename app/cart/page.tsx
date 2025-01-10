"use client"
import React from 'react';
import { onAddToCart, onRemoveProduct, onCartEmpty , CartItem } from '../lib/features/cart/cartSlice';
import { CartProduct } from '../lib/types';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

export interface RootState {
  cart: {
    cartItems: CartItem[];
    cartValue: number;
  };
}

const Page = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleAddToCart = (productId: string, quantity: number) => {
    dispatch(onAddToCart({ productId, quantity }));
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(onRemoveProduct(id));
  };

  const handleOnCartEmpty = () => {
    dispatch(onCartEmpty());
  };

  if (cartItems.length === 0) {
    return (
      <div className='flex flex-col gap-5 items-center justify-center min-h-screen bg-white'>
        <Image src="/empty-cart.png" alt='not_found' width={100} height={100} />
        <h1 className='text-4xl font-mono font-light'>Cart is Empty</h1>
        <Link href="/" className='px-2 py-1 shadow-lg hover:scale-75 text-md font-serif duration-300 bg-orange-500 rounded-lg text-white'>
          Add products
        </Link>
      </div>
    );
  }

  return (
    <div className='flex items-center min-h-screen flex-col pt-20 bg-white'>
      <div className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-1 md:gap-6 p-2 mx-3 md:mx-10'>
        {cartItems.map((item: CartProduct, index: number) => (
          <div key={index} className='flex flex-col items-center justify-between p-2 shadow mx-3 my-1 bg-black/5 text-center gap-3 rounded'>
            <Image alt='trending_products' src={item?.url} className={`sm:h-[200px] sm:w-[200px] h-[150px] w-[150px] bg-black/0 `} width={208} height={192} />
            <div className='flex items-center justify-around w-full'>
              <p className='text-base sm:text-lg leading-5 md:leading-6 text-slate-700 font-sans font-semibold text-left'>{item.name}</p>
              <p className='text-base sm:text-lg leading-5 md:leading-6 text-slate-700 font-semibold font-mono text-right'>{item.price}$</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <button onClick={() => handleAddToCart(item.id, 1)} className='px-2 py-1 shadow-lg hover:scale-75 text-md font-serif duration-300 rounded-lg bg-white'>+</button>
              <p>{item.qnt}</p>
              <button onClick={() => {
                if (item.qnt <= 1) {
                  handleRemoveFromCart(item.id);
                } else {
                  handleAddToCart(item.id, -1);
                }
              }} className='px-2 py-1 shadow-lg hover:scale-75 text-md font-serif duration-300 rounded-lg bg-white'>-</button>
            </div>
            <button onClick={() => handleRemoveFromCart(item.id)} className='px-2 py-1 bg-red-500 text-white hover:scale-75 shadow rounded duration-300'>Remove</button>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-end mt-8 gap-4'>
        <button onClick={handleOnCartEmpty} className='w-32 py-2 bg-red-500 text-white hover:scale-75 shadow-lg rounded duration-300 text-xl font-semibold'>Clear</button>
        <Link href="/checkout" passHref>
          <button className='w-32 py-2 bg-cyan-700 text-white rounded shadow-lg hover:scale-75 duration-300 text-xl font-semibold'>Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Page;