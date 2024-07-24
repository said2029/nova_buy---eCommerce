import axios from "axios";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    console.log("body",body);
    const data = await axios.post(
      "https://api.cloudinary.com/v1_1/dkygtb78m/image/upload",
      body
    );

    return NextResponse.json({ secure_url: data.data.secure_url }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error:error.message }, { status: 500 });
  }
}
