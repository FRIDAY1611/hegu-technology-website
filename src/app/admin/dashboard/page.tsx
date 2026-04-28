'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    // 检查登录状态
    const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const email = localStorage.getItem('adminEmail') || '';
    
    if (!loggedIn) {
      router.push('/admin');
    } else {
      setIsLoggedIn(true);
      setAdminEmail(email);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminEmail');
    router.push('/admin');
  };

  if (!isLoggedIn) {
    return null; // 等待重定向
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* 顶部导航栏 */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-foreground">
                HEGU Tech
              </Link>
              <span className="text-sm text-muted-foreground">管理后台</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {adminEmail}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all text-sm font-medium"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* 欢迎卡片 */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            欢迎使用管理后台
          </h1>
          <p className="text-muted-foreground">
            这是合谷科技官网的独立管理后台
          </p>
        </div>

        {/* 快速统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground">13</h3>
            <p className="text-sm text-muted-foreground">产品总数</p>
          </div>

          <Link href="/admin/inquiries" className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all block">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground">2</h3>
            <p className="text-sm text-muted-foreground">询盘数</p>
          </Link>

          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground">6</h3>
            <p className="text-sm text-muted-foreground">语言版本</p>
          </div>

          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-.806-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground">4</h3>
            <p className="text-sm text-muted-foreground">产品系列</p>
          </div>
        </div>

        {/* 管理功能模块 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Link href="/admin/products" className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all block">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              产品管理
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              管理产品信息、规格参数、图片上传
            </p>
            <div className="w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all text-sm font-medium text-center">
              进入产品管理 →
            </div>
          </Link>

          <Link href="/admin/languages" className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all block">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              语言管理
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              管理多语言内容、翻译更新
            </p>
            <div className="w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all text-sm font-medium text-center">
              进入语言管理 →
            </div>
          </Link>

          <Link href="/admin/media" className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all block">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              媒体管理
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              管理上传文件、图片、文档
            </p>
            <div className="w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all text-sm font-medium text-center">
              进入媒体管理 →
            </div>
          </Link>

          <Link href="/admin/settings" className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all block">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              系统设置
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              管理账号、权限、系统配置
            </p>
            <div className="w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all text-sm font-medium text-center">
              进入系统设置 →
            </div>
          </Link>
        </div>

        {/* 返回前台链接 */}
        <div className="mt-8 text-center">
          <Link
            href="/en"
            className="text-muted-foreground hover:text-foreground text-sm transition-all"
          >
            ← 返回前台网站
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
