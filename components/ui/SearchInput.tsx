/**
 * 流沙聚·拾光
 *
 * @fileoverview 搜索输入框组件 - 带图标的搜索框
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

import { cn } from '@/lib/utils';

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onSearch?: (value: string) => void;
}

/**
 * 搜索输入框组件
 * © 2025 流沙聚·拾光. All rights reserved. 流沙聚工作室 版权所有
 *
 * @param {SearchInputProps} props - 组件属性
 * @returns {JSX.Element} 搜索框组件
 */
export default function SearchInput({
  placeholder = '搜索...',
  className,
  onSearch,
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    onSearch?.(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative group w-full mx-auto transition-all duration-500', className)}>
      <div className="absolute inset-0 bg-clay/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="relative flex items-center">
        <i className="ph ph-magnifying-glass absolute left-6 text-gray-400 text-xl group-focus-within:text-rust transition-colors"></i>
        <input
          type="text"
          name="search"
          onChange={handleChange}
          className="w-full bg-white border-2 border-sand text-ink placeholder-gray-400 rounded-full py-4 pl-16 pr-6 outline-none focus:border-rust/30 focus:shadow-paper transition-all duration-300 text-base font-medium tracking-wide"
          placeholder={placeholder}
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 bg-sand/20 rounded-full w-12 flex items-center justify-center cursor-pointer hover:bg-rust hover:text-white transition-colors text-gray-400"
        >
          <i className="ph ph-arrow-right font-bold"></i>
        </button>
      </div>
    </form>
  );
}
