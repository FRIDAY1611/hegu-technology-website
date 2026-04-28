'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Globe, CheckCircle2 } from 'lucide-react';

const AdminLanguages = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('zh');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/admin');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const languages = [
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const textKeys = [
    'nav.home',
    'nav.products',
    'nav.about',
    'nav.contact',
    'hero.title',
    'hero.subtitle',
    'products.title',
    'products.subtitle',
    'about.title',
    'about.description',
    'contact.title',
    'contact.form.name',
    'contact.form.email',
    'contact.form.message',
    'footer.company',
    'footer.contact',
    'footer.copyright',
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
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
                <p className="text-gray-500">管理网站的多语言内容</p>
              </div>
            </div>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                '保存中...'
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  已保存
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  保存更改
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

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
                    编辑 {lang.name} 版本的网站文本内容
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {textKeys.map((key) => (
                      <div key={key} className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{key}</label>
                        <Input
                          defaultValue={`${lang.name} - ${key}`}
                          placeholder={`请输入 ${key} 的 ${lang.name} 翻译`}
                        />
                      </div>
                    ))}
                  </div>
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
