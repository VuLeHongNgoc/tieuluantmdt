import AuthLayoutWrapper from '@/components/layout/AuthLayoutWrapper';
import AuthProvider from '@/components/providers/AuthProvider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TieuLuanTMDT - Thương Mại Điện Tử',
  description: 'Website thương mại điện tử cơ bản cho học tập',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='vi'>
      <head>
        <link rel="preload" href="/fonts/exist-font/fonts/exist-font.woff" as="font" type="font/woff" crossOrigin="" />
        <link rel="preload" href="/fonts/exist-font/fonts/exist-font.ttf" as="font" type="font/ttf" crossOrigin="" />
      </head>
      <body>
        <AuthProvider>
          <AuthLayoutWrapper 
            headerType="standard"
            footerType="simple"
            sliderType="slider-2"
            loadTemplateStyles={true}
          >
            {children}
          </AuthLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
