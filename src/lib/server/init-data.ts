import { readData, writeData, generateId } from './storage';
import type { AdminUser, Product, SystemSettings, LanguageTranslations } from './types';
import { defaultProducts } from '@/lib/products';

// 默认管理员账号
const DEFAULT_ADMIN: AdminUser = {
  id: generateId(),
  email: 'admin@hegu-tech.com',
  passwordHash: 'admin123', // 实际生产中应该使用bcrypt哈希
  name: 'Admin',
  createdAt: new Date().toISOString()
};

// 默认系统设置
const DEFAULT_SETTINGS: SystemSettings = {
  id: generateId(),
  siteName: 'HEGU Technology',
  siteDescription: 'Professional mist fan manufacturer',
  defaultLanguage: 'en',
  contactEmail: 'info@hegu-tech.com',
  contactPhone: '+86 123 4567 8900',
  address: 'No. 888, Industrial Park, Shenzhen, China',
  socialLinks: {
    facebook: 'https://facebook.com/hegu-tech',
    linkedin: 'https://linkedin.com/company/hegu-tech',
    whatsapp: 'https://wa.me/8612345678900'
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// 初始化管理员数据
export function initAdminData(): void {
  const admins = readData<AdminUser[]>('admins', []);
  if (admins.length === 0) {
    writeData('admins', [DEFAULT_ADMIN]);
    console.log('✅ Default admin account created');
  }
}

// 初始化产品数据
export function initProductsData(): void {
  const products = readData<Product[]>('products', []);
  if (products.length === 0) {
    const convertedProducts: Product[] = defaultProducts.map(p => ({
      id: generateId(),
      model: p.model,
      series: p.series as any,
      title: p.title,
      description: p.description,
      specifications: {
        power: p.specifications?.power,
        waterTank: p.specifications?.waterTank,
        mistOutput: p.specifications?.mistOutput,
        coverageArea: p.specifications?.coverageArea,
        noiseLevel: p.specifications?.noiseLevel,
        dimensions: p.specifications?.dimensions,
        weight: p.specifications?.weight,
        voltage: p.specifications?.voltage
      },
      images: p.images || [],
      packaging: {
        quantityPerCarton: p.packaging?.quantityPerCarton,
        cartonSize: p.packaging?.cartonSize,
        grossWeight: p.packaging?.grossWeight,
        netWeight: p.packaging?.netWeight
      },
      features: p.features || {},
      isFeatured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    writeData('products', convertedProducts);
    console.log('✅ Default products data created');
  }
}

// 初始化系统设置
export function initSettingsData(): void {
  const settings = readData<SystemSettings>('settings', null as any);
  if (!settings) {
    writeData('settings', DEFAULT_SETTINGS);
    console.log('✅ Default settings created');
  }
}

// 初始化询盘数据（空数组）
export function initInquiriesData(): void {
  const inquiries = readData('inquiries', []);
  if (inquiries.length === 0) {
    writeData('inquiries', []);
    console.log('✅ Inquiries data initialized');
  }
}

// 初始化语言翻译数据
export function initTranslationsData(): void {
  const translations = readData<LanguageTranslations>('translations', {});
  if (Object.keys(translations).length === 0) {
    // 从locales目录读取默认翻译
    writeData('translations', {});
    console.log('✅ Translations data initialized');
  }
}

// 初始化所有数据
export function initAllData(): void {
  console.log('🔧 Initializing backend data...');
  initAdminData();
  initProductsData();
  initSettingsData();
  initInquiriesData();
  initTranslationsData();
  console.log('✅ All backend data initialized!');
}
