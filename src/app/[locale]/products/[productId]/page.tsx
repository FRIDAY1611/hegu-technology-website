'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FadeIn } from '@/components/shared/FadeIn';
import { getProductById, products, Product } from '@/lib/products';

const FeatureIcon = ({ feature }: { feature: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    oscillation: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    humidifier: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
    lowNoise: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0" /></svg>,
    energyEfficient: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    remoteControl: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    largeTank: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
  };

  return iconMap[feature] || <Check className="w-6 h-6" />;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const productId = params.productId as string;
  const isZh = locale === 'zh';
  
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const product = getProductById(productId);
  
  if (!product) {
    return (
      <div className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{isZh ? '产品未找到' : 'Product Not Found'}</h1>
          <Button asChild>
            <Link href={`/${locale}/products/ac-mist-fans`}>
              {isZh ? '返回产品' : 'Back to Products'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const title = product.title[locale as 'en' | 'zh'];
  const description = product.description[locale as 'en' | 'zh'];
  const seriesName = product.seriesName[locale as 'en' | 'zh'];

  const relatedProducts = products.filter(p => p.series === product.series && p.id !== product.id).slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setIsQuoteDialogOpen(false);
      setFormSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 2000);
  };

  const featureLabels: Record<string, string> = {
    oscillation: isZh ? '摇头与俯仰' : 'Oscillation & Tilt',
    humidifier: isZh ? '加湿功能' : 'Humidifier Function',
    lowNoise: isZh ? '低噪音' : 'Low Noise',
    energyEfficient: isZh ? '节能环保' : 'Energy Efficient',
    remoteControl: isZh ? '遥控控制' : 'Remote Control',
    largeTank: isZh ? '大水箱' : 'Large Water Tank'
  };

  const specLabels: Record<string, string> = {
    wattage: isZh ? '功率' : 'Wattage',
    waterCapacity: isZh ? '水箱容量' : 'Water Capacity',
    noiseLevel: isZh ? '噪音水平' : 'Noise Level',
    speedSettings: isZh ? '风速设置' : 'Speed Settings',
    oscillation: isZh ? '摇头功能' : 'Oscillation',
    timer: isZh ? '定时功能' : 'Timer',
    color: isZh ? '颜色' : 'Color',
    dimensions: isZh ? '尺寸' : 'Dimensions',
    weight: isZh ? '重量' : 'Weight'
  };

  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <Button variant="ghost" className="mb-8 -ml-2" asChild>
            <Link href={`/${locale}/products/${product.series.toLowerCase()}-mist-fans`.replace('outdoor-mist-fans', 'outdoor-mist-fans').replace('industrial-mist-fans', 'industrial-fans').replace('ac-mist-fans', 'ac-mist-fans').replace('dc-mist-fans', 'dc-mist-fans')}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              {isZh ? '返回' : 'Back'}
            </Link>
          </Button>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          <FadeIn>
            <div className="aspect-square bg-muted rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                    <svg className="w-12 h-12 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-lg text-muted-foreground/40 font-medium">{product.model}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                {seriesName}
              </span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {product.model}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                {description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{specLabels.wattage}</p>
                  <p className="text-lg font-semibold">{product.specs.wattage}</p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{specLabels.waterCapacity}</p>
                  <p className="text-lg font-semibold">{product.specs.waterCapacity}</p>
                </Card>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">{isZh ? '规格参数' : 'Specifications'}</h3>
                <div className="space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => {
                    if (value && value !== 'N/A') {
                      const label = specLabels[key] || key;
                      return (
                        <div key={key} className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium">{typeof value === 'boolean' ? (value ? (isZh ? '是' : 'Yes') : (isZh ? '否' : 'No')) : value}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">{isZh ? '功能特点' : 'Features'}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2 p-3 bg-muted rounded-xl">
                      <div className="text-primary">
                        <FeatureIcon feature={feature} />
                      </div>
                      <span className="text-sm">{featureLabels[feature] || feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button size="lg" className="rounded-full w-full sm:w-auto" onClick={() => setIsQuoteDialogOpen(true)}>
                {isZh ? '获取报价' : 'Request Quote'}
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">{isZh ? '包装信息' : 'Packing Information'}</h2>
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">{isZh ? '集装箱' : 'Container'}</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">{isZh ? '数量' : 'Quantity'}</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">{isZh ? '纸箱尺寸' : 'Carton Size'}</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">{isZh ? '毛重' : 'G.W'}</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">{isZh ? '净重' : 'N.W'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-6 py-4 font-medium">20GP</td>
                      <td className="px-6 py-4">{product.packingInfo['20GP']} pcs</td>
                      <td className="px-6 py-4">{product.packingInfo.cartonSize}</td>
                      <td className="px-6 py-4">{product.packingInfo.grossWeight}</td>
                      <td className="px-6 py-4">{product.packingInfo.netWeight}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">40GP</td>
                      <td className="px-6 py-4">{product.packingInfo['40GP']} pcs</td>
                      <td className="px-6 py-4">{product.packingInfo.cartonSize}</td>
                      <td className="px-6 py-4">{product.packingInfo.grossWeight}</td>
                      <td className="px-6 py-4">{product.packingInfo.netWeight}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">40HQ</td>
                      <td className="px-6 py-4">{product.packingInfo['40HQ']} pcs</td>
                      <td className="px-6 py-4">{product.packingInfo.cartonSize}</td>
                      <td className="px-6 py-4">{product.packingInfo.grossWeight}</td>
                      <td className="px-6 py-4">{product.packingInfo.netWeight}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </FadeIn>

        {relatedProducts.length > 0 && (
          <FadeIn>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">{isZh ? '相关产品' : 'Related Products'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct, index) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{isZh ? '获取报价' : 'Request Quote'}</DialogTitle>
            <DialogDescription>
              {isZh ? `为 ${product.model} 获取报价` : `Request a quote for ${product.model}`}
            </DialogDescription>
          </DialogHeader>
          
          {formSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{isZh ? '感谢您！' : 'Thank you!'}</h3>
              <p className="text-muted-foreground">{isZh ? '您的报价请求已成功提交。' : 'Your quote request has been submitted successfully.'}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{isZh ? '姓名' : 'Name'}</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={isZh ? '您的姓名' : 'Your name'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{isZh ? '邮箱' : 'Email'}</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{isZh ? '公司' : 'Company'}</label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder={isZh ? '您的公司' : 'Your company'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{isZh ? '留言' : 'Message'}</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={isZh ? '告诉我们您的需求...' : 'Tell us about your requirements...'}
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full rounded-full">
                {isZh ? '发送报价请求' : 'Send Quote Request'}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// 添加 ProductCard 组件的简化版本以避免导入问题
function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';

  const description = product.description[locale as 'en' | 'zh'];

  return (
    <FadeIn delay={index * 0.1}>
      <Link href={`/${locale}/products/${product.id}`}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Card className="overflow-hidden h-full bg-card hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-muted-foreground/40 font-medium">{product.model}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground">
                  {product.model}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {product.model}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  {product.specs.wattage}
                </span>
                <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  {product.specs.waterCapacity}
                </span>
              </div>
              
              <Button variant="default" className="w-full rounded-full">
                {isZh ? '查看详情' : 'View Details'}
              </Button>
            </div>
          </Card>
        </motion.div>
      </Link>
    </FadeIn>
  );
}
