/**
 * 页面数据类型定义
 */
export interface Page {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  url: string;
  thumbnail: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
