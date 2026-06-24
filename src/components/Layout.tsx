import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import MouseFollower from './MouseFollower'
import AuroraBackground from './AuroraBackground'
import ScrollProgress from './ScrollProgress'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AuroraBackground />
      <ScrollProgress />
      <MouseFollower />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
