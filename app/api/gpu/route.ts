import { NextResponse } from "next/server";
import si from "systeminformation";

export async function GET() {
  try {
    const data = await si.graphics();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
