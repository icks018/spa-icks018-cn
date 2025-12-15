/**
 * 流沙聚·拾光
 *
 * @fileoverview 无限滚动Hook
 * @author      流沙聚开发团队
 * @company     流沙聚工作室
 * @version     1.0.0
 * @since       2025-12-16
 * @copyright   Copyright (c) 2025 流沙聚工作室. All rights reserved.
 * @license     商业软件，保留所有权利
 * @contact     https://www.icks018.cn
 *
 * 本软件为商业软件，严禁复制、传播、反编译或用于其他任何用途
 * 仅授权合法用户在许可范围内使用
 */

import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number; // 距离底部多少像素时触发加载
  initialPage?: number;
  pageSize?: number;
}

/**
 * 无限滚动Hook
 * © 2025 流沙聚·拾光. All rights reserved. 流沙聚工作室 版权所有
 *
 * @param {UseInfiniteScrollOptions} options - 配置选项
 * @returns 无限滚动状态和方法
 */
export function useInfiniteScroll(options: UseInfiniteScrollOptions = {}) {
  const { threshold = 300, initialPage = 1, pageSize = 12 } = options;

  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  /**
   * 加载下一页
   */
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  }, [loading, hasMore]);

  /**
   * 重置分页
   */
  const reset = useCallback(() => {
    setPage(initialPage);
    setHasMore(true);
  }, [initialPage]);

  /**
   * 监听滚动事件
   */
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - scrollTop - clientHeight < threshold) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, threshold, loadMore]);

  return {
    page,
    loading,
    hasMore,
    setLoading,
    setHasMore,
    loadMore,
    reset,
    pageSize,
  };
}
