import { NextRequest, NextResponse } from "next/server";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
} from "@/lib/server/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const stats = searchParams.get("stats");
    const series = searchParams.get("series");
    
    if (stats === "true") {
      const result = await getProductStats();
      return NextResponse.json(result);
    }
    
    if (id) {
      const product = await getProductById(id);
      if (!product) {
        return NextResponse.json(
          { error: "产品不存在" },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    }
    
    const products = await getAllProducts(series || undefined);
    return NextResponse.json(products);
  } catch (error) {
    console.error("获取产品失败:", error);
    return NextResponse.json(
      { error: "获取产品失败，请稍后重试" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.model || !data.series) {
      return NextResponse.json(
        { error: "型号和系列不能为空" },
        { status: 400 }
      );
    }
    
    const product = await createProduct({
      model: data.model,
      series: data.series,
      titles: data.titles || {},
      descriptions: data.descriptions || {},
      specifications: data.specifications || {},
      packaging: data.packaging || {},
      media: data.media || {},
      features: data.features || {},
      order_index: data.order_index || 0,
      is_featured: data.is_featured || false
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("创建产品失败:", error);
    return NextResponse.json(
      { error: "创建产品失败，请稍后重试" },
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
        { error: "缺少产品ID" },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    const product = await updateProduct(id, data);
    
    if (!product) {
      return NextResponse.json(
        { error: "产品不存在" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error("更新产品失败:", error);
    return NextResponse.json(
      { error: "更新产品失败，请稍后重试" },
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
        { error: "缺少产品ID" },
        { status: 400 }
      );
    }
    
    const success = await deleteProduct(id);
    if (!success) {
      return NextResponse.json(
        { error: "产品不存在" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("删除产品失败:", error);
    return NextResponse.json(
      { error: "删除产品失败，请稍后重试" },
      { status: 500 }
    );
  }
}
