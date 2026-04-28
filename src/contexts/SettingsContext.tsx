'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSettings, updateSettings as updateSettingsInStorage, AdminSettings } from '@/lib/admin-data';

interface SettingsContextType {
  settings: AdminSettings;
  updateSettings: (settings: Partial<AdminSettings>) => void;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 初始化设置
    const loadSettings = () => {
      const savedSettings = getSettings();
      setSettings(savedSettings);
      setIsLoading(false);
    };

    loadSettings();

    // 监听设置更新事件
    const handleSettingsUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<AdminSettings>;
      if (customEvent.detail) {
        setSettings(customEvent.detail);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('settingsUpdated', handleSettingsUpdate);
      return () => {
        window.removeEventListener('settingsUpdated', handleSettingsUpdate);
      };
    }
  }, []);

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    updateSettingsInStorage(newSettings);
    // updateSettingsInStorage 会触发事件，所以不需要手动 setSettings
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
