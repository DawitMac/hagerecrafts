import { NextRequest, NextResponse } from 'next/server';
import axios from "axios";

 async function handler(req : NextRequest) {
    const { body } = req;
    const reader = body?.getReader();

const decoder = new TextDecoder();
let decodedValue = {email : "", amount : "" , first_name : "" , last_name : ""};

const { value, done } = await reader.read();

if (done) {
    console.log('Response body fully read');
} else {
     decodedValue = JSON.parse(decoder.decode(value));
     console.log(decodedValue , "this is the decoded value");

}

    const CHAPA_URL = process.env.CHAPA_URL
    const chapa_key = process.env.CHAPA_KEY
    const tx_ref = `negade-tx-12345678sss9${Date.now()}`;
    const NEXTAUTH_URL = process.env.NEXTAUTH_URL

    const info = {
        amount : decodedValue?.amount, 
        currency: 'ETB',
        email : decodedValue.email,
        first_name : decodedValue.first_name,
        last_name : decodedValue.last_name,
        tx_ref: tx_ref,
        callback_url: `${NEXTAUTH_URL}/api/verify/` + tx_ref,
        return_url: `${NEXTAUTH_URL}/checkout/sucess`
    }
    console.log(info , "info")
    const config = {
        headers: {
            Authorization: `Bearer ${chapa_key}`
        }
    }
try{
       const {data} =  await axios.post(CHAPA_URL, info, config)
             console.log(data , "yes it worked")
             return NextResponse.json(data.data.checkout_url);
             }
    catch(error){
        return NextResponse.json({ message: 'Error happened' , error});
    }
    

}
export { handler as POST }


