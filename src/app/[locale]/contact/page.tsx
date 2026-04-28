'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, Facebook, Linkedin, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { FadeIn } from '@/components/shared/FadeIn';
import { createInquiry } from '@/lib/admin-data';
import { useSettings } from '@/contexts/SettingsContext';

export default function ContactPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';
  const { settings, isLoading } = useSettings();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    productInterest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 创建询盘记录，保存到localStorage
      createInquiry({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        productInterest: formData.productInterest,
        message: formData.message
      });
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        country: '',
        productInterest: '',
        message: ''
      });
    } catch (error) {
      console.error('提交询盘失败:', error);
      setIsSubmitting(false);
      alert(isZh ? '提交失败，请稍后重试' : 'Submit failed, please try again later');
    }
  };

  // 如果设置还在加载中，不显示内容
  if (isLoading) {
    return null;
  }

  const socialLinks = [
    {
      icon: Facebook,
      name: 'Facebook',
      href: settings.socialLinks.facebook,
      color: 'text-blue-600'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: settings.socialLinks.linkedin,
      color: 'text-blue-700'
    },
    {
      icon: MessageCircle,
      name: 'WhatsApp',
      href: settings.socialLinks.whatsapp,
      color: 'text-green-600'
    }
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inquiry Form */}
          <FadeIn>
            <Card className="p-8 lg:p-10 h-full">
              <h3 className="text-2xl font-bold mb-8">
                {isZh ? '发送询盘' : 'Send Inquiry'}
              </h3>
              
              {isSubmitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{isZh ? '感谢您！' : 'Thank You!'}</h3>
                  <p className="text-muted-foreground text-lg">
                    {isZh ? '您的询盘已成功发送。' : 'Your inquiry has been sent successfully.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isZh ? '您的姓名 *' : 'Your Name *'}
                        className="h-12 text-base rounded-full px-5"
                      />
                    </div>
                    <div>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={isZh ? '公司名称' : 'Company Name'}
                        className="h-12 text-base rounded-full px-5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={isZh ? '邮箱地址 *' : 'Email Address *'}
                        className="h-12 text-base rounded-full px-5"
                      />
                    </div>
                    <div>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={isZh ? '电话号码' : 'Phone Number'}
                        className="h-12 text-base rounded-full px-5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder={isZh ? '国家/地区' : 'Country/Region'}
                        className="h-12 text-base rounded-full px-5"
                      />
                    </div>
                    <div>
                      <Input
                        value={formData.productInterest}
                        onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                        placeholder={isZh ? '感兴趣的产品' : 'Interested Products'}
                        className="h-12 text-base rounded-full px-5"
                      />
                    </div>
                  </div>

                  <div>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isZh ? '留言 *' : 'Message *'}
                      rows={5}
                      className="text-base rounded-2xl px-5 py-4 resize-y"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-lg rounded-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (isZh ? '发送中...' : 'Sending...') : (isZh ? '发送询盘' : 'Submit Inquiry')}
                  </Button>
                </form>
              )}
            </Card>
          </FadeIn>

          {/* Social Media & Contact Info */}
          <FadeIn delay={0.2}>
            <Card className="p-8 lg:p-10 h-full">
              <h3 className="text-2xl font-bold mb-8">
                {isZh ? '社交媒体' : 'Social Media'}
              </h3>
              
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                {isZh 
                  ? '关注我们获取产品目录更新、采购协调和项目沟通。' 
                  : 'Connect with us for catalog updates, procurement coordination, and project communication.'}
              </p>

              <div className="space-y-4 mb-12">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-5 rounded-3xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-2xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform ${social.color}`}>
                      <social.icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-medium">{social.name}</span>
                  </a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="border-t border-border pt-8">
                <div className="flex flex-wrap justify-center gap-8">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <a href={`mailto:${settings.contactEmail}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {settings.contactEmail}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <a href={`tel:${settings.contactPhone}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {settings.contactPhone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">{settings.address}</span>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
