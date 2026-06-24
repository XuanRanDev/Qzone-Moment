/**
 * Fixed, page-wide ambient backdrop: drifting aurora blobs + a faint grid
 * + film grain. Mounted once in Layout so every route shares the same
 * living background instead of a flat color.
 */
export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-surface-950 transition-colors duration-500" />

      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_85%)]" />

      <div className="absolute -top-32 -left-24 w-[640px] h-[640px] rounded-full bg-brand-400/50 dark:bg-neon-blue/30 blur-[100px] animate-aurora-1" />
      <div className="absolute top-1/4 -right-32 w-[700px] h-[700px] rounded-full bg-purple-400/45 dark:bg-neon-purple/30 blur-[110px] animate-aurora-2" />
      <div className="absolute top-[55%] left-[8%] w-[540px] h-[540px] rounded-full bg-cyan-300/45 dark:bg-neon-blue/25 blur-[95px] animate-aurora-3" />
      <div className="absolute bottom-[-10%] right-[12%] w-[480px] h-[480px] rounded-full bg-pink-300/40 dark:bg-neon-pink/25 blur-[95px] animate-aurora-4" />

      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] bg-grain mix-blend-overlay" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-surface-950" />
    </div>
  )
}
