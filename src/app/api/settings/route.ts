import { NextRequest, NextResponse } from "next/server";
import { getAllSettings, getSettingByKey, setSetting, deleteSetting } from "@/lib/server/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    
    if (key) {
      const setting = await getSettingByKey(key);
      if (!setting) {
        return NextResponse.json(
          { error: "设置不存在" },
          { status: 404 }
        );
      }
      return NextResponse.json(setting);
    }
    
    const settings = await getAllSettings();
    const settingsMap: Record<string, any> = {};
    settings.forEach(s => {
      settingsMap[s.key] = s.value;
    });
    
    return NextResponse.json(settingsMap);
  } catch (error) {
    console.error("获取设置失败:", error);
    return NextResponse.json(
      { error: "获取设置失败，请稍后重试" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.key || data.value === undefined) {
      return NextResponse.json(
        { error: "设置键和值不能为空" },
        { status: 400 }
      );
    }
    
    const setting = await setSetting(data.key, data.value);
    return NextResponse.json(setting, { status: 201 });
  } catch (error) {
    console.error("创建设置失败:", error);
    return NextResponse.json(
      { error: "创建设置失败，请稍后重试" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    
    if (!key) {
      return NextResponse.json(
        { error: "缺少设置键" },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    const setting = await setSetting(key, data.value);
    
    return NextResponse.json(setting);
  } catch (error) {
    console.error("更新设置失败:", error);
    return NextResponse.json(
      { error: "更新设置失败，请稍后重试" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    
    if (!key) {
      return NextResponse.json(
        { error: "缺少设置键" },
        { status: 400 }
      );
    }
    
    const success = await deleteSetting(key);
    if (!success) {
      return NextResponse.json(
        { error: "设置不存在" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("删除设置失败:", error);
    return NextResponse.json(
      { error: "删除设置失败，请稍后重试" },
      { status: 500 }
    );
  }
}
