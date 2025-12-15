/**
 * 流沙聚·拾光
 *
 * @fileoverview 首页视图组件 - 展示最新收录的页面
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
import SearchInput from '@/components/ui/SearchInput';
import PinCard from '@/components/pages/PinCard';
import Footer from '@/components/layout/Footer';
import DetailModal from '@/components/pages/DetailModal';
import { slogans } from '@/lib/slogans';
import { MOCK_DATA } from '@/lib/mockData';
import type { Page } from '@/types';

/**
 * 首页视图组件
 * © 2025 流沙聚·拾光. All rights reserved. 流沙聚工作室 版权所有
 *
 * @returns {JSX.Element} 首页视图
 */
export default function HomeView() {
  const [modalItem, setModalItem] = useState<Page | null>(null);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 首次挂载时随机选择标语
  useEffect(() => {
    setMounted(true);
    setCurrentSloganIndex(Math.floor(Math.random() * slogans.length));
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      setCurrentDate(`${year}年${month}月${day}日`);
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  // 标语自动切换
  useEffect(() => {
    const sloganTimer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentSloganIndex((prev) => (prev + 1) % slogans.length);
        setFadeIn(true);
      }, 500);
    }, 60000); // 60秒切换一次

    return () => clearInterval(sloganTimer);
  }, []);

  const currentSlogan = slogans[currentSloganIndex];
  
  // 搜索筛选
  const filteredBySearch = searchQuery.trim()
    ? MOCK_DATA.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MOCK_DATA;
  
  // 只显示最新5条（搜索时显示所有结果）
  const displayedData = searchQuery.trim() ? filteredBySearch : MOCK_DATA.slice(0, 5);
  return (
    <>
      <div className="pt-20 md:pt-28 container mx-auto px-4 md:px-12 max-w-7xl min-h-screen pb-8 md:pb-0">
        <header className="text-center mb-16 md:mb-24 fade-up">
          <div className="hidden md:flex justify-center items-center gap-4 text-xs font-bold tracking-[0.3em] text-gray-400 mb-8 uppercase">
            <span>{mounted ? currentDate : '加载中...'}</span>
            <span className="w-4 h-[1px] bg-rust"></span>
            <span>{mounted ? currentTime : '00:00:00'}</span>
          </div>
          {mounted && (
            <>
              <div
                className={`inline-block mb-6 relative transition-opacity duration-500 ${
                  fadeIn ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <i className="ph ph-star-four text-rust text-3xl animate-pulse absolute -top-4 -right-8"></i>
                <span className="text-sm font-bold text-rust tracking-widest uppercase border border-rust px-2 py-1 rounded mb-2 inline-block">
                  {currentSlogan.badge}
                </span>
              </div>
              <h1
                className={`news-header font-serif text-5xl md:text-7xl text-ink mb-8 tracking-wide font-medium transition-opacity duration-500 ${
                  fadeIn ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {currentSlogan.title.split('的')[0]}的
                <span className="text-rust italic mx-3 relative">
                  {currentSlogan.title.split('的')[1]}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-2 text-rust/30"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h1>
              <p
                className={`text-gray-500 text-base md:text-xl max-w-2xl mx-auto font-serif leading-relaxed mb-10 transition-opacity duration-500 ${
                  fadeIn ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {currentSlogan.description.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </p>
            </>
          )}
          <div className="px-4 mt-12 md:mt-16 w-full flex justify-center">
            <SearchInput
              placeholder="搜索那个让你心动的瞬间..."
              className="max-w-md md:max-w-4xl shadow-xl shadow-sand/40"
              onSearch={setSearchQuery}
            />
          </div>
        </header>

        <div className="separator-line"></div>

        <div className="flex justify-between items-end mb-8 px-2">
          <h3 className="font-serif text-2xl text-ink">
            {searchQuery.trim() ? `搜索结果 (${displayedData.length})` : '最新收录'}
          </h3>
          {searchQuery.trim() && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm text-gray-400 hover:text-rust transition-colors flex items-center gap-1"
            >
              <i className="ph ph-x"></i> 清除搜索
            </button>
          )}
        </div>
        
        {/* 无搜索结果 */}
        {searchQuery.trim() && displayedData.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-3">
              <i className="ph ph-magnifying-glass text-4xl text-gray-300"></i>
              <p className="text-sm text-gray-400 tracking-wide">未找到相关内容</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-rust hover:underline"
              >
                清除搜索
              </button>
            </div>
          </div>
        )}

        <div className="masonry-grid mb-8">
          {displayedData.map((item, i) => (
            <PinCard key={item.id} item={item} index={i} onClick={setModalItem} />
          ))}
        </div>
      </div>
      <Footer />
      {modalItem && <DetailModal item={modalItem} onClose={() => setModalItem(null)} />}
    </>
  );
}
