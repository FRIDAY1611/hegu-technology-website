'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Edit, Trash2, Save, Eye, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

type Post = {
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
};

export default function BlogAdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    author: '',
    category: 'news',
    tags: '',
    is_published: false
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin');
      return;
    }
    loadPosts();
  }, [router]);

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/blogs');
      const result = await response.json();
      if (result.success) {
        setPosts(result.data);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (post?: Post) => {
    if (post) {
      setEditingPost(post);
      // 处理多语言字段，这里简化为取英文或直接使用
      const title = typeof post.title === 'string' ? post.title : 
                   (typeof post.title === 'object' ? (post.title.en || post.title.zh || '') : '');
      const excerpt = typeof post.excerpt === 'string' ? post.excerpt : 
                     (typeof post.excerpt === 'object' ? (post.excerpt.en || post.excerpt.zh || '') : '');
      const content = typeof post.content === 'string' ? post.content : 
                     (typeof post.content === 'object' ? (post.content.en || post.content.zh || '') : '');
      const tags = Array.isArray(post.tags) ? post.tags.join(', ') : '';
      
      setFormData({
        title,
        slug: post.slug,
        excerpt,
        content,
        cover_image: post.cover_image || '',
        author: post.author || '',
        category: post.category || 'news',
        tags,
        is_published: post.is_published
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        cover_image: '',
        author: '',
        category: 'news',
        tags: '',
        is_published: false
      });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      alert('请填写标题和Slug');
      return;
    }

    setSaving(true);
    try {
      // 构建多语言数据结构
      const titleData = {
        zh: formData.title,
        en: formData.title,
        es: formData.title,
        fr: formData.title,
        de: formData.title,
        ar: formData.title
      };
      const excerptData = {
        zh: formData.excerpt,
        en: formData.excerpt,
        es: formData.excerpt,
        fr: formData.excerpt,
        de: formData.excerpt,
        ar: formData.excerpt
      };
      const contentData = {
        zh: formData.content,
        en: formData.content,
        es: formData.content,
        fr: formData.content,
        de: formData.content,
        ar: formData.content
      };
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);

      const dataToSave = {
        title: titleData,
        slug: formData.slug,
        excerpt: excerptData,
        content: contentData,
        cover_image: formData.cover_image || null,
        author: formData.author || null,
        category: formData.category,
        tags: tagsArray,
        is_published: formData.is_published,
        published_at: formData.is_published ? new Date().toISOString() : null
      };

      const url = editingPost 
        ? `/api/blogs?id=${editingPost.id}` 
        : '/api/blogs';
      
      const method = editingPost ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dataToSave,
          ...(editingPost && { id: editingPost.id })
        })
      });

      const result = await response.json();
      if (result.success) {
        setDialogOpen(false);
        loadPosts();
      } else {
        alert('保存失败: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？')) return;

    try {
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      if (result.success) {
        loadPosts();
      } else {
        alert('删除失败: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('删除失败');
    }
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const getTitle = (post: Post) => {
    if (typeof post.title === 'string') return post.title;
    if (typeof post.title === 'object') return post.title.zh || post.title.en || 'Untitled';
    return 'Untitled';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-xl text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.push('/admin/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>
          <h1 className="text-3xl font-bold">博客管理</h1>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            新建文章
          </Button>
        </div>

        <div className="grid gap-6">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                暂无文章，点击"新建文章"开始
              </CardContent>
            </Card>
          ) : (
            posts.map(post => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{getTitle(post)}</CardTitle>
                        {post.is_published ? (
                          <Badge className="bg-green-500">已发布</Badge>
                        ) : (
                          <Badge variant="secondary">草稿</Badge>
                        )}
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author || '匿名'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.created_at).toLocaleDateString('zh-CN')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views} 浏览
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleOpenDialog(post)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(post.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? '编辑文章' : '新建文章'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">标题 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="输入文章标题"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-friendly-slug"
                    />
                    <Button type="button" variant="secondary" onClick={generateSlug}>
                      生成
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="author">作者</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="作者名称"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">分类</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="news, blog, article"
                  />
                </div>
                <div>
                  <Label htmlFor="tags">标签（逗号分隔）</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="标签1, 标签2, 标签3"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cover_image">封面图片URL</Label>
                <Input
                  id="cover_image"
                  value={formData.cover_image}
                  onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="excerpt">摘要</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="文章摘要"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="content">内容</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="文章内容"
                  rows={15}
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                />
                <Label htmlFor="is_published">立即发布</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? '保存中...' : '保存'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
