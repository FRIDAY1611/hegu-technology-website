'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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

const BlogDetailPage = () => {
  const params = useParams();
  const locale = params.locale as string;
  const blogId = params.blogId as string;
  
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadBlog();
  }, [blogId]);

  const loadBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.status !== 'published') {
          setNotFound(true);
        } else {
          setBlog(data);
        }
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('加载博客失败:', error);
      setNotFound(true);
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

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            {locale === 'zh' ? '文章未找到' : 'Post Not Found'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {locale === 'zh' ? '您访问的文章不存在或已被删除' : 'The post you are looking for does not exist or has been removed'}
          </p>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {locale === 'zh' ? '返回博客' : 'Back to Blog'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {locale === 'zh' ? '返回博客' : 'Back to Blog'}
          </Link>
        </div>
      </div>

      {/* Hero */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              {blog.author && (
                <span className="text-muted-foreground">
                  {blog.author}
                </span>
              )}
              {blog.publishedAt && (
                <span className="text-muted-foreground">
                  {formatDate(blog.publishedAt)}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="text-xl text-muted-foreground">
                {blog.excerpt}
              </p>
            )}
          </header>

          {/* Cover Image */}
          {blog.coverImage && (
            <div className="mb-12">
              <div className="aspect-video bg-muted rounded-2xl overflow-hidden">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div 
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
            />
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-muted-foreground">
                {locale === 'zh' ? '最后更新：' : 'Last updated: '}
                {formatDate(blog.updatedAt)}
              </div>
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {locale === 'zh' ? '查看更多文章' : 'View More Posts'}
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;
