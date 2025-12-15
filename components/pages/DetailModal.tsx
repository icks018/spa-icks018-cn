/**
 * 流沙聚·拾光
 *
 * @fileoverview 页面详情弹窗组件 - 展示页面完整信息和预览
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

import { useEffect, useState } from 'react';
import type { Page } from '@/types';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import { toggleFavorite, isFavorite } from '@/lib/favorites';

interface DetailModalProps {
  item: Page | null;
  onClose: () => void;
}

/**
 * 页面详情弹窗组件
 * © 2025 流沙聚·拾光. All rights reserved. 流沙聚工作室 版权所有
 *
 * @param {DetailModalProps} props - 组件属性
 * @returns {JSX.Element | null} 弹窗组件或null
 */
export default function DetailModal({ item, onClose }: DetailModalProps) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (item) {
      setFavorited(isFavorite(item.id));
    }
  }, [item]);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item) return;
    const newState = toggleFavorite(item);
    setFavorited(newState);
    
    // 触发自定义事件通知其他组件更新
    window.dispatchEvent(new Event('favoritesChanged'));
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div
        className="absolute inset-0 bg-paper/95 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-6xl h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-up border-4 border-white">
        {/* 左侧图片区域 */}
        <div className="w-full md:w-7/12 h-1/2 md:h-full bg-mist relative group overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 vintage-filter"
          />
          <div className="absolute inset-0 bg-clay/5 mix-blend-multiply pointer-events-none"></div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          <div className="absolute top-6 right-6 z-10 flex gap-3">
            <button
              onClick={handleToggleFavorite}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all bg-white ${
                favorited 
                  ? 'border-rust text-rust' 
                  : 'border-sand text-ink hover:border-rust hover:text-rust'
              }`}
            >
              <i className={favorited ? 'ph-fill ph-heart text-lg' : 'ph ph-heart text-lg'}></i>
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border bg-white border-sand text-ink hover:border-rust hover:text-rust flex items-center justify-center transition-all"
            >
              <i className="ph ph-x text-lg"></i>
            </button>
          </div>
          <div className="absolute bottom-8 left-8 text-white hidden md:block pointer-events-none">
            <p className="font-serif text-3xl mb-2">{item.title}</p>
            <p className="text-sm opacity-80 uppercase tracking-widest">
              {item.categoryName} / {new Date(item.createdAt).toLocaleDateString('zh-CN')}
            </p>
          </div>
        </div>

        {/* 右侧信息区域 */}
        <div className="w-full md:w-5/12 h-1/2 md:h-full p-8 md:p-14 flex flex-col bg-paper overflow-y-auto">
          {/* 移动端按钮放在顶部 */}
          <div className="flex gap-4 mb-6 md:hidden">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                variant="primary"
                icon={<i className="ph ph-eye"></i>}
                className="w-full"
              >
                预览
              </Button>
            </a>
            <Button
              variant="secondary"
              icon={<i className="ph ph-download-simple"></i>}
              className="flex-1"
            >
              源码
            </Button>
          </div>
          
          <div className="mb-auto">
            <div className="flex justify-between items-start mb-8 pb-6 border-b border-sand">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                  分类
                </div>
                <div className="font-serif text-lg text-ink font-bold">
                  {item.categoryName}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                  发布于
                </div>
                <div className="font-serif text-lg text-ink font-bold">
                  {new Date(item.createdAt).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })}
                </div>
              </div>
            </div>
            <h2 className="font-serif text-5xl text-ink mb-6 leading-tight md:hidden">
              {item.title}
            </h2>
            <div className="prose prose-sm text-gray-500 font-light leading-relaxed mb-10">
              <p>{item.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {item.tags.map((t) => (
                <Tag key={t} text={`# ${t}`} />
              ))}
            </div>
          </div>
          
          {/* 桌面端按钮在底部 */}
          <div className="hidden md:flex gap-4 mt-8 pt-8 border-t border-sand">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                variant="primary"
                icon={<i className="ph ph-eye"></i>}
                className="w-full"
              >
                预览
              </Button>
            </a>
            <Button
              variant="secondary"
              icon={<i className="ph ph-download-simple"></i>}
              className="flex-1"
            >
              源码
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
