'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, Facebook, Linkedin, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { FadeIn } from '@/components/shared/FadeIn';

export default function ContactPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      product: '',
      message: ''
    });
  };

  const socialLinks = [
    {
      icon: Facebook,
      name: 'Facebook',
      href: 'https://facebook.com/hegu-tech',
      color: 'text-blue-600'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/hegu-tech',
      color: 'text-blue-700'
    },
    {
      icon: MessageCircle,
      name: 'WhatsApp',
      href: 'https://wa.me/861234567890',
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isZh ? '您的姓名' : 'Your name'}
                      className="h-14 text-lg rounded-full px-6"
                    />
                  </div>

                  <div>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={isZh ? '邮箱地址' : 'Email address'}
                      className="h-14 text-lg rounded-full px-6"
                    />
                  </div>

                  <div>
                    <Input
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      placeholder={isZh ? '产品 / 数量' : 'Product / Quantity'}
                      className="h-14 text-lg rounded-full px-6"
                    />
                  </div>

                  <div>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isZh ? '留言' : 'Message'}
                      rows={6}
                      className="text-lg rounded-3xl px-6 py-4 resize-y"
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
                    <a href="mailto:info@hegu-tech.com" className="text-muted-foreground hover:text-primary transition-colors">
                      info@hegu-tech.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">+86 760 1234 5678</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Zhongshan, Guangdong, China</span>
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
