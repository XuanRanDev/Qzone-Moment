"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/MagneticButton";
import GlareCard from "@/components/GlareCard";
import Reveal from "@/components/Reveal";
import SmoothCount from "@/components/SmoothCount";
import ParallaxSection from "@/components/ParallaxSection";
import HeroTitle from "@/components/HeroTitle";

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), { ssr: false });
const NoiseOverlay = dynamic(() => import("@/components/NoiseOverlay"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });

function FloatingOrb({ color, size, x, y, delay }: { color: string; size: number; x: string; y: string; delay: number }) {
  return (
    <div
      className="absolute rounded-full blur-[100px] pointer-events-none"
      style={{
        width: size, height: size, left: x, top: y,
        background: color,
        animation: `float-orb 8s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  );
}

function TypingText({ texts, speed = 70, del = 35, pause = 2800 }: { texts: string[]; speed?: number; del?: number; pause?: number }) {
  const [text, setText] = useState("");
  const idx = useRef(0);
  const ci = useRef(0);
  const delRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const cur = texts[idx.current];
      if (!delRef.current) {
        setText(cur.slice(0, ci.current + 1));
        ci.current++;
        if (ci.current >= cur.length) {
          setTimeout(() => { delRef.current = true; }, pause);
          return;
        }
      } else {
        ci.current--;
        setText(cur.slice(0, ci.current));
        if (ci.current <= 0) {
          delRef.current = false;
          idx.current = (idx.current + 1) % texts.length;
        }
      }
    };
    const id = setInterval(tick, speed);
    return () => clearInterval(id);
  }, [texts, speed, del, pause]);

  return (
    <span>
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-violet-500 dark:bg-violet-400 ml-1 align-middle animate-pulse" />
    </span>
  );
}

const changelog = [
  { ver: "v3.0", date: "画饼中", title: "好友列表导出", desc: "支持导出好友列表、原图相册、特定好友已删除内容", color: "from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600", active: false },
  { ver: "v2.4", date: "2026.06", title: "动态二维码", desc: "支持动态二维码自动授权，修复大批量数据授权过期问题", color: "from-blue-500 to-cyan-500", active: true },
  { ver: "v2.3", date: "2026.02", title: "手动登录", desc: "支持手动登录功能，解决风控问题", color: "from-violet-500 to-purple-500", active: false },
  { ver: "v2.2", date: "2026.01", title: "媒体修复", desc: "修复导出网页图片失效、支持视频直接浏览", color: "from-pink-500 to-rose-500", active: false },
  { ver: "v2.1", date: "2025.12", title: "剩余时间", desc: "支持计算预计剩余时间，增强防风控能力", color: "from-emerald-500 to-teal-500", active: false },
  { ver: "v2.0", date: "2025.12", title: "全新算法", desc: "全新数据分析算法，还原点赞评论等互动信息", color: "from-amber-500 to-orange-500", active: false },
  { ver: "v1.0", date: "2025.12", title: "首次发布", desc: "勉强能用", color: "from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700", active: false },
];

const featureCards = [
  { icon: "🗑️", title: "恢复已删内容", desc: "轻松恢复说说、留言、转发等QQ空间历史内容", color: "blue" },
  { icon: "🌐", title: "导出为网页", desc: "将珍贵记忆导出为独立网页文件，随时离线浏览", color: "violet" },
  { icon: "💻", title: "桌面端应用", desc: "Windows 10/11 即下即用，无需安装", color: "emerald" },
  { icon: "🔒", title: "本地离线解析", desc: "数据仅在本地处理，充分保障隐私安全", color: "rose" },
  { icon: "⚡", title: "智能限速", desc: "内置请求限速与缓存机制，防止被风控拦截", color: "amber" },
];

export default function Home() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const max = el.scrollWidth - el.clientWidth;
        const cur = el.scrollLeft;
        if ((e.deltaY > 0 && cur < max) || (e.deltaY < 0 && cur > 0)) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.5;
        }
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const colorMap: Record<string, { gradient: string; border: string; hoverBorder: string; hoverText: string }> = {
    blue: { gradient: "from-blue-50 to-cyan-50 dark:from-blue-500/10 dark:to-cyan-500/10", border: "border-blue-100 dark:border-white/[0.06]", hoverBorder: "hover:border-blue-300 dark:hover:border-blue-500/30", hoverText: "group-hover:text-blue-600 dark:group-hover:text-blue-400" },
    violet: { gradient: "from-violet-50 to-purple-50 dark:from-violet-500/10 dark:to-purple-500/10", border: "border-violet-100 dark:border-white/[0.06]", hoverBorder: "hover:border-violet-300 dark:hover:border-violet-500/30", hoverText: "group-hover:text-violet-600 dark:group-hover:text-violet-400" },
    emerald: { gradient: "from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10", border: "border-emerald-100 dark:border-white/[0.06]", hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-500/30", hoverText: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400" },
    rose: { gradient: "from-rose-50 to-pink-50 dark:from-rose-500/10 dark:to-pink-500/10", border: "border-rose-100 dark:border-white/[0.06]", hoverBorder: "hover:border-rose-300 dark:hover:border-rose-500/30", hoverText: "group-hover:text-rose-600 dark:group-hover:text-rose-400" },
    amber: { gradient: "from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10", border: "border-amber-100 dark:border-white/[0.06]", hoverBorder: "hover:border-amber-300 dark:hover:border-amber-500/30", hoverText: "group-hover:text-amber-600 dark:group-hover:text-amber-400" },
  };

  return (
    <div className="overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      <NoiseOverlay />

      {/* === HERO === */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-gray-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_20%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(168,85,247,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_80%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(236,72,153,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_50%_80%,rgba(236,72,153,0.1),transparent_50%)]" />
        </div>
        <ParticleBackground />

        <FloatingOrb color="rgba(99,102,241,0.1)" size={400} x="10%" y="20%" delay={0} />
        <FloatingOrb color="rgba(168,85,247,0.08)" size={350} x="70%" y="60%" delay={2} />
        <FloatingOrb color="rgba(236,72,153,0.06)" size={300} x="50%" y="10%" delay={4} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full border border-gray-200/60 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm text-gray-500 dark:text-white/60 font-medium">v2.4 · 动态二维码自动授权</span>
            </div>
          </Reveal>

          {/* Hero Title */}
          <Reveal delay={100}>
            <HeroTitle />
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-8 text-xl sm:text-2xl text-gray-400 dark:text-white/50 font-light tracking-wide">
              <TypingText texts={["找回被遗忘的瞬间", "恢复已删除的说说与留言", "永久珍藏你的记忆"]} />
            </div>
          </Reveal>

          <Reveal delay={700}>
            <p className="mt-3 text-gray-400 dark:text-white/30">回到曾经，拾起遗落的时光。</p>
          </Reveal>

          <Reveal delay={800}>
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
              <MagneticButton>
                <Link
                  href="/guide"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 shadow-xl shadow-violet-500/20 hover:shadow-2xl hover:shadow-violet-500/30 hover:scale-[1.03]"
                >
                  <span className="relative z-10">开始使用</span>
                  <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://file.xuanran.cc/qqkjsgj.exe"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl border border-gray-200 dark:border-white/[0.12] bg-white dark:bg-white/[0.04] text-gray-900 dark:text-white font-bold text-lg backdrop-blur-md hover:border-violet-300 dark:hover:border-violet-500/30 hover:shadow-lg transition-all duration-300"
                >
                  立即下载
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={1000}>
            <div className="mt-24 flex flex-col items-center gap-3">
              <div className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-white/20 flex justify-center pt-2">
                <div className="w-1 h-2.5 bg-gray-400 dark:bg-white/40 rounded-full animate-bounce" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* === STATS === */}
      <ParallaxSection speed={-0.06}>
        <section className="py-24 relative bg-gray-50/80 dark:bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { target: 99.99, suffix: "%", label: "找回成功率", dec: 2 },
                { target: 24, suffix: ".0", label: "最新版本", prefix: "v", dec: 0 },
                { target: 100, suffix: "%", label: "本地处理", dec: 0 },
                { target: 9999, suffix: "+", label: "已服务用户", dec: 0 },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                      <SmoothCount target={s.target} suffix={s.suffix} prefix={s.prefix} decimals={s.dec} />
                    </div>
                    <div className="mt-2 text-sm text-gray-500 dark:text-white/40 font-medium tracking-wider uppercase">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* === BENTO FEATURES === */}
      <section className="py-32 relative bg-white dark:bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.03),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_70%)]" />
        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 tracking-widest uppercase">Features</span>
              <h2 className="mt-4 text-4xl sm:text-6xl font-black text-gray-900 dark:text-white">核心能力</h2>
              <p className="mt-4 text-gray-500 dark:text-white/40 text-lg max-w-lg mx-auto">简单、安全、高效的一站式解决方案</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[240px]">
            {featureCards.map((f, i) => {
              const c = colorMap[f.color];
              const isWide = i === 1;
              const isTall = i === 4;
              return (
                <Reveal key={i} delay={i * 80} direction="scale">
                  <GlareCard className={`h-full ${isWide ? "sm:col-span-2" : ""} ${isTall ? "sm:row-span-2" : ""}`}>
                    <div className={`h-full p-8 rounded-3xl bg-gradient-to-br ${c.gradient} border ${c.border} flex flex-col justify-between group ${c.hoverBorder} hover:shadow-xl transition-all duration-300`}>
                      <div>
                        <div className="text-5xl mb-5">{f.icon}</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                        <p className="text-gray-500 dark:text-white/40 leading-relaxed">{f.desc}</p>
                      </div>
                      <div className={`flex items-center gap-2 text-sm text-gray-400 ${c.hoverText} transition-colors`}>
                        <span>了解更多</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>
                    </div>
                  </GlareCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* === HORIZONTAL SCROLL TIMELINE === */}
      <section className="py-32 relative overflow-hidden bg-gray-50/80 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <Reveal>
            <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 tracking-widest uppercase">Changelog</span>
            <h2 className="mt-4 text-4xl sm:text-6xl font-black text-gray-900 dark:text-white">版本历程</h2>
            <p className="mt-4 text-gray-500 dark:text-white/40 text-lg">持续迭代，越来越好</p>
          </Reveal>
        </div>

        <div
          ref={timelineRef}
          className="relative flex gap-6 overflow-x-auto overflow-y-hidden pb-8 px-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {changelog.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-[320px] snap-center">
              <GlareCard>
                <div className={`relative p-7 rounded-3xl border ${item.active ? "border-violet-200 dark:border-violet-500/30 bg-violet-50/80 dark:bg-violet-500/[0.06]" : "border-gray-100 dark:border-white/[0.06] bg-white dark:bg-white/[0.02]"} backdrop-blur-sm h-[280px] flex flex-col shadow-sm`}>
                  {item.active && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 text-xs font-bold rounded-full">
                      当前版本
                    </div>
                  )}
                  <div className={`text-4xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.ver}
                  </div>
                  <div className="text-sm text-gray-400 dark:text-white/30 mt-1 mb-4">{item.date}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-white/40 leading-relaxed flex-1">{item.desc}</p>
                </div>
              </GlareCard>
            </div>
          ))}
        </div>
      </section>

      {/* === STEPS === */}
      <section className="py-32 relative bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 tracking-widest uppercase">How it works</span>
              <h2 className="mt-4 text-4xl sm:text-6xl font-black text-gray-900 dark:text-white">三步找回回忆</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: "01", icon: "📱", title: "下载并登录", desc: "下载软件，使用手机QQ扫码完成登录" },
              { n: "02", icon: "⚡", title: "一键导出", desc: "点击开始，程序自动抓取历史数据" },
              { n: "03", icon: "🎉", title: "查看结果", desc: "在桌面查看导出的网页文件" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 150} direction="up">
                <GlareCard>
                  <div className="relative p-8 rounded-3xl border border-gray-100 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.02] backdrop-blur-sm h-full group hover:border-violet-200 dark:hover:border-violet-500/20 hover:shadow-xl transition-all duration-500">
                    <div className="text-6xl font-black text-gray-100 dark:text-white/[0.04] absolute top-4 right-6">{item.n}</div>
                    <div className="text-4xl mb-5">{item.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-500 dark:text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </GlareCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <ParallaxSection speed={-0.05}>
        <section className="py-32 relative bg-gray-50/80 dark:bg-gray-900/50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Reveal direction="scale">
              <div className="relative p-14 sm:p-20 rounded-[2.5rem] border border-gray-100 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-black/20">
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-transparent dark:from-blue-500/20 rounded-br-full" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-violet-100 to-transparent dark:from-purple-500/20 rounded-tl-full" />

                <div className="relative">
                  <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-5">开始找回回忆</h2>
                  <p className="text-gray-500 dark:text-white/40 text-lg mb-10">只需一杯奶茶的价格，永久使用，支持退款。</p>

                  <MagneticButton intensity={0.25}>
                    <a
                      href="https://file.xuanran.cc/qqkjsgj.exe"
                      className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white font-bold text-xl rounded-2xl transition-all duration-300 shadow-xl shadow-violet-500/20 hover:shadow-2xl hover:shadow-violet-500/30 hover:scale-105"
                    >
                      立即下载
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </ParallaxSection>
    </div>
  );
}
