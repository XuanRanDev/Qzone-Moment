import { motion } from 'framer-motion'
import { useSearchParams, Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const qq = searchParams.get('qq')
  const tradeNo = searchParams.get('trade_no')
  const outTradeNo = searchParams.get('out_trade_no')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-20 min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <div className="bg-white dark:bg-surface-900/50 backdrop-blur-sm border border-surface-200 dark:border-white/10 rounded-2xl p-8 shadow-sm dark:shadow-none text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center"
            >
              <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">支付成功</h1>
            <p className="text-surface-500 dark:text-surface-400 text-sm mb-8">您的授权已激活，现在可以使用软件了</p>

            <div className="space-y-3 text-left mb-8">
              {qq && (
                <div className="flex justify-between items-center py-2 border-b border-surface-100 dark:border-white/5">
                  <span className="text-sm text-surface-500 dark:text-surface-400">QQ号码</span>
                  <span className="text-sm font-medium text-surface-900 dark:text-white">{qq}</span>
                </div>
              )}
              {tradeNo && (
                <div className="flex justify-between items-center py-2 border-b border-surface-100 dark:border-white/5">
                  <span className="text-sm text-surface-500 dark:text-surface-400">交易号</span>
                  <span className="text-sm font-medium text-surface-900 dark:text-white font-mono">{tradeNo}</span>
                </div>
              )}
              {outTradeNo && (
                <div className="flex justify-between items-center py-2 border-b border-surface-100 dark:border-white/5">
                  <span className="text-sm text-surface-500 dark:text-surface-400">订单号</span>
                  <span className="text-sm font-medium text-surface-900 dark:text-white font-mono">{outTradeNo}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Link to="/guide" className="block w-full btn-primary text-sm">
                <span className="relative z-10">查看使用教程</span>
              </Link>
              <Link to="/" className="block w-full btn-secondary text-sm">
                返回首页
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.p custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-center text-xs text-surface-400 dark:text-surface-500 mt-6">
          如有疑问请联系 xuanrandev@qq.com
        </motion.p>
      </div>
    </motion.div>
  )
}
