"use server";
import {z} from "zod";
import axios from "axios";
import { redirect } from "next/navigation";

interface ErrorMessage {
  errors: {
      email?: string;
      first_name?: string;
      last_name?:string;
  };
}


const validation = z.object({
    email : z.string({ invalid_type_error : "Please provide you email"}).email({ message : "Please provide a valid email"}),
    amount : z.string().nullable(),
    first_name : z.string({ invalid_type_error : "Please provide you first name"}),
    last_name : z.string({ invalid_type_error : "Please provide you last name"}),

})
const NEXTAUTH_URL = process.env.NEXTAUTH_URL


export const checkout = async(prevState:unknown ,formData : FormData): Promise<ErrorMessage> => {
     const validatePayment = validation.safeParse({
        email : formData.get("email"),
        amount : formData.get("amount"),
        first_name : formData.get("first_name"),
        last_name : formData.get("last_name")
     })

     if (!validatePayment.success) {
        return { errors: validatePayment.error.flatten().fieldErrors as ErrorMessage['errors'] };
    }     const { email ,amount ,first_name , last_name  } = validatePayment.data
      let url;
        try {
            url = await axios.post(`${NEXTAUTH_URL}/api/payment` ,{email , amount , first_name , last_name} )                 
        } catch (error) {
            console.log(error , "this is the error")
        } finally {
            redirect(url?.data)
        }
}