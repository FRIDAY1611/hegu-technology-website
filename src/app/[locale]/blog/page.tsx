'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { use } from 'react';

// 定义博客类型
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string | null;
  author: string;
  status: 'draft' | 'published';
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPage = () => {
  const params = useParams();
  const locale = params.locale as string;
  
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.filter((blog: BlogPost) => blog.status === 'published'));
      }
    } catch (error) {
      console.error('加载博客失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {locale === 'zh' ? '博客动态' : 'Blog'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {locale === 'zh' 
                ? '了解喷雾风扇行业最新动态、技术分享和公司新闻' 
                : 'Discover the latest news, technology insights, and company updates'}
            </p>
          </div>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {locale === 'zh' ? '暂无文章' : 'No Posts Yet'}
              </h2>
              <p className="text-muted-foreground">
                {locale === 'zh' ? '敬请期待，我们正在努力创作中...' : 'Stay tuned, we are working on great content!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link 
                  key={blog.id}
                  href={`/${locale}/blog/${blog.id}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {blog.coverImage && (
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img 
                        src={blog.coverImage} 
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  {!blog.coverImage && (
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <svg className="w-16 h-16 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {blog.author && (
                        <span className="text-sm text-muted-foreground">
                          {blog.author}
                        </span>
                      )}
                      {blog.publishedAt && (
                        <span className="text-sm text-muted-foreground">
                          {formatDate(blog.publishedAt)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      {blog.excerpt || blog.content.substring(0, 150)}
                    </p>
                    <div className="mt-6">
                      <span className="inline-flex items-center text-primary font-medium group-hover:underline">
                        {locale === 'zh' ? '阅读更多' : 'Read More'}
                        <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
