/**
 * 流沙聚·拾光
 *
 * @fileoverview 收藏功能工具函数
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

import type { Page } from '@/types';

const FAVORITES_KEY = 'shiguang_favorites';

/**
 * 获取所有收藏
 */
export function getFavorites(): Page[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get favorites:', error);
    return [];
  }
}

/**
 * 添加收藏
 */
export function addFavorite(page: Page): boolean {
  try {
    const favorites = getFavorites();
    
    // 检查是否已收藏
    if (favorites.some(item => item.id === page.id)) {
      return false;
    }
    
    favorites.unshift(page); // 添加到开头
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Failed to add favorite:', error);
    return false;
  }
}

/**
 * 移除收藏
 */
export function removeFavorite(pageId: string): boolean {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(item => item.id !== pageId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to remove favorite:', error);
    return false;
  }
}

/**
 * 检查是否已收藏
 */
export function isFavorite(pageId: string): boolean {
  const favorites = getFavorites();
  return favorites.some(item => item.id === pageId);
}

/**
 * 切换收藏状态
 */
export function toggleFavorite(page: Page): boolean {
  if (isFavorite(page.id)) {
    removeFavorite(page.id);
    return false;
  } else {
    addFavorite(page);
    return true;
  }
}
