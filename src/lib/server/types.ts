// 认证相关类型
export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
}

export interface AuthSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
}

// 询盘相关类型
export interface Inquiry {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  interestedProduct?: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
  updatedAt: string;
}

// 产品相关类型
export interface ProductSpec {
  power?: string;
  waterTank?: string;
  mistOutput?: string;
  coverageArea?: string;
  noiseLevel?: string;
  dimensions?: string;
  weight?: string;
  voltage?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  model: string;
  series: 'AC' | 'DC' | 'Outdoor' | 'Industrial';
  title: Record<string, string>;
  description: Record<string, string>;
  specifications: ProductSpec;
  images: string[];
  packaging: {
    quantityPerCarton?: string;
    cartonSize?: string;
    grossWeight?: string;
    netWeight?: string;
  };
  features: Record<string, string[]>;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

// 系统设置相关类型
export interface SystemSettings {
  id: string;
  siteName: string;
  siteDescription: string;
  defaultLanguage: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    whatsapp?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// 语言翻译相关类型
export interface LanguageTranslations {
  [locale: string]: {
    [key: string]: string;
  };
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
