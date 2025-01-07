"use client"
import React, { useActionState, useState } from 'react'
import { checkout } from '../utils/action'
import { Product } from '../lib/types'
import { useSelector } from 'react-redux'
import { CartItem } from '../lib/features/cart/cartSlice'

// type Info = {
//     amount: number,
//     email: string,
//     first_name: string,
//     last_name: string,
// }

// export interface RootState {
//   cart: {
//     cartItems: CartItem[];
//     cartValue: number;
//   };
//}

// interface ErrorMessage {
//   errors: {
//       email?: string;
//       first_name?: string;
//       last_name?:string;
//   };
// }



const Page = () => {
  const cartItem = useSelector((state)=>state.cart.cartItems)
  const price = cartItem.reduce((acc , item )=> acc + item.price ,0)

    const [info , setInfo ] = useState({
        amount: 0,
        email: '',
        first_name: '',
        last_name: '',
    });

    
    const input_style = 'w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
    const [ errorMessage , action  ] = useActionState(checkout, undefined)
    
  return (
    <div className='flex items-center justify-center max-w-md mx-auto pt-20 h-full '>
    <form action={action} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' >
    <div className="w-full px-3">
    <div className="mb-5 w-full">
    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="email">Email</label>
    <input id='email' type="email" className={input_style} name="email" value={info.email} placeholder="Your Email" onChange={(e)=>  setInfo({
            ...info,
            email : e.target.value
        })} />
         { errorMessage?.errors?.email && <p id="email" aria-atomic='true' aria-live='polite' className='texr-sm text-red-600/90 font-normal mt-1'>{errorMessage.errors.email}</p>}
    </div>
  </div>

  <div className="w-full px-3">
    <div className="mb-5">
    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="first_name">First Name</label>
    <input id='first_name' type="text" className={input_style} name="first_name" value={info.first_name} placeholder="First Name" onChange={(e)=>  setInfo({
            ...info,
            first_name : e.target.value
        })} />
         { errorMessage?.errors?.first_name && <p id="first_name" aria-atomic='true' aria-live='polite' className='texr-sm text-red-600/90 font-normal mt-1'>{errorMessage.errors.first_name}</p>}
    </div>
  </div>

  <div className="w-full px-3">
    <div className="mb-5">
    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="last_name">Last Name</label>
    <input id='last_name' type="text" className={input_style} name="last_name" value={info.last_name} placeholder="Last Name" onChange={(e)=>  setInfo({
            ...info,
            last_name : e.target.value
        })} />
                 { errorMessage?.errors?.last_name && <p id="last_name" aria-atomic='true' aria-live='polite' className='texr-sm text-red-600/90 font-normal mt-1'>{errorMessage.errors.last_name}</p>}
    </div>
  </div>

  <div className="w-full px-3">
    <div className="mb-5">
    <label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="amount">Amount</label>
    <input id="price" type="number" className={input_style} name="price" value={price} disabled={true}  />
    </div>
  </div>
    <input type="hidden" name="amount" value={price} />    
    <input type="hidden" name="title" value="Let us do this" />
    <input type="hidden" name="description" value="Paying with Confidence with cha" />
    <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
    <input type="hidden" name="meta[title]" value="test" />
    <button type="submit" className='w-full hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'>Pay Now</button>
</form>
    </div>
  )
}

export default Page