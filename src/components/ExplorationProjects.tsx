/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPLORATION_PROJECTS } from '../data';
import { Sparkles, Terminal, BookOpen, Gauge, ArrowUpRight, X, Search, Check, Send } from 'lucide-react';

interface ExplorationProjectsProps {
  activeStyle?: 'cyber' | 'editorial' | 'geometric';
  isDark?: boolean;
}

export default function ExplorationProjects({ activeStyle = 'cyber', isDark = true }: ExplorationProjectsProps) {
  const [activeOverlay, setActiveOverlay] = useState<'job-agent' | 'learn-page' | null>(null);
  // Holds the active Job-Agent simulation interval so we can cancel it on close/unmount.
  const agentIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- JOB AGENT MOCK STATE ---
  const [targetRole, setTargetRole] = useState('AI产品经理');
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentStep, setAgentStep] = useState(0);

  // --- LEARN PAGE STATE ---
  const [studyTopic, setStudyTopic] = useState('AI Agent 应用开发');
  const [activeChapter, setActiveChapter] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState('');

  const chapters = [
    { title: '1. 理解什么是 Agent', objective: '掌握记忆（Memory）、规划（Planning）与工具调用（Tools）的三轴核心。', task: '写下你的第一个 Agent 行动蓝图' },
    { title: '2. 优化上下文策略', objective: '学习将系统Prompt与临时反馈分层，设计破冰、追加、中断重连等细节场景。', task: '防范模型幻觉的大盘兜底字段设置' },
    { title: '3. 让 Agent 连接网络', objective: '研究 RAG 与矢量检索，了解如何喂养私域知识库并完成阶段微调。', task: '调试知识检索准确度' }
  ];
  // chapters is a non-empty static const; this guard exists purely to satisfy
  // noUncheckedIndexedAccess and is never hit in practice.
  const currentChapter = chapters[activeChapter];
  if (!currentChapter) return null;

  const handleRunAgent = () => {
    // Cancel any previous in-flight agent loop before starting a new one.
    if (agentIntervalRef.current !== null) {
      clearInterval(agentIntervalRef.current);
      agentIntervalRef.current = null;
    }
    setIsAgentRunning(true);
    setAgentStep(0);
    agentIntervalRef.current = setInterval(() => {
      setAgentStep(prev => {
        if (prev >= 4) {
          if (agentIntervalRef.current !== null) {
            clearInterval(agentIntervalRef.current);
            agentIntervalRef.current = null;
          }
          return 4;
        }
        return prev + 1;
      });
    }, 1000);
  };

  // Close the Job-Agent overlay AND stop its background interval.
  const handleCloseJobAgent = () => {
    if (agentIntervalRef.current !== null) {
      clearInterval(agentIntervalRef.current);
      agentIntervalRef.current = null;
    }
    setActiveOverlay(null);
    setIsAgentRunning(false);
  };

  // Cleanup the agent interval when the component unmounts entirely.
  useEffect(() => {
    return () => {
      if (agentIntervalRef.current !== null) {
        clearInterval(agentIntervalRef.current);
        agentIntervalRef.current = null;
      }
    };
  }, []);

  const handleSelectAnswer = (ans: string) => {
    setQuizAnswer(ans);
    if (ans === 'A') {
      setQuizFeedback('✅ 完全正确！这也是我设计核心项目「AI聊天助手」时的第一顺位重防机制——通过引入重复度惩罚策略（Repetition Penalty）与本地候选池缓冲去重，才将大盘保存率提升 20PP。');
    } else {
      setQuizFeedback('❌ 这是一个常见误区。虽然B和C都会降低用户好感，但「死板、重复同样的提示词」在统计上最容易击穿用户的回复耐性，使其判定AI虚假无力，从而卸磨离线。');
    }
  };

  // Determine section background and border colors based on active style
  const sectionBgClass = activeStyle === 'editorial' 
    ? isDark ? 'bg-[#1c1917] text-stone-200 border-b border-stone-800' : 'bg-[#faf8f4] text-stone-900 border-[#eae6df] border-b'
    : activeStyle === 'geometric' 
      ? isDark ? 'bg-[#09090b] text-[#efeff4] border-b-2 border-zinc-800' : 'bg-[#efeff4] text-zinc-900 border-[#18181b] border-b-2'
      : isDark ? 'bg-[#0c0d14] text-[#e4e4e7]' : 'bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] text-[#18181b] border-[#eaeef4] border-b';

  return (
    <section id="exploration-projects" className={`py-20 lg:py-28 relative overflow-hidden transition-all duration-300 ${sectionBgClass}`}>
      {activeStyle === 'cyber' && (
        <>
          <div className={`absolute top-1/4 left-1/10 w-80 h-80 rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/2'}`} />
          <div className={`absolute bottom-1/4 right-1/10 w-80 h-80 rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${isDark ? 'bg-pink-500/5' : 'bg-pink-500/2'}`} />
        </>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Module Header */}
        <div
          className={`mb-16 space-y-2 ${
            activeStyle === 'geometric'
              ? 'text-left max-w-3xl'
              : 'text-center max-w-3xl mx-auto'
          }`}
        >
          {activeStyle === 'editorial' ? (
            <>
              <h2 className={`text-3xl sm:text-4xl font-serif transition-colors duration-300 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>探索项目</h2>
              <p className={`text-sm font-serif italic pt-1 transition-colors duration-300 ${isDark ? 'text-[#eae6df]' : 'text-stone-700'}`}>“以最快速度将产品想法进行原型拟合与功能打磨”</p>
            </>
          ) : activeStyle === 'geometric' ? (
            <div className={`border-l-8 pl-4 text-left transition-colors duration-300 space-y-1 ${isDark ? 'border-zinc-700' : 'border-red-500'}`}>
              <span className={`text-xs font-mono font-bold block pb-1.5 tracking-widest uppercase transition-colors duration-300 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>EXPERIMENTAL BLUEPRINTS //</span>
              <h2 className={`text-3xl font-black uppercase tracking-tighter transition-colors duration-300 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>探索项目</h2>
              <p className={`text-xs mt-1 transition-colors duration-300 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>基于 AI Coding 能力独立完成的原型实验，快速验证产品想法与形态。</p>
            </div>
          ) : (
            <>
              <span className="inline-block text-xs font-mono font-semibold tracking-widest text-[#8b5cf6] bg-[#8b5cf6]/10 px-3.5 py-1 rounded-full uppercase border border-[#8b5cf6]/20 mb-3.5">
                持续探索与验证
              </span>
              <h2 className={`text-3xl sm:text-4xl font-extrabold font-display tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                探索项目
              </h2>
              <p className={`text-sm sm:text-base pt-1 transition-colors duration-300 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                一些正在独立设计、构建和验证中的产品原型想法。
              </p>
            </>
          )}
        </div>

        {/* 3 cards grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {EXPLORATION_PROJECTS.map((proj) => {
            let IconComponent = Sparkles;
            let themeAccent = 'text-cyan-500';
            let overlayKey: 'job-agent' | 'learn-page' | null = null;

            if (proj.id === 'job-agent') {
              IconComponent = Terminal;
              themeAccent = activeStyle === 'editorial' ? (isDark ? 'text-stone-300' : 'text-stone-700') : 'text-cyan-500';
              overlayKey = 'job-agent';
            } else if (proj.id === 'learn-page') {
              IconComponent = BookOpen;
              themeAccent = activeStyle === 'editorial' ? (isDark ? 'text-stone-300' : 'text-stone-700') : 'text-violet-500';
              overlayKey = 'learn-page';
            } else if (proj.id === 'ai-quota-monitor') {
              IconComponent = Gauge;
              themeAccent = activeStyle === 'editorial' ? (isDark ? 'text-stone-300' : 'text-stone-700') : 'text-rose-500';
            }

            // Theme CARD classes styling
            let cardStyleClass = 'bg-[#12131a] border border-zinc-800/85 hover:border-zinc-700 rounded-3xl p-6 lg:p-7 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden group';
            let textTitleClass = 'text-lg font-bold text-white group-hover:text-zinc-100 font-display transition';
            let textTaglineClass = 'text-xs text-zinc-400 leading-relaxed font-sans min-h-[40px]';
            let ruleClass = 'border-t border-zinc-900/80 my-1';
            let bulletTextClass = 'text-zinc-400';
            let tagSpanClass = 'text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded-md border border-zinc-800/40';
            let ctaClass = 'w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 cursor-pointer transition active:scale-[0.98]';

            if (activeStyle === 'editorial') {
              cardStyleClass = `border rounded-none p-6 flex flex-col justify-between hover:shadow-sm hover:border-stone-500 transition-all relative overflow-hidden group ${
                isDark ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-300'
              }`;
              textTitleClass = `text-lg font-serif font-bold ${isDark ? 'text-stone-100' : 'text-stone-900'}`;
              textTaglineClass = `text-xs leading-relaxed font-sans min-h-[40px] ${isDark ? 'text-stone-300' : 'text-stone-600'}`;
              ruleClass = `border-t ${isDark ? 'border-stone-800' : 'border-stone-200'}`;
              bulletTextClass = `font-sans ${isDark ? 'text-stone-300' : 'text-stone-700'}`;
              tagSpanClass = `text-[9px] px-2 py-0.5 rounded-none border ${isDark ? 'bg-stone-950 text-stone-400 border-stone-800' : 'bg-stone-100 text-stone-600 border-stone-300'}`;
              ctaClass = `w-full py-2 rounded-none font-bold text-xs flex items-center justify-center space-x-1.5 cursor-pointer border transition-all ${
                isDark 
                  ? 'border-stone-200 text-stone-200 hover:bg-stone-200 hover:text-stone-900' 
                  : 'border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white'
              }`;
            } else if (activeStyle === 'geometric') {
              cardStyleClass = `border-4 rounded-none p-6 flex flex-col justify-between hover:bg-zinc-800/5 hover:bg-opacity-5 transition-all relative overflow-hidden group shadow-[4px_4px_0px_#000] ${
                isDark ? 'bg-[#18181b] border-zinc-700' : 'bg-white border-zinc-900'
              }`;
              textTitleClass = `text-lg font-black uppercase ${isDark ? 'text-zinc-100' : 'text-zinc-950'}`;
              textTaglineClass = `text-xs leading-relaxed font-sans min-h-[40px] font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`;
              ruleClass = `border-t-2 ${isDark ? 'border-zinc-800' : 'border-zinc-900'}`;
              bulletTextClass = `font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`;
              tagSpanClass = `text-[9px] px-2 py-0.5 rounded-none border-0 font-bold uppercase ${isDark ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-900 text-white'}`;
              ctaClass = `w-full py-2.5 rounded-none font-bold text-xs flex items-center justify-center space-x-1.5 cursor-pointer border transition-all ${
                isDark 
                  ? 'bg-zinc-100 text-zinc-950 hover:bg-red-600 hover:text-white font-black tracking-wide uppercase' 
                  : 'bg-zinc-900 text-white hover:bg-red-600 transition-all font-black tracking-wide uppercase'
              }`;
            } else {
              // Classic/Cyber Custom Mode handles Light
              if (!isDark) {
                cardStyleClass = 'bg-white border border-zinc-200 hover:border-zinc-300 rounded-3xl p-6 lg:p-7 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden group';
                textTitleClass = 'text-lg font-bold text-zinc-950 group-hover:text-zinc-800 font-display transition';
                textTaglineClass = 'text-xs text-zinc-600 leading-relaxed font-sans min-h-[40px]';
                ruleClass = 'border-t border-zinc-200 my-1';
                bulletTextClass = 'text-zinc-700';
                tagSpanClass = 'text-[9px] bg-zinc-50 text-zinc-600 px-2 py-0.5 rounded-md border border-zinc-200';
                ctaClass = 'w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 cursor-pointer bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition';
              }
            }

            return (
              <div key={proj.id} className={cardStyleClass}>
                {/* Upper Card Info */}
                <div className="space-y-6">
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] uppercase font-mono tracking-wider font-semibold ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      INDIE DEMO WORK
                    </span>
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      proj.status.includes('制作中') 
                        ? activeStyle === 'editorial' 
                          ? isDark ? 'bg-stone-900 border-stone-800 text-stone-400' : 'bg-stone-50 border-stone-200 text-stone-400'
                          : isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-zinc-50 border-zinc-200 text-zinc-400'
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                    }`}>
                      ● {proj.status}
                    </span>
                  </div>

                  {/* Project Title and Description */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1.5 rounded-lg transition-colors duration-300 ${
                        activeStyle === 'editorial' 
                          ? isDark ? 'bg-stone-950 text-stone-100' : 'bg-stone-100 text-stone-800' 
                          : activeStyle === 'geometric' 
                            ? isDark ? 'bg-zinc-800 text-zinc-100' : 'bg-zinc-100 border border-zinc-900' 
                            : isDark ? 'bg-zinc-900 text-cyan-400' : 'bg-zinc-50 border border-zinc-200'
                      } ${themeAccent}`}>
                        {proj.id === 'learn-page' ? (
                          <motion.div
                            animate={{ rotateY: [0, 180, 360] }}
                            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="w-4 h-4 flex items-center justify-center"
                          >
                            <IconComponent className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          <IconComponent className="w-4 h-4" />
                        )}
                      </div>
                      <h3 className={textTitleClass}>
                        {proj.name}
                      </h3>
                    </div>
                    <p className={textTaglineClass}>
                      {proj.tagline}
                    </p>
                  </div>

                  {/* Divider line */}
                  <div className={ruleClass} />

                  {/* Key Highlights of capability */}
                  <div className="space-y-2.5 text-left">
                    <span className={`text-[10px] uppercase font-mono tracking-wider block ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>能力落地要点:</span>
                    <ul className="space-y-1.5">
                      {proj.highlights.map((hlt, idx) => (
                        <li key={idx} className="flex items-start text-[11px]">
                          <Check className={`w-3 h-3 mr-2 mt-0.5 flex-shrink-0 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
                          <span className={bulletTextClass}>
                            {hlt.split('：')[0]}
                            {hlt.includes('：') && <span className={isDark ? 'text-zinc-500 font-sans' : 'text-zinc-400 font-sans'}>: {hlt.split('：')[1]}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom tags & CTA */}
                <div className={`mt-8 pt-5 ${activeStyle === 'geometric' ? (isDark ? 'border-t border-zinc-800' : 'border-t-2 border-zinc-900') : (isDark ? 'border-t border-zinc-900/80' : 'border-t border-zinc-200')} space-y-4`}>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <span key={tag} className={tagSpanClass}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Play Prototype Button */}
                  {proj.hasDemo && proj.id === 'learn-page' ? (
                    <a
                      href="https://cc-study-6hc.pages.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={ctaClass}
                    >
                      <span>查看 Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : proj.hasDemo && overlayKey ? (
                    <button
                      onClick={() => setActiveOverlay(overlayKey)}
                      className={ctaClass}
                    >
                      <span>内部测试中</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className={`w-full py-2.5 text-center text-xs font-semibold select-none transition-colors duration-300 ${
                      activeStyle === 'editorial' 
                        ? isDark ? 'bg-stone-900 border border-stone-800 text-stone-500' : 'bg-stone-50 border border-stone-200 text-stone-400' 
                        : activeStyle === 'geometric' 
                          ? isDark ? 'bg-zinc-900 border-2 border-dashed border-zinc-800 text-zinc-500' : 'bg-zinc-100 border-2 border-dashed border-zinc-300 text-zinc-400' 
                          : isDark ? 'border border-zinc-900 bg-zinc-950/20 text-zinc-500 rounded-xl' : 'border border-zinc-200 bg-zinc-50 text-zinc-400 rounded-xl'
                    }`}>
                      开发中
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* --- FLOATING OVERLAY DIALOGS & DEMO CHANNELS --- */}
      <AnimatePresence>
        {activeOverlay === 'job-agent' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className={`w-full max-w-lg p-6 relative overflow-hidden transition-colors duration-300 ${
                activeStyle === 'editorial' 
                  ? isDark ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-[#faf8f4] text-stone-900 border border-stone-300' 
                  : activeStyle === 'geometric' 
                    ? isDark ? 'bg-zinc-900 border-4 border-zinc-700 text-zinc-100' : 'bg-white text-zinc-900 border-4 border-zinc-900' 
                    : isDark ? 'bg-[#12131a] text-[#e4e4e7] border border-zinc-800 rounded-3xl' : 'bg-white text-zinc-900 border border-zinc-200 rounded-3xl shadow-2xl'
              }`}
            >
              <button
                onClick={handleCloseJobAgent}
                className="absolute top-4 right-4 p-1.5 text-zinc-500 hover:text-zinc-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2.5 mb-5">
                <Terminal className="text-cyan-500 w-5 h-5" />
                <h3 className={`text-lg font-bold ${activeStyle === 'editorial' ? 'font-serif' : 'font-display'}`}>求职 Agent 模拟测试终端</h3>
              </div>

              <div className="space-y-4">
                <div className={`border p-4 rounded-xl text-left space-y-3 transition-colors duration-300 ${
                  isDark ? 'bg-[#0b0c10] border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <span className={`text-[10px] font-mono uppercase block ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>【目标岗位输入】</span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={targetRole}
                      onChange={e => setTargetRole(e.target.value)}
                      className={`flex-1 border rounded-lg px-3 py-1.5 text-xs outline-none focus:border-cyan-500/50 transition-colors duration-300 ${
                        isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                      placeholder="例如：AI产品经理、算法PM"
                    />
                    <button 
                      onClick={handleRunAgent}
                      disabled={isAgentRunning}
                      className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs px-4 py-1.5 rounded-lg disabled:opacity-50 transition cursor-pointer font-sans"
                    >
                      {isAgentRunning ? '遍历中...' : '运行 Agent'}
                    </button>
                  </div>
                </div>

                {isAgentRunning && (
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-zinc-500">Agent 流程控制链路...</span>
                      <span className="text-cyan-500 font-bold animate-pulse">Running</span>
                    </div>

                    <div className={`space-y-2 font-mono text-[11px] p-4 border rounded-xl max-h-[180px] overflow-y-auto transition-colors duration-300 ${
                      isDark ? 'text-zinc-400 bg-[#0b0c10] border-zinc-800' : 'text-zinc-700 bg-zinc-100 border-zinc-300'
                    }`}>
                      <p className={agentStep >= 1 ? 'text-cyan-500' : (isDark ? 'text-zinc-600' : 'text-zinc-400')}>
                        [Step 1] √ 启动岗位多维拉网爬取: {targetRole} JD 已获取。
                      </p>
                      {agentStep >= 2 && (
                        <p className="text-violet-500">
                          [Step 2] √ 分析匹配：简历与 JD 核心闪光点高保真比对。
                        </p>
                      )}
                      {agentStep >= 3 && (
                        <p className="text-rose-500">
                          [Step 3] √ 构建 Prompt：定制5大最高频模拟面试提问。
                        </p>
                      )}
                      {agentStep >= 4 && (
                        <p className="text-emerald-500 font-bold bg-emerald-500/5 p-1 rounded">
                          [Done] √ 岗位诊断就绪！匹配度: 88%! 已生成全套面试预测集。
                        </p>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}

        {activeOverlay === 'learn-page' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className={`w-full max-w-xl p-6 relative overflow-hidden transition-colors duration-300 ${
                activeStyle === 'editorial' 
                  ? isDark ? 'bg-stone-900 border border-stone-800 text-stone-100' : 'bg-[#faf8f4] text-stone-900 border border-stone-300' 
                  : activeStyle === 'geometric' 
                    ? isDark ? 'bg-zinc-900 text-zinc-100 border-4 border-zinc-700 shadow-[8px_8px_0_#27272a]' : 'bg-white text-zinc-900 border-4 border-zinc-900 shadow-[8px_8px_0_#000]' 
                    : isDark ? 'bg-[#12131a] text-[#e4e4e7] border border-zinc-800 rounded-3xl' : 'bg-white text-zinc-800 border border-zinc-200 rounded-3xl shadow-2xl'
              }`}
            >
              <button 
                onClick={() => { setActiveOverlay(null); setQuizAnswer(null); setQuizFeedback(''); }}
                className="absolute top-4 right-4 p-1.5 text-zinc-500 hover:text-zinc-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className={`flex items-center space-x-2.5 mb-5 border-b pb-3 transition-colors duration-300 ${
                isDark ? 'border-zinc-800' : 'border-zinc-200'
              }`}>
                <BookOpen className="text-violet-500 w-5 h-5" />
                <h3 className={`text-lg font-bold ${activeStyle === 'editorial' ? 'font-serif' : 'font-display'}`}>互动学习页面(知识沙箱)</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-left">
                {/* Steps left list (md:col-span-5) */}
                <div className={`md:col-span-5 space-y-2 border-r pr-3 transition-colors duration-300 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                  <span className={`text-[9px] font-mono block uppercase ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>课程纲要一览 //</span>
                  {chapters.map((chap, idx) => (
                    <button 
                      key={idx}
                      onClick={() => { setActiveChapter(idx); setQuizAnswer(null); setQuizFeedback(''); }}
                      className={`w-full p-2.5 text-left rounded-xl border transition flex flex-col gap-1 cursor-pointer ${
                        activeChapter === idx 
                          ? 'bg-violet-500/10 border-violet-500/35 text-violet-500 font-semibold' 
                          : isDark
                            ? 'bg-[#0a0b10]/40 border-zinc-800 text-zinc-400 hover:bg-zinc-900/40'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      <span className="text-[11px] font-bold block leading-tight">{chap.title}</span>
                      <span className="text-[9px] text-zinc-500 truncate block">{chap.task}</span>
                    </button>
                  ))}
                </div>

                {/* Main panel active scene (md:col-span-7) */}
                <div className="md:col-span-7 space-y-4">
                  <div className={`border px-4 py-3 rounded-xl space-y-1 transition-colors duration-300 ${
                    isDark ? 'bg-[#0b0c10] border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <span className={`text-[9px] font-mono uppercase block ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>【本节教学目标】</span>
                    <p className={`text-[11px] leading-relaxed font-semibold transition-colors duration-300 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      {currentChapter.objective}
                    </p>
                  </div>

                  {activeChapter === 1 && (
                    <div className={`space-y-3 p-4 border rounded-xl text-xs transition-colors duration-300 ${
                      isDark ? 'bg-[#0a0b10] border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                    }`}>
                      <span className="text-[9px] text-rose-500 font-bold block font-mono">⚠️ 阶段性课堂小测 (A/B Test 概念辨析) :</span>
                      <p className={`leading-relaxed font-bold transition-colors duration-300 ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>在设计一个高留存 resentment AI 聊天建议产品时，模型生成的以下哪类缺陷最容易击穿用户的回复耐性、造成大盘会话快速流失？</p>
                      
                      <div className="space-y-2 pt-1 font-sans">
                        <button 
                          onClick={() => handleSelectAnswer('A')}
                          className={`w-full p-2.5 rounded-lg border text-left text-xs transition cursor-pointer flex justify-between items-center ${
                            quizAnswer === 'A' 
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 font-bold' 
                              : isDark
                                ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                                : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300 shadow-sm'
                          }`}
                        >
                          <span>A. 提示词死板、多次生成同样的安慰套话</span>
                          {quizAnswer === 'A' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                        </button>
                        <button 
                          onClick={() => handleSelectAnswer('B')}
                          className={`w-full p-2.5 rounded-lg border text-left text-xs transition cursor-pointer flex justify-between items-center ${
                            quizAnswer === 'B' 
                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 font-bold' 
                              : isDark
                                ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                                : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300 shadow-sm'
                          }`}
                        >
                          <span>B. 回复带有极轻微的标点符号语病错误</span>
                          {quizAnswer === 'B' && <Check className="w-3.5 h-3.5 text-rose-500" />}
                        </button>
                      </div>

                      {quizFeedback && (
                        <p className={`p-2.5 rounded border text-[11px] leading-relaxed transition-all ${
                          quizAnswer === 'A' 
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600/90' 
                            : 'bg-red-500/5 border-red-500/20 text-red-500/95'
                        }`}>
                          {quizFeedback}
                        </p>
                      )}
                    </div>
                  )}

                  {activeChapter !== 1 && (
                    <div className={`p-10 border border-dashed text-center font-mono text-[10px] transition-colors duration-300 ${
                      isDark ? 'border-zinc-800 text-zinc-600' : 'border-zinc-300 text-zinc-500'
                    }`}>
                      课程板块正在开发部署中... 点击课程纲要的“优化上下文策略”可以体验互动测评。
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
