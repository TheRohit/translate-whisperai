import axios from "axios";
import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKEY = process.env.OPENAI_API_KEY;
  const body= new FormData();
  const filePath: string = "/tmp/test.mp4";
  const fileData = fs.readFileSync(filePath);
  const blob = new Blob([fileData], { type: "audio/mpeg" });
  body.append("file", blob, "test.mpeg");
  body.append("model", "whisper-1");
  body.append("response_format", "vtt");
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
