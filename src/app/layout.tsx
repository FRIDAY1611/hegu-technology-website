import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'HEGU Technology | Mist Fan Manufacturer',
    template: '%s | HEGU Technology',
  },
  description:
    'HEGU Technology is China\'s leading specialist in mist fan manufacturing, providing innovative cooling solutions worldwide.',
  keywords: [
    'mist fan',
    'spray fan',
    'cooling fan',
    'HEGU Technology',
    'industrial fan',
    'outdoor cooling',
    'China manufacturer',
  ],
  authors: [{ name: 'HEGU Technology' }],
  generator: 'HEGU Technology',
  openGraph: {
    title: 'HEGU Technology | Cooling the World with Precision Mist',
    description:
      'China\'s only specialist in mist fans. Serving 300+ brands across multiple continents.',
    url: 'https://hegu-tech.com',
    siteName: 'HEGU Technology',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
