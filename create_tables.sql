-- 创建管理员表
CREATE TABLE IF NOT EXISTS admins (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(128) NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS admins_email_idx ON admins(email);

-- 创建询盘表
CREATE TABLE IF NOT EXISTS inquiries (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100),
  interested_product VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries(status);
CREATE INDEX IF NOT EXISTS inquiries_email_idx ON inquiries(email);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries(created_at);

-- 创建产品表
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  model VARCHAR(100) NOT NULL UNIQUE,
  series VARCHAR(50) NOT NULL,
  title JSONB NOT NULL,
  description JSONB NOT NULL,
  specifications JSONB NOT NULL,
  media JSONB NOT NULL,
  packaging JSONB NOT NULL,
  features JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS products_series_idx ON products(series);
CREATE INDEX IF NOT EXISTS products_model_idx ON products(model);
CREATE INDEX IF NOT EXISTS products_is_active_idx ON products(is_active);

-- 创建系统设置表
CREATE TABLE IF NOT EXISTS settings (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name VARCHAR(255) DEFAULT 'HEGU Technology' NOT NULL,
  site_description TEXT,
  default_language VARCHAR(10) DEFAULT 'en' NOT NULL,
  contact_email VARCHAR(255) DEFAULT 'info@hegu-tech.com' NOT NULL,
  contact_phone VARCHAR(50),
  address TEXT,
  social_links JSONB DEFAULT '{"facebook": "", "linkedin": "", "whatsapp": ""}' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS settings_id_idx ON settings(id);

-- 创建会话表
CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(36) NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_token_idx ON sessions(token);
CREATE INDEX IF NOT EXISTS sessions_expires_at_idx ON sessions(expires_at);

-- 创建博客/新闻表
CREATE TABLE IF NOT EXISTS posts (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  title JSONB NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt JSONB NOT NULL,
  content JSONB NOT NULL,
  cover_image VARCHAR(500),
  author VARCHAR(255),
  category VARCHAR(100) DEFAULT 'news' NOT NULL,
  tags JSONB DEFAULT '[]' NOT NULL,
  is_published BOOLEAN DEFAULT true NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts(slug);
CREATE INDEX IF NOT EXISTS posts_category_idx ON posts(category);
CREATE INDEX IF NOT EXISTS posts_is_published_idx ON posts(is_published);
CREATE INDEX IF NOT EXISTS posts_published_at_idx ON posts(published_at);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at);

-- 插入默认管理员账号 (密码: admin123)
INSERT INTO admins (email, password_hash, name) 
VALUES ('admin@hegu-tech.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhW', 'Admin')
ON CONFLICT (email) DO NOTHING;

-- 插入默认设置
INSERT INTO settings (site_name, site_description, default_language, contact_email)
VALUES ('HEGU Technology', 'China leading mist fan manufacturer', 'en', 'info@hegu-tech.com')
ON CONFLICT DO NOTHING;
