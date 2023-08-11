import { NextResponse } from "next/server";
import si from "systeminformation";

export async function GET() {
  try {
    const motherboard = await si.baseboard();
    return NextResponse.json(motherboard);
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
