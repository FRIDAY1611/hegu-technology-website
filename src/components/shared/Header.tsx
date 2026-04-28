'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/${locale}#contact-section`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', label: isZh ? '首页' : 'Home', href: `/${locale}` },
    { key: 'about', label: isZh ? '关于我们' : 'About', href: `/${locale}/about` },
    { key: 'contact', label: isZh ? '联系我们' : 'Contact', href: `/${locale}#contact-section`, onClick: handleContactClick }
  ];

  const productItems = [
    { key: 'acMistFans', label: isZh ? '交流电喷雾风扇' : 'AC Mist Fans', href: `/${locale}/products/ac-mist-fans` },
    { key: 'dcMistFans', label: isZh ? '直流电喷雾风扇' : 'DC Mist Fans', href: `/${locale}/products/dc-mist-fans` },
    { key: 'outdoorMistFans', label: isZh ? '户外喷雾风扇' : 'Outdoor Mist Fans', href: `/${locale}/products/outdoor-mist-fans` },
    { key: 'industrialFans', label: isZh ? '工业风扇' : 'Industrial Fans', href: `/${locale}/products/industrial-fans` }
  ];

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    return `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              HEGU
            </span>
            <span className="text-sm text-muted-foreground hidden sm:block">Technology</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              item.onClick ? (
                <button
                  key={item.key}
                  onClick={item.onClick}
                  className={`text-sm font-medium transition-colors hover:text-primary text-foreground`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}

            {/* Products Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
                className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <span>{isZh ? '产品中心' : 'Products'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isProductsOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-2xl shadow-lg overflow-hidden"
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <div className="py-2">
                    {productItems.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{locale.toUpperCase()}</span>
              </button>
              
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                  <Link
                    href={switchLocale('en')}
                    className={`block px-4 py-2 text-sm ${locale === 'en' ? 'bg-muted text-primary' : 'text-foreground hover:bg-muted'}`}
                    onClick={() => setIsLangOpen(false)}
                  >
                    English
                  </Link>
                  <Link
                    href={switchLocale('zh')}
                    className={`block px-4 py-2 text-sm ${locale === 'zh' ? 'bg-muted text-primary' : 'text-foreground hover:bg-muted'}`}
                    onClick={() => setIsLangOpen(false)}
                  >
                    中文
                  </Link>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Button asChild className="hidden md:flex rounded-full">
              <Link href={`/${locale}#contact-section`} onClick={handleContactClick}>
                {isZh ? '联系我们' : 'Contact'}
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-foreground"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
            {navItems.map((item) => (
              item.onClick ? (
                <button
                  key={item.key}
                  onClick={(e) => {
                    item.onClick(e);
                    setIsMenuOpen(false);
                  }}
                  className="block py-2 text-lg font-medium text-foreground w-full text-left"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block py-2 text-lg font-medium text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
            
            <div className="border-t border-border pt-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">{isZh ? '产品中心' : 'Products'}</p>
              {productItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block py-2 text-lg text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-border pt-4 flex space-x-4">
              <Link
                href={switchLocale('en')}
                className={`text-sm font-medium ${locale === 'en' ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                English
              </Link>
              <Link
                href={switchLocale('zh')}
                className={`text-sm font-medium ${locale === 'zh' ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                中文
              </Link>
            </div>

            <Button asChild className="w-full rounded-full">
              <Link href={`/${locale}#contact-section`} onClick={handleContactClick}>
                {isZh ? '联系我们' : 'Contact'}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
