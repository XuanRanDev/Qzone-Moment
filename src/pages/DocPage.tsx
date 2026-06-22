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
      return <Link to={href} {...props}>{children}</Link>
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  },
  h1: ({ children, ...props }) => <h1 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-white/10" {...props}>{children}</h1>,
  h2: ({ children, id, ...props }) => (
    <h2 id={id} className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }) => <h3 className="text-xl font-semibold text-white mt-8 mb-3" {...props}>{children}</h3>,
  p: ({ children, ...props }) => <p className="text-gray-400 leading-relaxed mb-4" {...props}>{children}</p>,
  ul: ({ children, ...props }) => <ul className="space-y-2 mb-4 text-gray-400" {...props}>{children}</ul>,
  ol: ({ children, ...props }) => <ol className="space-y-2 mb-4 text-gray-400 list-decimal list-inside" {...props}>{children}</ol>,
  li: ({ children, ...props }) => <li className="flex items-start gap-2" {...props}>{children}</li>,
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-2 border-neon-blue/50 pl-4 my-6 text-gray-500 italic bg-white/5 rounded-r-xl py-3 pr-4" {...props}>{children}</blockquote>
  ),
  hr: () => <hr className="my-8 border-white/10" />,
  img: ({ src, alt, ...props }) => (
    <span className="block my-6">
      <img src={src} alt={alt || ''} className="rounded-xl border border-white/10 max-w-full" {...props} />
    </span>
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
        <p className="text-gray-500">页面不存在</p>
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
                  {sidebar.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                      {item.text}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          <article className="flex-1 min-w-0 max-w-4xl">
            <div className="glass-card p-8 sm:p-12">
              <div className="prose prose-invert prose-headings:text-white prose-p:text-gray-400 prose-a:text-neon-blue prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-neon-blue prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 prose-pre:border prose-pre:border-white/10 prose-img:rounded-xl prose-img:border prose-img:border-white/10 max-w-none">
                <Markdown remarkPlugins={[remarkGfm]} components={components}>
                  {doc.content}
                </Markdown>
              </div>
            </div>
          </article>
        </div>
      </div>
    </motion.div>
  )
}
