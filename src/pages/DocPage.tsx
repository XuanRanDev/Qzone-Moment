import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import guideMd from '../docs/guide.md?raw'
import faqMd from '../docs/faq.md?raw'
import changelogMd from '../docs/changelog.md?raw'
import manualLoginMd from '../docs/manual-login.md?raw'

const docs: Record<string, { title: string; content: string }> = {
  guide: { title: '使用教程', content: guideMd },
  faq: { title: '常见问题', content: faqMd },
  changelog: { title: '更新日志', content: changelogMd },
  manual_login: { title: '手动登录教程', content: manualLoginMd },
}

const sidebarItems: Record<string, { text: string; href: string }[]> = {
  guide: [
    { text: '软件下载与运行环境', href: '/guide#一、软件下载与环境要求' },
    { text: '启动与授权', href: '/guide#二、启动与授权' },
    { text: '导出空间数据', href: '/guide#三、导出空间数据' },
    { text: '查看导出结果', href: '/guide#四、查看导出结果' },
    { text: '补充说明', href: '/guide#五、补充说明' },
  ],
}

const components: Components = {
  a: ({ href, children, ...props }) => {
    if (href?.startsWith('/') || href?.startsWith('#')) {
      return <Link to={href} className="text-brand-600 dark:text-neon-blue hover:underline font-medium" {...props}>{children}</Link>
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-neon-blue hover:underline font-medium" {...props}>{children}</a>
  },
  h1: ({ children, ...props }) => (
    <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-8 pb-4 border-b border-surface-200 dark:border-white/10" {...props}>{children}</h1>
  ),
  h2: ({ children, id, ...props }) => (
    <h2 id={id} className="text-2xl font-bold text-surface-900 dark:text-white mt-12 mb-4 pb-2 border-b border-surface-100 dark:border-white/5 scroll-mt-24" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-semibold text-surface-800 dark:text-white mt-8 mb-3" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-surface-600 dark:text-surface-300 leading-relaxed mb-4" {...props}>{children}</p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="space-y-2 mb-4 text-surface-600 dark:text-surface-300" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="space-y-2 mb-4 text-surface-600 dark:text-surface-300 list-decimal list-inside" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }) => (
    <li className="flex items-start gap-2" {...props}>{children}</li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-brand-400 dark:border-neon-blue pl-4 my-6 text-surface-500 dark:text-surface-400 italic bg-brand-50 dark:bg-white/5 rounded-r-xl py-3 pr-4" {...props}>{children}</blockquote>
  ),
  hr: () => <hr className="my-8 border-surface-200 dark:border-white/10" />,
  img: ({ src, alt, ...props }) => (
    <span className="block my-6">
      <img src={src} alt={alt || ''} className="rounded-xl border border-surface-200 dark:border-white/10 max-w-full shadow-sm" {...props} />
      {alt && <span className="block text-center text-sm text-surface-400 dark:text-surface-500 mt-2">{alt}</span>}
    </span>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-surface-200 dark:border-white/10">
      <table className="w-full text-sm" {...props}>{children}</table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-surface-50 dark:bg-white/5 border-b border-surface-200 dark:border-white/10" {...props}>{children}</thead>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-3 text-left font-semibold text-surface-700 dark:text-white" {...props}>{children}</th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-surface-600 dark:text-surface-300 border-t border-surface-100 dark:border-white/5" {...props}>{children}</td>
  ),
  pre: ({ children, ...props }) => (
    <pre className="bg-surface-900 dark:bg-gray-950 border border-surface-200 dark:border-white/10 rounded-xl p-4 my-6 overflow-x-auto text-sm leading-relaxed" {...props}>{children}</pre>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className
    if (isInline) {
      return <code className="bg-brand-50 dark:bg-white/10 text-brand-700 dark:text-neon-blue px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
    }
    return <code className={className} {...props}>{children}</code>
  },
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-surface-900 dark:text-white" {...props}>{children}</strong>
  ),
}

interface DocPageProps {
  docType: string
}

export default function DocPage({ docType }: DocPageProps) {
  const doc = docs[docType]

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-surface-500">页面不存在</p>
      </div>
    )
  }

  const sidebar = sidebarItems[docType]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-20 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {sidebar && (
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <nav className="space-y-1">
                  <p className="px-4 py-2 text-xs font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider">目录</p>
                  {sidebar.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-surface-500 dark:text-surface-400 hover:text-brand-600 dark:hover:text-white hover:bg-brand-50 dark:hover:bg-white/5 rounded-lg transition-all"
                    >
                      {item.text}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          <article className="flex-1 min-w-0 max-w-4xl">
            <div className="bg-white dark:bg-surface-900/50 backdrop-blur-sm border border-surface-200 dark:border-white/10 rounded-2xl p-8 sm:p-12 shadow-sm dark:shadow-none">
              <Markdown remarkPlugins={[remarkGfm]} components={components}>
                {doc.content}
              </Markdown>
            </div>
          </article>
        </div>
      </div>
    </motion.div>
  )
}
