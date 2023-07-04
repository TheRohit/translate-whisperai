import { TValidator } from "@/lib/validators/transcribe";

export async function POST(req:Request){
    try {
        const body = await req.json();
        const {text} = TValidator.parse(body);
        


    } catch (error) {
        
    }
}