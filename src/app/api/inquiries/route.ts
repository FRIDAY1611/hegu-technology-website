import { NextRequest, NextResponse } from "next/server";
import {
  getAllInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  deleteInquiry,
  getInquiryStats
} from "@/lib/server/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const stats = searchParams.get("stats");
    
    if (stats === "true") {
      const result = await getInquiryStats();
      return NextResponse.json(result);
    }
    
    if (id) {
      const inquiry = await getInquiryById(id);
      if (!inquiry) {
        return NextResponse.json(
          { error: "询盘不存在" },
          { status: 404 }
        );
      }
      return NextResponse.json(inquiry);
    }
    
    const inquiries = await getAllInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("获取询盘失败:", error);
    return NextResponse.json(
      { error: "获取询盘失败，请稍后重试" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "姓名、邮箱和留言不能为空" },
        { status: 400 }
      );
    }
    
    const inquiry = await createInquiry({
      name: data.name,
      company: data.company || null,
      email: data.email,
      phone: data.phone || null,
      country: data.country || null,
      interested_product: data.interested_product || null,
      message: data.message,
      status: "unread",
      read_at: null,
      replied_at: null
    });
    
    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error("创建询盘失败:", error);
    return NextResponse.json(
      { error: "创建询盘失败，请稍后重试" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "缺少询盘ID" },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    const inquiry = await updateInquiry(id, data);
    
    if (!inquiry) {
      return NextResponse.json(
        { error: "询盘不存在" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("更新询盘失败:", error);
    return NextResponse.json(
      { error: "更新询盘失败，请稍后重试" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "缺少询盘ID" },
        { status: 400 }
      );
    }
    
    const success = await deleteInquiry(id);
    if (!success) {
      return NextResponse.json(
        { error: "询盘不存在" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("删除询盘失败:", error);
    return NextResponse.json(
      { error: "删除询盘失败，请稍后重试" },
      { status: 500 }
    );
  }
}
