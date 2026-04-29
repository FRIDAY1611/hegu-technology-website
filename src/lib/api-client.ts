// 前端API客户端 - 真正调用后端API
// 商用版本，不使用localStorage

// API基础路径
const API_BASE = "/api";

// 会话token存储
let sessionToken: string | null = null;

// 从localStorage加载token（仅用于会话恢复）
if (typeof window !== "undefined") {
  sessionToken = localStorage.getItem("session_token");
}

// 设置会话token
export function setSessionToken(token: string | null) {
  sessionToken = token;
  if (token) {
    localStorage.setItem("session_token", token);
  } else {
    localStorage.removeItem("session_token");
  }
}

// 获取会话token
export function getSessionToken(): string | null {
  return sessionToken;
}

// 检查是否已登录
export function isLoggedIn(): boolean {
  return !!sessionToken;
}

// 通用API请求函数
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  
  // 如果有token，添加到请求头
  if (sessionToken) {
    headers["Authorization"] = `Bearer ${sessionToken}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "API请求失败");
  }
  
  return data;
}

// ==================== 认证API ====================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
  };
}

// 登录
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const result = await apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
  
  // 保存token
  setSessionToken(result.token);
  
  return result;
}

// 登出
export async function logout(): Promise<void> {
  await apiRequest("/auth/logout", {
    method: "POST",
  });
  
  // 清除token
  setSessionToken(null);
}

// ==================== 询盘API ====================

export interface InquiryData {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  interested_product?: string;
  message: string;
}

export interface Inquiry extends InquiryData {
  id: string;
  status: "unread" | "read" | "replied";
  created_at: string;
}

// 获取所有询盘（需要登录）
export async function getInquiries(): Promise<Inquiry[]> {
  return apiRequest<Inquiry[]>("/inquiries");
}

// 获取单个询盘（需要登录）
export async function getInquiry(id: string): Promise<Inquiry> {
  return apiRequest<Inquiry>(`/inquiries/${id}`);
}

// 创建询盘（不需要登录）
export async function createInquiry(data: InquiryData): Promise<Inquiry> {
  return apiRequest<Inquiry>("/inquiries", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 更新询盘状态（需要登录）
export async function updateInquiryStatus(
  id: string,
  status: "unread" | "read" | "replied"
): Promise<Inquiry> {
  return apiRequest<Inquiry>(`/inquiries/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

// 删除询盘（需要登录）
export async function deleteInquiry(id: string): Promise<void> {
  return apiRequest(`/inquiries/${id}`, {
    method: "DELETE",
  });
}

// ==================== 产品API ====================

export interface Product {
  id: string;
  model: string;
  series: "AC" | "DC" | "Outdoor" | "Industrial";
  titles: Record<string, string>;
  descriptions: Record<string, string>;
  specifications: Record<string, string>;
  packaging?: Record<string, string>;
  features?: Record<string, string[]>;
  images?: string[];
  order_index: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductInput {
  model: string;
  series: "AC" | "DC" | "Outdoor" | "Industrial";
  titles: Record<string, string>;
  descriptions: Record<string, string>;
  specifications: Record<string, string>;
  packaging?: Record<string, string>;
  features?: Record<string, string[]>;
  images?: string[];
  order_index?: number;
  is_featured?: boolean;
}

// 获取所有产品（不需要登录）
export async function getProducts(): Promise<Product[]> {
  return apiRequest<Product[]>("/products");
}

// 获取单个产品（不需要登录）
export async function getProduct(id: string): Promise<Product> {
  return apiRequest<Product>(`/products/${id}`);
}

// 创建产品（需要登录）
export async function createProduct(data: ProductInput): Promise<Product> {
  return apiRequest<Product>("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 更新产品（需要登录）
export async function updateProduct(
  id: string,
  data: Partial<ProductInput>
): Promise<Product> {
  return apiRequest<Product>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// 删除产品（需要登录）
export async function deleteProduct(id: string): Promise<void> {
  return apiRequest(`/products/${id}`, {
    method: "DELETE",
  });
}

// ==================== 设置API ====================

export interface Settings {
  siteName: string;
  siteDescription: string;
  defaultLanguage: string;
  contactEmail: string;
  contactPhone: string;
  companyAddress: string;
  socialFacebook: string;
  socialLinkedIn: string;
  socialWhatsApp: string;
}

// 获取所有设置（不需要登录）
export async function getSettings(): Promise<Partial<Settings>> {
  return apiRequest<Partial<Settings>>("/settings");
}

// 获取单个设置（不需要登录）
export async function getSetting(key: string): Promise<string | null> {
  const settings = await getSettings();
  return settings[key as keyof Settings] || null;
}

// 更新设置（需要登录）
export async function updateSettings(
  data: Partial<Settings>
): Promise<Partial<Settings>> {
  return apiRequest<Partial<Settings>>("/settings", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// ==================== 数据初始化API ====================

// 初始化数据（需要secret）
export async function initData(secret: string): Promise<{ success: boolean; message: string }> {
  return apiRequest("/init", {
    method: "POST",
    body: JSON.stringify({ secret }),
  });
}
