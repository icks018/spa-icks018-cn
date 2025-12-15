/**
 * 流沙聚·拾光
 *
 * @fileoverview 移动端底部导航栏组件
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

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * 移动端底部导航栏组件
 * 2025 流沙聚·拾光. All rights reserved. 流沙聚工作室 版权所有
 */
export default function BottomNav() {
  const pathname = usePathname();
  
  const menus = [
    { href: '/', label: '首页', icon: 'house' },
    { href: '/explore', label: '探索', icon: 'compass' },
    { href: '/saved', label: '收藏', icon: 'heart' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 w-full z-50 bg-white/90 backdrop-blur-md border-t border-sand/60 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex justify-around items-center h-[3.5rem]">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-all duration-300"
          >
            <i
              className={`ph-fill ph-${menu.icon} text-xl transition-all duration-300 ${
                pathname === menu.href ? 'text-rust scale-110' : 'text-gray-400'
              }`}
            ></i>
            <span
              className={`text-[10px] font-medium tracking-wide transition-all duration-300 ${
                pathname === menu.href ? 'text-rust' : 'text-gray-400'
              }`}
            >
              {menu.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
