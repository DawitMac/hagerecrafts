import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface DecodedValue {
    id: string; 
}

async function handler(req: NextRequest) {
    const { body } = req;
    const reader = body?.getReader();

    if (!reader) {
        return NextResponse.json({ message: 'Error: Request body reader is undefined' ,status : 400 });
    }

    const decoder = new TextDecoder();
    let decodedValue : DecodedValue = {id:''};

    try {
        const { value, done } = await reader.read();

        if (done) {
            console.log('Response body fully read');
        } else {
            decodedValue = JSON.parse(decoder.decode(value));
        }
    } catch (error) {
        console.error('Error reading the request body:', error);
        return NextResponse.json({ message: 'Error reading request body', status: 500, error });
    }

    const chapa_key = process.env.CHAPA_KEY;
    const config = {
        headers: {
            Authorization: `Bearer ${chapa_key}`
        }
    };

    try {
        const { data } = await axios.get(`https://api.chapa.co/v1/transaction/verify/${decodedValue.id}`, config);
        console.log(data, "yes it worked");
        return NextResponse.json({ message: 'Payment verified', status : 200 });
    } catch (error) {
        console.error('Error while verifying payment:', error);
        return NextResponse.json({ message: 'Error happened while verifying', status: 500, error });
    }
};


export { handler as GET };