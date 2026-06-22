import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-surface-200 dark:border-white/5 bg-surface-50/50 dark:bg-gray-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/favicon.ico" alt="logo" className="w-8 h-8 rounded-lg" />
              <span className="text-lg font-bold gradient-text">QQ空间时光机</span>
            </div>
            <p className="text-surface-500 dark:text-gray-500 text-sm leading-relaxed">
              找回那些被遗忘的瞬间。<br />
              恢复与导出已删除的QQ空间内容。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-surface-700 dark:text-gray-300 mb-4">快速链接</h3>
            <ul className="space-y-2.5">
              <li><Link to="/guide" className="text-surface-500 dark:text-gray-500 hover:text-surface-900 dark:hover:text-white text-sm transition-colors">使用教程</Link></li>
              <li><Link to="/faq" className="text-surface-500 dark:text-gray-500 hover:text-surface-900 dark:hover:text-white text-sm transition-colors">常见问题</Link></li>
              <li><Link to="/changelog" className="text-surface-500 dark:text-gray-500 hover:text-surface-900 dark:hover:text-white text-sm transition-colors">更新日志</Link></li>
              <li><Link to="/manual_login" className="text-surface-500 dark:text-gray-500 hover:text-surface-900 dark:hover:text-white text-sm transition-colors">手动登录教程</Link></li>
              <li><Link to="/buy" className="text-surface-500 dark:text-gray-500 hover:text-surface-900 dark:hover:text-white text-sm transition-colors">授权查询</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-surface-700 dark:text-gray-300 mb-4">联系作者</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="https://blog.xuanran.cc" target="_blank" rel="noopener noreferrer" className="text-surface-500 dark:text-gray-500 hover:text-surface-900 dark:hover:text-white text-sm transition-colors">
                  XuanRan's Blog
                </a>
              </li>
              <li>
                <a href="https://codebook.xuanran.cc" target="_blank" rel="noopener noreferrer" className="text-surface-500 dark:text-gray-500 hover:text-surface-900 dark:hover:text-white text-sm transition-colors">
                  CodeBook
                </a>
              </li>
              <li className="text-surface-500 dark:text-gray-500 text-sm">
                <a href="mailto:xuanrandev@qq.com" className="hover:text-surface-900 dark:hover:text-white transition-colors">xuanrandev@qq.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-surface-200 dark:border-white/5 flex flex-col items-center gap-3">
          <p className="text-surface-400 dark:text-gray-600 text-xs text-center">
            &copy; {new Date().getFullYear()} XuanRan. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-surface-400 dark:text-gray-600">
            <span>使用</span>
            <a href="https://vite.dev" target="_blank" rel="noopener noreferrer" className="text-surface-500 dark:text-gray-500 hover:text-surface-900 dark:hover:text-white transition-colors">Vite</a>
            <span>+</span>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="text-surface-500 dark:text-gray-500 hover:text-surface-900 dark:hover:text-white transition-colors">React</a>
            <span>构建</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
