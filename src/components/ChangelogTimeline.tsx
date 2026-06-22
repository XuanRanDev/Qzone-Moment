import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const versions = [
  {
    version: 'v3.0',
    date: '画饼/暂未实现',
    tag: '计划中',
    tagColor: 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400',
    items: [
      '支持导出好友列表',
      '尽可能的以原图形式导出QQ空间相册图片',
      '支持导出特定好友的已删除内容',
    ],
  },
  {
    version: 'v2.4',
    date: '2026.06.21',
    tag: '当前版本',
    tagColor: 'bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-400',
    items: [
      '支持动态二维码，可实现自动授权',
      '修复账号在大批量数据下可能会产生的授权过期问题',
      '修复其他已知BUG',
    ],
  },
  {
    version: 'v2.3',
    date: '2026.02.06',
    tag: '',
    tagColor: '',
    items: [
      '支持手动登录功能来解决部分账号因风控问题无法扫码登录的问题',
    ],
  },
  {
    version: 'v2.2',
    date: '2026.01.04',
    tag: '',
    tagColor: '',
    items: [
      '修复导出的网页图片等媒体元素可能会因QQ空间授权失效造成无法查看的问题',
      '导出的动态内容若存在媒体文件支持自动选择从网络加载或本地文件加载显示',
      '可以在导出的动态网页中浏览视频了',
      '大幅度的提高数据解析的处理速度',
    ],
  },
  {
    version: 'v2.1',
    date: '2025.12.28',
    tag: '',
    tagColor: '',
    items: [
      '抓取数据时支持计算剩余时间（预估）',
      '增强数据抓取能力，进一步防止被防火墙拦截',
    ],
  },
  {
    version: 'v2.0',
    date: '2025.12.23',
    tag: '',
    tagColor: '',
    items: [
      '使用全新数据分析算法',
      '全新时间推算算法，实际时间更精准',
      '支持楼中楼的回复信息',
      '支持获取访客列表数据',
    ],
  },
  {
    version: 'v1.0',
    date: '2025.12.18',
    tag: '',
    tagColor: '',
    items: [
      '勉强能用',
    ],
  },
]

export default function ChangelogTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">更新日志</h2>
          <p className="section-desc">持续迭代，不断进步</p>
        </motion.div>

        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 min-w-max">
            {versions.map((v, i) => (
              <motion.div
                key={v.version}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`w-72 shrink-0 ${
                  v.tag === '当前版本'
                    ? 'bg-gradient-to-br from-brand-50 to-white dark:from-brand-500/10 dark:to-white/5 border-brand-200 dark:border-brand-500/30'
                    : 'bg-white dark:bg-white/5 border-surface-200 dark:border-white/10'
                } border rounded-2xl p-5 transition-all duration-300 hover:shadow-lg dark:hover:shadow-brand-500/10 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-surface-900 dark:text-white">{v.version}</span>
                  {v.tag && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${v.tagColor}`}>
                      {v.tag}
                    </span>
                  )}
                </div>

                <p className="text-xs text-surface-400 dark:text-surface-500 mb-4">{v.date}</p>

                <ul className="space-y-2">
                  {v.items.map((item) => (
                    <li key={item} className="text-sm text-surface-600 dark:text-surface-300 flex items-start gap-2 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-400 dark:bg-neon-blue shrink-0" />
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <a
            href="/changelog"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-neon-blue hover:underline"
          >
            查看完整更新日志
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
