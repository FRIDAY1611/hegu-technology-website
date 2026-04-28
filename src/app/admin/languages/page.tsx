'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getLanguageTexts, updateLanguageText, type LanguageText } from '@/lib/admin-data';
import { ArrowLeft, Save, CheckCircle2, Globe } from 'lucide-react';

const AdminLanguages = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('zh');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [languageTexts, setLanguageTexts] = useState<LanguageText>({
    zh: {},
    en: {},
    es: {},
    fr: {},
    de: {},
    ar: {}
  });
  const [changedKeys, setChangedKeys] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/admin');
    } else {
      setIsLoggedIn(true);
      loadLanguageTexts();
    }
  }, [router]);

  const loadLanguageTexts = () => {
    const texts = getLanguageTexts();
    setLanguageTexts(texts);
  };

  const languages = [
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  // 文本键定义 - 包含网站中所有可翻译的文本
  const textCategories = [
    {
      name: '导航',
      keys: [
        'nav.home',
        'nav.products',
        'nav.about',
        'nav.contact',
      ]
    },
    {
      name: '首页',
      keys: [
        'hero.title',
        'hero.subtitle',
        'hero.cta',
        'advantages.title',
        'advantages.subtitle',
        'products.title',
        'products.subtitle',
        'featured.title',
        'featured.subtitle',
        'partners.title',
        'partners.subtitle',
        'cta.title',
        'cta.subtitle',
        'cta.button',
      ]
    },
    {
      name: '产品页面',
      keys: [
        'products.allProducts',
        'products.acSeries',
        'products.dcSeries',
        'products.outdoorSeries',
        'products.industrialSeries',
        'products.viewDetails',
        'products.requestQuote',
        'products.specifications',
        'products.features',
        'products.packingInfo',
        'products.relatedProducts',
      ]
    },
    {
      name: '关于我们',
      keys: [
        'about.title',
        'about.subtitle',
        'about.mission',
        'about.vision',
        'about.history',
        'about.factory',
        'about.statistics',
      ]
    },
    {
      name: '联系我们',
      keys: [
        'contact.title',
        'contact.subtitle',
        'contact.sendInquiry',
        'contact.thankYou',
        'contact.inquirySent',
        'contact.form.name',
        'contact.form.company',
        'contact.form.email',
        'contact.form.phone',
        'contact.form.country',
        'contact.form.productInterest',
        'contact.form.message',
        'contact.form.submit',
        'contact.form.sending',
        'contact.socialMedia',
        'contact.socialMediaDescription',
      ]
    },
    {
      name: '页脚',
      keys: [
        'footer.tagline',
        'footer.products',
        'footer.company',
        'footer.contact',
        'footer.rights',
      ]
    },
    {
      name: '资质认证',
      keys: [
        'certifications.title',
        'certifications.subtitle',
        'certifications.quality',
        'certifications.qualityDescription',
        'certifications.factory',
        'certifications.factoryDescription',
      ]
    }
  ];

  const handleTextChange = (locale: string, key: string, value: string) => {
    setLanguageTexts(prev => ({
      ...prev,
      [locale]: {
        ...prev[locale],
        [key]: value
      }
    }));
    setChangedKeys(prev => new Set([...prev, `${locale}-${key}`]));
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    
    try {
      // 保存所有修改的文本
      for (const locale of languages.map(l => l.code)) {
        const localeTexts = languageTexts[locale] || {};
        for (const [key, value] of Object.entries(localeTexts)) {
          if (value) {
            updateLanguageText(locale, key, value);
          }
        }
      }
      
      setSaveSuccess(true);
      setChangedKeys(new Set());
      
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('保存语言文本失败:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getDefaultValue = (locale: string, key: string): string => {
    // 默认值映射
    const defaults: Record<string, Record<string, string>> = {
      'nav.home': { zh: '首页', en: 'Home', es: 'Inicio', fr: 'Accueil', de: 'Startseite', ar: 'الرئيسية' },
      'nav.products': { zh: '产品', en: 'Products', es: 'Productos', fr: 'Produits', de: 'Produkte', ar: 'المنتجات' },
      'nav.about': { zh: '关于我们', en: 'About', es: 'Sobre', fr: 'À propos', de: 'Über uns', ar: 'من نحن' },
      'nav.contact': { zh: '联系我们', en: 'Contact', es: 'Contacto', fr: 'Contact', de: 'Kontakt', ar: 'اتصل بنا' },
      'footer.rights': { zh: '保留所有权利。', en: 'All rights reserved.', es: 'Todos los derechos reservados.', fr: 'Tous droits réservés.', de: 'Alle Rechte vorbehalten.', ar: 'جميع الحقوق محفوظة.' },
    };

    return defaults[key]?.[locale] || key;
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push('/admin/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Button>
              <div>
                <h1 className="text-2xl font-bold">语言管理</h1>
                <p className="text-gray-500">管理网站的多语言内容，修改后将立即生效</p>
              </div>
            </div>
            <Button onClick={handleSaveAll} disabled={isSaving || changedKeys.size === 0}>
              {isSaving ? (
                '保存中...'
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  已保存！
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  保存 {changedKeys.size > 0 ? `(${changedKeys.size})` : ''}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              语言文本已成功保存！前端页面将立即显示更新后的内容。
            </AlertDescription>
          </Alert>
        </div>
      )}

      {changedKeys.size > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Alert className="bg-blue-50 border-blue-200">
            <Globe className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              您有 {changedKeys.size} 个未保存的修改，请点击右上角的保存按钮保存更改。
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto mb-8">
            {languages.map((lang) => (
              <TabsTrigger key={lang.code} value={lang.code} className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {languages.map((lang) => (
            <TabsContent key={lang.code} value={lang.code}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    {lang.name} 内容编辑
                  </CardTitle>
                  <CardDescription>
                    编辑 {lang.name} 版本的网站文本内容，修改后保存将立即生效
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {textCategories.map((category, categoryIndex) => (
                    <div key={category.name}>
                      {categoryIndex > 0 && <Separator className="my-6" />}
                      <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
                      <div className="grid gap-4">
                        {category.keys.map((key) => {
                          const currentValue = languageTexts[lang.code]?.[key] || '';
                          const defaultValue = getDefaultValue(lang.code, key);
                          const hasChanged = changedKeys.has(`${lang.code}-${key}`);
                          
                          return (
                            <div key={key} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium text-gray-700">{key}</Label>
                                {hasChanged && (
                                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    已修改
                                  </span>
                                )}
                              </div>
                              <Input
                                value={currentValue || defaultValue}
                                onChange={(e) => handleTextChange(lang.code, key, e.target.value)}
                                placeholder={`请输入 ${key} 的 ${lang.name} 翻译`}
                                className={hasChanged ? 'border-blue-400 focus:border-blue-500' : ''}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default AdminLanguages;
