import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const pipeline = [
  {
    label: '扫码登录',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
  {
    label: '抓取数据',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
  {
    label: '本地解析',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 3v1.5M15.75 3v1.5M8.25 19.5V21M15.75 19.5V21M3 8.25h1.5M3 12h1.5M3 15.75h1.5M19.5 8.25H21M19.5 12H21M19.5 15.75H21M5.25 5.25h13.5a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V6.75a1.5 1.5 0 011.5-1.5z" />
      </svg>
    ),
  },
  {
    label: '生成结果',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 003 9 14.5 14.5 0 01-3 9 14.5 14.5 0 01-3-9 14.5 14.5 0 013-9z" />
      </svg>
    ),
  },
]

const assurances = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88" />
      </svg>
    ),
    title: '不收集任何个人数据',
    desc: 'QQ空间时光机不会读取或上传任何数据。',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: '不上传 Cookie',
    desc: '登录凭证只保存在本机内存中，关闭应用即释放。',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    title: '抓取全程本地',
    desc: '数据抓取请求由您的电脑直接发出，不经任何服务器。',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 3v1.5M15.75 3v1.5M8.25 19.5V21M15.75 19.5V21M3 8.25h1.5M3 12h1.5M3 15.75h1.5M19.5 8.25H21M19.5 12H21M19.5 15.75H21M5.25 5.25h13.5a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V6.75a1.5 1.5 0 011.5-1.5z" />
      </svg>
    ),
    title: '分析全程本地',
    desc: '所有的数据分析与生成均在您本机完成。',
  },
]

function PipelineVisual({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-400/20 to-purple-400/20 dark:from-neon-blue/15 dark:to-neon-purple/15 blur-2xl" />

      <div className="absolute -top-4 -right-3 sm:-top-5 sm:-right-6 rotate-6 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-sm border border-surface-200 dark:border-white/10 shadow-md text-xs font-medium text-surface-500 dark:text-gray-400 whitespace-nowrap">
          <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5h10.5a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3l18 18" />
          </svg>
          0 字节上传
        </div>
      </div>

      <div className="relative glass-card p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-7">
          <svg className="w-4 h-4 text-brand-500 dark:text-neon-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 4.556-3.04 8.27-7.32 9.48a3 3 0 01-1.36 0C8.04 20.27 5 16.556 5 12V7.5a1 1 0 01.6-.917l6-2.4a1 1 0 01.8 0l6 2.4a1 1 0 01.6.917V12z" />
          </svg>
          <span className="text-xs font-semibold text-surface-500 dark:text-gray-400 tracking-wide">全流程本地化</span>
        </div>

        <div className="flex items-center justify-between">
          {pipeline.map((step, i) => (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2 text-center shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-50 dark:bg-brand-500/15 flex items-center justify-center text-brand-600 dark:text-neon-blue">
                  {step.icon}
                </div>
                <span className="text-[10px] sm:text-xs text-surface-500 dark:text-gray-400 whitespace-nowrap">{step.label}</span>
              </div>

              {i < pipeline.length - 1 && (
                <div className="relative flex-1 h-px mx-1.5 sm:mx-3 bg-surface-200 dark:bg-white/10 overflow-hidden rounded-full">
                  <motion.div
                    className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-brand-400 dark:via-neon-blue to-transparent"
                    animate={isInView ? { x: ['-100%', '300%'] } : {}}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.6, delay: i * 0.3, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-7 pt-5 border-t border-dashed border-surface-200 dark:border-white/10 flex items-center justify-center gap-2 text-center text-xs text-surface-400 dark:text-surface-500">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          QQ空间时光机致力于保护隐私安全。
        </div>
      </div>
    </div>
  )
}

export default function PrivacySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-brand-600 dark:text-neon-blue mb-4 tracking-wide">
            隐私优先
          </span>
          <h2 className="section-title mb-4">
            您的回忆，<span className="gradient-text">只属于您</span>
          </h2>
          <p className="section-desc max-w-lg mx-auto">
            QQ空间时光机遵循隐私优先设计原则，应用的所有数据处理，包括登录、数据抓取、数据分析等操作均在您计算机本地进行，我们不会上传任何数据。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <PipelineVisual isInView={isInView} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-3"
          >
            {assurances.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 rounded-2xl transition-colors duration-300 hover:bg-white/60 dark:hover:bg-white/5"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-50 dark:bg-brand-500/15 flex items-center justify-center text-brand-600 dark:text-neon-blue">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-surface-500 dark:text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
