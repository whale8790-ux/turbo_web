/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, FileText, ArrowRight, Layers, Target, Compass, CornerRightDown, Layers3, Activity } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (id: string) => void;
  activeStyle?: 'cyber' | 'editorial' | 'geometric';
  isDark?: boolean;
}

export default function Hero({ onScrollToSection, activeStyle = 'cyber', isDark = true }: HeroProps) {
  const heroMetrics = [
    { label: 'C端核心产品经验', value: '5年+', highlight: '海外 & 策略增长' },
    { label: '主导AI项目落地产值', value: '千万级', highlight: '从0到1商业化' },
    { label: '核心业务会话增长', value: '+17PP', highlight: 'AI 聊天辅助模型' },
  ];

  const directions = [
    { title: 'AI Agent', desc: '自主规划与岗位精研智能体', icon: Target, glow: 'group-hover:text-cyan-400' },
    { title: 'AIGC 应用', desc: '高真实、多风格图像模型封装', icon: Layers, glow: 'group-hover:text-violet-400' },
    { title: '策略增长', desc: '社交关系破冰、商业化链路测试', icon: Compass, glow: 'group-hover:text-rose-400' },
  ];

  // ==========================
  // 1. EDITORIAL STYLE
  // ==========================
  if (activeStyle === 'editorial') {
    return (
      <section id="hero-section" className={`relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b transition-colors duration-300 ${isDark ? 'bg-[#1c1917] text-stone-100 border-stone-800' : 'bg-[#faf8f4] text-stone-900 border-stone-200'}`}>
        <div className={`absolute top-0 right-0 w-1/3 h-full -skew-x-12 pointer-events-none transition-all duration-300 ${isDark ? 'bg-[#3e3425]/10' : 'bg-[#f4ebd9]/20'}`} />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          
          {/* Master Literary Heading */}
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-serif tracking-normal leading-tight transition-colors duration-300 ${isDark ? 'text-[#f7f5f0]' : 'text-stone-900'}`}
            >
              刘昊然 <span className={`italic font-normal transition-colors duration-300 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>Turbo</span>
              <span className={`block text-xl sm:text-2xl lg:text-3xl mt-4 font-sans font-light tracking-wide transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                以人文视角设计人机协同，用客观数据验证商业增长
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-serif italic py-2 border-y my-6 transition-all duration-300 ${isDark ? 'text-stone-300 border-stone-800' : 'text-stone-700 border-stone-200/60'}`}
            >
              “AI 产品的灵魂不在于炫耀模型的技术参数，而是在痛点、算力与人文行为模型之间，找到那个稳定、克制、自闭环的终极体验。”
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-sm max-w-2xl mx-auto leading-relaxed font-sans transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}
            >
              拥有 5 年+ C 社交与内容产品战略经验。专注于 AIGC 图像模板体系搭建、智能聊天会话代理，擅长将复杂的底层 Agent 能力包裹为简单易控的无摩擦用户流。
            </motion.p>
          </div>

          {/* Call to Actions (Fine borders, refined fonts) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mt-10"
          >
            <button
              onClick={() => onScrollToSection('core-projects')}
              className={`px-6 py-2.5 rounded-none border transition-all duration-300 text-sm font-sans font-semibold tracking-wider cursor-pointer ${
                isDark 
                  ? 'border-stone-200 text-stone-100 hover:bg-stone-100 hover:text-stone-900' 
                  : 'border-stone-800 text-stone-900 bg-transparent hover:bg-stone-900 hover:text-[#faf8f4]'
              }`}
            >
              查看项目 →
            </button>
            <button
              onClick={() => onScrollToSection('continue-hear')}
              className={`px-6 py-2.5 rounded-none border-b transition-all text-sm font-sans cursor-pointer ${
                isDark 
                  ? 'border-stone-600 text-stone-300 hover:text-stone-100 hover:border-stone-200' 
                  : 'border-stone-400 text-stone-700 hover:text-stone-900 hover:border-stone-900'
              }`}
            >
              下载简历
            </button>
          </motion.div>

          {/* Clean Editorial Table Metrics */}
          <div className={`mt-16 pt-10 border-t grid grid-cols-1 sm:grid-cols-3 gap-8 text-left max-w-3xl mx-auto transition-colors duration-300 ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
            {heroMetrics.map((met, i) => (
              <div key={i} className="space-y-1">
                <span className={`text-xl sm:text-2xl font-serif border-b pb-1 inline-block transition-colors duration-300 ${isDark ? 'text-stone-100 border-stone-800' : 'text-stone-900 border-stone-300'}`}>
                  {met.value}
                </span>
                <span className={`text-xs block font-sans font-medium uppercase tracking-wider transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {met.label}
                </span>
                <span className={`text-[10px] block font-mono transition-colors duration-300 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                  {met.highlight}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // ==========================
  // 3. GEOMETRIC BALANCE STYLE
  // ==========================
  if (activeStyle === 'geometric') {
    // Selected Work · 首屏战绩 + 锚点跳转 (方案 1+2 混合)
    const selectedWork = [
      {
        idx: '01',
        name: 'AI 聊天助手',
        metric: '+17pp',
        metricLabel: '双向会话渗透率',
        target: 'core-projects',
        tag: 'AI AGENT',
      },
      {
        idx: '02',
        name: 'AIGC 人像生成',
        metric: '+20pp',
        metricLabel: '生成结果保存率',
        target: 'core-projects',
        tag: 'AIGC',
      },
      {
        idx: '03',
        name: '求职 Agent',
        metric: 'LIVE',
        metricLabel: '可交互 Demo',
        target: 'exploration-projects',
        tag: 'EXPLORE',
      },
    ];
    return (
      <section id="hero-section" className={`relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden transition-colors duration-300 border-b-2 ${
        isDark ? 'bg-[#09090b] text-zinc-100 border-zinc-800' : 'bg-[#efeff4] text-zinc-900 border-zinc-900'
      }`}>
        
        {/* Asymmetrical Bauhaus architectural block */}
        <div className="absolute top-0 right-10 w-44 h-44 bg-red-500 rounded-none mix-blend-multiply opacity-15 pointer-events-none transform rotate-12" />
        <div className="absolute bottom-5 left-1/4 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 left-2 w-20 h-40 bg-zinc-400 pointer-events-none hidden lg:block opacity-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-6 text-left">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`inline-block font-bold px-3 py-1 text-[11px] tracking-widest uppercase font-mono ${
                isDark ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-900 text-white'
              }`}
            >
              STRUCTURAL DESIGN // PM - TURBO
            </motion.div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none">
              刘昊然 TURBO
              <span className="block text-xl sm:text-2xl tracking-normal font-bold text-red-600 mt-2 normal-case text-left">
                [ AI 产品经理 ｜ 独立开发者 ]
              </span>
            </h1>

            <p className={`text-sm sm:text-base font-sans max-w-xl leading-relaxed border-l-4 pl-4 font-medium ${
              isDark ? 'text-zinc-300 border-zinc-800' : 'text-zinc-700 border-zinc-900'
            }`}>
              5年+ C端前线经验。主攻 AIGC 与智能 Agent 体验，擅长敏捷建模，将算法不可控性封装为100%可控的高留存、高变现引擎。
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => onScrollToSection('core-projects')}
                className={`px-6 py-3 text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-2 ${
                  isDark 
                    ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-950 border-zinc-100' 
                    : 'bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-900'
                }`}
              >
                查看项目 / DEPLOYED PROJECTS
              </button>
              <button
                onClick={() => onScrollToSection('continue-hear')}
                className={`px-6 py-3 text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-2 ${
                  isDark 
                    ? 'bg-transparent hover:bg-zinc-900 text-zinc-100 border-zinc-700' 
                    : 'bg-white hover:bg-zinc-100 text-zinc-900 border-zinc-900'
                }`}
              >
                下载简历 / DOWNLOAD CV
              </button>
            </div>
          </div>

          {/* Right Geometric Score Card Panel */}
          <div className="lg:col-span-4">
            <div className={`border-4 p-6 flex flex-col justify-between space-y-6 relative transition-colors duration-300 ${
              isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-900'
            }`}>
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-400 border-l border-b border-zinc-900" />
              <div className="flex items-baseline justify-between">
                <span className={`text-xs font-bold uppercase tracking-widest font-mono ${
                  isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  SELECTED WORK //
                </span>
                <span className={`text-[10px] font-mono ${
                  isDark ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                  N=03
                </span>
              </div>
              <div className="space-y-3">
                {selectedWork.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => onScrollToSection(item.target)}
                    className={`group w-full text-left border-b-2 pb-3 last:border-0 last:pb-0 cursor-pointer transition-colors ${
                      isDark ? 'border-zinc-800 hover:border-red-500' : 'border-zinc-100 hover:border-red-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono ${
                          isDark ? 'text-zinc-500' : 'text-zinc-400'
                        }`}>{item.idx}</span>
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 border ${
                          isDark ? 'border-zinc-700 text-zinc-400' : 'border-zinc-300 text-zinc-500'
                        }`}>{item.tag}</span>
                      </div>
                      <CornerRightDown className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${
                        isDark ? 'text-zinc-500 group-hover:text-red-400' : 'text-zinc-400 group-hover:text-red-500'
                      }`} />
                    </div>
                    <div className="flex justify-between items-baseline mt-1.5">
                      <span className={`text-sm font-black tracking-tight ${
                        isDark ? 'text-zinc-100' : 'text-zinc-900'
                      }`}>{item.name}</span>
                      <span className={`text-xl font-black ${
                        item.metric === 'LIVE'
                          ? 'text-red-500'
                          : isDark ? 'text-zinc-100' : 'text-zinc-900'
                      }`}>{item.metric}</span>
                    </div>
                    <span className={`text-[10px] font-mono mt-0.5 block ${
                      isDark ? 'text-zinc-500' : 'text-zinc-500'
                    }`}>{item.metricLabel}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }

  // ==========================
  // 4. CLASSIC CYBER DARK STYLE (Default)
  // ==========================
  return (
    <section id="hero-section" className="relative min-h-[90vh] flex flex-col justify-center py-16 lg:py-24 overflow-hidden">
      {/* Dynamic atmospheric light spots */}
      <div className={`absolute top-1/4 left-1/10 w-96 h-96 rounded-full filter blur-[120px] pointer-events-none animate-pulse-subtle ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-400/25'}`} />
      <div className={`absolute top-1/3 right-1/10 w-[450px] h-[450px] rounded-full filter blur-[150px] pointer-events-none ${isDark ? 'bg-violet-600/5' : 'bg-violet-400/20'}`} />
      <div className={`absolute bottom-[8%] left-1/4 w-[420px] h-[420px] rounded-full filter blur-[140px] pointer-events-none ${isDark ? 'bg-violet-600/5' : 'bg-sky-400/15'}`} />

      {/* Grid Pattern mask overlay */}
      <div className={`absolute inset-0 tech-grid-bg pointer-events-none transition-all duration-300 ${isDark ? 'opacity-30' : 'opacity-[0.12]'}`} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Intro Panel */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
          
          {/* Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`flex items-center space-x-2.5 border px-4 py-1.5 rounded-full w-fit shadow-md transition-all duration-300 ${
              isDark 
                ? 'bg-zinc-900/90 border-zinc-800/80 shadow-black/40' 
                : 'bg-white/90 border-zinc-200 shadow-zinc-100/10 text-zinc-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin [animation-duration:6s]" />
            <span className={`text-xs font-mono font-medium tracking-wide transition-all duration-300 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              刘昊然Turbo · 专注 AI 产品设计与独立开发
            </span>
          </motion.div>

          {/* Headline Titles */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.12] transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              刘昊然Turbo
              <span className={`block text-2xl sm:text-3xl lg:text-4xl mt-3 font-semibold font-sans transition-colors duration-300 ${
                isDark ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                AI 产品经理 <span className={isDark ? 'text-zinc-600' : 'text-zinc-300'}>｜</span> 独立开发者
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base sm:text-lg max-w-2xl leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              专注 <span className="text-cyan-400 font-semibold underline decoration-cyan-400/40 decoration-2 underline-offset-4">AI Agent</span>、<span className="text-violet-400 font-semibold underline decoration-violet-400/40 decoration-2 underline-offset-4">AIGC 应用</span> 与 <span className="text-rose-400 font-semibold underline decoration-rose-400/40 decoration-2 underline-offset-4">策略增长</span>，擅长将 AI 核心模型能力转化为面向普通用户可感、可控的产品功能，并通过原型、客观指标与增长反馈持续闭环验证 AI 产品的终极商业价值。
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className={`text-xs sm:text-sm max-w-xl font-sans transition-colors duration-300 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}
            >
              💡 拥有 5 年+ 丰富 C 端社交/内容产品执掌经验，覆盖极富挑战的海外孵化、AI 聊天辅助助理与 AIGC 卡套人像生成，主导多个项目由 0 到 1 敏捷落地并经历流量考验。
            </motion.p>
          </div>

          {/* Action Callouts CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={() => onScrollToSection('core-projects')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 font-bold text-white text-sm shadow-xl shadow-cyan-500/10 transition-all duration-300 flex items-center space-x-2 group cursor-pointer"
            >
              <span>查看项目</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => onScrollToSection('continue-hear')}
              className={`px-6 py-3.5 rounded-xl border font-semibold text-sm transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white' 
                  : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-800 hover:text-zinc-950 shadow-sm'
              }`}
            >
              <FileText className="w-4 h-4 text-zinc-500" />
              <span>下载简历</span>
            </button>
          </motion.div>
        </div>

        {/* Right Preview Panel (Aesthetic indicators) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-4"
        >
          {/* Aesthetic data dashboard card */}
          <div className={`rounded-3xl p-6 border shadow-2xl relative group overflow-hidden transition-all duration-300 ${
            isDark 
              ? 'bg-[#12131a]/60 border-zinc-800/80 shadow-black/40' 
              : 'bg-white border-zinc-200 shadow-zinc-200/40 text-zinc-800'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all duration-500" />
            
            <div className="flex items-center justify-between mb-6">
              <span className={`text-[10px] uppercase font-mono tracking-wider ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                AI 能力可量化闭环验证
              </span>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>

            <div className="space-y-5">
              {heroMetrics.map((met, i) => (
                <div key={i} className={`flex justify-between items-end border-b pb-3 last:border-b-0 last:pb-0 transition-colors duration-300 ${
                  isDark ? 'border-zinc-800/60' : 'border-zinc-100'
                }`}>
                  <div>
                    <span className={`text-xs block ${isDark ? 'text-zinc-400' : 'text-zinc-700'}`}>{met.label}</span>
                    <span className="text-zinc-500 text-[10px] font-mono mt-0.5 block">{met.highlight}</span>
                  </div>
                  <span className={`text-2xl font-extrabold tracking-tight font-display pr-1 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-zinc-900'
                  }`}>
                    {met.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick interactive guide prompt */}
            <div className={`mt-8 pt-4 border-t flex items-center justify-between text-xs transition-colors duration-300 ${isDark ? 'border-zinc-800/60 text-zinc-400' : 'border-zinc-100 text-zinc-500'}`}>
              <span className="flex items-center gap-1">
                <CornerRightDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                <span>下滚或点击查看 product演示 Demo</span>
              </span>
              <button 
                onClick={() => onScrollToSection('core-projects')}
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-0.5 group"
              >
                <span>直达项目</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Mini quote design asset */}
          <div className={`p-4 rounded-2xl border text-left transition-colors duration-300 ${
            isDark ? 'bg-zinc-950/60 border-zinc-900' : 'bg-zinc-100/50 border-zinc-200'
          }`}>
            <span className="text-[9px] text-zinc-500 uppercase font-mono block mb-1">设计格言 / Design Belief</span>
            <p className={`text-xs leading-relaxed italic transition-colors duration-350 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              "AI 产品的核心不在于直接堆叠提示词或显露底层参数，而是在用户痛点、算法能力和商业指标间，设计出简单、稳定且能自闭环验证的极致体验。"
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
