'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const Footer = () => {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: isZh ? '交流电喷雾风扇' : 'AC Mist Fans', href: `/${locale}/products/ac-mist-fans` },
    { label: isZh ? '直流电喷雾风扇' : 'DC Mist Fans', href: `/${locale}/products/dc-mist-fans` },
    { label: isZh ? '户外喷雾风扇' : 'Outdoor Mist Fans', href: `/${locale}/products/outdoor-mist-fans` },
    { label: isZh ? '工业风扇' : 'Industrial Fans', href: `/${locale}/products/industrial-fans` }
  ];

  const companyLinks = [
    { label: isZh ? '首页' : 'Home', href: `/${locale}` },
    { label: isZh ? '关于我们' : 'About Us', href: `/${locale}/about` },
    { label: isZh ? '联系我们' : 'Contact', href: `/${locale}/contact` }
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
                {isZh 
                  ? '中国领先的喷雾风扇技术专家，为全球提供创新的冷却解决方案。' 
                  : "China's leading specialist in mist fan technology, providing innovative cooling solutions worldwide."}
              </p>
            </div>

            {/* Product Links */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase mb-4">
                {isZh ? '产品中心' : 'Products'}
              </h3>
              <ul className="space-y-3">
                {productLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase mb-4">
                {isZh ? '公司信息' : 'Company'}
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase mb-4">
                {isZh ? '联系我们' : 'Contact'}
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
              © {currentYear} HEGU Technology. {isZh ? '保留所有权利。' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
