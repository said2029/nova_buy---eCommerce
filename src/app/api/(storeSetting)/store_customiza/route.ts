import AxiosClient from "@/lib/axios/AxiosClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await AxiosClient.put("/store_customiza/update", body);
    // TODO: save data to your database
    return NextResponse.json({ data: data.data });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message,
      },

      { status: 500 }
    );
  }
}
