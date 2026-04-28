'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const getFooterTexts = (locale: string) => {
  switch (locale) {
    case 'zh':
      return {
        tagline: '中国领先的喷雾风扇技术专家，为全球提供创新的冷却解决方案。',
        products: '产品中心',
        company: '公司信息',
        contact: '联系我们',
        acMistFans: '交流电喷雾风扇',
        dcMistFans: '直流电喷雾风扇',
        outdoorMistFans: '户外喷雾风扇',
        industrialFans: '工业风扇',
        home: '首页',
        about: '关于我们',
        contactLink: '联系我们',
        rights: '保留所有权利。'
      };
    case 'es':
      return {
        tagline: 'El especialista líder de China en tecnología de ventiladores de nebulización, proporcionando soluciones de enfriamiento innovadoras en todo el mundo.',
        products: 'Productos',
        company: 'Empresa',
        contact: 'Contacto',
        acMistFans: 'Ventiladores de Nebulización AC',
        dcMistFans: 'Ventiladores de Nebulización DC',
        outdoorMistFans: 'Ventiladores de Nebulización Exteriores',
        industrialFans: 'Ventiladores Industriales',
        home: 'Inicio',
        about: 'Sobre Nosotros',
        contactLink: 'Contacto',
        rights: 'Todos los derechos reservados.'
      };
    case 'fr':
      return {
        tagline: 'Le spécialiste leader en technologie de ventilateurs à brume en Chine, fournissant des solutions de refroidissement innovantes dans le monde entier.',
        products: 'Produits',
        company: 'Entreprise',
        contact: 'Contact',
        acMistFans: 'Ventilateurs à Brume AC',
        dcMistFans: 'Ventilateurs à Brume DC',
        outdoorMistFans: 'Ventilateurs à Brume Extérieurs',
        industrialFans: 'Ventilateurs Industriels',
        home: 'Accueil',
        about: 'À Propos',
        contactLink: 'Contact',
        rights: 'Tous droits réservés.'
      };
    case 'de':
      return {
        tagline: 'Der führende Spezialist für Nebelventilatortechnologie in China, der innovative Kühlösungen weltweit bereitstellt.',
        products: 'Produkte',
        company: 'Unternehmen',
        contact: 'Kontakt',
        acMistFans: 'AC-Nebelventilatoren',
        dcMistFans: 'DC-Nebelventilatoren',
        outdoorMistFans: 'Außen-Nebelventilatoren',
        industrialFans: 'Industrieventilatoren',
        home: 'Startseite',
        about: 'Über Uns',
        contactLink: 'Kontakt',
        rights: 'Alle Rechte vorbehalten.'
      };
    case 'ar':
      return {
        tagline: 'المتخصص الرائد في الصين في تكنولوجيا مراوح الضباب، يوفر حلول تبريد مبتكرة حول العالم.',
        products: 'المنتجات',
        company: 'الشركة',
        contact: 'اتصل بنا',
        acMistFans: 'مراوح الضباب AC',
        dcMistFans: 'مراوح الضباب DC',
        outdoorMistFans: 'مراوح الضباب الخارجية',
        industrialFans: 'مراوح صناعية',
        home: 'الرئيسية',
        about: 'من نحن',
        contactLink: 'اتصل بنا',
        rights: 'جميع الحقوق محفوظة.'
      };
    default:
      return {
        tagline: "China's leading specialist in mist fan technology, providing innovative cooling solutions worldwide.",
        products: 'Products',
        company: 'Company',
        contact: 'Contact',
        acMistFans: 'AC Mist Fans',
        dcMistFans: 'DC Mist Fans',
        outdoorMistFans: 'Outdoor Mist Fans',
        industrialFans: 'Industrial Fans',
        home: 'Home',
        about: 'About Us',
        contactLink: 'Contact',
        rights: 'All rights reserved.'
      };
  }
};

const Footer = () => {
  const params = useParams();
  const locale = params.locale as string;
  const texts = getFooterTexts(locale);
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: texts.acMistFans, href: `/${locale}/products/ac-mist-fans` },
    { label: texts.dcMistFans, href: `/${locale}/products/dc-mist-fans` },
    { label: texts.outdoorMistFans, href: `/${locale}/products/outdoor-mist-fans` },
    { label: texts.industrialFans, href: `/${locale}/products/industrial-fans` }
  ];

  const companyLinks = [
    { label: texts.home, href: `/${locale}` },
    { label: texts.about, href: `/${locale}/about` },
    { label: texts.contactLink, href: `/${locale}/contact` }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <Link href={`/${locale}`} className="inline-block">
                <span className="text-2xl font-bold tracking-tight text-foreground">
                  HEGU
                </span>
                <span className="text-sm text-muted-foreground ml-2">Technology</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
                {texts.tagline}
              </p>
            </div>

            {/* Product Links */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase mb-4">
                {texts.products}
              </h3>
              <ul className="space-y-3">
                {productLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase mb-4">
                {texts.company}
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase mb-4">
                {texts.contact}
              </h3>
              <address className="not-italic">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <p>Zhongshan, Guangdong</p>
                    <p>China</p>
                  </li>
                  <li>
                    <a href="mailto:info@hegu-tech.com" className="hover:text-primary transition-colors">
                      info@hegu-tech.com
                    </a>
                  </li>
                </ul>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} HEGU Technology. {texts.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
