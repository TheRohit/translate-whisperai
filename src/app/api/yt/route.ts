
import { LinkValidator } from "@/lib/validators/link";
import ytdl from "ytdl-core";
import { z } from "zod";
import fs from "fs";
import path from "path";


export async function POST(req: Request) {
    try {
        const body= await req.json();
        const {url} = LinkValidator.parse(body)
        console.log('I came here bro')
       
        const audioStream = ytdl(url, {
           
            filter: "audio",
            
        });

        const videoMetaData = await ytdl.getBasicInfo(url);
       
        const audioPath = path.join('./tmp', "test.mp4");
        const audioFile = fs.createWriteStream(audioPath);
        console.log('now here')
        audioStream.pipe(audioFile);
        audioFile.on('finish', () => {
            console.log('Audio file downloaded successfully');
        });
        
        return new Response("OK")
      
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response("Invalid URL passed", { status: 422 });
        }
        return new Response("Could not Process", {
            status: 500,
        });
    }
}