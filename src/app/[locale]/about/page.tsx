'use client';

import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Award, Globe, Target, Eye, Factory } from 'lucide-react';
import { FadeIn } from '@/components/shared/FadeIn';

export default function AboutPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';

  const milestones = [
    { year: '2015', title: isZh ? '成立' : 'Founded', description: isZh ? '合谷科技成立，致力于革新喷雾冷却技术' : 'HEGU Technology was established with a vision to revolutionize mist cooling' },
    { year: '2018', title: isZh ? '首次出口' : 'First Export', description: isZh ? '拓展国际市场，服务亚洲和欧洲客户' : 'Expanded to international markets, serving clients across Asia and Europe' },
    { year: '2020', title: isZh ? '获得认证' : 'Certification', description: isZh ? '获得CE认证，产品线扩展到20多个型号' : 'Achieved CE certification and expanded product line to 20+ models' },
    { year: '2023', title: isZh ? '全球覆盖' : 'Global Reach', description: isZh ? '现在服务全球50多个国家的300多个品牌' : 'Now serving 300+ brands in 50+ countries worldwide' }
  ];

  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {isZh ? '关于合谷科技' : 'About HEGU Technology'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {isZh ? '您值得信赖的喷雾冷却合作伙伴' : 'Your Trusted Partner in Mist Cooling'}
            </p>
          </div>
        </FadeIn>

        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {isZh ? '关于合谷科技' : 'About HEGU Technology'}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {isZh 
                    ? '合谷科技是中国领先的喷雾风扇制造专家。凭借多年的专注研发，我们已完善了精密冷却技术的艺术。' 
                    : "HEGU Technology is China's leading specialist in mist fan manufacturing. With years of dedicated research and development, we have perfected the art of precision cooling technology."}
                </p>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{isZh ? '品质第一' : 'Quality First'}</h3>
                      <p className="text-muted-foreground">{isZh ? '每款产品都经过严格的质量控制' : 'Every product undergoes rigorous quality control'}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{isZh ? '全球布局' : 'Global Presence'}</h3>
                      <p className="text-muted-foreground">{isZh ? '服务全球6大洲50多个国家的客户' : 'Serving clients in 50+ countries across 6 continents'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="aspect-[4/3] bg-muted rounded-3xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                      <Factory className="w-12 h-12 text-muted-foreground/40" />
                    </div>
                    <p className="text-muted-foreground/40">{isZh ? '我们的工厂' : 'Our Factory'}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn>
              <Card className="p-8 lg:p-10 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{isZh ? '我们的使命' : 'Our Mission'}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {isZh 
                    ? '提供创新、高品质的喷雾冷却解决方案，提升全球的舒适度和生产力。' 
                    : 'To provide innovative, high-quality mist cooling solutions that enhance comfort and productivity worldwide.'}
                </p>
              </Card>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card className="p-8 lg:p-10 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{isZh ? '我们的愿景' : 'Our Vision'}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {isZh 
                    ? '成为喷雾风扇技术的全球领导者，为质量、创新和可持续性树立标准。' 
                    : 'To be the global leader in mist fan technology, setting standards for quality, innovation, and sustainability.'}
                </p>
              </Card>
            </FadeIn>
          </div>
        </section>

        <section className="mb-24">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              {isZh ? '我们的历程' : 'Our Journey'}
            </h2>
          </FadeIn>
          
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <Card className="p-6 inline-block">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </Card>
                    </div>
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 border-4 border-background" />
                    <div className="w-0 md:w-1/2" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: isZh ? '国家' : 'Countries' },
              { number: '300+', label: isZh ? '品牌' : 'Brands' },
              { number: '20+', label: isZh ? '产品' : 'Products' },
              { number: '8+', label: isZh ? '年经验' : 'Years Experience' }
            ].map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="p-8 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
