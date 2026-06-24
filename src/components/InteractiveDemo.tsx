/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  CornerDownLeft, 
  Layers, 
  RotateCcw, 
  Smartphone, 
  User, 
  ChevronRight,
  Check,
  Clock, 
  TrendingUp, 
  Zap, 
  Maximize2 
} from 'lucide-react';

type ChatScene = 'icebreaker' | 'reply' | 'restart';
type PortraitStyle = 'cyber' | 'salt' | 'fantasy' | 'retro';

const SUGGESTIONS: Record<ChatScene, string[]> = {
  icebreaker: [
    '对啊！我平时喜欢写写 React 搞些独立工具，你最近有什么正在做的项目吗？💻',
    '哈哈被你发现了，写代码对我而言像乐高积木一样有趣。你是怎么入坑开发的？✨'
  ],
  reply: [
    '确实，做产品经常经历发现痛点到落地 Demo 的循环，很高兴遇见志同道合的人！💡',
    '这个思路太赞了！如果后面能再用真实的业务留存数据去验证它，就更完美了。🤝'
  ],
  restart: [
    '好久不见哇！之前说想主导 AIGC 生成的项目大盘 7 日留存，最近有新进展吗？🚀',
    'Hello！最近发现一个很适合做 AI Agent 设计的流程方法，想和你分享交流下～📈'
  ]
};

const STYLES_META: Record<PortraitStyle, { name: string; prompt: string; color: string }> = {
  cyber: { name: '赛博机能 (Cyber)', prompt: 'cyberpunk mech style, cyan and violet neon glow, unreal engine 5 render, cinematic lighting, sharp focus', color: 'from-cyan-400 to-violet-500' },
  salt: { name: '日系盐系 (Minimalist)', prompt: 'japanese film grain, minimalist aesthetic, warm diffused natural light, cinematic, soft focus', color: 'from-orange-300 to-yellow-100' },
  fantasy: { name: '奇幻写实 (Fantasy)', prompt: 'magical realism portrait, glowing dust particles, dreamlike atmosphere, artistic oil strokes, cinematic backlighting', color: 'from-purple-400 to-pink-500' },
  retro: { name: '美酷复古 (Retro)', prompt: 'editorial vintage photography, flash contrast, magazine page grain texture, dramatic shadows, bold contrast', color: 'from-rose-400 to-amber-500' }
};

const ORIGINAL_PORTRAITS = [
  {
    id: 1,
    name: '酷飒少年 (Boy)',
    avatar: '/portraits/character_1_original.png',
    results: {
      cyber: '/portraits/character_1_cyber.png',
      salt: '/portraits/character_1_salt.png',
      fantasy: '/portraits/character_1_fantasy.png',
      retro: '/portraits/character_1_retro.png'
    }
  },
  {
    id: 2,
    name: '职场菁英 (Woman)',
    avatar: '/portraits/character_2_original.png',
    results: {
      cyber: '/portraits/character_2_cyber.png',
      salt: '/portraits/character_2_salt.png',
      fantasy: '/portraits/character_2_fantasy.png',
      retro: '/portraits/character_2_retro.png'
    }
  },
  {
    id: 3,
    name: '文艺少女 (Girl)',
    avatar: '/portraits/character_3_original.png',
    results: {
      cyber: '/portraits/character_3_cyber.png',
      salt: '/portraits/character_3_salt.png',
      fantasy: '/portraits/character_3_fantasy.png',
      retro: '/portraits/character_3_retro.png'
    }
  }
] as const;

interface InteractiveDemoProps {
  initialApp?: 'chat' | 'portrait';
  activeStyle?: 'cyber' | 'editorial' | 'geometric';
  hideSwitcher?: boolean;
  onlySimulator?: boolean;
  isDark?: boolean;
}

export default function InteractiveDemo({ initialApp = 'chat', activeStyle = 'cyber', hideSwitcher = false, onlySimulator = false, isDark = true }: InteractiveDemoProps) {
  const [activeApp, setActiveApp] = useState<'chat' | 'portrait'>(initialApp);

  useEffect(() => {
    setActiveApp(initialApp);
  }, [initialApp]);

  // --- AI CHAT STATE ---
  const [chatScene, setChatScene] = useState<ChatScene>('icebreaker');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'partner'; text: string; time: string; isAiGenerated?: boolean }>>([
    { sender: 'partner', text: '嗨，你好呀！听说你也对独立开发很感兴趣？', time: '14:32' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [aiSuggestionsOpen, setAiSuggestionsOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Clear the typewriter interval when the component unmounts (or when re-run mid-flight).
  useEffect(() => {
    return () => {
      if (typingTimerRef.current !== null) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, []);

  const handleSelectSuggestion = (text: string) => {
    setInputVal('');
    // Cancel any previous in-flight typewriter before starting a new one.
    if (typingTimerRef.current !== null) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    // Simulate typing text
    let i = 0;
    typingTimerRef.current = setInterval(() => {
      if (i >= text.length) {
        if (typingTimerRef.current !== null) {
          clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
        return;
      }
      i++;
      setInputVal(text.slice(0, i));
    }, 20);
  };

  const handleSendMessage = () => {
    if (!inputVal.trim()) return;
    const userText = inputVal;
    const newMsg = { sender: 'user' as const, text: userText, time: '14:33', isAiGenerated: true };
    setMessages(prev => [...prev, newMsg]);
    setInputVal('');

    // Trigger Partner Response Flow
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = '';
      if (chatScene === 'icebreaker') {
        replyText = '太棒了！开发和产品结合确实非常有优势，难怪感觉你主导的项目落地感这么强。';
        setChatScene('reply'); // guide to reply suggestions
      } else if (chatScene === 'reply') {
        replyText = '对的！数据验证太关键了，比起罗列一堆 Prompt 指标，业务最终结果（留存和转化率）才更有说服力！';
        setChatScene('restart'); // guide to restart scene
      } else {
        replyText = '哇！真的吗？这个落地闭环我太感兴趣了，求分享！我们约个时间细聊呀。';
        setChatScene('icebreaker');
      }
      setMessages(prev => [...prev, { sender: 'partner', text: replyText, time: '14:34' }]);
    }, 1500);
  };

  // --- AIGC PORTRAIT STATE ---
  const [selectedStyle, setSelectedStyle] = useState<PortraitStyle>('cyber');
  const [selectedPortrait, setSelectedPortrait] = useState<number>(1);
  const [generationProgress, setGenerationProgress] = useState(-1); // -1 means idle
  const [styledResult, setStyledResult] = useState<string | null>(null);
  const [comparisonSwipe, setComparisonSwipe] = useState(50); // slider percent

  const handleGeneratePortrait = () => {
    setGenerationProgress(0);
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          const portraitObj = ORIGINAL_PORTRAITS.find(p => p.id === selectedPortrait);
          if (portraitObj) {
            setStyledResult(portraitObj.results[selectedStyle]);
          }
          return 100;
        }
        return next;
      });
    }, 150);
  };

  const handleResetPortrait = () => {
    setGenerationProgress(-1);
    setStyledResult(null);
    setComparisonSwipe(50);
  };

  const isEditorial = activeStyle === 'editorial';
  const isGeometric = activeStyle === 'geometric';
  const isCyber = activeStyle === 'cyber';

  // Card themes
  const containerClass = isEditorial
    ? (isDark
        ? "w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1c1917] p-6 lg:p-8 border border-stone-800 relative overflow-hidden text-stone-100 rounded-none font-sans"
        : "w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#faf6ee] p-6 lg:p-8 border border-stone-300 relative overflow-hidden text-stone-900 rounded-none font-sans")
    : isGeometric
    ? (isDark
        ? "w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#09090b] p-6 lg:p-8 border-4 border-zinc-100 relative overflow-hidden text-zinc-100 rounded-none"
        : "w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#efeff4] p-6 lg:p-8 border-4 border-zinc-900 relative overflow-hidden text-zinc-900 rounded-none")
    : (isDark
        ? "w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d0e15] p-6 lg:p-8 border border-zinc-800/75 relative overflow-hidden rounded-3xl shadow-2xl text-zinc-100"
        : "w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#f8fafc] p-6 lg:p-8 border border-slate-200/90 relative overflow-hidden rounded-3xl shadow-xl text-zinc-800");

  const titleClass = isEditorial
    ? (isDark ? "text-2xl font-serif font-bold text-stone-100 tracking-tight" : "text-2xl font-serif font-semibold text-stone-900 tracking-tight")
    : isGeometric
    ? (isDark ? "text-2xl font-black uppercase text-zinc-100 tracking-tight" : "text-2xl font-black uppercase text-zinc-900 tracking-tight")
    : (isDark ? "text-2xl font-bold tracking-tight text-white font-display" : "text-2xl font-bold tracking-tight text-zinc-950 font-display");

  const pClass = isEditorial
    ? (isDark ? "text-stone-300 text-xs sm:text-sm leading-relaxed" : "text-stone-700 text-xs sm:text-sm leading-relaxed")
    : isGeometric
    ? (isDark ? "text-zinc-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans" : "text-zinc-700 text-xs sm:text-sm font-semibold leading-relaxed font-sans")
    : (isDark ? "text-zinc-400 text-sm leading-relaxed" : "text-zinc-700 text-sm leading-relaxed");

  const strongClass = isEditorial
    ? (isDark ? "text-stone-100 font-bold" : "text-stone-900 font-bold")
    : isGeometric
    ? (isDark ? "text-white font-black" : "text-black font-black")
    : (isDark ? "text-zinc-100 font-semibold" : "text-cyan-600 font-bold");

  const listTextClass = isEditorial
    ? (isDark ? "text-stone-300 font-sans" : "text-stone-700 font-sans")
    : isGeometric
    ? (isDark ? "text-zinc-400 font-semibold" : "text-zinc-800 font-semibold")
    : (isDark ? "text-zinc-300" : "text-zinc-700 font-medium");

  const statsBgClass = isEditorial
    ? (isDark ? "bg-[#181615] border border-stone-800" : "bg-stone-50 border border-stone-300")
    : isGeometric
    ? (isDark ? "bg-zinc-950 border-2 border-zinc-800" : "bg-white border-2 border-zinc-900")
    : (isDark ? "bg-zinc-900/60 border border-zinc-800/85" : "bg-slate-50 border border-slate-200/90");

  const statsLabelClass = isEditorial
    ? (isDark ? "text-stone-400 font-sans" : "text-stone-500 font-sans")
    : isGeometric
    ? (isDark ? "text-zinc-400 font-mono font-bold" : "text-zinc-500 font-mono font-bold")
    : (isDark ? "text-zinc-500 font-mono" : "text-zinc-500 font-mono");

  const statsValClass = isEditorial
    ? (isDark ? "text-stone-100 font-serif font-bold" : "text-stone-900 font-serif font-bold")
    : isGeometric
    ? (isDark ? "text-zinc-100 font-black" : "text-zinc-950 font-black")
    : (isDark ? "text-white" : "text-[#0891b2] font-extrabold");

  return (
    <div className={onlySimulator ? "relative w-full flex justify-center items-center" : containerClass}>
      {/* Decorative Blur Backing */}
      {isCyber && !onlySimulator && (
        <>
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {/* Control Panel (Left Column) */}
      {!onlySimulator && (
        <div className="lg:col-span-5 flex flex-col space-y-6 z-10">
          {!hideSwitcher && (
            <div className={`flex items-center space-x-3 p-1.5 rounded-full w-fit ${
              isEditorial 
                ? isDark ? 'bg-stone-900 border border-stone-800 rounded-none' : 'bg-stone-100 border border-stone-200 rounded-none' 
                : isGeometric 
                ? isDark ? 'bg-zinc-950 border-2 border-zinc-800 rounded-none' : 'bg-[#efeff4] border-2 border-zinc-950 rounded-none' 
                : isDark ? 'bg-zinc-900/80 border border-zinc-800' : 'bg-slate-100 border border-slate-200'
            }`}>
              <button
                onClick={() => setActiveApp('chat')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center space-x-1.5 ${
                  isEditorial
                    ? activeApp === 'chat'
                      ? 'bg-stone-800 text-white rounded-none shadow-sm'
                      : 'text-stone-500 hover:text-stone-900 font-medium'
                    : isGeometric
                    ? activeApp === 'chat'
                      ? 'bg-zinc-900 text-white rounded-none border border-zinc-900 font-black'
                      : 'text-zinc-600 hover:text-black font-semibold'
                    : activeApp === 'chat'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-cyan-600'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>AI 聊天助手 Demo</span>
              </button>
              <button
                onClick={() => setActiveApp('portrait')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-305 flex items-center space-x-1.5 ${
                  isEditorial
                    ? activeApp === 'portrait'
                      ? 'bg-stone-800 text-white rounded-none shadow-sm'
                      : 'text-stone-500 hover:text-stone-900 font-medium'
                    : isGeometric
                    ? activeApp === 'portrait'
                      ? 'bg-zinc-900 text-white rounded-none border border-zinc-900 font-black'
                      : 'text-zinc-600 hover:text-black font-semibold'
                    : activeApp === 'portrait'
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white shadow-md'
                      : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-violet-600'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>AIGC 人像生成 Demo</span>
              </button>
            </div>
          )}

        {activeApp === 'chat' ? (
          <div className="space-y-4">
            <span className={`text-[10px] font-semibold tracking-wider font-mono px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 w-fit inline-block ${
              isEditorial ? 'text-stone-600 bg-stone-200 border-stone-300 rounded-none font-serif italic' : isGeometric ? 'text-white bg-zinc-900 border-zinc-900 rounded-none' : 'text-cyan-400 rounded-full'
            }`}>
              核心验证点：候选生成 + 零自控感
            </span>
            <h3 className={titleClass}>
              AI 聊天话术辅助系统
            </h3>
            <p className={pClass}>
              传统的自动聊天会给用户带来不可预测的失控感，导致回复率低。
              本设计开创了<b className={strongClass}>「提示性候选辅助」</b>模式。根据当前上下文及好友标签，实时向用户推荐 3 类关键话术（破冰、切入、追问），由用户决定、微调或一键发送。这兼顾了回复的多样性，让匹配关系转化效率提升 17PP 成为必然。
            </p>

            <div className={`space-y-2 border-l-2 pl-4 py-1 ${isEditorial ? 'border-stone-300' : isGeometric ? 'border-zinc-950' : 'border-zinc-800'}`}>
              <div className={`text-xs font-mono font-bold tracking-wider uppercase ${isEditorial ? 'text-stone-500' : isGeometric ? 'text-zinc-900' : 'text-zinc-500'}`}>交互指南:</div>
              <div className={`text-xs flex items-center space-x-2 ${listTextClass}`}>
                <span className={`p-0.5 rounded-full inline-block ${isEditorial ? 'text-stone-400' : isGeometric ? 'text-zinc-900' : 'text-cyan-400'}`}>●</span>
                <span>在手机中挑选一句话术，它将快速打入输入框</span>
              </div>
              <div className={`text-xs flex items-center space-x-2 ${listTextClass}`}>
                <span className={`p-0.5 rounded-full inline-block ${isEditorial ? 'text-stone-400' : isGeometric ? 'text-zinc-900' : 'text-cyan-400'}`}>●</span>
                <span>点击右侧发送，智能推测对方将如何被完美融冰</span>
              </div>
            </div>

            <div className={`p-4 flex items-center justify-between ${statsBgClass} ${isEditorial || isGeometric ? 'rounded-none' : 'rounded-2xl'}`}>
              <div>
                <div className={`text-[10px] font-mono ${statsLabelClass}`}>大盘验证数据</div>
                <div className={`text-lg font-bold mt-1 ${statsValClass}`}>双向会话渗透率 52%</div>
              </div>
              <TrendingUp className={`${isEditorial ? 'text-stone-700' : isGeometric ? 'text-red-500' : 'text-cyan-400'} w-5 h-5 animate-pulse`} />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <span className={`text-[10px] font-semibold tracking-wider font-mono px-3 py-1 bg-violet-400/10 border border-violet-400/20 w-fit inline-block ${
              isEditorial ? 'text-stone-600 bg-stone-200 border-stone-300 rounded-none font-serif italic' : isGeometric ? 'text-white bg-zinc-900 border-zinc-900 rounded-none' : 'text-violet-400 rounded-full'
            }`}>
              核心验证点：超低创作门槛封装
            </span>
            <h3 className={titleClass}>
              一键模板化人像生成
            </h3>
            <p className={pClass}>
              不强迫普通社交用户理解 Lora 权重、CFG等难顶的模型参数。本设计通过<b className={strongClass}>「模板承载复杂参数」</b>的方式。将复杂的 Stable Diffusion 指令风格统一封装为极具辨识度的视觉风格卡片，用户仅需在模板间点击上传普通人脸即可生成顶级艺术人像。
            </p>

            <div className={`space-y-2 border-l-2 pl-4 py-1 ${isEditorial ? 'border-stone-300' : isGeometric ? 'border-zinc-950' : 'border-zinc-800'}`}>
              <div className={`text-xs font-mono font-bold tracking-wider uppercase ${isEditorial ? 'text-stone-500' : isGeometric ? 'text-zinc-900' : 'text-zinc-500'}`}>交互指南:</div>
              <div className={`text-xs flex items-center space-x-1.5 ${listTextClass}`}>
                <span className={`p-0.5 rounded-full inline-block ${isEditorial ? 'text-stone-400' : isGeometric ? 'text-zinc-900' : 'text-violet-400'}`}>●</span>
                <span>选择你欣赏的角色人像及你期望的高质量画风模板</span>
              </div>
              <div className={`text-xs flex items-center space-x-1.5 ${listTextClass}`}>
                <span className={`p-0.5 rounded-full inline-block ${isEditorial ? 'text-stone-400' : isGeometric ? 'text-zinc-900' : 'text-violet-400'}`}>●</span>
                <span>点击生成，体验 AI 扩散推理与参数渲染全链路</span>
              </div>
            </div>

            <div className={`p-4 flex items-center justify-between ${statsBgClass} ${isEditorial || isGeometric ? 'rounded-none' : 'rounded-2xl'}`}>
              <div>
                <div className={`text-[10px] font-mono ${statsLabelClass}`}>生成满意度指标 (保存率)</div>
                <div className={`text-lg font-bold mt-1 ${statsValClass}`}>从 25% 飙升至 45%</div>
              </div>
              <Zap className={`${isEditorial ? 'text-stone-700' : isGeometric ? 'text-red-500' : 'text-violet-400'} w-5 h-5 animate-pulse`} />
            </div>
          </div>
        )}
      </div>
      )}

      {/* Simulator Presentation Column (Right Column) */}
      <div className={onlySimulator ? "w-full flex justify-center items-center z-10 py-1" : "lg:col-span-7 flex justify-center items-center z-10 py-4"}>
        {/* iPhone Framework Shape */}
        <div className={`w-[320px] h-[640px] rounded-[48px] border-[5px] relative overflow-hidden flex flex-col transition-all duration-300 ${
          isDark 
            ? 'bg-black border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.8)]' 
            : 'bg-zinc-900 border-zinc-700 shadow-[0_15px_35px_rgba(0,0,0,0.15)]'
        }`}>
          {/* Device Top Padding Spacer */}
          <div className={`h-6 w-full flex-shrink-0 relative z-40 transition-colors duration-300 ${isDark ? 'bg-[#12131a]' : 'bg-slate-100'}`} />

          {/* SCREEN CONTENT */}
          <div className={`flex-1 overflow-hidden relative flex flex-col text-xs transition-colors duration-300 ${
            isDark 
              ? 'bg-[#12131a] text-zinc-100' 
              : 'bg-slate-50 text-slate-800'
          }`}>
            {activeApp === 'chat' ? (
              // APP 1: AI Chat Assistant
              <div className="w-full h-full flex flex-col">
                {/* Chat Partner Header */}
                <div className={`h-12 border-b flex items-center px-4 space-x-2 flex-shrink-0 transition-colors duration-300 ${
                  isDark ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-slate-200'
                }`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold font-mono transition-colors duration-300 ${
                    isDark ? 'bg-cyan-500/10 border border-cyan-400/30 text-cyan-400' : 'bg-cyan-50 border border-cyan-200 text-cyan-600'
                  }`}>
                    LY
                  </div>
                  <div>
                    <div className={`font-semibold ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>林一 (配对好友)</div>
                    <div className="text-[9px] text-emerald-400 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                      <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>正在线上</span>
                    </div>
                  </div>
                </div>

                {/* Chat Feed */}
                <div ref={scrollRef} className={`flex-1 overflow-y-auto p-3 space-y-3 text-[11px] scroll-smooth transition-colors duration-300 ${
                  isDark ? 'bg-[#0d0e15]' : 'bg-slate-50'
                }`}>
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-xl px-2.5 py-1.5 leading-normal relative ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-tr-none shadow-sm' 
                          : isDark 
                            ? 'bg-zinc-800 text-zinc-200 rounded-tl-none' 
                            : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-none'
                      }`}>
                        {msg.isAiGenerated && (
                          <span className={`absolute -top-3.5 right-1 text-[8px] font-mono rounded-full px-1.5 py-0.5 select-none flex items-center gap-0.5 shadow-xs ${
                            isDark 
                              ? 'bg-zinc-950 border border-cyan-500/40 text-cyan-300' 
                              : 'bg-white border border-cyan-400/35 text-cyan-600 font-bold'
                          }`}>
                            <Sparkles className="w-2 h-2 text-cyan-500" />
                            AI 智能匹配
                          </span>
                        )}
                        <p>{msg.text}</p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className={`rounded-2xl rounded-tl-none px-3 py-2 flex items-center space-x-1 ${
                        isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-white border border-slate-200 text-slate-700 shadow-xs'
                      }`}>
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* AI Assistant Suggestions Container */}
                <div className={`border-t flex-shrink-0 relative transition-colors duration-300 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-100 border-slate-200'}`}>
                  <div className={`px-3 py-1.5 flex items-center justify-between border-b transition-colors duration-300 ${
                    isDark ? 'bg-zinc-900 border-[#27272a]' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center space-x-1 text-[10px] font-semibold font-mono">
                      <Sparkles className={`w-3.5 h-3.5 animate-spin [animation-duration:5s] ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`} />
                      <span className={isDark ? 'text-cyan-400' : 'text-cyan-700 font-bold'}>AI 智能话术建议</span>
                    </div>

                    {/* Scene selectors */}
                    <div className="flex items-center space-x-1.5 text-[9px]">
                      {(['icebreaker', 'reply', 'restart'] as const).map(scene => (
                        <button
                          key={scene}
                          onClick={() => setChatScene(scene)}
                          className={`px-1.5 py-0.5 rounded transition ${
                            chatScene === scene 
                              ? isDark 
                                ? 'bg-cyan-500/20 text-cyan-300 font-semibold' 
                                : 'bg-cyan-500/10 text-cyan-600 font-bold'
                              : 'text-zinc-500 hover:text-zinc-400'
                          }`}
                        >
                          {scene === 'icebreaker' ? '破冰' : scene === 'reply' ? '趣味回复' : '话题重启'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`p-2 space-y-1.5 max-h-32 overflow-y-auto transition-colors duration-300 ${isDark ? 'bg-[#12131a]' : 'bg-slate-50'}`}>
                    {SUGGESTIONS[chatScene].map((text, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectSuggestion(text)}
                        className={`w-full text-left p-2 rounded-xl transition flex items-start gap-1.5 group border ${
                          isDark 
                            ? 'bg-zinc-900 text-zinc-300 border-zinc-800/60 hover:bg-zinc-800/80' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100/60 shadow-xs'
                        }`}
                      >
                        <span className="flex-1 text-[10px] leading-tight select-none">{text}</span>
                        <ChevronRight className={`w-3 h-3 flex-shrink-0 group-hover:translate-x-0.5 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Input Bottom Area */}
                <div className={`p-2 border-t flex items-center space-x-1.5 flex-shrink-0 transition-colors duration-300 ${
                  isDark ? 'bg-zinc-900/90 border-zinc-800' : 'bg-slate-100 border-slate-200'
                }`}>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="点选上方AI推荐或输入..."
                      className={`w-full border rounded-xl py-2 px-3 text-[10px] focus:outline-none transition-colors duration-300 ${
                        isDark 
                          ? 'bg-zinc-800 border-zinc-700/60 text-zinc-200 placeholder-zinc-500 focus:border-cyan-500' 
                          : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputVal.trim()}
                    className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                      inputVal.trim() 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow' 
                        : isDark 
                          ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                          : 'bg-zinc-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              // APP 2: AIGC Portrait Generator
              <div className={`w-full h-full flex flex-col text-[11px] overflow-y-auto transition-colors duration-300 ${
                isDark ? 'bg-[#0a0a0c]' : 'bg-slate-50'
              }`}>
                {/* Header */}
                <div className={`h-10 border-b flex items-center justify-between px-3 flex-shrink-0 transition-colors duration-300 ${
                  isDark ? 'bg-zinc-900/95 border-zinc-800' : 'bg-white border-slate-200'
                }`}>
                  <span className={`font-semibold tracking-wider ${isDark ? 'text-zinc-300' : 'text-slate-800'}`}>AIGC 人像生成馆</span>
                  <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-[9px] font-mono transition-colors duration-300 ${
                    isDark ? 'bg-violet-500/10 border border-violet-500/20 text-violet-400' : 'bg-violet-50 border border-violet-200 text-violet-600'
                  }`}>
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>SDXL Engine</span>
                  </div>
                </div>

                {/* Generator Body Screen */}
                <div className="flex-1 p-3 space-y-3">
                  {generationProgress === -1 ? (
                    // Configuration Scene
                    <>
                      {/* Section 1: Choose Portrait Photo */}
                      <div>
                        <span className={`text-[10px] font-semibold block mb-1.5 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>1. 选择原始参考照片</span>
                        <div className="grid grid-cols-3 gap-2">
                          {ORIGINAL_PORTRAITS.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => setSelectedPortrait(p.id)}
                              className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                                selectedPortrait === p.id 
                                  ? 'border-violet-500 shadow-md shadow-violet-500/10' 
                                  : isDark 
                                    ? 'border-zinc-800 hover:border-zinc-700 bg-zinc-900' 
                                    : 'border-slate-200 hover:border-slate-400 bg-white'
                              }`}
                            >
                              <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <div className="absolute inset-x-0 bottom-0 bg-black/60 p-0.5 font-sans text-center text-[8px] text-zinc-300">{p.name.split(' ')[0]}</div>
                              {selectedPortrait === p.id && (
                                <div className="absolute top-1 right-1 bg-violet-600 rounded-full p-0.5"><Check className="w-2 h-2 text-white" /></div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Section 2: Select Style Template */}
                      <div>
                        <span className={`text-[10px] font-semibold block mb-1.5 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>2. 挑选高拟真风格模板</span>
                        <div className="grid grid-cols-2 gap-2">
                          {(Object.keys(STYLES_META) as Array<'cyber' | 'salt' | 'fantasy' | 'retro'>).map(styleKey => (
                            <button
                              key={styleKey}
                              onClick={() => setSelectedStyle(styleKey)}
                              className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between h-16 ${
                                selectedStyle === styleKey 
                                  ? isDark 
                                    ? 'bg-zinc-800 border-violet-500 text-zinc-100 shadow-sm' 
                                    : 'bg-violet-50/70 border-violet-500 text-violet-950 shadow-xs'
                                  : isDark 
                                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-xs'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className={`font-semibold text-[10px] ${selectedStyle === styleKey ? 'text-violet-500' : ''}`}>{STYLES_META[styleKey].name.split(' ')[0]}</span>
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${STYLES_META[styleKey].color}`} />
                              </div>
                              <span className={`text-[8px] line-clamp-1 leading-tight font-mono ${
                                selectedStyle === styleKey 
                                  ? isDark ? 'text-zinc-300' : 'text-violet-800/80' 
                                  : 'text-zinc-400/90'
                              }`}>
                                prompt style, {styleKey} ...
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Start CTA */}
                      <button
                        onClick={handleGeneratePortrait}
                        className="w-full mt-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-2.5 rounded-xl text-[11px] font-bold shadow-lg shadow-violet-500/20 active:scale-[0.98] transition flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>开始生成风格化人像</span>
                      </button>
                    </>
                  ) : generationProgress < 100 ? (
                    // Processing Scene
                    <div className="h-full flex flex-col items-center justify-center py-10 space-y-6">
                      {/* Scanning Visual */}
                      <div className={`w-24 h-24 rounded-full border relative flex items-center justify-center overflow-hidden transition-colors ${
                        isDark ? 'border-violet-500/30 bg-violet-600/5' : 'border-violet-300 bg-violet-50/25'
                      }`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/20 to-transparent animate-pulse" />
                        <img 
                          src={ORIGINAL_PORTRAITS.find(p => p.id === selectedPortrait)?.avatar} 
                          className="w-16 h-16 rounded-full object-cover opacity-60 filter blur-xs" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 border-t-2 border-violet-400 animate-bounce" />
                      </div>

                      <div className="w-full space-y-3.5 text-center">
                        <div className="text-[11px] font-bold text-violet-500 flex items-center justify-center gap-1">
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                          <span>AI 微调扩散渲染中 {generationProgress}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className={`w-full rounded-full h-1.5 overflow-hidden border ${
                          isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-200 border-slate-300'
                        }`}>
                          <div 
                            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full transition-all duration-150"
                            style={{ width: `${generationProgress}%` }}
                          />
                        </div>

                        {/* Interactive prompt log details */}
                        <div className={`p-2.5 rounded-xl border text-left font-mono text-[8px] max-h-24 overflow-hidden leading-relaxed transition-colors ${
                          isDark ? 'bg-zinc-900/80 border-zinc-800/80 text-zinc-500' : 'bg-slate-100 border-slate-200 text-slate-500'
                        }`}>
                          <div>&gt; Loading latent diffusion... OK</div>
                          <div>&gt; Injecting customized SDXL-Lora v2.1</div>
                          <div className={isDark ? 'text-violet-400/80' : 'text-violet-600'}>&gt; Prompt: {STYLES_META[selectedStyle].prompt.slice(0, 40)}...</div>
                          <div>&gt; CFG scale: 7.5 | Denoise strength: 0.45</div>
                          <div className={isDark ? 'text-pink-400/80' : 'text-pink-600'}>&gt; Sampling karras step {Math.min(20, Math.floor(generationProgress / 5))}/20</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Result View (With slide swipe comparison!)
                    <div className="space-y-4 flex flex-col justify-between">
                      {/* Swipe Frame */}
                      <div className={`relative rounded-2xl overflow-hidden aspect-square border transition-colors ${
                        isDark ? 'border-zinc-800' : 'border-slate-200 shadow-sm bg-white'
                      }`}>
                        {/* Styled Image */}
                        <img 
                          src={styledResult || ''} 
                          alt="Styled" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />

                        {/* Comparison Splitted Image */}
                        <div 
                          className="absolute inset-y-0 left-0 overflow-hidden"
                          style={{ width: `${comparisonSwipe}%` }}
                        >
                          <img
                            src={ORIGINAL_PORTRAITS.find(p => p.id === selectedPortrait)?.avatar || ''}
                            alt="Original"
                            className="absolute top-0 left-0 h-full w-auto max-w-none aspect-square object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 bg-black/70 text-zinc-300 font-mono text-[7px] px-1.5 py-0.5 rounded">原始照片</div>
                        </div>

                        {/* Drag divider button */}
                        <div 
                          className="absolute inset-y-0 w-0.5 bg-white cursor-ew-resize z-20"
                          style={{ left: `${comparisonSwipe}%` }}
                        >
                          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white text-black font-bold rounded-full flex items-center justify-center text-[7px] shadow-lg border border-zinc-300">
                            ↔
                          </div>
                        </div>

                        {/* Slider Controller (Transparent range input) */}
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={comparisonSwipe}
                          onChange={(e) => setComparisonSwipe(Number(e.target.value))}
                          className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize"
                        />

                        <div className={`absolute top-2 right-2 border font-mono text-[7px] px-1.5 py-0.5 rounded ${
                          isDark ? 'bg-violet-950/80 border-violet-500/30 text-violet-300' : 'bg-violet-50/90 border-violet-200 text-violet-600'
                        }`}>
                          智能风格化成果
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-1 gap-2 mt-1">
                        <button
                          onClick={handleResetPortrait}
                          className={
                            isEditorial
                              ? `border py-2 text-[9px] font-medium flex items-center justify-center space-x-1 font-serif transition-colors ${
                                  isDark ? 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800' : 'bg-stone-50 border-stone-300 text-stone-800 hover:bg-stone-100'
                                }`
                              : isGeometric
                              ? `border-2 py-2 text-[9px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1 transition-colors ${
                                  isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-105 hover:bg-[#27272a]' : 'bg-white border-zinc-900 text-zinc-900 hover:bg-zinc-100'
                                }`
                              : `border py-2 rounded-xl text-[9px] font-semibold flex items-center justify-center space-x-1 transition-all ${
                                  isDark 
                                    ? 'bg-[#18181b] border-zinc-800 hover:bg-[#27272a] text-zinc-300' 
                                    : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-700 shadow-xs'
                                }`
                          }
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>换张照片/风格</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Simulated Tab Bar */}
                <div className={`h-10 border-t flex items-center justify-around flex-shrink-0 text-[10px] transition-colors duration-300 ${
                  isDark ? 'border-zinc-800 bg-[#12131a] text-zinc-500' : 'border-slate-200 bg-slate-100 text-slate-500'
                }`}>
                  <div className="text-violet-600 flex flex-col items-center cursor-default"><Layers className="w-3.5 h-3.5 mb-0.5" /><span>艺术生成</span></div>
                  <div className={`flex flex-col items-center transition cursor-pointer ${isDark ? 'hover:text-zinc-300' : 'hover:text-slate-800'}`} onClick={() => alert('占位区域: 点击了解核心项目结构。')}><Sparkles className="w-3.5 h-3.5 mb-0.5" /><span>风格模板</span></div>
                  <div className={`flex flex-col items-center transition cursor-pointer ${isDark ? 'hover:text-zinc-300' : 'hover:text-slate-800'}`} onClick={() => alert('占位区域：支持用户查看以往创作过的人像艺术画廊。')}><User className="w-3.5 h-3.5 mb-0.5" /><span>我的作品</span></div>
                </div>
              </div>
            )}
          </div>

          {/* Home Indicator */}
          <div className={`h-4 w-full flex-shrink-0 flex items-center justify-center relative transition-colors duration-300 ${isDark ? 'bg-[#12131a]' : 'bg-slate-100'}`}>
            <div className={`w-24 h-1 rounded-full ${isDark ? 'bg-zinc-600' : 'bg-slate-300'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
