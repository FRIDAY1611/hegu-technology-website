'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Upload, Folder, Image, FileText, Download, Trash2 } from 'lucide-react';

const AdminMedia = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/admin');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const folders = ['all', 'products', 'certifications', 'factory', 'gallery'];

  const sampleFiles = [
    { id: 1, name: 'AC-series-banner.jpg', type: 'image/jpeg', size: '2.4 MB', folder: 'products', date: '2024-01-15' },
    { id: 2, name: 'DC-series-overview.png', type: 'image/png', size: '1.8 MB', folder: 'products', date: '2024-01-14' },
    { id: 3, name: 'ISO-certificate.pdf', type: 'application/pdf', size: '3.2 MB', folder: 'certifications', date: '2024-01-10' },
    { id: 4, name: 'factory-exterior.jpg', type: 'image/jpeg', size: '4.5 MB', folder: 'factory', date: '2024-01-08' },
    { id: 5, name: 'product-catalog.pdf', type: 'application/pdf', size: '8.9 MB', folder: 'products', date: '2024-01-05' },
    { id: 6, name: 'CE-certificate.pdf', type: 'application/pdf', size: '2.1 MB', folder: 'certifications', date: '2024-01-03' },
    { id: 7, name: 'production-line.jpg', type: 'image/jpeg', size: '5.6 MB', folder: 'factory', date: '2024-01-02' },
    { id: 8, name: 'team-photo.jpg', type: 'image/jpeg', size: '3.8 MB', folder: 'gallery', date: '2023-12-28' },
  ];

  const filteredFiles = sampleFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(search.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || file.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-8 h-8 text-blue-500" />;
    return <FileText className="w-8 h-8 text-red-500" />;
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push('/admin/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Button>
              <div>
                <h1 className="text-2xl font-bold">媒体管理</h1>
                <p className="text-gray-500">管理您的图片、文档和其他媒体文件</p>
              </div>
            </div>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              上传文件
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Folders */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border">
            {folders.map(folder => (
              <Button
                key={folder}
                variant={selectedFolder === folder ? 'default' : 'ghost'}
                onClick={() => setSelectedFolder(folder)}
                className="flex items-center gap-2"
              >
                {folder === 'all' ? <Folder className="w-4 h-4" /> : null}
                {folder === 'all' ? '全部' : 
                 folder === 'products' ? '产品' :
                 folder === 'certifications' ? '认证' :
                 folder === 'factory' ? '工厂' : '画廊'}
              </Button>
            ))}
          </div>
          
          <Input
            placeholder="搜索文件..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredFiles.map((file) => (
            <Card key={file.id} className="group hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                  {getFileIcon(file.type)}
                </div>
                <p className="text-sm font-medium truncate" title={file.name}>{file.name}</p>
                <p className="text-xs text-gray-500 mt-1">{file.size}</p>
              </CardContent>
              <CardFooter className="p-2 border-t flex justify-between gap-1">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-red-600 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">未找到文件</div>
            <p className="text-gray-500">尝试调整搜索条件或筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMedia;
