'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === 'ar';

  return (
    <div className={`relative min-h-screen flex flex-col ${isRTL ? 'rtl' : ''}`}>
      {/* Header 始终保持 LTR */}
      <div className="ltr">
        <Header />
      </div>
      {/* 主要内容根据语言设置方向 */}
      <main className={`flex-1 ${isRTL ? 'rtl' : ''}`}>
        {children}
      </main>
      {/* Footer 根据语言设置方向 */}
      <div className={isRTL ? 'rtl' : ''}>
        <Footer />
      </div>
    </div>
  );
}
