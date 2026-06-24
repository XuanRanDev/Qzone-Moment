import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

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

const chips = ['Windows 10 / 11', '免安装绿色版', '本地处理，不上传', '永久使用']

const orbitItems = [
  { label: '说说', pos: '-top-3 -left-3 sm:-top-4 sm:-left-6', delay: '0s' },
  { label: '评论', pos: '-top-3 -right-3 sm:-top-4 sm:-right-6', delay: '0.7s' },
  { label: '留言', pos: '-bottom-3 -left-3 sm:-bottom-4 sm:-left-6', delay: '1.4s' },
  { label: '互动排行', pos: '-bottom-3 -right-3 sm:-bottom-4 sm:-right-6', delay: '2.1s' },
]

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function OrbitVisual() {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-sm mx-auto aspect-square">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-400/30 to-purple-400/30 dark:from-neon-blue/25 dark:to-neon-purple/25 blur-3xl" />

      <div
        className="absolute inset-10 sm:inset-12 rounded-full opacity-60 dark:opacity-70 blur-2xl animate-spin-slow"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(99,102,241,0.7), rgba(139,92,246,0.7), rgba(6,182,212,0.7), rgba(236,72,153,0.7), rgba(99,102,241,0.7))',
        }}
      />

      <div className="absolute inset-14 sm:inset-16 rounded-[2rem] glass-card flex flex-col items-center justify-center gap-3 shadow-xl">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden animate-glow">
          <img src="/favicon.ico" alt="logo" className="w-full h-full" />
        </div>
        <span className="text-xs sm:text-sm font-semibold gradient-text">QQ空间时光机</span>
      </div>

      {orbitItems.map((item) => (
        <div key={item.label} className={`absolute ${item.pos} animate-float`} style={{ animationDelay: item.delay }}>
          <div className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-sm border border-surface-200 dark:border-white/10 shadow-md text-xs font-medium text-surface-600 dark:text-gray-300 whitespace-nowrap">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Download() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [sloganIndex, setSloganIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % slogans.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <span className="inline-block text-sm font-semibold text-brand-600 dark:text-neon-blue mb-4 tracking-wide">
              立即开始
            </span>

            <h2 className="section-title mb-4">
              让记忆<span className="gradient-text">再次上线</span>
            </h2>

            <div className="h-7 mb-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={sloganIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-base sm:text-lg text-surface-500 dark:text-gray-400 italic"
                >
                  "{slogans[sloganIndex]}"
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="section-desc mb-8 max-w-md mx-auto lg:mx-0">
              支持 Windows 10 / 11，下载即用，无需安装。<br />
              只需一杯奶茶的价格，永久使用。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <a href="https://file.xuanran.cc/qqkjsgj.exe" className="btn-primary text-base !px-8 !py-3.5">
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

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/70 dark:bg-white/5 border border-surface-200 dark:border-white/10 text-surface-600 dark:text-gray-300 transition-colors hover:border-brand-300 dark:hover:border-brand-500/40"
                >
                  <span className="text-brand-500 dark:text-neon-blue"><CheckIcon /></span>
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <OrbitVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
