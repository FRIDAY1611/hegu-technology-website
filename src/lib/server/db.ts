import { getSupabaseClient } from "@/storage/database/supabase-client";
import type { InsertAdmin, SelectAdmin, SelectInquiry, InsertInquiry, SelectProduct, InsertProduct, SelectSetting, InsertSetting, SelectSession, InsertSession, InquiryStatus, ProductSeries } from "./types";

// ==================== 管理员相关操作 ====================

export async function getAdminByEmail(email: string): Promise<SelectAdmin | null> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("admins")
    .select("*")
    .eq("email", email)
    .maybeSingle();
  
  if (error) throw new Error(`获取管理员失败: ${error.message}`);
  return data as SelectAdmin | null;
}

export async function createAdmin(admin: InsertAdmin): Promise<SelectAdmin> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("admins")
    .insert(admin)
    .select()
    .single();
  
  if (error) throw new Error(`创建管理员失败: ${error.message}`);
  return data as SelectAdmin;
}

export async function updateAdminPassword(id: string, hashedPassword: string): Promise<void> {
  const client = getSupabaseClient();
  const { error } = await client
    .from("admins")
    .update({ hashed_password: hashedPassword, updated_at: new Date().toISOString() })
    .eq("id", id);
  
  if (error) throw new Error(`更新密码失败: ${error.message}`);
}

// ==================== 会话相关操作 ====================

export async function createSession(session: InsertSession): Promise<SelectSession> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("sessions")
    .insert(session)
    .select()
    .single();
  
  if (error) throw new Error(`创建会话失败: ${error.message}`);
  return data as SelectSession;
}

export async function getSessionByToken(token: string): Promise<SelectSession | null> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("sessions")
    .select("*")
    .eq("token", token)
    .maybeSingle();
  
  if (error) throw new Error(`获取会话失败: ${error.message}`);
  return data as SelectSession | null;
}

export async function deleteSession(token: string): Promise<void> {
  const client = getSupabaseClient();
  const { error } = await client
    .from("sessions")
    .delete()
    .eq("token", token);
  
  if (error) throw new Error(`删除会话失败: ${error.message}`);
}

export async function deleteExpiredSessions(): Promise<void> {
  const client = getSupabaseClient();
  const { error } = await client
    .from("sessions")
    .delete()
    .lt("expires_at", new Date().toISOString());
  
  if (error) throw new Error(`删除过期会话失败: ${error.message}`);
}

// ==================== 询盘相关操作 ====================

export async function getAllInquiries(): Promise<SelectInquiry[]> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) throw new Error(`获取询盘列表失败: ${error.message}`);
  return data as SelectInquiry[];
}

export async function getInquiryById(id: string): Promise<SelectInquiry | null> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  
  if (error) throw new Error(`获取询盘详情失败: ${error.message}`);
  return data as SelectInquiry | null;
}

export async function createInquiry(inquiry: InsertInquiry): Promise<SelectInquiry> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("inquiries")
    .insert(inquiry)
    .select()
    .single();
  
  if (error) throw new Error(`创建询盘失败: ${error.message}`);
  return data as SelectInquiry;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<SelectInquiry> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("inquiries")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  
  if (error) throw new Error(`更新询盘状态失败: ${error.message}`);
  return data as SelectInquiry;
}

export async function deleteInquiry(id: string): Promise<void> {
  const client = getSupabaseClient();
  const { error } = await client
    .from("inquiries")
    .delete()
    .eq("id", id);
  
  if (error) throw new Error(`删除询盘失败: ${error.message}`);
}

// ==================== 产品相关操作 ====================

export async function getAllProducts(): Promise<SelectProduct[]> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("products")
    .select("*")
    .order("model", { ascending: true });
  
  if (error) throw new Error(`获取产品列表失败: ${error.message}`);
  return data as SelectProduct[];
}

export async function getProductById(id: string): Promise<SelectProduct | null> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  
  if (error) throw new Error(`获取产品详情失败: ${error.message}`);
  return data as SelectProduct | null;
}

export async function getProductByModel(model: string): Promise<SelectProduct | null> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("model", model)
    .maybeSingle();
  
  if (error) throw new Error(`获取产品失败: ${error.message}`);
  return data as SelectProduct | null;
}

export async function createProduct(product: InsertProduct): Promise<SelectProduct> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("products")
    .insert(product)
    .select()
    .single();
  
  if (error) throw new Error(`创建产品失败: ${error.message}`);
  return data as SelectProduct;
}

export async function updateProduct(id: string, product: Partial<InsertProduct>): Promise<SelectProduct> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("products")
    .update({ ...product, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  
  if (error) throw new Error(`更新产品失败: ${error.message}`);
  return data as SelectProduct;
}

export async function deleteProduct(id: string): Promise<void> {
  const client = getSupabaseClient();
  const { error } = await client
    .from("products")
    .delete()
    .eq("id", id);
  
  if (error) throw new Error(`删除产品失败: ${error.message}`);
}

// ==================== 设置相关操作 ====================

export async function getAllSettings(): Promise<SelectSetting[]> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("settings")
    .select("*");
  
  if (error) throw new Error(`获取设置列表失败: ${error.message}`);
  return data as SelectSetting[];
}

export async function getSettingByKey(key: string): Promise<SelectSetting | null> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("settings")
    .select("*")
    .eq("key", key)
    .maybeSingle();
  
  if (error) throw new Error(`获取设置失败: ${error.message}`);
  return data as SelectSetting | null;
}

export async function upsertSetting(setting: InsertSetting): Promise<SelectSetting> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("settings")
    .upsert(setting, { onConflict: "key" })
    .select()
    .single();
  
  if (error) throw new Error(`更新设置失败: ${error.message}`);
  return data as SelectSetting;
}

export async function deleteSetting(key: string): Promise<void> {
  const client = getSupabaseClient();
  const { error } = await client
    .from("settings")
    .delete()
    .eq("key", key);
  
  if (error) throw new Error(`删除设置失败: ${error.message}`);
}

// ==================== 统计数据 ====================

export async function getStatistics() {
  const client = getSupabaseClient();
  
  const [
    { count: productCount, error: productError },
    { count: inquiryCount, error: inquiryError },
    { count: unreadCount, error: unreadError }
  ] = await Promise.all([
    client.from("products").select("*", { count: "exact", head: true }),
    client.from("inquiries").select("*", { count: "exact", head: true }),
    client.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "unread")
  ]);
  
  if (productError) throw new Error(`统计产品数失败: ${productError.message}`);
  if (inquiryError) throw new Error(`统计询盘数失败: ${inquiryError.message}`);
  if (unreadError) throw new Error(`统计未读询盘数失败: ${unreadError.message}`);
  
  return {
    productCount: productCount || 0,
    inquiryCount: inquiryCount || 0,
    unreadCount: unreadCount || 0
  };
}
