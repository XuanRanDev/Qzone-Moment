import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/40 dark:border-white/[0.06] bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 font-bold text-lg mb-4">
              <span className="w-9 h-9 bg-gradient-to-br from-blue-500 via-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-sm shadow-lg shadow-violet-500/20">
                Q
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                QQ空间时光机
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              找回那些被遗忘的瞬间。
              <br />
              恢复与导出已删除的QQ空间内容。
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">导航</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/guide", label: "使用指南" },
                { href: "/faq", label: "常见问题" },
                { href: "/changelog", label: "更新日志" },
                { href: "/legacy/", label: "旧版官网", external: true },
              ].map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-4">联系</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://github.com/XuanRanDev" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://blog.xuanran.cc" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <span className="text-gray-500 dark:text-gray-400">xuanrandev@qq.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200/40 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 dark:text-gray-500">
          <span>© {new Date().getFullYear()} QQ空间时光机</span>
          <span className="flex items-center gap-1.5">
            Made with
            <span className="text-red-400">♥</span>
            by XuanRan
          </span>
        </div>
      </div>
    </footer>
  );
}
