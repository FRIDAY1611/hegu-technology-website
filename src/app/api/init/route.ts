import { NextRequest, NextResponse } from "next/server";
import {
  getAdminByEmail,
  createAdmin,
  getAllProducts,
  createProduct,
  getAllSettings,
  setSetting
} from "@/lib/server/db";

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json();
    
    // 简单的保护，防止意外调用
    if (secret !== "init-2024-hegu-tech") {
      return NextResponse.json(
        { error: "无权初始化数据" },
        { status: 403 }
      );
    }
    
    // 检查是否已经初始化过
    const existingAdmin = await getAdminByEmail("admin@hegu-tech.com");
    if (existingAdmin) {
      return NextResponse.json({ message: "数据已经初始化过了" });
    }
    
    console.log("开始初始化数据...");
    
    // 创建默认管理员
    console.log("创建默认管理员...");
    await createAdmin({
      email: "admin@hegu-tech.com",
      password: "admin123",
      name: "管理员"
    });
    
    // 检查是否已经有产品数据
    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) {
      console.log("创建默认产品数据...");
      
      // 创建一些示例产品
      const defaultProducts = [
        {
          model: "AC-100",
          series: "AC",
          titles: { en: "AC Misting Fan 100", zh: "AC喷雾风扇100" },
          descriptions: { en: "High performance AC misting fan", zh: "高性能AC喷雾风扇" },
          specifications: { power: "100W", tank: "10L", weight: "5kg" },
          order_index: 1,
          is_featured: true
        },
        {
          model: "DC-200",
          series: "DC",
          titles: { en: "DC Misting Fan 200", zh: "DC喷雾风扇200" },
          descriptions: { en: "Battery powered DC misting fan", zh: "电池供电DC喷雾风扇" },
          specifications: { power: "80W", tank: "8L", weight: "4kg" },
          order_index: 2,
          is_featured: true
        },
        {
          model: "OUT-300",
          series: "Outdoor",
          titles: { en: "Outdoor Misting Fan 300", zh: "户外喷雾风扇300" },
          descriptions: { en: "Weatherproof outdoor misting fan", zh: "防风雨户外喷雾风扇" },
          specifications: { power: "120W", tank: "15L", weight: "8kg" },
          order_index: 3,
          is_featured: false
        }
      ];
      
      for (const product of defaultProducts) {
        await createProduct(product);
      }
    }
    
    // 检查是否已经有设置数据
    const existingSettings = await getAllSettings();
    if (existingSettings.length === 0) {
      console.log("创建默认设置数据...");
      
      const defaultSettings = {
        siteName: "HEGU Technology",
        siteDescription: "Professional Misting Fan Manufacturer",
        defaultLanguage: "en",
        contactEmail: "info@hegu-tech.com",
        contactPhone: "+86 123 4567 8900",
        companyAddress: "No. 123 Industrial Zone, Zhejiang, China",
        socialFacebook: "https://facebook.com/hegu-tech",
        socialLinkedIn: "https://linkedin.com/company/hegu-tech",
        socialWhatsApp: "https://wa.me/8612345678900"
      };
      
      for (const [key, value] of Object.entries(defaultSettings)) {
        await setSetting(key, value);
      }
    }
    
    console.log("数据初始化完成！");
    
    return NextResponse.json({ 
      success: true, 
      message: "数据初始化成功" 
    });
  } catch (error) {
    console.error("初始化数据失败:", error);
    return NextResponse.json(
      { error: "初始化数据失败，请稍后重试" },
      { status: 500 }
    );
  }
}
