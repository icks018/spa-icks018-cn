/**
 * 流沙聚·拾光
 *
 * @fileoverview 探索视图组件 - 展示分类和标签筛选
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

import { useState, useEffect, useMemo } from 'react';
import SearchInput from '@/components/ui/SearchInput';
import Tag from '@/components/ui/Tag';
import PinCard from '@/components/pages/PinCard';
import Footer from '@/components/layout/Footer';
import DetailModal from '@/components/pages/DetailModal';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { MOCK_DATA } from '@/lib/mockData';
import type { Page } from '@/types';

/**
 * 探索视图组件
 * © 2025 流沙聚·拾光. All rights reserved. 流沙聚工作室 版权所有
 *
 * @returns {JSX.Element} 探索视图
 */
export default function ExploreView() {
  const [activeCat, setActiveCat] = useState('全部');
  const [modalItem, setModalItem] = useState<Page | null>(null);
  const [displayedData, setDisplayedData] = useState<Page[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { page, loading, hasMore, setLoading, setHasMore, pageSize, reset, loadMore } = useInfiniteScroll({
    threshold: 300,
    pageSize: 12,
  });

  const categories = [
    '全部',
    '爱情表白',
    '创意设计',
    '节日祝福',
  ];

  // 切换标签时重置分页
  const handleCategoryChange = (cat: string) => {
    setActiveCat(cat);
    reset();
  };

  // 根据分类和搜索筛选数据，使用useMemo避免每次都创建新数组
  const filteredData = useMemo(() => {
    let data = MOCK_DATA;
    
    // 分类筛选
    if (activeCat !== '全部') {
      data = data.filter(item => item.categoryName === activeCat);
    }
    
    // 搜索筛选
    if (searchQuery.trim()) {
      data = data.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return data;
  }, [activeCat, searchQuery]);

  // 加载更多数据
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
    }, 500);

    return () => clearTimeout(timer);
  }, [page, pageSize, filteredData, setLoading, setHasMore]);

  return (
    <>
      <div className="pt-20 md:pt-28 container mx-auto px-4 md:px-12 max-w-7xl min-h-screen pb-8 md:pb-0">
        <div className="mb-12 text-center fade-up">
          <span className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mb-2 block">
            探索发现
          </span>
          <h2 className="news-header font-serif text-4xl text-ink mb-10">灵感分类</h2>
          <div className="mb-10 px-4 w-full flex justify-center">
            <SearchInput
              placeholder="搜索灵感..."
              className="max-w-md md:max-w-3xl"
              onSearch={setSearchQuery}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <Tag
                key={cat}
                text={cat}
                active={activeCat === cat}
                onClick={() => handleCategoryChange(cat)}
              />
            ))}
          </div>
        </div>
        <div className="separator-line"></div>
        <div className="masonry-grid">
          {displayedData.map((item, i) => (
            <PinCard key={`${item.id}-${i}`} item={item} index={i} onClick={setModalItem} />
          ))}
        </div>
        
        {/* 加载更多按钮 */}
        {!loading && hasMore && displayedData.length > 0 && (
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
        {!hasMore && displayedData.length > 0 && (
          <div className="flex justify-center items-center pb-2">
            <div className="flex flex-col items-center gap-2">
              <i className="ph ph-check-circle text-2xl text-rust"></i>
              <p className="text-sm text-gray-400 tracking-wide">已加载全部内容</p>
            </div>
          </div>
        )}
        
        {/* 无数据 */}
        {displayedData.length === 0 && !loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-2">
              <i className="ph ph-folder-open text-4xl text-gray-300"></i>
              <p className="text-sm text-gray-400 tracking-wide">暂无相关内容</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
      {modalItem && <DetailModal item={modalItem} onClose={() => setModalItem(null)} />}
    </>
  );
}
