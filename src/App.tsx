/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Hero from './components/Hero';
import CoreProjects from './components/CoreProjects';
import ExplorationProjects from './components/ExplorationProjects';
import Footer from './components/Footer';
import { FileText, ArrowUp, Sun, Moon } from 'lucide-react';

type VisualStyle = 'cyber' | 'editorial' | 'geometric';

// 当前只保留「几何包豪斯」主题，cyber / editorial 分支代码暂时保留但不再被切到。
const ACTIVE_STYLE: VisualStyle = 'geometric';

const NAV_ITEMS: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'hero-section', label: '专业画像' },
  { id: 'core-projects', label: '核心项目' },
  { id: 'exploration-projects', label: '探索项目' },
  { id: 'continue-hear', label: '联系我' }
];

const getIsDarkForOpenTime = () => {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 7;
};

export default function App() {
  const [activeSection, setActiveSection] = useState('hero-section');
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(getIsDarkForOpenTime);
  const activeStyle = ACTIVE_STYLE;

  useEffect(() => {
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!themeColor) {
      return;
    }
    themeColor.content = isDark ? '#0a0b10' : '#f4f5f7';
  }, [isDark]);

  // Monitor scroll height to add premium background blurring in header navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check current section active state
      const sections = ['hero-section', 'core-projects', 'exploration-projects', 'continue-hear'];
      const scrollPosition = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.offsetTop - 85; // accommodate for navbar height
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const handleDownloadCV = () => {
    alert(`【简历已就绪】侯瑛琪Turbo_Resume_2026.pdf 已触发虚拟打包下载。

在实际对接中，本按键直接指引向云存储空间极速同步下载全彩色、包含底层 Prompts 与 A/B Test 全量漏斗评估的精美 PDF 官方简历。`);
  };

  // Define global outermost background classes relative to activeStyle & isDark
  const getStyleThemeClasses = () => {
    if (isDark) {
      switch (activeStyle) {
        case 'editorial':
          return 'bg-[#1c1917] text-stone-100 selection:bg-stone-800 font-sans';
        case 'geometric':
          return 'bg-[#09090b] text-zinc-100 selection:bg-red-950/40 font-sans';
        case 'cyber':
        default:
          return 'bg-[#0a0b10] text-[#e4e4e7] selection:bg-cyan-500/30 font-sans';
      }
    } else {
      switch (activeStyle) {
        case 'editorial':
          return 'bg-[#faf8f4] text-stone-900 selection:bg-stone-200 font-sans';
        case 'geometric':
          return 'bg-[#efeff4] text-zinc-900 selection:bg-red-100 font-sans';
        case 'cyber':
        default:
          return 'bg-[#f4f5f7] text-zinc-800 selection:bg-cyan-100 font-sans';
      }
    }
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-500 ${getStyleThemeClasses()}`}>
      
      {/* Decorative subtle header line glow (only in dark styles) */}
      {activeStyle === 'cyber' && (
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent z-40" />
      )}

      {/* FLOATING HEADER NAVIGATION BAR */}
      <motion.header 
        key={`${activeStyle}-${isDark}`} // Re-animate header on theme or dark/light switch
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled 
            ? activeStyle === 'editorial' 
              ? isDark
                ? 'bg-stone-900/95 border-b border-stone-800 py-3 shadow-md'
                : 'bg-white/90 backdrop-blur-md border-b border-stone-200 py-3 shadow-md'
              : activeStyle === 'geometric'
                ? isDark
                  ? 'bg-zinc-950 border-b-4 border-zinc-100 py-3 text-white'
                  : 'bg-white border-b-4 border-zinc-900 py-3'
                : isDark
                  ? 'bg-[#0a0b10]/85 backdrop-blur-md border-b border-zinc-900/80 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
                  : 'bg-white/90 backdrop-blur-md border-b border-zinc-200 py-4 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Online state dot */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <span className={`flex items-center justify-center w-8 h-8 text-base font-black leading-none select-none transition ${
                activeStyle === 'editorial'
                  ? isDark ? 'rounded-sm font-serif bg-stone-200 text-stone-900' : 'rounded-sm font-serif bg-stone-900 text-stone-50'
                  : activeStyle === 'geometric'
                    ? isDark ? 'rounded-none bg-red-500 text-white border-2 border-zinc-100' : 'rounded-none bg-red-500 text-white'
                    : isDark ? 'rounded-lg bg-zinc-100 text-zinc-900' : 'rounded-lg bg-zinc-900 text-white shadow-sm shadow-zinc-900/20'
              }`}>T</span>
            </div>
            
            <div className={`hidden sm:flex items-center space-x-1.5 px-2 py-0.5 rounded-full ${
              activeStyle === 'editorial' 
                ? isDark ? 'bg-stone-800 border border-stone-700' : 'bg-stone-100 border border-stone-300' 
                : activeStyle === 'geometric' 
                  ? isDark ? 'bg-zinc-800 border-2 border-zinc-700' : 'bg-zinc-100 border-2 border-zinc-900' 
                  : isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-500/5 border border-emerald-500/20'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                activeStyle === 'editorial' 
                  ? isDark ? 'bg-stone-400' : 'bg-stone-500' 
                  : activeStyle === 'geometric' 
                    ? 'bg-emerald-500' 
                    : 'bg-emerald-400'
              }`} />
              <span className={`text-[9px] font-semibold font-mono tracking-wider ${
                activeStyle === 'editorial' 
                  ? isDark ? 'text-stone-300' : 'text-stone-600' 
                  : activeStyle === 'geometric' 
                    ? isDark ? 'text-zinc-300 font-bold' : 'text-zinc-900 font-bold' 
                    : 'text-emerald-400'
              }`}>找新机会</span>
            </div>
          </div>

          {/* Nav middle items */}
          <nav className={`flex items-center p-1 ${
            activeStyle === 'editorial' 
              ? isDark ? 'bg-stone-800 border border-stone-700 rounded-none' : 'bg-stone-100 border border-stone-300 rounded-none' 
              : activeStyle === 'geometric' 
                ? isDark ? 'bg-zinc-900 border-2 border-zinc-700 rounded-none' : 'bg-white border-2 border-zinc-900 rounded-none' 
                : isDark ? 'bg-[#12131a]/80 rounded-full border border-zinc-800/60 shadow-lg shadow-black/20' : 'bg-white/80 rounded-full border border-zinc-200 shadow-sm'
          }`}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              let btnClass = 'px-4 py-1.5 text-xs font-semibold transition-all duration-300 cursor-pointer ';

              if (isActive) {
                if (activeStyle === 'editorial') {
                  btnClass += isDark ? 'bg-stone-100 text-[#1a0f0a] rounded-none' : 'bg-stone-900 text-[#faf8f4] rounded-none';
                } else if (activeStyle === 'geometric') {
                  btnClass += isDark ? 'bg-red-500 text-white border-2 border-zinc-700 rounded-none' : 'bg-red-500 text-white border-2 border-zinc-900 rounded-none';
                } else {
                  btnClass += isDark ? 'bg-[#1a1b26] text-white shadow-sm rounded-full' : 'bg-zinc-200 text-zinc-900 shadow-sm rounded-full';
                }
              } else {
                if (activeStyle === 'editorial') {
                  btnClass += isDark ? 'text-stone-400 hover:text-stone-200 rounded-none' : 'text-stone-600 hover:text-stone-900 rounded-none';
                } else if (activeStyle === 'geometric') {
                  btnClass += isDark ? 'text-zinc-400 hover:text-zinc-200 font-bold border-2 border-transparent rounded-none' : 'text-zinc-700 hover:text-zinc-900 font-bold border-2 border-transparent rounded-none';
                } else {
                  btnClass += isDark ? 'text-zinc-400 hover:text-white rounded-full' : 'text-zinc-500 hover:text-zinc-800 rounded-full';
                }
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollToSection(item.id)}
                  className={btnClass}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick CTA Download on right */}
          <div className="flex items-center space-x-3.5">
            {/* Dark / Light toggle (顶部直接切换，默认开屏时间逻辑保留) */}
            <div
              className={`flex items-center rounded-none p-0.5 border-2 ${
                isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-900'
              }`}
              role="group"
              aria-label="主题模式"
            >
              <button
                type="button"
                onClick={() => setIsDark(false)}
                aria-pressed={!isDark}
                title="切换为浅色模式"
                className={`p-1.5 rounded-none transition-colors cursor-pointer ${
                  !isDark
                    ? 'bg-zinc-900 text-amber-400'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsDark(true)}
                aria-pressed={isDark}
                title="切换为深色模式"
                className={`p-1.5 rounded-none transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 暂时隐藏顶部「下载简历」按钮，保留代码备用 */}
            {/* <button
              onClick={handleDownloadCV}
              className={`py-1.5 px-3.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm ${
                activeStyle === 'editorial'
                  ? isDark
                    ? 'border border-stone-200 text-stone-100 hover:bg-stone-200 hover:text-stone-900 rounded-none'
                    : 'border border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white rounded-none'
                  : activeStyle === 'geometric'
                    ? isDark
                      ? 'border-2 border-zinc-700 bg-zinc-800 text-white hover:bg-red-500 rounded-none uppercase font-black'
                      : 'border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-red-500 rounded-none uppercase font-black'
                    : isDark
                      ? 'rounded-full bg-gradient-to-r from-red-500/15 to-rose-600/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300'
                      : 'rounded-full bg-red-500/10 hover:bg-red-600/20 border border-red-500/20 text-red-700 font-bold'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>下载简历</span>
            </button> */}
          </div>

        </div>
      </motion.header>

      {/* MAIN LAYOUT */}
      <main className="pt-20">
        {/* 1. Hero /的首屏定位 */}
        <Hero onScrollToSection={handleScrollToSection} activeStyle={activeStyle} isDark={isDark} />

        {/* 2. Core Projects /核心项目 & Live Terminal Demo inside */}
        <CoreProjects onScrollToSection={handleScrollToSection} activeStyle={activeStyle} isDark={isDark} />

        {/* 3. Exploration Projects /探索项目 */}
        <ExplorationProjects activeStyle={activeStyle} isDark={isDark} />

        {/* 5. Footer Learn More /继续了解 */}
        <Footer onScrollToSection={handleScrollToSection} activeStyle={activeStyle} isDark={isDark} />
      </main>

      {/* BACK TO TOP FLOATING BUTTON */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-32 right-6 z-40 p-2.5 rounded-xl border shadow-xl transition-all cursor-pointer ${
              isDark
                ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white'
                : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-zinc-900'
            }`}
            title="返回顶部"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
