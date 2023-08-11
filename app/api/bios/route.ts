import si from "systeminformation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await si.bios();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
