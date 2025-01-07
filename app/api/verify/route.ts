import { NextRequest, NextResponse } from "next/server";

async function handler(req : NextRequest) {
    const { params } = req;
    const reader = params.getReader();

    const decoder = new TextDecoder();
let decodedValue = {};

const { value, done } = await reader.read();

if (done) {
    console.log('Response body fully read');
} else {
     decodedValue = JSON.parse(decoder.decode(value));
     console.log(decodedValue , "this is the decoded value");
}
const chapa_key = process.env.CHAPA_KEY
const config = {
    headers: {
        Authorization: `Bearer ${chapa_key}`
    }
}

try {
    const data = await axios.get("https://api.chapa.co/v1/transaction/verify/" + decodedValue.id, config)
    console.log(data , "yes it worked")
    return NextResponse.json({ message: 'Payment verified'});

} catch (error) {
    return NextResponse.json({ message: 'Error happened while verifying' , error});

}
}

export { handler as POST }