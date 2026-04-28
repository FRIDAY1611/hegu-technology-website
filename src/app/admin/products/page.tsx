'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { products } from '@/lib/products';
import { ArrowLeft, Plus, Edit, Trash2, Eye } from 'lucide-react';

const AdminProducts = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const router = useRouter();

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/admin');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const seriesList = ['all', 'AC', 'DC', 'Outdoor', 'Industrial'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.model.toLowerCase().includes(search.toLowerCase());
    const matchesSeries = selectedSeries === 'all' || product.series === selectedSeries;
    return matchesSearch && matchesSeries;
  });

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
                <h1 className="text-2xl font-bold">产品管理</h1>
                <p className="text-gray-500">管理您的产品目录</p>
              </div>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新增产品
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Input
            placeholder="搜索产品型号..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <select
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            {seriesList.map(series => (
              <option key={series} value={series}>
                {series === 'all' ? '全部分类' : series}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2">{product.series}</Badge>
                    <CardTitle>{product.model}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {product.description.en}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400">产品图片</div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">功率</span>
                    <span>{product.specs.wattage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">水箱容量</span>
                    <span>{product.specs.waterCapacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">尺寸</span>
                    <span>{product.specs.dimensions}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                  <Switch id={`active-${product.id}`} checked={true} />
                  <label htmlFor={`active-${product.id}`} className="text-sm">启用</label>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">未找到产品</div>
            <p className="text-gray-500">尝试调整搜索条件或筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
