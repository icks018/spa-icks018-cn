/**
 * 流沙聚·拾光
 *
 * @fileoverview 页脚组件
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

/**
 * 页脚组件
 * © 2025 流沙聚·拾光. All rights reserved. 流沙聚工作室 版权所有
 */
export default function Footer() {
  return (
    <footer className="py-4 pb-16 md:pb-4 text-center text-gray-500 text-xs font-light fade-up delay-200 mt-0 bg-white/60 border-t border-sand backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-center items-center gap-3 mb-2 opacity-60">
          <span className="w-6 h-[1px] bg-clay"></span>
          <i className="ph ph-flower-lotus text-base text-clay"></i>
          <span className="w-6 h-[1px] bg-clay"></span>
        </div>
        <p className="mb-3 tracking-widest text-gray-400 font-serif italic text-xs">
          收集互联网的温柔瞬间
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3 max-w-2xl mx-auto text-xs font-medium">
          {['关于我们', '联系作者'].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="hover:text-rust transition-colors relative group text-gray-500"
              >
                {item}
              </a>
            )
          )}
        </div>
        <div className="opacity-60 space-y-1 font-sans scale-90">
          <p>&copy; 2025 流沙聚·拾光. 保留所有权利.</p>
          <div className="flex justify-center gap-3">
            <a href="#" className="hover:text-ink">
              京ICP备 12345678号
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-ink">
              京公网安备 1234567890号
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
