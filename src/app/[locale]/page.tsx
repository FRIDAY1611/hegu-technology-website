'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowRight, Globe, Award, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/shared/FadeIn';
import ProductCard from '@/components/shared/ProductCard';
import { getFeaturedProducts } from '@/lib/products';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';

  const slides = [
    {
      title: isZh ? '用精密喷雾冷却世界' : 'Cooling the World with Precision Mist',
      subtitle: isZh ? '中国唯一专注于喷雾风扇的专家' : "China's only specialist in mist fans",
      gradient: 'from-sky-500/20 to-blue-500/10'
    },
    {
      title: isZh ? '用精密喷雾冷却世界' : 'Cooling the World with Precision Mist',
      subtitle: isZh ? '中国唯一专注于喷雾风扇的专家' : "China's only specialist in mist fans",
      gradient: 'from-cyan-500/20 to-teal-500/10'
    },
    {
      title: isZh ? '用精密喷雾冷却世界' : 'Cooling the World with Precision Mist',
      subtitle: isZh ? '中国唯一专注于喷雾风扇的专家' : "China's only specialist in mist fans",
      gradient: 'from-blue-500/20 to-indigo-500/10'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient}`}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <FadeIn>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
                {slides[currentSlide].title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
                {slides[currentSlide].subtitle}
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full text-lg px-8">
                  <Link href={`/${locale}/products/ac-mist-fans`}>
                    {isZh ? '查看产品' : 'View Products'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8">
                  <Link href={`/${locale}/contact`}>
                    {isZh ? '联系我们' : 'Contact Us'}
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'w-8 bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

const AdvantagesSection = () => {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';
  
  const advantages = [
    {
      icon: Award,
      title: isZh ? '中国唯一专家' : "China's Only Specialist",
      description: isZh ? '专注于喷雾风扇技术与创新' : 'Focused exclusively on mist fan technology and innovation'
    },
    {
      icon: Globe,
      title: isZh ? '全球视野，本土经验' : 'Global Reach, Local Expertise',
      description: isZh ? '服务全球300多个品牌，覆盖多个大洲' : 'Serving 300+ brands across multiple continents'
    },
    {
      icon: Award,
      title: isZh ? '认证品质' : 'Certified Quality',
      description: isZh ? 'CE认证，符合全球标准' : 'CE certified and globally compliant standards'
    },
    {
      icon: Lightbulb,
      title: isZh ? '智能采购建议' : 'Smart Sourcing Advice',
      description: isZh ? '为您的特定冷却需求提供专业指导' : 'Expert guidance for your specific cooling needs'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            {isZh ? '为什么选择合谷科技' : 'Why Choose HEGU'}
          </h2>
        </FadeIn>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {advantages.map((advantage, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="p-8 lg:p-10 hover:shadow-lg transition-shadow duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <advantage.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductSeriesSection = () => {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';

  const series = [
    {
      key: 'acMistFans',
      href: `/${locale}/products/ac-mist-fans`,
      title: isZh ? '交流电喷雾风扇' : 'AC Mist Fans',
      description: isZh ? '可靠的室内冷却性能' : 'Reliable performance for indoor cooling',
      gradient: 'from-sky-100 to-blue-50'
    },
    {
      key: 'dcMistFans',
      href: `/${locale}/products/dc-mist-fans`,
      title: isZh ? '直流电喷雾风扇' : 'DC Mist Fans',
      description: isZh ? '节能高效，功能先进' : 'Energy-efficient with advanced features',
      gradient: 'from-cyan-100 to-teal-50'
    },
    {
      key: 'outdoorMistFans',
      href: `/${locale}/products/outdoor-mist-fans`,
      title: isZh ? '户外喷雾风扇' : 'Outdoor Mist Fans',
      description: isZh ? '为户外空间提供强劲冷却' : 'Powerful cooling for outdoor spaces',
      gradient: 'from-blue-100 to-indigo-50'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            {isZh ? '我们的产品系列' : 'Our Product Series'}
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {series.map((item, index) => (
            <FadeIn key={index} delay={index * 0.15}>
              <Link href={item.href}>
                <Card className="overflow-hidden h-full group hover:shadow-xl transition-all duration-300">
                  <div className={`aspect-[4/3] bg-gradient-to-br ${item.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-10 h-10 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {item.description}
                    </p>
                    <Button variant="default" className="rounded-full group-hover:translate-x-1 transition-transform">
                      {isZh ? '查看详情' : 'View Details'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProductsSection = () => {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            {isZh ? '精选产品' : 'Featured Products'}
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnersSection = () => {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';

  const countries = ['USA', 'Germany', 'Japan', 'UK', 'Australia', 'Canada', 'France', 'Italy', 'Spain', 'Netherlands', 'Brazil', 'Mexico', 'South Korea', 'India', 'Indonesia', 'Thailand', 'Vietnam', 'Malaysia', 'Philippines', 'Saudi Arabia', 'UAE', 'South Africa', 'Egypt', 'Nigeria', 'Kenya'];

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            {isZh ? '全球合作伙伴信赖之选' : 'Trusted by Partners Worldwide'}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            {isZh ? '覆盖50多个国家，持续增长中' : '50+ countries and growing'}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {countries.map((country, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                {country}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const CTASection = () => {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {isZh ? '准备好改变您的冷却体验了吗？' : 'Ready to Transform Your Cooling Experience?'}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            {isZh ? '加入数百家信赖合谷科技的品牌' : 'Join hundreds of brands who trust HEGU Technology'}
          </p>
          <Button asChild size="lg" className="rounded-full text-lg px-10">
            <Link href={`/${locale}/contact`}>
              {isZh ? '成为我们的合作伙伴' : 'Become Our Partner'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <div className="pt-16 lg:pt-20">
      <HeroSlider />
      <AdvantagesSection />
      <ProductSeriesSection />
      <FeaturedProductsSection />
      <PartnersSection />
      <CTASection />
    </div>
  );
}
