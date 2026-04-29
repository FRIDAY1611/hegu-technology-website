import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, generateId } from '@/lib/server/storage';
import type { AdminUser, AuthSession, ApiResponse } from '@/lib/server/types';
import { initAllData } from '@/lib/server/init-data';

// 初始化数据
initAllData();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Email and password are required'
      }, { status: 400 });
    }

    const admins = readData<AdminUser[]>('admins', []);
    const admin = admins.find(a => a.email === email);

    if (!admin) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Invalid credentials'
      }, { status: 401 });
    }

    // 简单的密码验证（生产环境应该使用bcrypt）
    if (admin.passwordHash !== password) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Invalid credentials'
      }, { status: 401 });
    }

    // 创建会话
    const session: AuthSession = {
      id: generateId(),
      userId: admin.id,
      token: generateId(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24小时
    };

    // 保存会话
    const sessions = readData<AuthSession[]>('sessions', []);
    sessions.push(session);
    writeData('sessions', sessions);

    return NextResponse.json<ApiResponse<{ token: string; user: { id: string; email: string; name: string } }>>({
      success: true,
      data: {
        token: session.token,
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
