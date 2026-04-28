// 管理后台数据管理模块 - 简化版本

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
  contactEmail: string;
  defaultLanguage: string;
}

// 存储键
const STORAGE_KEYS = {
  PRODUCTS: 'hegu_admin_products',
  INQUIRIES: 'hegu_admin_inquiries',
  MEDIA: 'hegu_admin_media',
  LANGUAGES: 'hegu_admin_languages',
  SETTINGS: 'hegu_admin_settings'
};

// 询盘管理
export function initializeInquiries(): InquiryData[] {
  const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.INQUIRIES) : null;
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

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(sampleInquiries));
  }
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
  const inquiries = getInquiries();
  const newInquiry: InquiryData = {
    ...inquiry,
    id: `inquiry-${Date.now()}`,
    status: 'unread',
    createdAt: new Date().toISOString()
  };
  inquiries.unshift(newInquiry);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }
  return newInquiry;
}

// 媒体管理
export function initializeMedia(): MediaFile[] {
  const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.MEDIA) : null;
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

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(sampleMedia));
  }
  return sampleMedia;
}

export function getMedia(): MediaFile[] {
  return initializeMedia();
}

// 语言管理
export function getLanguageTexts(): LanguageText {
  return {
    zh: {},
    en: {},
    es: {},
    fr: {},
    de: {},
    ar: {}
  };
}

// 设置管理
export function getSettings(): AdminSettings {
  return {
    siteName: 'HEGU Technology',
    contactEmail: 'info@hegu-tech.com',
    defaultLanguage: 'en'
  };
}

// 产品管理 - 简化版本
export function getProducts(): any[] {
  return [];
}
