/**
 * 流沙聚·拾光
 *
 * @fileoverview 收藏视图组件 - 展示用户收藏的页面
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
import PinCard from '@/components/pages/PinCard';
import Footer from '@/components/layout/Footer';
import DetailModal from '@/components/pages/DetailModal';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getFavorites } from '@/lib/favorites';
import type { Page } from '@/types';

/**
 * 收藏视图组件
 * © 2025 流沙聚·拾光. All rights reserved. 流沙聚工作室 版权所有
 *
 * @returns {JSX.Element} 收藏视图
 */
export default function SavedView() {
  const [modalItem, setModalItem] = useState<Page | null>(null);
  const [favorites, setFavorites] = useState<Page[]>([]);
  const [displayedData, setDisplayedData] = useState<Page[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { page, loading, hasMore, setLoading, setHasMore, pageSize, loadMore } = useInfiniteScroll({
    threshold: 300,
    pageSize: 12,
  });

  // 加载收藏数据
  useEffect(() => {
    const loadFavorites = () => {
      const data = getFavorites();
      setFavorites(data);
    };
    
    loadFavorites();
    
    // 监听收藏变化事件
    window.addEventListener('favoritesChanged', loadFavorites);
    window.addEventListener('storage', loadFavorites);
    
    return () => {
      window.removeEventListener('favoritesChanged', loadFavorites);
      window.removeEventListener('storage', loadFavorites);
    };
  }, []);

  // 搜索筛选
  const filteredData = searchQuery.trim()
    ? favorites.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : favorites;

  // 分页加载
  useEffect(() => {
    if (page === 1) {
      setDisplayedData(filteredData.slice(0, pageSize));
      setHasMore(filteredData.length > pageSize);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const newData = filteredData.slice(startIndex, endIndex);
      
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedData((prev) => [...prev, ...newData]);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [page, pageSize, filteredData, setLoading, setHasMore]);
  return (
    <>
      <div className="pt-20 md:pt-28 container mx-auto px-4 md:px-12 max-w-7xl min-h-screen pb-8 md:pb-0 flex flex-col">
        <div className="text-center mb-12 fade-up">
          <h2 className="news-header font-serif text-3xl text-ink mb-8">私人珍藏</h2>
        </div>
        
        <div className="separator-line"></div>
        
        {/* 无收藏 */}
        {favorites.length === 0 && (
          <div className="flex-1 flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-3">
              <i className="ph ph-heart text-6xl text-gray-300"></i>
              <p className="text-lg text-gray-400 tracking-wide">还没有收藏内容</p>
              <p className="text-sm text-gray-400">去首页或探索页面收藏喜欢的内容吧~</p>
            </div>
          </div>
        )}
        
        {/* 收藏列表 */}
        {displayedData.length > 0 && (
          <>
            <div className="masonry-grid mb-8">
              {displayedData.map((item, i) => (
                <PinCard key={`${item.id}-${i}`} item={item} index={i} onClick={setModalItem} />
              ))}
            </div>
            
            {/* 加载更多按钮 */}
            {!loading && hasMore && (
              <div className="flex justify-center items-center py-12">
                <button
                  onClick={loadMore}
                  className="px-8 py-3 bg-white border-2 border-sand text-ink rounded-full hover:border-rust hover:text-rust transition-all duration-300 font-medium tracking-wide shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  <span>加载更多</span>
                  <i className="ph ph-arrow-down"></i>
                </button>
              </div>
            )}
            
            {/* 加载状态 */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-rust border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-400 tracking-wide">加载中...</p>
                </div>
              </div>
            )}
            
            {/* 没有更多数据 */}
            {!hasMore && (
              <div className="flex justify-center items-center pb-2">
                <div className="flex flex-col items-center gap-2">
                  <i className="ph ph-check-circle text-2xl text-rust"></i>
                  <p className="text-sm text-gray-400 tracking-wide">已加载全部内容</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
      {modalItem && <DetailModal item={modalItem} onClose={() => setModalItem(null)} />}
    </>
  );
}
