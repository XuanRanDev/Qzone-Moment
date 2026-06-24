import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Download from '../components/Download'
import PrivacySection from '../components/PrivacySection'
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
      <Features />
      <Download />
      <PrivacySection />
      <ChangelogTimeline />
    </motion.div>
  )
}
