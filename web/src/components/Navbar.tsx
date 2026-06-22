"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/guide", label: "使用指南" },
  { href: "/faq", label: "常见问题" },
  { href: "/changelog", label: "更新日志" },
];

const aboutLinks = [
  { href: "https://github.com/XuanRanDev", label: "GitHub" },
  { href: "https://blog.xuanran.cc", label: "Blog" },
  { href: "https://codebook.xuanran.cc", label: "CodeBook" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/60 dark:bg-gray-950/60 backdrop-blur-2xl border-b border-gray-200/40 dark:border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative w-9 h-9 bg-gradient-to-br from-blue-500 via-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300 group-hover:scale-110">
              Q
            </span>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent hidden sm:inline">
              QQ空间时光机
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-500/10"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.05]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="relative">
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.05] flex items-center gap-1 transition-all"
              >
                关于
                <svg className={`w-3 h-3 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {aboutOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setAboutOpen(false)} />
                  <div className="absolute right-0 mt-1 w-48 bg-white/90 dark:bg-gray-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 border border-gray-200/50 dark:border-white/[0.08] py-1.5 z-50">
                    {aboutLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="w-px h-5 bg-gray-200/60 dark:bg-white/[0.08] mx-2" />

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="p-2.5 rounded-xl text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-all"
              aria-label="切换主题"
            >
              {theme === "dark" ? (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <a
              href="/legacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.05] flex items-center gap-1 transition-all"
            >
              旧版
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a
              href="https://file.xuanran.cc/qqkjsgj.exe"
              className="ml-2 px-5 py-2 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:scale-105"
            >
              下载
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-lg text-gray-400">
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-gray-100 dark:border-white/[0.05] pt-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${pathname === link.href ? "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400" : "text-gray-500 dark:text-gray-400"}`}>
                {link.label}
              </Link>
            ))}
            <a href="https://file.xuanran.cc/qqkjsgj.exe" className="block mx-3 mt-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-xl text-center">
              立即下载
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
