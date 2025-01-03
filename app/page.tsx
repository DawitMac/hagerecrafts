"use client";
import Image from "next/image";
import React, { useEffect , useState} from 'react'
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Loadder from "./components/Loadder";
import { useGlobalContext } from "./context/ContextProvider";

export default function Home() {
 const { loading} = useGlobalContext();
  return (
    <div className=''>
       {
            loading &&  <div className='fixed w-screen h-[90vh] bg-transparent flex items-center justify-center z-10'>
                              <Loadder />
                        </div>
       }
        <Products />
        <Footer />
    </div>
  )
}
