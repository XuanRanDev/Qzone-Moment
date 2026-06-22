import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { createPayOrder } from '../api/payment'

export default function Buy() {
  const [qq, setQq] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{ paid: boolean; message: string; payUrl?: string } | null>(null)

  const handleQuery = async (e: React.FormEvent) => {
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
        setError(res.msg || '系统异常，请稍后重试')
        return
      }
      setResult({
        paid: res.data.paid,
        message: res.data.message,
        payUrl: res.data.payDisplayContent || undefined,
      })
    } catch {
      setError('网络连接异常，请检查网络后重试')
    } finally {
      setLoading(false)
    }
  }

  const handlePay = () => {
    if (result?.payUrl) {
      window.location.href = result.payUrl
    }
  }

  const handleReset = () => {
    setResult(null)
    setQq('')
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
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="query"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl overflow-hidden">
                  <img src="/favicon.ico" alt="logo" className="w-full h-full" />
                </div>
                <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-3">授权查询</h1>
                <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed max-w-sm mx-auto">
                  输入QQ号码查询授权状态。授权后可在任意设备永久使用QQ空间时光机。
                </p>
              </div>

              <div className="bg-white dark:bg-surface-900/50 backdrop-blur-sm border border-surface-200 dark:border-white/10 rounded-2xl p-8 shadow-sm dark:shadow-none">
                <form onSubmit={handleQuery}>
                  <label className="block mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">
                    QQ号码
                  </label>
                  <input
                    type="text"
                    value={qq}
                    onChange={(e) => setQq(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    placeholder="请输入需要查询的QQ号码"
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 focus:border-transparent transition-all"
                    disabled={loading}
                    autoFocus
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
                          查询中...
                        </>
                      ) : (
                        '查询授权状态'
                      )}
                    </span>
                  </button>
                </form>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { icon: '🔗', title: '账号绑定', desc: '授权绑定账号' },
                  { icon: '🍭', title: '无效退款', desc: '无法找回支持退款' },
                  { icon: '♾️', title: '永久有效', desc: '一次购买终身使用' },
                ].map((item) => (
                  <div key={item.title} className="text-center p-4 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-surface-100 dark:border-white/5">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-sm font-medium text-surface-700 dark:text-surface-300">{item.title}</p>
                    <p className="text-xs text-surface-400 dark:text-surface-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : result.paid ? (
            <motion.div
              key="authorized"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-surface-900/50 backdrop-blur-sm border border-surface-200 dark:border-white/10 rounded-2xl p-10 shadow-sm dark:shadow-none text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">已获授权</h2>
              <p className="text-surface-500 dark:text-surface-400 text-sm mb-2">
                QQ号码：<span className="font-medium text-surface-700 dark:text-surface-300">{qq}</span>
              </p>
              <p className="text-surface-500 dark:text-surface-400 text-sm mb-8 leading-relaxed">
                该账号已获得永久授权，可在任意设备上下载并使用QQ空间时光机。
              </p>

              <div className="p-4 rounded-xl bg-surface-50 dark:bg-white/[0.02] border border-surface-100 dark:border-white/5 mb-8">
                <p className="text-sm text-surface-600 dark:text-surface-300">
                  如需在新设备使用，请直接下载软件并登录，系统将自动识别您的授权。
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={handleReset} className="flex-1 btn-secondary text-sm">
                  重新查询
                </button>
                <a href="/guide" className="flex-1 btn-primary text-sm text-center">
                  <span className="relative z-10">使用教程</span>
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unauthorized"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-surface-900/50 backdrop-blur-sm border border-surface-200 dark:border-white/10 rounded-2xl p-10 shadow-sm dark:shadow-none text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </motion.div>

              <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">未获授权</h2>
              <p className="text-surface-500 dark:text-surface-400 text-sm mb-2">
                QQ号码：<span className="font-medium text-surface-700 dark:text-surface-300">{qq}</span>
              </p>
              <p className="text-surface-500 dark:text-surface-400 text-sm mb-6">
                该账号尚未获得授权或已完成退款。
              </p>

              <div className="p-5 rounded-xl bg-surface-50 dark:bg-white/[0.02] border border-surface-100 dark:border-white/5 mb-8 text-left">
                <p className="text-sm text-surface-700 dark:text-surface-300 font-medium mb-2">
                  赞助支持QQ空间时光机
                </p>
                <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                  如果您认可本工具的价值，欢迎赞助支持项目的持续开发与维护。赞助后您的账号将获得永久授权，可在任意设备上使用。<br/>
                  <br/>
                  * 且若最后无法找回<b>任何内容</b>支持退款
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={handleReset} className="flex-1 btn-secondary text-sm">
                  重新查询
                </button>
                <button onClick={handlePay} className="flex-1 btn-primary text-sm">
                  <span className="relative z-10">赞助获取授权</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-surface-400 dark:text-surface-500 mt-6">
          如有任何疑问，请联系 xuanrandev@qq.com
        </p>
      </div>
    </motion.div>
  )
}
