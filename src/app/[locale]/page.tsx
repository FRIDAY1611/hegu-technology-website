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
import { useProducts } from '@/contexts/ProductsContext';
import { useSettings } from '@/contexts/SettingsContext';

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
        factoryQualificationsSub: '专业标准',
        factoryQualificationsDesc: '我们的产品遍布全球50多个国家。我们以提供可靠的喷雾风扇为荣，确保客户满意。',
        productCertifications: '产品认证',
        productCertificationsSub: '全球标准',
        productCertificationsDesc: '通过持续创新，我们在加湿器和喷雾风扇领域拥有100多项专利。我们的制造工厂通过了ISO 9001质量管理认证。',
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
        factoryQualificationsSub: 'Estándares Profesionales',
        factoryQualificationsDesc: 'Con socios de distribución en todo el mundo, nuestros productos se pueden encontrar en más de 50 países. Nos enorgullecemos de proporcionar ventiladores de nebulización confiables para garantizar la satisfacción del cliente.',
        productCertifications: 'Certificaciones de Productos',
        productCertificationsSub: 'Estándares Globales',
        productCertificationsDesc: 'A través de la innovación continua, ahora tenemos más de 100 patentes en humidificadores y ventiladores de nebulización. Nuestra instalación de fabricación está certificada ISO 9001 para la gestión de calidad.',
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
        factoryQualificationsSub: 'Normes Professionnelles',
        factoryQualificationsDesc: 'Avec des partenaires de distribution dans le monde entier, nos produits peuvent être trouvés dans plus de 50 pays. Nous sommes fiers de fournir des ventilateurs à brume fiables pour garantir la satisfaction client.',
        productCertifications: 'Certifications de Produits',
        productCertificationsSub: 'Normes Mondiales',
        productCertificationsDesc: 'Grâce à l\'innovation continue, nous avons maintenant plus de 100 brevets sur les humidificateurs et les ventilateurs à brume. Notre installation de fabrication est certifiée ISO 9001 pour la gestion de la qualité.',
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
        factoryQualificationsSub: 'Professionelle Standards',
        factoryQualificationsDesc: 'Mit Vertriebspartnern auf der ganzen Welt sind unsere Produkte in über 50 Ländern zu finden. Wir sind stolz darauf, zuverlässige Nebelventilatoren zu liefern, um Kundenzufriedenheit zu gewährleisten.',
        productCertifications: 'Produktzertifizierungen',
        productCertificationsSub: 'Globale Standards',
        productCertificationsDesc: 'Durch kontinuierliche Innovation verfügen wir nun über mehr als 100 Patente für Luftbefeuchter und Nebelventilatoren. Unsere Fertigungsanlage ist ISO 9001 zertifiziert für Qualitätsmanagement.',
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
        factoryQualificationsSub: 'معايير مهنية',
        factoryQualificationsDesc: 'مع شركاء توزيع حول العالم، يمكن العثور على منتجاتنا في أكثر من 50 دولة. نحن فخورون بتقديم مراوح ضباب موثوقة لضمان رضا العملاء.',
        productCertifications: 'شهادات المنتجات',
        productCertificationsSub: 'معايير عالمية',
        productCertificationsDesc: 'من خلال الابتكار المستمر، لدينا الآن أكثر من 100 براءة اختراع في أجهزة الترطيب ومراوح الضباب. منشأتنا التصنيعية معتمدة ISO 9001 لإدارة الجودة.',
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
        factoryQualificationsSub: 'Professional Standards',
        factoryQualificationsDesc: 'With distribution partners around the world, our products can be found in over 50 countries. We pride ourselves in providing reliable mist fans to ensure customer satisfaction.',
        productCertifications: 'Product Certifications',
        productCertificationsSub: 'Global Standards',
        productCertificationsDesc: 'Through continuous innovation, we now have more than 100 patents on humidifiers and mist fans. Our manufacturing facility is ISO 9001 certified for quality management.',
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
  const { getFeaturedProducts } = useProducts();
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

  return (
    <section id="certifications-section" className="py-24 lg:py-36 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="text-sm font-medium text-primary">Global Certifications</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {texts.certificationsTitle}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {texts.certificationsSubtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧 - 工厂资质 */}
          <FadeIn>
            <div className="relative h-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-2xl opacity-50"></div>
              <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 lg:p-10 shadow-xl flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-green-600 leading-tight break-words">
                      {texts.factoryQualifications}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{texts.factoryQualificationsSub}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-8 leading-relaxed min-h-[4.5rem]">
                  {texts.factoryQualificationsDesc}
                </p>

                {/* 认证标志 - 占位符 */}
                <div className="grid grid-cols-4 gap-4 mb-10 mt-auto">
                  {['factory-1', 'factory-2', 'factory-3', 'factory-4'].map((name, i) => (
                    <div key={i} className="aspect-square bg-muted/30 rounded-2xl flex items-center justify-center border border-dashed border-border hover:border-primary/50 hover:scale-105 transition-all cursor-pointer overflow-hidden">
                      {/* 后台替换：将这里换成 <img src="/certifications/{name}.png" alt={name} className="w-full h-full object-contain" /> */}
                      <div className="text-center text-muted-foreground/50">
                        <svg className="w-8 h-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs">{name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 证书图片网格 - 占位符 */}
                <div className="grid grid-cols-4 gap-3">
                  {['cert-1', 'cert-2', 'cert-3', 'cert-4', 'cert-5', 'cert-6', 'cert-7', 'cert-8'].map((name, i) => (
                    <div
                      key={i}
                      className="aspect-[3/4] bg-muted/30 border border-dashed border-border rounded-xl hover:border-primary/50 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer overflow-hidden group"
                    >
                      {/* 后台替换：将这里换成 <img src="/certificates/factory/{name}.jpg" alt={name} className="w-full h-full object-cover" /> */}
                      <div className="h-full flex flex-col items-center justify-center p-2 text-muted-foreground/50">
                        <svg className="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-xs">{name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 右侧 - 产品认证 */}
          <FadeIn delay={0.1}>
            <div className="relative h-full">
              <div className="absolute -inset-4 bg-gradient-to-l from-blue-500/10 to-sky-500/10 rounded-3xl blur-2xl opacity-50"></div>
              <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 lg:p-10 shadow-xl flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-sky-600 leading-tight break-words">
                      {texts.productCertifications}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{texts.productCertificationsSub}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-8 leading-relaxed min-h-[4.5rem]">
                  {texts.productCertificationsDesc}
                </p>

                {/* 认证标志 - 占位符 */}
                <div className="grid grid-cols-4 gap-4 mb-10 mt-auto">
                  {['product-1', 'product-2', 'product-3', 'product-4'].map((name, i) => (
                    <div key={i} className="aspect-square bg-muted/30 rounded-2xl flex items-center justify-center border border-dashed border-border hover:border-primary/50 hover:scale-105 transition-all cursor-pointer overflow-hidden">
                      {/* 后台替换：将这里换成 <img src="/certifications/{name}.png" alt={name} className="w-full h-full object-contain" /> */}
                      <div className="text-center text-muted-foreground/50">
                        <svg className="w-8 h-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs">{name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 证书图片网格 - 占位符 */}
                <div className="grid grid-cols-4 gap-3">
                  {['cert-9', 'cert-10', 'cert-11', 'cert-12', 'cert-13', 'cert-14', 'cert-15', 'cert-16'].map((name, i) => (
                    <div
                      key={i}
                      className="aspect-[3/4] bg-muted/30 border border-dashed border-border rounded-xl hover:border-primary/50 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer overflow-hidden group"
                    >
                      {/* 后台替换：将这里换成 <img src="/certificates/product/{name}.jpg" alt={name} className="w-full h-full object-cover" /> */}
                      <div className="h-full flex flex-col items-center justify-center p-2 text-muted-foreground/50">
                        <svg className="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-xs">{name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
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
  const { settings, isLoading } = useSettings();
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
