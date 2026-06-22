import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const navItems = [
  { text: '首页', link: '/' },
  { text: '使用教程', link: '/guide' },
  { text: '常见问题', link: '/faq' },
  { text: '更新日志', link: '/changelog' },
  { text: '授权查询', link: '/buy' },
]

const moreItems = [
  // { text: 'Github', link: 'https://github.com/XuanRanDev', external: true },
  { text: "XuanRan's Blog", link: 'https://blog.xuanran.cc', external: true },
  { text: 'CodeBook', link: 'https://codebook.xuanran.cc', external: true },
]

export default function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMoreOpen(false)
  }, [location.pathname])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-surface-200 dark:border-white/5 shadow-sm dark:shadow-2xl dark:shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/favicon.ico" alt="logo" className="w-8 h-8 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
            <span className="text-lg font-bold gradient-text hidden sm:block">QQ空间时光机</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.link
                    ? 'text-brand-600 dark:text-white bg-brand-50 dark:bg-white/10'
                    : 'text-surface-500 dark:text-gray-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-white/5'
                }`}
              >
                {item.text}
              </Link>
            ))}

            <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-surface-500 dark:text-gray-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-white/5 transition-all duration-300 flex items-center gap-1">
                关于
                <svg className={`w-3 h-3 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 w-48 py-2 bg-white dark:bg-surface-900 border border-surface-200 dark:border-white/10 backdrop-blur-xl rounded-xl shadow-xl dark:shadow-2xl"
                  >
                    {moreItems.map((item) => (
                      <a
                        key={item.link}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2.5 text-sm text-surface-600 dark:text-gray-300 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-white/5 transition-colors"
                      >
                        {item.text}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-lg text-surface-500 dark:text-gray-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-white/5 transition-all duration-300"
              aria-label="切换主题"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <a
              href="https://file.xuanran.cc/qqkjsgj.exe"
              className="ml-3 btn-primary text-sm !px-5 !py-2"
            >
              立即下载
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-surface-500 dark:text-gray-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-white/5 transition-colors"
              aria-label="切换主题"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-surface-500 dark:text-gray-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-surface-200 dark:border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.link
                      ? 'text-brand-600 dark:text-white bg-brand-50 dark:bg-white/10'
                      : 'text-surface-500 dark:text-gray-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-white/5'
                  }`}
                >
                  {item.text}
                </Link>
              ))}
              <div className="pt-2 border-t border-surface-100 dark:border-white/5">
                <p className="px-4 py-2 text-xs font-semibold text-surface-400 dark:text-surface-500">关于</p>
                {moreItems.map((item) => (
                  <a
                    key={item.link}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2.5 text-sm text-surface-500 dark:text-gray-400 hover:text-surface-900 dark:hover:text-white"
                  >
                    {item.text}
                  </a>
                ))}
              </div>
              <a
                href="https://file.xuanran.cc/qqkjsgj.exe"
                className="block mt-3 btn-primary text-center text-sm"
              >
                立即下载
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
