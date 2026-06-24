import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import ParticleField from './ParticleField'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const blobY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 dark:via-gray-950/50 to-white dark:to-gray-950" />

      <motion.div
        style={{ y: blobY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-brand-300/55 dark:bg-neon-blue/25 rounded-full blur-[100px] animate-aurora-1"
      />
      <motion.div
        style={{ y: blobY }}
        className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-purple-300/50 dark:bg-neon-purple/25 rounded-full blur-[90px] animate-aurora-2"
      />
      <motion.div
        style={{ y: blobY }}
        className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-pink-300/45 dark:bg-neon-pink/20 rounded-full blur-[90px] animate-aurora-3"
      />

      {/* unmistakable rotating color sweep behind the headline */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[90px] opacity-40 dark:opacity-50 animate-spin-slow"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(99,102,241,0.7), rgba(139,92,246,0.7), rgba(6,182,212,0.7), rgba(236,72,153,0.7), rgba(99,102,241,0.7))',
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
      >
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-surface-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-surface-500 dark:text-gray-400">v2.4 最新版本已发布</span>
          </div>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
        >
          <span className="text-surface-900 dark:text-white">QQ空间</span>
          <br />
          <span className="gradient-text">时光机</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg sm:text-xl md:text-2xl text-surface-500 dark:text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          回到曾经，拾起遗落的时光
        </motion.p>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-sm sm:text-base text-surface-400 dark:text-gray-500 max-w-xl mx-auto mb-10"
        >
          导出您已删除的QQ空间说说、评论、留言等历史内容。
        </motion.p>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="https://file.xuanran.cc/qqkjsgj.exe" className="btn-primary text-base">
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              立即下载
            </span>
          </a>
          <Link to="/guide" className="btn-secondary text-base">
            使用教程
          </Link>
        </motion.div>

        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {[
            { label: '支持平台', value: 'Windows' },
            { label: '当前版本', value: 'v2.4' },
            { label: '恢复率', value: '极高' },
            { label: '数据安全', value: '本地处理' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-surface-200 dark:border-white/10 rounded-2xl p-4 text-center">
              <div className="text-xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-surface-400 dark:text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-surface-300 dark:border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-surface-400 dark:bg-white/40"
          />
        </div>
      </motion.div>
    </section>
  )
}
