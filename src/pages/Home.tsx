import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Download from '../components/Download'
import ChangelogTimeline from '../components/ChangelogTimeline'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />

      <div className="grid-bg relative">
        <Features />
        <Download />
        <ChangelogTimeline />
      </div>
    </motion.div>
  )
}
