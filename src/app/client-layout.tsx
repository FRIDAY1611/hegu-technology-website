'use client';

import { SettingsProvider } from '@/contexts/SettingsContext';
import { ProductsProvider } from '@/contexts/ProductsContext';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <SettingsProvider>
          <ProductsProvider>
            {children}
          </ProductsProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
