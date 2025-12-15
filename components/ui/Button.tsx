/**
 * 流沙聚·拾光
 *
 * @fileoverview 按钮组件 - 通用按钮UI组件
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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * 按钮组件
 * © 2025 流沙聚·拾光. All rights reserved. 流沙聚工作室 版权所有
 *
 * @param {ButtonProps} props - 组件属性
 * @returns {JSX.Element} 按钮组件
 */
export default function Button({
  variant = 'primary',
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const styles = {
    primary: 'bg-ink text-white hover:bg-rust shadow-md',
    secondary: 'bg-white border border-sand text-ink hover:border-rust hover:text-rust',
    ghost: 'text-gray-500 hover:text-ink hover:bg-sand/20',
    danger: 'text-red-500 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100',
  };

  return (
    <button
      className={cn(
        'flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95',
        styles[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
}
