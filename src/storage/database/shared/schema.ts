import { pgTable, serial, text, varchar, timestamp, boolean, integer, jsonb, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// 管理员表
export const admins = pgTable(
  "admins",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password_hash: varchar("password_hash", { length: 255 }).notNull(),
    name: varchar("name", { length: 128 }).notNull(),
    is_active: boolean("is_active").default(true).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("admins_email_idx").on(table.email),
  ]
);

// 询盘表
export const inquiries = pgTable(
  "inquiries",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 255 }).notNull(),
    company: varchar("company", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }),
    country: varchar("country", { length: 100 }),
    interested_product: varchar("interested_product", { length: 255 }),
    message: text("message").notNull(),
    status: varchar("status", { length: 20 }).default("unread").notNull(), // unread, read, replied
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("inquiries_status_idx").on(table.status),
    index("inquiries_email_idx").on(table.email),
    index("inquiries_created_at_idx").on(table.created_at),
  ]
);

// 产品表
export const products = pgTable(
  "products",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    model: varchar("model", { length: 100 }).notNull().unique(),
    series: varchar("series", { length: 50 }).notNull(), // AC, DC, Outdoor, Industrial
    title: jsonb("title").notNull(), // 多语言标题 { zh: "...", en: "...", ... }
    description: jsonb("description").notNull(), // 多语言描述
    specifications: jsonb("specifications").notNull(), // 规格参数
    media: jsonb("media").notNull(), // 媒体资料
    packaging: jsonb("packaging").notNull(), // 包装信息
    features: jsonb("features").notNull(), // 功能特点
    is_active: boolean("is_active").default(true).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("products_series_idx").on(table.series),
    index("products_model_idx").on(table.model),
    index("products_is_active_idx").on(table.is_active),
  ]
);

// 系统设置表
export const settings = pgTable(
  "settings",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    site_name: varchar("site_name", { length: 255 }).default("HEGU Technology").notNull(),
    site_description: text("site_description"),
    default_language: varchar("default_language", { length: 10 }).default("en").notNull(),
    contact_email: varchar("contact_email", { length: 255 }).default("info@hegu-tech.com").notNull(),
    contact_phone: varchar("contact_phone", { length: 50 }),
    address: text("address"),
    social_links: jsonb("social_links").default(sql`'{"facebook": "", "linkedin": "", "whatsapp": ""}'`).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("settings_id_idx").on(table.id),
  ]
);

// 会话表
export const sessions = pgTable(
  "sessions",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => admins.id, { onDelete: "cascade" }),
    token: varchar("token", { length: 255 }).notNull().unique(),
    expires_at: timestamp("expires_at", { withTimezone: true }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("sessions_user_id_idx").on(table.user_id),
    index("sessions_token_idx").on(table.token),
    index("sessions_expires_at_idx").on(table.expires_at),
  ]
);

// 博客/新闻表
export const posts = pgTable(
  "posts",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    title: jsonb("title").notNull(), // 多语言标题 { zh: "...", en: "...", ... }
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    excerpt: jsonb("excerpt").notNull(), // 多语言摘要
    content: jsonb("content").notNull(), // 多语言内容
    cover_image: varchar("cover_image", { length: 500 }),
    author: varchar("author", { length: 255 }),
    category: varchar("category", { length: 100 }).default("news").notNull(), // news, blog, article
    tags: jsonb("tags").default(sql`'[]'`).notNull(),
    is_published: boolean("is_published").default(true).notNull(),
    published_at: timestamp("published_at", { withTimezone: true }),
    views: integer("views").default(0).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("posts_slug_idx").on(table.slug),
    index("posts_category_idx").on(table.category),
    index("posts_is_published_idx").on(table.is_published),
    index("posts_published_at_idx").on(table.published_at),
    index("posts_created_at_idx").on(table.created_at),
  ]
);
