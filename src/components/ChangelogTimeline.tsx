import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const versions = [
  {
    version: 'v3.0',
    date: '画饼/暂未实现',
    tag: '计划中',
    tagColor: 'from-yellow-500/20 to-orange-500/20 text-yellow-400',
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
    tagColor: 'from-neon-blue/20 to-neon-purple/20 text-neon-blue',
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
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">更新日志</h2>
          <p className="text-gray-500">持续迭代，不断进步</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue/50 via-neon-purple/30 to-transparent" />

          <div className="space-y-8">
            {versions.map((v, i) => (
              <motion.div
                key={v.version}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative pl-16"
              >
                <div className={`absolute left-4 top-6 w-4 h-4 rounded-full border-2 ${
                  v.tag === '当前版本'
                    ? 'border-neon-blue bg-neon-blue/30 shadow-lg shadow-neon-blue/30'
                    : 'border-white/20 bg-gray-900'
                }`} />

                <div className="glass-card p-6 group hover:bg-white/5 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-xl font-bold text-white">{v.version}</span>
                    <span className="text-sm text-gray-500">{v.date}</span>
                    {v.tag && (
                      <span className={`text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r ${v.tagColor} font-medium`}>
                        {v.tag}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {v.items.map((item) => (
                      <li key={item} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-neon-blue/50 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
