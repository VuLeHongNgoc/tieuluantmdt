import { Layout } from '@/components/layout';
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
        <Layout 
          headerType="standard"
          footerType="simple"
          sliderType="slider-2"
          loadTemplateStyles={true}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
