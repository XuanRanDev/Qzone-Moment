import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useMemo, useCallback } from 'react'
import { marked } from 'marked'
import guideMd from '../docs/guide.md?raw'
import faqMd from '../docs/faq.md?raw'
import changelogMd from '../docs/changelog.md?raw'
import manualLoginMd from '../docs/manual-login.md?raw'

marked.setOptions({
  breaks: true,
  gfm: true,
})

const docs: Record<string, { title: string; content: string }> = {
  guide: { title: '使用教程', content: guideMd },
  faq: { title: '常见问题', content: faqMd },
  changelog: { title: '更新日志', content: changelogMd },
  manual_login: { title: '手动登录教程', content: manualLoginMd },
}

const sidebarItems: Record<string, { text: string; href: string }[]> = {
  guide: [
    { text: '软件下载与运行环境', href: '#一软件下载与环境要求' },
    { text: '启动与授权', href: '#二启动与授权' },
    { text: '导出空间数据', href: '#三导出空间数据' },
    { text: '查看导出结果', href: '#四查看导出结果' },
    { text: '补充说明', href: '#五补充说明' },
  ],
}

function MarkdownContent({ content }: { content: string }) {
  const navigate = useNavigate()

  const html = useMemo(() => {
    const renderer = new marked.Renderer()

    renderer.heading = ({ tokens, depth }: any) => {
      const text = tokens.map((t: any) => t.raw || t.text || '').join('')
      const id = text.replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fa5-]/g, '')
      return `<h${depth} id="${id}">${text}</h${depth}>`
    }

    renderer.link = ({ href, title, tokens }: any) => {
      const text = tokens?.map((t: any) => t.raw || t.text || '').join('') || ''
      const titleAttr = title ? ` title="${title}"` : ''

      if (href?.startsWith('/') || href?.startsWith('#')) {
        return `<a href="${href}"${titleAttr} class="md-link-internal">${text}</a>`
      }
      return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer" class="md-link-external">${text}</a>`
    }

    renderer.image = ({ href, title, text }: any) => {
      const titleAttr = title ? ` title="${title}"` : ''
      const caption = text && text !== 'undefined' ? `<figcaption>${text}</figcaption>` : ''
      return `<figure class="md-figure"><img src="${href}" alt="${text || ''}"${titleAttr} loading="lazy" />${caption}</figure>`
    }

    renderer.code = ({ text, lang }: any) => {
      const langClass = lang ? ` language-${lang}` : ''
      return `<div class="md-code-block"><div class="md-code-header"><span class="md-code-lang">${lang || 'code'}</span><button class="md-code-copy" onclick="navigator.clipboard.writeText(this.closest('.md-code-block').querySelector('code').textContent)">复制</button></div><pre class="md-pre"><code class="md-code${langClass}">${text}</code></pre></div>`
    }

    return marked.parse(content, { renderer }) as string
  }, [content])

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'A') {
      const href = target.getAttribute('href')
      if (href?.startsWith('#')) {
        e.preventDefault()
        const id = href.slice(1)
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else if (href?.startsWith('/') && !href?.startsWith('//')) {
        e.preventDefault()
        navigate(href)
      }
    }
  }, [navigate])

  return (
    <div
      id="md-content"
      className="md-content"
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
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
      <style>{mdStyles}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {sidebar && (
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-24">
                <nav className="space-y-1">
                  <p className="px-4 py-2 text-xs font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider">目录</p>
                  {sidebar.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-surface-500 dark:text-surface-400 hover:text-brand-600 dark:hover:text-white hover:bg-brand-50 dark:hover:bg-white/5 rounded-lg transition-all"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          <article className="flex-1 min-w-0 max-w-4xl">
            <div className="bg-white dark:bg-surface-900/50 backdrop-blur-sm border border-surface-200 dark:border-white/10 rounded-2xl p-8 sm:p-12 shadow-sm dark:shadow-none">
              <MarkdownContent content={doc.content} />
            </div>
          </article>
        </div>
      </div>
    </motion.div>
  )
}

const mdStyles = `
.md-content {
  font-size: 16px;
  line-height: 1.8;
  color: #334155;
}
.dark .md-content {
  color: #cbd5e1;
}

.md-content h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}
.dark .md-content h1 {
  color: #f1f5f9;
  border-bottom-color: rgba(255,255,255,0.1);
}

.md-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-top: 3rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f1f5f9;
  scroll-margin-top: 6rem;
}
.dark .md-content h2 {
  color: #f1f5f9;
  border-bottom-color: rgba(255,255,255,0.05);
}

.md-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
.dark .md-content h3 {
  color: #e2e8f0;
}

.md-content p {
  margin-bottom: 1rem;
  color: #475569;
}
.dark .md-content p {
  color: #94a3b8;
}

.md-content strong {
  font-weight: 600;
  color: #0f172a;
}
.dark .md-content strong {
  color: #f1f5f9;
}

.md-content a.md-link-internal,
.md-content a.md-link-external {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.dark .md-content a.md-link-internal,
.dark .md-content a.md-link-external {
  color: #818cf8;
}
.md-content a.md-link-internal:hover,
.md-content a.md-link-external:hover {
  color: #4f46e5;
  text-decoration: underline;
}
.dark .md-content a.md-link-internal:hover,
.dark .md-content a.md-link-external:hover {
  color: #a5b4fc;
}

.md-content ul,
.md-content ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}
.md-content ul {
  list-style-type: disc;
}
.md-content ol {
  list-style-type: decimal;
}

.md-content li {
  margin-bottom: 0.5rem;
  color: #475569;
}
.dark .md-content li {
  color: #94a3b8;
}

.md-content li::marker {
  color: #6366f1;
}
.dark .md-content li::marker {
  color: #818cf8;
}

.md-content blockquote {
  border-left: 4px solid #6366f1;
  background: #f8fafc;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  border-radius: 0 0.75rem 0.75rem 0;
  color: #64748b;
  font-style: italic;
}
.dark .md-content blockquote {
  background: rgba(255,255,255,0.03);
  color: #94a3b8;
}

.md-content blockquote p {
  margin-bottom: 0;
}

.md-content hr {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 2rem 0;
}
.dark .md-content hr {
  border-top-color: rgba(255,255,255,0.1);
}

.md-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
}
.dark .md-content table {
  border-color: rgba(255,255,255,0.1);
}

.md-content thead {
  background: #f8fafc;
}
.dark .md-content thead {
  background: rgba(255,255,255,0.03);
}

.md-content th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #1e293b;
  border-bottom: 1px solid #e2e8f0;
}
.dark .md-content th {
  color: #f1f5f9;
  border-bottom-color: rgba(255,255,255,0.1);
}

.md-content td {
  padding: 0.75rem 1rem;
  color: #475569;
  border-bottom: 1px solid #f1f5f9;
}
.dark .md-content td {
  color: #94a3b8;
  border-bottom-color: rgba(255,255,255,0.05);
}

.md-content tr:last-child td {
  border-bottom: none;
}

.md-content figure.md-figure {
  margin: 1.5rem 0;
  text-align: center;
}

.md-content figure.md-figure img {
  max-width: 100%;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}
.dark .md-content figure.md-figure img {
  border-color: rgba(255,255,255,0.1);
  box-shadow: none;
}

.md-content figure.md-figure figcaption {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #94a3b8;
}

.md-content .md-code-block {
  margin: 1.5rem 0;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}
.dark .md-content .md-code-block {
  border-color: rgba(255,255,255,0.1);
}

.md-content .md-code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
}
.dark .md-content .md-code-header {
  background: rgba(255,255,255,0.05);
  border-bottom-color: rgba(255,255,255,0.1);
}

.md-content .md-code-lang {
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
}
.dark .md-content .md-code-lang {
  color: #94a3b8;
}

.md-content .md-code-copy {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}
.md-content .md-code-copy:hover {
  background: #e2e8f0;
  color: #334155;
}
.dark .md-content .md-code-copy {
  color: #94a3b8;
}
.dark .md-content .md-code-copy:hover {
  background: rgba(255,255,255,0.1);
  color: #f1f5f9;
}

.md-content .md-pre {
  margin: 0;
  padding: 1rem;
  background: #0f172a;
  overflow-x: auto;
}
.dark .md-content .md-pre {
  background: #020617;
}

.md-content .md-code {
  font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  color: #e2e8f0;
}

.md-content code:not(.md-code) {
  font-family: 'SF Mono', 'Fira Code', Menlo, Consolas, monospace;
  font-size: 0.875em;
  padding: 0.15rem 0.4rem;
  border-radius: 0.375rem;
  background: #f1f5f9;
  color: #6366f1;
  font-weight: 500;
}
.dark .md-content code:not(.md-code) {
  background: rgba(255,255,255,0.1);
  color: #818cf8;
}
`
