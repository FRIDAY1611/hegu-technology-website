import { NextRequest, NextResponse } from "next/server";
import { getAdminByEmail, createSession, deleteExpiredSessions } from "@/lib/server/db";
import crypto from "crypto";

const SESSION_TOKEN_LENGTH = 64;
const SESSION_EXPIRES_HOURS = 24;

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: "邮箱和密码不能为空" },
        { status: 400 }
      );
    }
    
    // 删除过期会话
    await deleteExpiredSessions();
    
    // 获取管理员
    const admin = await getAdminByEmail(email);
    if (!admin) {
      return NextResponse.json(
        { error: "邮箱或密码错误" },
        { status: 401 }
      );
    }
    
    // 简单的密码验证（实际项目中应该使用bcrypt等加密）
    // 这里使用简单的明文比较，仅作演示
    if (admin.hashed_password !== password) {
      return NextResponse.json(
        { error: "邮箱或密码错误" },
        { status: 401 }
      );
    }
    
    // 生成会话token
    const token = crypto.randomBytes(SESSION_TOKEN_LENGTH).toString("hex");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + SESSION_EXPIRES_HOURS);
    
    // 创建会话
    const session = await createSession({
      token,
      admin_id: admin.id,
      expires_at: expiresAt.toISOString()
    });
    
    return NextResponse.json({
      success: true,
      token: session.token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    });
  } catch (error) {
    console.error("登录失败:", error);
    return NextResponse.json(
      { error: "登录失败，请稍后重试" },
      { status: 500 }
    );
  }
}
