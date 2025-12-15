import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import './globals.css';

// ZCOOL XiaoWei 本地字体
const zcoolXiaoWei = localFont({
  src: '../public/fonts/ZCOOL_XiaoWei/ZCOOLXiaoWei-Regular.woff2',
  variable: '--font-zcool',
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  title: '流沙聚·拾光 - 收藏美好瞬间',
  description: '收藏和展示各种唯美静态页面的网站平台，支持多种风格分类，提供前台展示和后台管理功能。',
  keywords: '静态页面,表白页面,创意设计,节日祝福,唯美页面',
  authors: [{ name: '流沙聚·拾光' }],
  openGraph: {
    title: '流沙聚·拾光',
    description: '收藏美好瞬间，分享创意灵感',
    type: 'website',
    locale: 'zh_CN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={zcoolXiaoWei.variable}>
      <body className="font-sans antialiased">
        <Header />
        <BottomNav />
        {children}
      </body>
    </html>
  );
}
