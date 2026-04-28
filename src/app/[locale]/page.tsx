'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Award, Lightbulb, Check, Facebook, Linkedin, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FadeIn } from '@/components/shared/FadeIn';
import ProductCard from '@/components/shared/ProductCard';
import { getFeaturedProducts } from '@/lib/products';

const getPageTexts = (locale: string) => {
  switch (locale) {
    case 'zh':
      return {
        heroTitle: '用精密喷雾冷却世界',
        heroSubtitle: '中国唯一专注于喷雾风扇的专家',
        viewProducts: '查看产品',
        contactUs: '联系我们',
        advantagesTitle: '为什么选择合谷科技',
        specialist: { title: '中国唯一专家', desc: '专注于喷雾风扇技术与创新' },
        global: { title: '全球视野，本土经验', desc: '服务全球300多个品牌，覆盖多个大洲' },
        quality: { title: '认证品质', desc: 'CE认证，符合全球标准' },
        sourcing: { title: '智能采购建议', desc: '为您的特定冷却需求提供专业指导' },
        productSeriesTitle: '我们的产品系列',
        ac: { title: '交流电喷雾风扇', desc: '可靠的室内冷却性能' },
        dc: { title: '直流电喷雾风扇', desc: '节能高效，功能先进' },
        outdoor: { title: '户外喷雾风扇', desc: '为户外空间提供强劲冷却' },
        viewDetails: '查看详情',
        featuredProductsTitle: '精选产品',
        viewAllProducts: '查看全部产品',
        certificationsTitle: '工厂资质与产品认证',
        certificationsSubtitle: '严格的质量控制，完善的认证体系',
        factoryQualifications: '工厂资质',
        productCertifications: '产品认证',
        partnersTitle: '全球合作伙伴信赖之选',
        partnersSubtitle: '覆盖50多个国家，持续增长中',
        ctaTitle: '准备好改变您的冷却体验了吗？',
        ctaSubtitle: '加入数百家信赖合谷科技的品牌',
        sendInquiry: '发送询盘',
        yourName: '您的姓名',
        emailAddress: '邮箱地址',
        productQuantity: '产品 / 数量',
        message: '留言',
        sending: '发送中...',
        thankYou: '感谢您！',
        inquirySent: '您的询盘已成功发送。',
        socialMedia: '社交媒体',
        socialDesc: '关注我们获取产品目录更新、采购协调和项目沟通。'
      };
    case 'es':
      return {
        heroTitle: 'Enfriando el Mundo con Niebla de Precisión',
        heroSubtitle: 'El único especialista de China en ventiladores de nebulización',
        viewProducts: 'Ver Productos',
        contactUs: 'Contacto',
        advantagesTitle: 'Por Qué Elegir HEGU',
        specialist: { title: 'El Único Especialista de China', desc: 'Enfocado exclusivamente en la tecnología e innovación de ventiladores de nebulización' },
        global: { title: 'Alcance Global, Experiencia Local', desc: 'Sirviendo a más de 300 marcas en múltiples continentes' },
        quality: { title: 'Calidad Certificada', desc: 'Certificado CE y estándares compatibles globalmente' },
        sourcing: { title: 'Asesoramiento Inteligente de Abastecimiento', desc: 'Orientación experta para sus necesidades específicas de enfriamiento' },
        productSeriesTitle: 'Nuestras Series de Productos',
        ac: { title: 'Ventiladores de Nebulización AC', desc: 'Rendimiento confiable para enfriamiento interior' },
        dc: { title: 'Ventiladores de Nebulización DC', desc: 'Eficiente energéticamente con características avanzadas' },
        outdoor: { title: 'Ventiladores de Nebulización Exteriores', desc: 'Enfriamiento potente para espacios exteriores' },
        viewDetails: 'Ver Detalles',
        featuredProductsTitle: 'Productos Destacados',
        viewAllProducts: 'Ver Todos los Productos',
        certificationsTitle: 'Calificaciones de Fábrica y Certificaciones de Productos',
        certificationsSubtitle: 'Control de calidad estricto, sistema de certificación completo',
        factoryQualifications: 'Calificaciones de Fábrica',
        productCertifications: 'Certificaciones de Productos',
        partnersTitle: 'Confiado por Socios en Todo el Mundo',
        partnersSubtitle: 'Más de 50 países y creciendo',
        ctaTitle: '¿Listo para Transformar su Experiencia de Enfriamiento?',
        ctaSubtitle: 'Únase a cientos de marcas que confían en HEGU Technology',
        sendInquiry: 'Enviar Consulta',
        yourName: 'Su Nombre',
        emailAddress: 'Dirección de Email',
        productQuantity: 'Producto / Cantidad',
        message: 'Su Mensaje',
        sending: 'Enviando...',
        thankYou: '¡Gracias!',
        inquirySent: 'Su consulta ha sido enviada exitosamente.',
        socialMedia: 'Redes Sociales',
        socialDesc: 'Conéctese con nosotros para actualizaciones de catálogos, coordinación de compras y comunicación de proyectos.'
      };
    case 'fr':
      return {
        heroTitle: 'Refroidir le Monde avec une Brume de Précision',
        heroSubtitle: 'Le seul spécialiste chinois en ventilateurs à brume',
        viewProducts: 'Voir les Produits',
        contactUs: 'Contact',
        advantagesTitle: 'Pourquoi Choisir HEGU',
        specialist: { title: 'Le Seul Spécialiste Chinois', desc: 'Exclusivement dédié à la technologie et à l\'innovation des ventilateurs à brume' },
        global: { title: 'Portée Mondiale, Expertise Locale', desc: 'Servant plus de 300 marques sur plusieurs continents' },
        quality: { title: 'Qualité Certifiée', desc: 'Certifié CE et normes conformes mondialement' },
        sourcing: { title: 'Conseil Intelligent en Approvisionnement', desc: 'Conseils d\'experts pour vos besoins spécifiques de refroidissement' },
        productSeriesTitle: 'Nos Séries de Produits',
        ac: { title: 'Ventilateurs à Brume AC', desc: 'Performance fiable pour le refroidissement intérieur' },
        dc: { title: 'Ventilateurs à Brume DC', desc: 'Économe en énergie avec fonctionnalités avancées' },
        outdoor: { title: 'Ventilateurs à Brume Extérieurs', desc: 'Refroidissement puissant pour les espaces extérieurs' },
        viewDetails: 'Voir les Détails',
        featuredProductsTitle: 'Produits Phares',
        viewAllProducts: 'Voir Tous les Produits',
        certificationsTitle: 'Qualifications d\'Usine et Certifications de Produits',
        certificationsSubtitle: 'Contrôle de qualité strict, système de certification complet',
        factoryQualifications: 'Qualifications d\'Usine',
        productCertifications: 'Certifications de Produits',
        partnersTitle: 'Fait Confiance par des Partenaires du Monde Entier',
        partnersSubtitle: 'Plus de 50 pays et en croissance',
        ctaTitle: 'Prêt à Transformer Votre Expérience de Refroidissement?',
        ctaSubtitle: 'Rejoignez des centaines de marques qui font confiance à HEGU Technology',
        sendInquiry: 'Envoyer une Demande',
        yourName: 'Votre Nom',
        emailAddress: 'Adresse Email',
        productQuantity: 'Produit / Quantité',
        message: 'Votre Message',
        sending: 'Envoi en cours...',
        thankYou: 'Merci!',
        inquirySent: 'Votre demande a été envoyée avec succès.',
        socialMedia: 'Réseaux Sociaux',
        socialDesc: 'Connectez-vous avec nous pour les mises à jour de catalogue, la coordination des approvisionnements et la communication des projets.'
      };
    case 'de':
      return {
        heroTitle: 'Die Welt Mit Präzisionsnebel Kühlen',
        heroSubtitle: 'Chinas einziger Spezialist für Nebelventilatoren',
        viewProducts: 'Produkte Ansehen',
        contactUs: 'Kontakt',
        advantagesTitle: 'Warum HEGU Wählen',
        specialist: { title: 'Chinas Einziger Spezialist', desc: 'Exklusiv auf Nebelventilatortechnologie und Innovation fokussiert' },
        global: { title: 'Globale Reichweite, Lokale Expertise', desc: '300+ Marken auf mehreren Kontinenten bedienen' },
        quality: { title: 'Zertifizierte Qualität', desc: 'CE-zertifiziert und global konforme Standards' },
        sourcing: { title: 'Intelligente Beschaffungsberatung', desc: 'Expertenberatung für Ihre spezifischen Kühlbedürfnisse' },
        productSeriesTitle: 'Unsere Produktreihen',
        ac: { title: 'AC-Nebelventilatoren', desc: 'Zuverlässige Leistung für die Innenaustattung' },
        dc: { title: 'DC-Nebelventilatoren', desc: 'Energieeffizient mit fortschrittlichen Funktionen' },
        outdoor: { title: 'Außen-Nebelventilatoren', desc: 'Leistungsstarke Kühlung für Außenbereiche' },
        viewDetails: 'Details Ansehen',
        featuredProductsTitle: 'Ausgewählte Produkte',
        viewAllProducts: 'Alle Produkte Ansehen',
        certificationsTitle: 'Werkzeugqualifikationen und Produktzertifizierungen',
        certificationsSubtitle: 'Strenge Qualitätskontrolle, umfassendes Zertifizierungssystem',
        factoryQualifications: 'Werkzeugqualifikationen',
        productCertifications: 'Produktzertifizierungen',
        partnersTitle: 'Von Partnern Weltweit Vertraut',
        partnersSubtitle: '50+ Länder und wachsend',
        ctaTitle: 'Bereit, Ihre Kühlerfahrung zu Transformieren?',
        ctaSubtitle: 'Schließen Sie sich Hunderten von Marken an, die HEGU Technology vertrauen',
        sendInquiry: 'Anfrage Senden',
        yourName: 'Ihr Name',
        emailAddress: 'E-Mail-Adresse',
        productQuantity: 'Produkt / Menge',
        message: 'Ihre Nachricht',
        sending: 'Senden...',
        thankYou: 'Danke!',
        inquirySent: 'Ihre Anfrage wurde erfolgreich gesendet.',
        socialMedia: 'Soziale Medien',
        socialDesc: 'Verbinden Sie sich mit uns für Katalogaktualisierungen, Beschaffungskoordination und Projektkommunikation.'
      };
    case 'ar':
      return {
        heroTitle: 'تبريد العالم بضباب دقيق',
        heroSubtitle: 'المتخصص الوحيد في الصين في مراوح الضباب',
        viewProducts: 'عرض المنتجات',
        contactUs: 'اتصل بنا',
        advantagesTitle: 'لماذا تختار HEGU',
        specialist: { title: 'المتخصص الوحيد في الصين', desc: 'نركز حصرًا على تكنولوجيا وابتكارات مراوح الضباب' },
        global: { title: 'تواجد عالمي، خبرة محلية', desc: 'نخدم أكثر من 300 علامة تجارية في قارات متعددة' },
        quality: { title: 'جودة معتمدة', desc: 'معتمد CE ومعايير متوافقة عالميًا' },
        sourcing: { title: 'نصائح ذكية للتوريد', desc: 'إرشادات خبراء لاحتياجات التبريد المحددة الخاصة بك' },
        productSeriesTitle: 'سلسلة منتجاتنا',
        ac: { title: 'مراوح الضباب AC', desc: 'أداء موثوق للتبريد الداخلي' },
        dc: { title: 'مراوح الضباب DC', desc: 'موفرة للطاقة مع ميزات متقدمة' },
        outdoor: { title: 'مراوح الضباب الخارجية', desc: 'تبريد قوي للمساحات الخارجية' },
        viewDetails: 'عرض التفاصيل',
        featuredProductsTitle: 'المنتجات المميزة',
        viewAllProducts: 'عرض جميع المنتجات',
        certificationsTitle: 'مؤهلات المصنع وشهادات المنتجات',
        certificationsSubtitle: 'رقابة جودة صارمة، نظام شهادة كامل',
        factoryQualifications: 'مؤهلات المصنع',
        productCertifications: 'شهادات المنتجات',
        partnersTitle: 'موثوق من قبل شركاء حول العالم',
        partnersSubtitle: 'أكثر من 50 دولة وينمو',
        ctaTitle: 'جاهز لتحويل تجربة التبريد لديك؟',
        ctaSubtitle: 'انضم إلى مئات العلامات التجارية التي تثق في HEGU Technology',
        sendInquiry: 'إرسال استفسار',
        yourName: 'اسمك',
        emailAddress: 'البريد الإلكتروني',
        productQuantity: 'المنتج / الكمية',
        message: 'رسالتك',
        sending: 'جارٍ الإرسال...',
        thankYou: 'شكرًا لك!',
        inquirySent: 'تم إرسال استفسارك بنجاح.',
        socialMedia: 'وسائل التواصل الاجتماعي',
        socialDesc: 'تواصل معنا للحصول على تحديثات الكتالوج، وتنسيق التوريد، وتواصل المشاريع.'
      };
    default:
      return {
        heroTitle: 'Cooling the World with Precision Mist',
        heroSubtitle: 'China\'s only specialist in mist fans',
        viewProducts: 'View Products',
        contactUs: 'Contact Us',
        advantagesTitle: 'Why Choose HEGU',
        specialist: { title: 'China\'s Only Specialist', desc: 'Focused exclusively on mist fan technology and innovation' },
        global: { title: 'Global Reach, Local Expertise', desc: 'Serving 300+ brands across multiple continents' },
        quality: { title: 'Certified Quality', desc: 'CE certified and globally compliant standards' },
        sourcing: { title: 'Smart Sourcing Advice', desc: 'Expert guidance for your specific cooling needs' },
        productSeriesTitle: 'Our Product Series',
        ac: { title: 'AC Mist Fans', desc: 'Reliable performance for indoor cooling' },
        dc: { title: 'DC Mist Fans', desc: 'Energy-efficient with advanced features' },
        outdoor: { title: 'Outdoor Mist Fans', desc: 'Powerful cooling for outdoor spaces' },
        viewDetails: 'View Details',
        featuredProductsTitle: 'Featured Products',
        viewAllProducts: 'View All Products',
        certificationsTitle: 'Factory Qualifications & Product Certifications',
        certificationsSubtitle: 'Strict quality control, comprehensive certification system',
        factoryQualifications: 'Factory Qualifications',
        productCertifications: 'Product Certifications',
        partnersTitle: 'Trusted by Partners Worldwide',
        partnersSubtitle: '50+ countries and growing',
        ctaTitle: 'Ready to Transform Your Cooling Experience?',
        ctaSubtitle: 'Join hundreds of brands who trust HEGU Technology',
        sendInquiry: 'Submit Inquiry',
        yourName: 'Your name',
        emailAddress: 'Email address',
        productQuantity: 'Product / Quantity',
        message: 'Message',
        sending: 'Sending...',
        thankYou: 'Thank You!',
        inquirySent: 'Your inquiry has been sent successfully.',
        socialMedia: 'Social Media',
        socialDesc: 'Connect with us for catalog updates, procurement coordination, and project communication.'
      };
  }
};

const HeroSlider = () => {
  const params = useParams();
  const locale = params.locale as string;
  const texts = getPageTexts(locale);

  const slides = [
    {
      title: texts.heroTitle,
      subtitle: texts.heroSubtitle,
      gradient: 'from-sky-500/20 to-blue-500/10'
    }
  ];

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 bg-gradient-to-br ${slides[0].gradient}`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              {slides[0].title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              {slides[0].subtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full text-lg px-8">
                <Link href={`/${locale}/products`}>
                  {texts.viewProducts}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8">
                <Link href={`/${locale}#contact-section`}>
                  {texts.contactUs}
                </Link>
              </Button>
            </div>
          </FadeIn>
        </motion.div>
      </div>
    </section>
  );
};

const AdvantagesSection = () => {
  const params = useParams();
  const locale = params.locale as string;
  const texts = getPageTexts(locale);
  
  const advantages = [
    {
      icon: Award,
      title: texts.specialist.title,
      description: texts.specialist.desc
    },
    {
      icon: Globe,
      title: texts.global.title,
      description: texts.global.desc
    },
    {
      icon: Award,
      title: texts.quality.title,
      description: texts.quality.desc
    },
    {
      icon: Lightbulb,
      title: texts.sourcing.title,
      description: texts.sourcing.desc
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            {texts.advantagesTitle}
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
  const texts = getPageTexts(locale);

  const series = [
    {
      key: 'acMistFans',
      href: `/${locale}/products?series=AC`,
      title: texts.ac.title,
      description: texts.ac.desc,
      gradient: 'from-sky-100 to-blue-50'
    },
    {
      key: 'dcMistFans',
      href: `/${locale}/products?series=DC`,
      title: texts.dc.title,
      description: texts.dc.desc,
      gradient: 'from-cyan-100 to-teal-50'
    },
    {
      key: 'outdoorMistFans',
      href: `/${locale}/products?series=Outdoor`,
      title: texts.outdoor.title,
      description: texts.outdoor.desc,
      gradient: 'from-blue-100 to-indigo-50'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            {texts.productSeriesTitle}
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
                      {texts.viewDetails}
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
  const texts = getPageTexts(locale);
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {texts.featuredProductsTitle}
            </h2>
            <Link
              href={`/${locale}/products`}
              className="mt-4 sm:mt-0 text-primary hover:text-primary/80 font-medium flex items-center gap-2 transition-colors"
            >
              {texts.viewAllProducts}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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

const CertificationsSection = () => {
  const params = useParams();
  const locale = params.locale as string;
  const texts = getPageTexts(locale);

  // 所有资质认证数据
  const allCertifications = [
    { 
      name: 'ISO 9001', 
      description: 'Quality Management System',
      gradient: 'from-blue-500 to-blue-600',
      icon: 'quality'
    },
    { 
      name: 'ISO 14001', 
      description: 'Environmental Management',
      gradient: 'from-green-500 to-emerald-600',
      icon: 'environment'
    },
    { 
      name: 'BSCI', 
      description: 'Business Social Compliance',
      gradient: 'from-purple-500 to-violet-600',
      icon: 'social'
    },
    { 
      name: 'Sedex', 
      description: 'Ethical Trade Audit',
      gradient: 'from-orange-500 to-amber-600',
      icon: 'audit'
    },
    { 
      name: 'CE', 
      description: 'European Conformity',
      gradient: 'from-sky-500 to-cyan-600',
      icon: 'certificate'
    },
    { 
      name: 'ETL', 
      description: 'Electrical Testing Labs',
      gradient: 'from-rose-500 to-pink-600',
      icon: 'electrical'
    },
    { 
      name: 'RoHS', 
      description: 'Restriction of Hazardous Substances',
      gradient: 'from-teal-500 to-cyan-600',
      icon: 'safety'
    },
    { 
      name: 'FCC', 
      description: 'Federal Communications Commission',
      gradient: 'from-indigo-500 to-purple-600',
      icon: 'communication'
    }
  ];

  return (
    <section id="certifications-section" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {texts.certificationsTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {texts.certificationsSubtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allCertifications.map((cert, index) => (
            <FadeIn key={index} delay={index * 0.08}>
              <div className="group">
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${cert.gradient} p-6 lg:p-8 aspect-square shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
                  {/* 背景装饰 */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="80" cy="20" r="40" fill="white" />
                      <circle cx="20" cy="80" r="30" fill="white" />
                    </svg>
                  </div>
                  
                  {/* 图标 */}
                  <div className="relative z-10 w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {cert.icon === 'quality' && (
                      <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    )}
                    {cert.icon === 'environment' && (
                      <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {cert.icon === 'social' && (
                      <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                    {cert.icon === 'audit' && (
                      <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    )}
                    {cert.icon === 'certificate' && (
                      <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    )}
                    {cert.icon === 'electrical' && (
                      <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {cert.icon === 'safety' && (
                      <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )}
                    {cert.icon === 'communication' && (
                      <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                      </svg>
                    )}
                  </div>
                  
                  {/* 内容 */}
                  <div className="relative z-10">
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnersSection = () => {
  const params = useParams();
  const locale = params.locale as string;
  const texts = getPageTexts(locale);

  const countries = ['USA', 'Germany', 'Japan', 'UK', 'Australia', 'Canada', 'France', 'Italy', 'Spain', 'Netherlands', 'Brazil', 'Mexico', 'South Korea', 'India', 'Indonesia', 'Thailand', 'Vietnam', 'Malaysia', 'Philippines', 'Saudi Arabia', 'UAE', 'South Africa', 'Egypt', 'Nigeria', 'Kenya'];

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            {texts.partnersTitle}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            {texts.partnersSubtitle}
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

const ContactSection = () => {
  const params = useParams();
  const locale = params.locale as string;
  const texts = getPageTexts(locale);
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
    <section id="contact-section" className="py-24 lg:py-32 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {texts.ctaTitle}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {texts.ctaSubtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeIn>
            <Card className="p-8 lg:p-10 h-full bg-card">
              <h3 className="text-2xl font-bold mb-8">
                {texts.socialMedia}
              </h3>
              
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                {texts.socialDesc}
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

          <FadeIn delay={0.2}>
            <Card className="p-8 lg:p-10 h-full bg-card">
              <h3 className="text-2xl font-bold mb-8">
                {texts.sendInquiry}
              </h3>
              
              {isSubmitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{texts.thankYou}</h3>
                  <p className="text-muted-foreground text-lg">
                    {texts.inquirySent}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={texts.yourName}
                      className="h-14 text-lg rounded-full px-6"
                    />
                  </div>

                  <div>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={texts.emailAddress}
                      className="h-14 text-lg rounded-full px-6"
                    />
                  </div>

                  <div>
                    <Input
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      placeholder={texts.productQuantity}
                      className="h-14 text-lg rounded-full px-6"
                    />
                  </div>

                  <div>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={texts.message}
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
                    {isSubmitting ? texts.sending : texts.sendInquiry}
                  </Button>
                </form>
              )}
            </Card>
          </FadeIn>
        </div>
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
      <CertificationsSection />
      <PartnersSection />
      <ContactSection />
    </div>
  );
}
