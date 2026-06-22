import { motion } from 'framer-motion'
import { useState } from 'react'
import { createPayOrder } from '../api/payment'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Buy() {
  const [qq, setQq] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{ paid: boolean; message: string; payUrl?: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult(null)

    const qqNum = qq.trim()
    if (!qqNum || !/^\d{5,12}$/.test(qqNum)) {
      setError('请输入有效的QQ号码（5-12位数字）')
      return
    }

    setLoading(true)
    try {
      const res = await createPayOrder(qqNum)
      if (res.code !== 0) {
        setError(res.msg || '查询失败，请稍后重试')
        return
      }

      if (res.data.paid) {
        setResult({ paid: true, message: res.data.message })
      } else {
        setResult({
          paid: false,
          message: res.data.message,
          payUrl: res.data.payDisplayContent || undefined,
        })
      }
    } catch {
      setError('网络连接异常，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handlePay = () => {
    if (result?.payUrl) {
      window.location.href = result.payUrl
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-20 min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-lg">
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl overflow-hidden">
            <img src="/favicon.ico" alt="logo" className="w-full h-full" />
          </div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-3">授权查询</h1>
          <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed max-w-sm mx-auto">
            授权绑定账号后，您可以在任意设备上下载并使用QQ空间时光机，一次授权，永久有效。
          </p>
        </motion.div>

        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
          <div className="bg-white dark:bg-surface-900/50 backdrop-blur-sm border border-surface-200 dark:border-white/10 rounded-2xl p-8 shadow-sm dark:shadow-none">
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">
                QQ号码
              </label>
              <input
                type="text"
                value={qq}
                onChange={(e) => setQq(e.target.value.replace(/\D/g, '').slice(0, 12))}
                placeholder="请输入您需要查询的QQ号"
                className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-transparent transition-all"
                disabled={loading}
              />

              {error && (
                <p className="mt-3 text-sm text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !qq.trim()}
                className="w-full mt-6 btn-primary text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      正在查询...
                    </>
                  ) : (
                    '查询授权状态'
                  )}
                </span>
              </button>
            </form>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-xl border border-surface-200 dark:border-white/10 bg-surface-50 dark:bg-white/5"
              >
                {result.paid ? (
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                      <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-surface-900 dark:text-white mb-1">已获授权</p>
                    <p className="text-sm text-surface-500 dark:text-surface-400">该QQ号已获得授权，可直接在任意设备上使用软件。</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                      <svg className="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-surface-900 dark:text-white mb-1">未获授权</p>
                    <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">该QQ号尚未获得授权或已完成退款。</p>
                    <p className="text-sm text-surface-600 dark:text-surface-300 mb-5">
                      是否愿意赞助支持QQ空间时光机的持续开发与维护？<br />
                      <span className="text-surface-400 dark:text-surface-500">赞助后授权永久有效，感谢您的支持。</span>
                    </p>
                    <button
                      onClick={handlePay}
                      className="w-full btn-primary text-sm"
                    >
                      <span className="relative z-10">赞助获取授权</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: '🔗', title: '账号绑定', desc: '授权与QQ号绑定' },
            { icon: '📱', title: '多设备使用', desc: '任意设备均可使用' },
            { icon: '♾️', title: '永久有效', desc: '一次购买永久使用' },
          ].map((item) => (
            <div key={item.title} className="text-center p-4 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-surface-100 dark:border-white/5">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-medium text-surface-700 dark:text-surface-300">{item.title}</p>
              <p className="text-xs text-surface-400 dark:text-surface-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.p custom={3} initial="hidden" animate="visible" variants={fadeUp} className="text-center text-xs text-surface-400 dark:text-surface-500 mt-6">
          如有任何疑问，请联系 xuanrandev@qq.com
        </motion.p>
      </div>
    </motion.div>
  )
}
