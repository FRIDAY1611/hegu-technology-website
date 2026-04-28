'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, CheckCircle2, Bell, Lock, Database, Palette, Globe, Shield } from 'lucide-react';

const AdminSettings = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
                <h1 className="text-2xl font-bold">系统设置</h1>
                <p className="text-gray-500">配置网站的系统设置</p>
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
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              基本设置
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              通知设置
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              外观设置
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              安全设置
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              备份与恢复
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>基本信息</CardTitle>
                  <CardDescription>配置网站的基本信息</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">网站名称</Label>
                    <Input id="siteName" defaultValue="HEGU Technology" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">网站描述</Label>
                    <Input id="siteDescription" defaultValue="专业喷雾风扇制造商" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">联系邮箱</Label>
                    <Input id="contactEmail" type="email" defaultValue="info@hegu-tech.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">联系电话</Label>
                    <Input id="contactPhone" defaultValue="+86-757-12345678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">默认语言</Label>
                    <select id="defaultLanguage" className="w-full px-4 py-2 border rounded-lg">
                      <option value="zh">中文</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>通知设置</CardTitle>
                <CardDescription>配置系统通知和提醒</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>新询盘邮件通知</Label>
                    <p className="text-sm text-gray-500">收到新询盘时发送邮件通知</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>询盘回复提醒</Label>
                    <p className="text-sm text-gray-500">提醒您及时回复询盘</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>系统更新通知</Label>
                    <p className="text-sm text-gray-500">系统有更新时发送通知</p>
                  </div>
                  <Switch checked={false} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>备份完成通知</Label>
                    <p className="text-sm text-gray-500">数据备份完成后发送通知</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>外观设置</CardTitle>
                <CardDescription>自定义网站的外观和主题</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>主题配色</Label>
                  <div className="flex gap-4">
                    {['sky', 'blue', 'green', 'purple', 'orange'].map((color) => (
                      <button
                        key={color}
                        className={`w-12 h-12 rounded-full bg-${color}-500 border-2 ${color === 'sky' ? 'border-gray-800' : 'border-transparent'}`}
                      />
                    ))}
                  </div>
                </div>
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

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>安全设置</CardTitle>
                <CardDescription>管理账户安全和访问权限</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">修改管理员密码</h4>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">当前密码</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">新密码</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">确认新密码</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button>修改密码</Button>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <Label>两步验证</Label>
                    <p className="text-sm text-gray-500">增强账户安全性</p>
                  </div>
                  <Switch checked={false} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup & Restore */}
          <TabsContent value="backup">
            <Card>
              <CardHeader>
                <CardTitle>备份与恢复</CardTitle>
                <CardDescription>管理数据备份和恢复</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
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
                </div>

                <div className="pt-4">
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
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">2024-01-08 - 完整备份</p>
                        <p className="text-sm text-gray-500">大小: 2.3 MB</p>
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
