import { TValidator } from "@/lib/validators/transcribe";
import axios from "axios";
import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKEY = process.env.OPENAI_API_KEY;
  const body= new FormData();
  const filePath: string = "./tmp/test.mp4";
  const fileData = fs.readFileSync(filePath);
  const blob = new Blob([fileData], { type: "video/mp4" });
  body.append("file", blob, "test.mp4");
  body.append("model", "whisper-1");
  try {
    const { data } = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      body,
      {
        headers: {
          Authorization: `Bearer ${apiKEY}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
     
    return NextResponse.json({ data });
  } catch (error:any) {
    console.log(error.response.data.error.message)
    return NextResponse.json({ message: "Error" })
  }

 }
