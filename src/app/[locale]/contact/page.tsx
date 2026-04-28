'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check } from 'lucide-react';
import { FadeIn } from '@/components/shared/FadeIn';
import { products } from '@/lib/products';

export default function ContactPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
    'Australia', 'Japan', 'South Korea', 'India', 'Brazil',
    'Mexico', 'Spain', 'Italy', 'Netherlands', 'Belgium',
    'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland',
    'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Bulgaria',
    'Greece', 'Portugal', 'Ireland', 'New Zealand', 'Singapore',
    'Malaysia', 'Thailand', 'Vietnam', 'Indonesia', 'Philippines',
    'Saudi Arabia', 'UAE', 'South Africa', 'Egypt', 'Nigeria',
    'Kenya', 'Morocco', 'China', 'Hong Kong', 'Taiwan'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      country: '',
      interest: '',
      message: ''
    });
  };

  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {isZh ? '联系我们' : 'Contact Us'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isZh ? '让我们开始对话' : 'Let\'s Start a Conversation'}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <FadeIn className="lg:col-span-3">
            <Card className="p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{isZh ? '感谢您！' : 'Thank You!'}</h3>
                  <p className="text-muted-foreground">
                    {isZh ? '您的询盘已成功发送。' : 'Your inquiry has been sent successfully.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">{isZh ? '您的姓名' : 'Your Name'} *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isZh ? '您的姓名' : 'Your name'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{isZh ? '公司名称' : 'Company Name'}</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={isZh ? '您的公司' : 'Your company'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">{isZh ? '电子邮箱' : 'Email Address'} *</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{isZh ? '电话号码' : 'Phone Number'}</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">{isZh ? '国家' : 'Country'} *</label>
                      <Select
                        required
                        value={formData.country}
                        onValueChange={(value) => setFormData({ ...formData, country: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={isZh ? '选择国家' : 'Select country'} />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{isZh ? '感兴趣的产品' : 'Interested Products'}</label>
                      <Select
                        value={formData.interest}
                        onValueChange={(value) => setFormData({ ...formData, interest: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={isZh ? '选择产品' : 'Select product'} />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{isZh ? '您的留言' : 'Your Message'} *</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isZh ? '告诉我们您的需求...' : 'Tell us about your requirements...'}
                      rows={5}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (isZh ? '发送中...' : 'Sending...') : (isZh ? '发送询盘' : 'Send Inquiry')}
                  </Button>
                </form>
              )}
            </Card>
          </FadeIn>

          <FadeIn className="lg:col-span-2" delay={0.2}>
            <div className="space-y-6">
              <Card className="p-8">
                <h3 className="text-xl font-bold mb-6">{isZh ? '联系信息' : 'Contact Information'}</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{isZh ? '地址' : 'Address'}</h4>
                      <p className="text-muted-foreground">
                        Zhongshan, Guangdong Province<br />
                        China
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{isZh ? '邮箱' : 'Email'}</h4>
                      <p className="text-muted-foreground">
                        <a href="mailto:info@hegu-tech.com" className="hover:text-primary transition-colors">
                          info@hegu-tech.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{isZh ? '电话' : 'Phone'}</h4>
                      <p className="text-muted-foreground">
                        +86 760 1234 5678
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-0 overflow-hidden">
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground/40">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p>Google Maps</p>
                  </div>
                </div>
              </Card>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
