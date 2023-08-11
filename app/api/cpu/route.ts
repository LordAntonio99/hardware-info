import { ICPU } from "@/types/CPU";
import { NextResponse } from "next/server";
import si from "systeminformation";

export async function GET() {
  try {
    const cpu: si.Systeminformation.CpuData = await si.cpu();
    return NextResponse.json(cpu);
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
