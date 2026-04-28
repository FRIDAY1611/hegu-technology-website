'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProducts, updateProduct, getProduct, type Product } from '@/lib/admin-data';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';

const AdminProducts = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/admin');
    } else {
      setIsLoggedIn(true);
      loadProducts();
    }
  }, [router]);

  const loadProducts = () => {
    setProducts(getProducts());
  };

  const seriesList = ['all', 'AC', 'DC', 'Outdoor', 'Industrial'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.model.toLowerCase().includes(search.toLowerCase());
    const matchesSeries = selectedSeries === 'all' || product.series === selectedSeries;
    return matchesSearch && matchesSeries;
  });

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setIsEditDialogOpen(true);
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;
    
    setIsSaving(true);
    
    try {
      updateProduct(editingProduct.id, editingProduct);
      setSaveSuccess(true);
      loadProducts();
      
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditDialogOpen(false);
      }, 1500);
    } catch (error) {
      console.error('保存产品失败:', error);
    } finally {
      setIsSaving(false);
    }
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
                  <div className="text-gray-400 text-sm text-center">
                    产品图片
                    <div className="text-xs mt-1">点击编辑可修改</div>
                  </div>
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
                  <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-600">
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

      {/* 编辑产品对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑产品</DialogTitle>
            <DialogDescription>
              修改产品详情和信息，保存后将立即生效
            </DialogDescription>
          </DialogHeader>

          {editingProduct && (
            <div className="space-y-6">
              <Tabs defaultValue="basic">
                <TabsList className="w-full">
                  <TabsTrigger value="basic">基本信息</TabsTrigger>
                  <TabsTrigger value="specs">规格参数</TabsTrigger>
                  <TabsTrigger value="media">媒体资料</TabsTrigger>
                  <TabsTrigger value="packing">包装信息</TabsTrigger>
                </TabsList>

                {/* 基本信息 */}
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>产品型号</Label>
                      <Input
                        value={editingProduct.model}
                        onChange={(e) => setEditingProduct({ ...editingProduct, model: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>产品系列</Label>
                      <select
                        value={editingProduct.series}
                        onChange={(e) => setEditingProduct({ 
                          ...editingProduct, 
                          series: e.target.value as any 
                        })}
                        className="w-full px-4 py-2 border rounded-lg"
                      >
                        <option value="AC">AC</option>
                        <option value="DC">DC</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Industrial">Industrial</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>英文标题</Label>
                    <Input
                      value={editingProduct.title.en}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        title: { ...editingProduct.title, en: e.target.value }
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>中文标题</Label>
                    <Input
                      value={editingProduct.title.zh}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        title: { ...editingProduct.title, zh: e.target.value }
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>英文描述</Label>
                    <Textarea
                      rows={4}
                      value={editingProduct.description.en}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        description: { ...editingProduct.description, en: e.target.value }
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>中文描述</Label>
                    <Textarea
                      rows={4}
                      value={editingProduct.description.zh}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        description: { ...editingProduct.description, zh: e.target.value }
                      })}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="featured"
                      checked={editingProduct.isFeatured}
                      onCheckedChange={(checked) => setEditingProduct({
                        ...editingProduct,
                        isFeatured: checked
                      })}
                    />
                    <Label htmlFor="featured">精选产品</Label>
                  </div>
                </TabsContent>

                {/* 规格参数 */}
                <TabsContent value="specs" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>功率</Label>
                      <Input
                        value={editingProduct.specs.wattage}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          specs: { ...editingProduct.specs, wattage: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>水箱容量</Label>
                      <Input
                        value={editingProduct.specs.waterCapacity}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          specs: { ...editingProduct.specs, waterCapacity: e.target.value }
                        })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>噪音水平</Label>
                      <Input
                        value={editingProduct.specs.noiseLevel || ''}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          specs: { ...editingProduct.specs, noiseLevel: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>风速设置</Label>
                      <Input
                        value={editingProduct.specs.speedSettings || ''}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          specs: { ...editingProduct.specs, speedSettings: e.target.value }
                        })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>尺寸</Label>
                      <Input
                        value={editingProduct.specs.dimensions}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          specs: { ...editingProduct.specs, dimensions: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>重量</Label>
                      <Input
                        value={editingProduct.specs.weight}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          specs: { ...editingProduct.specs, weight: e.target.value }
                        })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>颜色</Label>
                    <Input
                      value={editingProduct.specs.color || ''}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        specs: { ...editingProduct.specs, color: e.target.value }
                      })}
                    />
                  </div>
                </TabsContent>

                {/* 媒体资料 */}
                <TabsContent value="media" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <Label>产品图片</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {editingProduct.images.map((image: string, index: number) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <div className="text-center text-gray-400">
                            <div className="text-sm">图片 {index + 1}</div>
                            <div className="text-xs mt-1">点击上传</div>
                          </div>
                        </div>
                      ))}
                      <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200 cursor-pointer hover:border-gray-400">
                        <div className="text-center text-gray-400">
                          <Plus className="w-8 h-8 mx-auto mb-2" />
                          <div className="text-sm">添加图片</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      支持 JPG、PNG、WebP 格式，建议尺寸 800x800 像素
                    </p>
                  </div>
                </TabsContent>

                {/* 包装信息 */}
                <TabsContent value="packing" className="space-y-4 mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>20GP 装箱量</Label>
                      <Input
                        type="number"
                        value={editingProduct.packingInfo['20GP']}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          packingInfo: { ...editingProduct.packingInfo, '20GP': parseInt(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>40GP 装箱量</Label>
                      <Input
                        type="number"
                        value={editingProduct.packingInfo['40GP']}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          packingInfo: { ...editingProduct.packingInfo, '40GP': parseInt(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>40HQ 装箱量</Label>
                      <Input
                        type="number"
                        value={editingProduct.packingInfo['40HQ']}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          packingInfo: { ...editingProduct.packingInfo, '40HQ': parseInt(e.target.value) || 0 }
                        })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>外箱尺寸</Label>
                      <Input
                        value={editingProduct.packingInfo.cartonSize}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          packingInfo: { ...editingProduct.packingInfo, cartonSize: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>毛重</Label>
                      <Input
                        value={editingProduct.packingInfo.grossWeight}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          packingInfo: { ...editingProduct.packingInfo, grossWeight: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>净重</Label>
                      <Input
                        value={editingProduct.packingInfo.netWeight}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          packingInfo: { ...editingProduct.packingInfo, netWeight: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              取消
            </Button>
            <Button onClick={handleSaveProduct} disabled={isSaving}>
              {isSaving ? (
                '保存中...'
              ) : saveSuccess ? (
                <>
                  <div className="w-4 h-4 mr-2 rounded-full bg-green-500" />
                  保存成功！
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  保存更改
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
