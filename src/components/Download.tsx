import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useSpotlight } from '../hooks/useSpotlight'

const slogans = [
  '时间带走很多东西，但不该带走回忆。',
  '钱还能再赚，青春无法重来',
  '被时间带走的，我们帮你找回',
  '时间会走远，回忆值得留下',
  '翻回过去，重新遇见曾经的自己',
  '时间会走远，回忆值得留下。',
  '翻回过去，重新遇见曾经的自己。',
  '每一条说说，都是过去的自己。',
  '青春不散场，回忆永在线',
]

export default function Download() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [sloganIndex, setSloganIndex] = useState(0)
  const { ref: spotlightRef, onMouseMove } = useSpotlight<HTMLDivElement>()

  useEffect(() => {
    const timer = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % slogans.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={ref} className="relative py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/10 to-transparent" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          ref={spotlightRef}
          onMouseMove={onMouseMove}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="spotlight bg-white dark:bg-surface-900/50 backdrop-blur-sm border border-surface-200 dark:border-white/10 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-sm dark:shadow-none"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-brand-400/50 dark:via-neon-blue/50 to-transparent" />

          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl animate-glow overflow-hidden">
            <img src="/favicon.ico" alt="logo" className="w-full h-full" />
          </div>

          <div className="h-12 mb-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={sloganIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="section-title"
              >
                {slogans[sloganIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          <p className="section-desc max-w-lg mx-auto mb-10">
            支持 Windows 10 / 11，下载即用，无需安装。<br />
            只需一杯奶茶的价格，永久使用。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="https://file.xuanran.cc/qqkjsgj.exe"
              className="btn-primary text-lg !px-10 !py-4"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                下载最新版 v2.4
              </span>
            </a>
            <a
              href="https://www.123865.com/s/fbaCTd-bVk5H"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              备用下载 (123网盘)
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">v2.4</div>
              <div className="text-xs text-surface-400 dark:text-gray-500 mt-1">最新版本</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">Win 10/11</div>
              <div className="text-xs text-surface-400 dark:text-gray-500 mt-1">系统支持</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">免安装</div>
              <div className="text-xs text-surface-400 dark:text-gray-500 mt-1">绿色桌面版</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
