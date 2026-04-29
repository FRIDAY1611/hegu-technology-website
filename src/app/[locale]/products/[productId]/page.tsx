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
import { useProducts } from '@/contexts/ProductsContext';
import { createInquiry } from '@/lib/admin-data';

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

  const { getProduct, products } = useProducts();
  const product = getProduct(productId);
  
  if (!product) {
    return (
      <div className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Button variant="ghost" className="mb-8 -ml-2" asChild>
            <Link href={`/${locale}/products`}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              {isZh ? '返回产品列表' : 'Back to Products'}
            </Link>
          </Button>
          <div className="py-16">
            <h2 className="text-2xl font-bold mb-4">
              {isZh ? '产品未找到' : 'Product Not Found'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isZh ? '您访问的产品不存在' : 'The product you are looking for does not exist'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const title = product.title[locale as 'en' | 'zh'];
  const description = product.description[locale as 'en' | 'zh'];
  const seriesName = product.seriesName[locale as 'en' | 'zh'];

  const relatedProducts = products.filter((p: any) => p.series === product.series && p.id !== product.id).slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 创建询盘记录
    createInquiry({
      name: formData.name,
      company: formData.company || '',
      email: formData.email,
      phone: '',
      country: '',
      productInterest: product?.model || '',
      message: formData.message
    });
    
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
                        <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="rounded-full flex-1" onClick={() => setIsQuoteDialogOpen(true)}>
                  {isZh ? '获取报价' : 'Get Quote'}
                </Button>
                <Button variant="ghost" size="lg" className="rounded-full" asChild>
                  <Link href={`/${locale}/contact`}>
                    {isZh ? '联系我们' : 'Contact Us'}
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Features Section */}
        {product.features.length > 0 && (
          <section className="mb-20">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {isZh ? '核心功能' : 'Key Features'}
              </h2>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {product.features.map((feature, index) => (
                <FadeIn key={feature} delay={index * 0.1}>
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <FeatureIcon feature={feature} />
                    </div>
                    <p className="font-medium">{featureLabels[feature] || feature}</p>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {/* Packing Info Section */}
        <section className="mb-20">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {isZh ? '包装信息' : 'Packing Information'}
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">
                  {product.packingInfo['20GP']}
                </p>
                <p className="text-muted-foreground">20GP</p>
              </Card>
              <Card className="p-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">
                  {product.packingInfo['40GP']}
                </p>
                <p className="text-muted-foreground">40GP</p>
              </Card>
              <Card className="p-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">
                  {product.packingInfo['40HQ']}
                </p>
                <p className="text-muted-foreground">40HQ</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">{isZh ? '外箱尺寸' : 'Carton Size'}</p>
                <p className="font-medium">{product.packingInfo.cartonSize}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">{isZh ? '毛重' : 'Gross Weight'}</p>
                <p className="font-medium">{product.packingInfo.grossWeight}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">{isZh ? '净重' : 'Net Weight'}</p>
                <p className="font-medium">{product.packingInfo.netWeight}</p>
              </Card>
            </div>
          </FadeIn>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {isZh ? '相关产品' : 'Related Products'}
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct: any, index: number) => (
                <FadeIn key={relatedProduct.id} delay={index * 0.15}>
                  <Link href={`/${locale}/products/${relatedProduct.id}`}>
                    <Card className="overflow-hidden h-full group hover:shadow-xl transition-all duration-300">
                      <div className="aspect-square bg-muted/30 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-primary">{relatedProduct.model}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-2">
                          {relatedProduct.seriesName[locale as 'en' | 'zh']}
                        </span>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {relatedProduct.model}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {relatedProduct.description[locale as 'en' | 'zh']}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Quote Dialog */}
      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isZh ? '获取报价' : 'Get Quote'}
            </DialogTitle>
            <DialogDescription>
              {isZh 
                ? '填写以下信息，我们的团队将尽快与您联系。' 
                : 'Fill out the form below and our team will contact you shortly.'}
            </DialogDescription>
          </DialogHeader>

          {formSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isZh ? '感谢您的咨询！' : 'Thank you for your inquiry!'}
              </h3>
              <p className="text-muted-foreground">
                {isZh 
                  ? '我们将在24小时内与您联系。' 
                  : 'We will get back to you within 24 hours.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  required
                  placeholder={isZh ? '您的姓名' : 'Your Name'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Input
                  required
                  type="email"
                  placeholder={isZh ? '邮箱地址' : 'Email Address'}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Input
                  placeholder={isZh ? '公司名称' : 'Company Name'}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <Textarea
                  required
                  placeholder={isZh ? '请告诉我们您的需求...' : 'Tell us about your requirements...'}
                  rows={10}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <div className="pt-4">
                <Button type="submit" className="w-full">
                  {isZh ? '发送' : 'Send'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
