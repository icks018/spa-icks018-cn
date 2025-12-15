/**
 * 流沙聚·拾光
 *
 * @fileoverview 瀑布流卡片组件 - 展示页面缩略图和信息
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

import type { Page } from '@/types';

interface PinCardProps {
  item: Page;
  index: number;
  onClick: (item: Page) => void;
}

/**
 * 瀑布流卡片组件
 * © 2025 流沙聚·拾光. All rights reserved. 流沙聚工作室 版权所有
 *
 * @param {PinCardProps} props - 组件属性
 * @returns {JSX.Element} 卡片组件
 */
export default function PinCard({ item, index, onClick }: PinCardProps) {
  return (
    <div
      onClick={() => onClick(item)}
      className="masonry-item group cursor-pointer break-inside-avoid mb-6 animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-card-bg rounded-lg shadow-paper hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out transform group-hover:-translate-y-1 border border-sand/60 overflow-hidden">
        <div className="relative">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-auto object-cover transition-all duration-700 vintage-filter group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-clay/10 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-300"></div>
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-paper/95 backdrop-blur text-[10px] font-bold px-2 py-0.5 rounded-sm text-ink shadow-sm border border-sand">
              Vol.{item.id}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start gap-2 mb-3">
            <h3 className="font-serif text-lg text-ink font-bold group-hover:text-rust transition-colors leading-snug">
              {item.title}
            </h3>
            <span className="shrink-0 text-[10px] text-gray-400 font-sans border border-sand px-1.5 py-0.5 rounded mt-0.5">
              {item.tags[0]}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 pt-3 border-t border-dashed border-sand/60 font-sans">
            <span>{new Date(item.createdAt).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })}</span>
            <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
            <span className="truncate max-w-[120px]">{item.categoryName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
