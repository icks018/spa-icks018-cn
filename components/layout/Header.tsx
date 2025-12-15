/**
 * 流沙聚·拾光
 *
 * @fileoverview 顶部导航栏组件 - 包含桌面端和移动端导航
 * @author      流沙聚开发团队
 * @company     流沙聚工作室
 * @version     1.0.0
 * @since       2025-12-15
 * @copyright   Copyright (c) 2025 流沙聚工作室. All rights reserved.
 * @license     商业软件，保留所有权利
 * @contact     https://www.icks018.cn
 *
 * 本软件为商业软件，严禁复制、传播、反编译或用于其他任何用途
 * 仅授权合法用户在许可范围内使用
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * 顶部导航栏组件
 * © 2025 流沙聚·拾光. All rights reserved. 流沙聚工作室 版权所有
 */
export default function Header() {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const menus = [
    { href: '/', label: '首页', icon: 'house' },
    { href: '/explore', label: '发现', icon: 'compass' },
    { href: '/saved', label: '收藏', icon: 'heart' },
  ];

  return (
    <>
      {/* 移动端顶部导航 */}
      <div className="md:hidden fixed top-0 w-full z-40 bg-paper/90 backdrop-blur-md border-b border-sand/50 px-4 py-3 shadow-sm transition-all">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ink text-paper flex items-center justify-center rounded-lg shadow-sm">
              <i className="ph ph-hourglass-high text-xl"></i>
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg text-ink leading-none">
                流沙聚·拾光
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-rust uppercase tracking-wider">
                Now
              </span>
              <span className="text-[10px] text-gray-400">{mounted ? currentTime : '00:00'}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rust/30 to-transparent"></div>
      </div>

      {/* 桌面端顶部导航 */}
      <div className="hidden md:flex fixed top-0 w-full justify-between items-center px-12 py-5 z-40 bg-paper/90 backdrop-blur-md border-b border-sand transition-all">
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-3 font-serif text-2xl font-bold text-ink cursor-pointer"
        >
          <div className="w-10 h-10 bg-ink text-paper flex items-center justify-center rounded-lg shadow-sm">
            <i className="ph ph-hourglass-high text-2xl"></i>
          </div>
          <span>流沙聚·拾光</span>
        </Link>
        <div className="pointer-events-auto flex gap-1 bg-sand/10 p-1 rounded-full border border-sand/30 absolute left-1/2 -translate-x-1/2">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className={`px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                pathname === menu.href
                  ? 'bg-ink text-paper shadow-md'
                  : 'text-gray-600 hover:text-ink hover:bg-sand/30'
              }`}
            >
              {menu.label}
            </Link>
          ))}
        </div>
        <div className="w-10"></div>
      </div>
    </>
  );
}
