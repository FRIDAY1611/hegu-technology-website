import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/server/db";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    
    if (token) {
      await deleteSession(token);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("登出失败:", error);
    return NextResponse.json(
      { error: "登出失败，请稍后重试" },
      { status: 500 }
    );
  }
}
