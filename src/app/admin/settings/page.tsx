'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getSettings, updateSettings, type AdminSettings } from '@/lib/admin-data';
import { ArrowLeft, Save, CheckCircle2, Bell, Palette, Globe, Shield, Database } from 'lucide-react';

const AdminSettings = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [settings, setSettings] = useState<AdminSettings>({
    siteName: 'HEGU Technology',
    siteDescription: '专业喷雾风扇制造商',
    contactEmail: 'info@hegu-tech.com',
    contactPhone: '+86-757-12345678',
    defaultLanguage: 'en',
    address: 'Zhongshan, Guangdong, China',
    socialLinks: {
      facebook: 'https://facebook.com/hegu-tech',
      linkedin: 'https://linkedin.com/company/hegu-tech',
      whatsapp: 'https://wa.me/861234567890'
    }
  });
  const router = useRouter();

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/admin');
    } else {
      setIsLoggedIn(true);
      loadSettings();
    }
  }, [router]);

  const loadSettings = () => {
    const savedSettings = getSettings();
    setSettings(savedSettings);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      updateSettings(settings);
      setSaveSuccess(true);
      
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('保存设置失败:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (key: keyof AdminSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSocialChange = (platform: keyof AdminSettings['socialLinks'], value: string) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
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
                <h1 className="text-2xl font-bold">系统设置</h1>
                <p className="text-gray-500">配置网站的系统设置，修改后将立即生效</p>
              </div>
            </div>
            <Button onClick={handleSave} disabled={isSaving}>
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
                  保存更改
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
              设置已成功保存！前端页面将立即显示更新后的内容。
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              基本设置
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              联系信息
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              社交媒体
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              外观设置
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              备份与恢复
            </TabsTrigger>
          </TabsList>

          {/* 基本设置 */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>网站基本信息</CardTitle>
                <CardDescription>这些信息将显示在网站的各个位置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">网站名称</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleChange('siteName', e.target.value)}
                    placeholder="输入网站名称"
                  />
                  <p className="text-sm text-gray-500">显示在浏览器标签页和网站标题中</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">网站描述</Label>
                  <Input
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => handleChange('siteDescription', e.target.value)}
                    placeholder="输入网站描述"
                  />
                  <p className="text-sm text-gray-500">简短描述网站的主要业务</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">默认语言</Label>
                  <select
                    id="defaultLanguage"
                    value={settings.defaultLanguage}
                    onChange={(e) => handleChange('defaultLanguage', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="zh">中文</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="ar">العربية</option>
                  </select>
                  <p className="text-sm text-gray-500">新访问者看到的默认语言</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 联系信息 */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>联系信息</CardTitle>
                <CardDescription>这些信息将显示在Footer和联系页面</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">联系邮箱</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleChange('contactEmail', e.target.value)}
                      placeholder="info@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">联系电话</Label>
                    <Input
                      id="contactPhone"
                      value={settings.contactPhone}
                      onChange={(e) => handleChange('contactPhone', e.target.value)}
                      placeholder="+86-xxx-xxxxxxxx"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">公司地址</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="输入公司地址"
                  />
                  <p className="text-sm text-gray-500">显示在Footer和联系页面</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 社交媒体 */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>社交媒体链接</CardTitle>
                <CardDescription>配置您的社交媒体账号链接</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={settings.socialLinks.facebook}
                    onChange={(e) => handleSocialChange('facebook', e.target.value)}
                    placeholder="https://facebook.com/your-page"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={settings.socialLinks.linkedin}
                    onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/company/your-company"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={settings.socialLinks.whatsapp}
                    onChange={(e) => handleSocialChange('whatsapp', e.target.value)}
                    placeholder="https://wa.me/861234567890"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 外观设置 */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>外观设置</CardTitle>
                <CardDescription>自定义网站的外观和主题</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>主题配色</Label>
                  <div className="flex gap-4">
                    {['sky', 'blue', 'green', 'orange'].map((color) => (
                      <button
                        key={color}
                        className={`w-12 h-12 rounded-full border-2 ${
                          color === 'sky' ? 'border-gray-800 ring-2 ring-offset-2 ring-sky-500' : 'border-transparent'
                        } bg-${color === 'sky' ? 'sky' : color === 'blue' ? 'blue' : color === 'green' ? 'green' : 'orange'}-500`}
                      />
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>深色模式</Label>
                    <p className="text-sm text-gray-500">启用深色模式主题</p>
                  </div>
                  <Switch checked={false} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 备份与恢复 */}
          <TabsContent value="backup">
            <Card>
              <CardHeader>
                <CardTitle>备份与恢复</CardTitle>
                <CardDescription>管理数据备份和恢复</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">创建新备份</h4>
                    <p className="text-sm text-gray-500">备份所有数据和配置</p>
                  </div>
                  <Button>立即备份</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">自动备份</h4>
                    <p className="text-sm text-gray-500">每周自动创建数据备份</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">备份历史</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">2024-01-15 - 完整备份</p>
                        <p className="text-sm text-gray-500">大小: 2.4 MB</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">下载</Button>
                        <Button variant="ghost" size="sm">恢复</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminSettings;
