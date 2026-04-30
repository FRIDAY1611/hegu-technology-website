'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// 定义博客类型
interface Post {
  id: string;
  title: any;
  slug: string;
  excerpt: any;
  content: any;
  cover_image: string | null;
  author: string | null;
  category: string;
  tags: any;
  is_published: boolean;
  published_at: string | null;
  views: number;
  created_at: string;
  updated_at: string;
}

const BlogDetailPage = () => {
  const params = useParams();
  const locale = params.locale as string;
  const blogId = params.blogId as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadPost();
  }, [blogId]);

  const loadPost = async () => {
    try {
      const response = await fetch(`/api/blogs?id=${blogId}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const data = result.data;
          if (!data.is_published) {
            setNotFound(true);
          } else {
            setPost(data);
          }
        } else {
          setNotFound(true);
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

  const getTitle = (post: Post) => {
    if (typeof post.title === 'string') return post.title;
    if (typeof post.title === 'object') {
      return post.title[locale] || post.title.en || post.title.zh || 'Untitled';
    }
    return 'Untitled';
  };

  const getExcerpt = (post: Post) => {
    if (typeof post.excerpt === 'string') return post.excerpt;
    if (typeof post.excerpt === 'object') {
      return post.excerpt[locale] || post.excerpt.en || post.excerpt.zh || '';
    }
    return '';
  };

  const getContent = (post: Post) => {
    if (typeof post.content === 'string') return post.content;
    if (typeof post.content === 'object') {
      return post.content[locale] || post.content.en || post.content.zh || '';
    }
    return '';
  };

  const formatDate = (date: string | null) => {
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

  if (notFound || !post) {
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

  const content = getContent(post);

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
              {post.author && (
                <span className="text-muted-foreground">
                  {post.author}
                </span>
              )}
              {(post.published_at || post.created_at) && (
                <span className="text-muted-foreground">
                  {formatDate(post.published_at || post.created_at)}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {getTitle(post)}
            </h1>
            {getExcerpt(post) && (
              <p className="text-xl text-muted-foreground">
                {getExcerpt(post)}
              </p>
            )}
          </header>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="mb-12">
              <div className="aspect-video bg-muted rounded-2xl overflow-hidden">
                <img 
                  src={post.cover_image} 
                  alt={getTitle(post)}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="text-foreground leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-muted-foreground">
                {locale === 'zh' ? '最后更新：' : 'Last updated: '}
                {formatDate(post.updated_at)}
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
