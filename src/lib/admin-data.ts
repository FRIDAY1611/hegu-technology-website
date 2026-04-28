// 管理后台数据管理模块 - 完整版本

import { Product, products as initialProducts } from './products';
export type { Product } from './products';

// 数据类型定义
export interface ProductData {
  id: string;
  model: string;
  series: 'AC' | 'DC' | 'Outdoor' | 'Industrial';
  description: Record<string, string>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryData {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  productInterest: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface MediaFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  folder: string;
  createdAt: string;
}

export interface LanguageText {
  [locale: string]: {
    [key: string]: string;
  };
}

export interface AdminSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  defaultLanguage: string;
  address: string;
  socialLinks: {
    facebook: string;
    linkedin: string;
    whatsapp: string;
  };
}

// 存储键
const STORAGE_KEYS = {
  PRODUCTS: 'hegu_admin_products',
  INQUIRIES: 'hegu_admin_inquiries',
  MEDIA: 'hegu_admin_media',
  LANGUAGES: 'hegu_admin_languages',
  SETTINGS: 'hegu_admin_settings'
};

// ========== 询盘管理 ==========
export function initializeInquiries(): InquiryData[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
  if (stored) {
    return JSON.parse(stored);
  }

  // 示例询盘数据
  const sampleInquiries: InquiryData[] = [
    {
      id: 'inquiry-1',
      name: 'John Smith',
      company: 'ABC Trading Co.',
      email: 'john@example.com',
      phone: '+1-234-567-8900',
      country: 'United States',
      productInterest: 'AC Series',
      message: 'We are interested in your mist fans. Please send us more information and pricing.',
      status: 'unread',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'inquiry-2',
      name: '张三',
      company: '某某贸易公司',
      email: 'zhangsan@example.com',
      phone: '+86-138-0000-0000',
      country: '中国',
      productInterest: 'DC Series',
      message: '您好，我想了解贵公司的直流喷雾风扇产品，请提供详细资料。',
      status: 'read',
      createdAt: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(sampleInquiries));
  return sampleInquiries;
}

export function getInquiries(): InquiryData[] {
  return initializeInquiries();
}

export function getInquiry(id: string): InquiryData | undefined {
  const inquiries = getInquiries();
  return inquiries.find(i => i.id === id);
}

export function updateInquiryStatus(id: string, status: InquiryData['status']): boolean {
  if (typeof window === 'undefined') return false;
  
  const inquiries = getInquiries();
  const index = inquiries.findIndex(i => i.id === id);
  if (index !== -1) {
    inquiries[index].status = status;
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    return true;
  }
  return false;
}

export function createInquiry(inquiry: Omit<InquiryData, 'id' | 'status' | 'createdAt'>): InquiryData {
  if (typeof window === 'undefined') {
    return { ...inquiry, id: '', status: 'unread', createdAt: '' };
  }
  
  const inquiries = getInquiries();
  const newInquiry: InquiryData = {
    ...inquiry,
    id: `inquiry-${Date.now()}`,
    status: 'unread',
    createdAt: new Date().toISOString()
  };
  inquiries.unshift(newInquiry);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  return newInquiry;
}

// ========== 产品管理 ==========
export function initializeProducts(): Product[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (stored) {
    return JSON.parse(stored, (key, value) => {
      if (key === 'createdAt') return new Date(value);
      return value;
    });
  }

  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
  return initialProducts;
}

export function getProducts(): Product[] {
  return initializeProducts();
}

export function getProduct(id: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.id === id);
}

export function updateProduct(id: string, updates: Partial<Product>): boolean {
  if (typeof window === 'undefined') return false;
  
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    return true;
  }
  return false;
}

export function createProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  if (typeof window === 'undefined') {
    return { ...product, id: '', createdAt: new Date() };
  }
  
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: `product-${Date.now()}`,
    createdAt: new Date()
  };
  products.unshift(newProduct);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  return newProduct;
}

export function deleteProduct(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length < products.length) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
    return true;
  }
  return false;
}

// ========== 媒体管理 ==========
export function initializeMedia(): MediaFile[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEYS.MEDIA);
  if (stored) {
    return JSON.parse(stored);
  }

  const sampleMedia: MediaFile[] = [
    {
      id: 'media-1',
      name: 'product-placeholder.jpg',
      type: 'image/jpeg',
      size: 102400,
      url: '',
      folder: 'products',
      createdAt: new Date().toISOString()
    }
  ];

  localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(sampleMedia));
  return sampleMedia;
}

export function getMedia(): MediaFile[] {
  return initializeMedia();
}

// ========== 语言管理 ==========
export function initializeLanguageTexts(): LanguageText {
  if (typeof window === 'undefined') return {};
  
  const stored = localStorage.getItem(STORAGE_KEYS.LANGUAGES);
  if (stored) {
    return JSON.parse(stored);
  }

  const defaultTexts: LanguageText = {
    zh: {},
    en: {},
    es: {},
    fr: {},
    de: {},
    ar: {}
  };

  localStorage.setItem(STORAGE_KEYS.LANGUAGES, JSON.stringify(defaultTexts));
  return defaultTexts;
}

export function getLanguageTexts(): LanguageText {
  return initializeLanguageTexts();
}

export function updateLanguageText(locale: string, key: string, value: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const texts = getLanguageTexts();
  if (!texts[locale]) {
    texts[locale] = {};
  }
  texts[locale][key] = value;
  localStorage.setItem(STORAGE_KEYS.LANGUAGES, JSON.stringify(texts));
  return true;
}

// ========== 设置管理 ==========
const defaultSettings: AdminSettings = {
  siteName: 'HEGU Technology',
  siteDescription: '专业喷雾风扇制造商',
  contactEmail: 'info@hegu-tech.com',
  contactPhone: '+86-757-12345678',
  defaultLanguage: 'en',
  address: 'Zhongshan, Guangdong, China',
  socialLinks: {
    facebook: 'https://facebook.com/hegu-tech',
    linkedin: 'https://linkedin.com/company/hegu-tech',
    whatsapp: 'https://wa.me/861234567890'
  }
};

export function initializeSettings(): AdminSettings {
  if (typeof window === 'undefined') return defaultSettings;
  
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (stored) {
    return { ...defaultSettings, ...JSON.parse(stored) };
  }

  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
  return defaultSettings;
}

export function getSettings(): AdminSettings {
  return initializeSettings();
}

export function updateSettings(settings: Partial<AdminSettings>): boolean {
  if (typeof window === 'undefined') return false;
  
  const currentSettings = getSettings();
  const newSettings = { ...currentSettings, ...settings };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
  
  // 触发自定义事件，通知所有组件设置已更新
  window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: newSettings }));
  
  return true;
}

// 获取设置的hook辅助函数
export function useSettings() {
  const [settings, setSettings] = useState<AdminSettings>(() => getSettings());
  
  useEffect(() => {
    const handleSettingsUpdate = (e: CustomEvent<AdminSettings>) => {
      setSettings(e.detail);
    };
    
    window.addEventListener('settingsUpdated', handleSettingsUpdate as EventListener);
    return () => {
      window.removeEventListener('settingsUpdated', handleSettingsUpdate as EventListener);
    };
  }, []);
  
  return { settings, updateSettings };
}

// 导入缺失的hook
import { useState, useEffect } from 'react';
