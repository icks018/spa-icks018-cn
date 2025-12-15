/**
 * 流沙聚·拾光
 *
 * @fileoverview 标签组件 - 可点击的标签UI组件
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

import { cn } from '@/lib/utils';

interface TagProps {
  text: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * 标签组件
 * © 2025 流沙聚·拾光. All rights reserved. 流沙聚工作室 版权所有
 *
 * @param {TagProps} props - 组件属性
 * @returns {JSX.Element} 标签组件
 */
export default function Tag({ text, active, onClick, className }: TagProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-block px-5 py-2 rounded-lg text-sm font-medium tracking-wide cursor-pointer transition-all duration-300 border',
        active
          ? 'bg-ink text-paper border-ink shadow-md'
          : 'bg-white text-gray-600 border-sand hover:border-clay hover:text-clay hover:shadow-sm',
        className
      )}
    >
      {text}
    </span>
  );
}
