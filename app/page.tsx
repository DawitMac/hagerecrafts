"use client";
import React from 'react'
import Footer from "./components/Footer";
import Products from "./components/Products";



export default function Home() {

  return (
    <div className=''>
      
       {/* {
            loading &&  <div className='fixed w-screen h-[90vh] bg-transparent flex items-center justify-center z-10'>
                              <Loadder />
                        </div>
       } */}
        <Products />
        <Footer />
    </div>
  )
}
