/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CORE_PROJECTS } from '../data';
import { Sparkles, CornerRightDown, CheckCircle2, AlertCircle, Smartphone, FileText } from 'lucide-react';
import InteractiveDemo from './InteractiveDemo';

interface CoreProjectsProps {
  onScrollToSection: (id: string) => void;
  activeStyle?: 'cyber' | 'editorial' | 'geometric';
  isDark?: boolean;
}

export default function CoreProjects({ onScrollToSection, activeStyle = 'cyber', isDark = true }: CoreProjectsProps) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  // CORE_PROJECTS is a non-empty static const; this guard exists purely to satisfy
  // noUncheckedIndexedAccess and is never hit in practice.
  const proj = CORE_PROJECTS[activeProjectIdx];
  if (!proj) return null;

  // ==========================
  // 1. EDITORIAL STYLE (人文典雅风格)
  // ==========================
  if (activeStyle === 'editorial') {
    const isChat = proj.id === 'chat-assistant';

    return (
      <section id="core-projects" className={`py-20 transition-all duration-300 border-b ${
        isDark ? 'bg-[#1c1917] text-stone-100 border-stone-800' : 'bg-[#faf8f4] text-stone-900 border-stone-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Module Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className={`text-3xl sm:text-4xl font-serif tracking-tight transition-colors duration-300 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
              核心项目
            </h2>
            <p className={`text-sm font-serif italic transition-colors duration-300 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              我主导负责的核心 AI 项目，均配有可交互 Demo 演示。点选下方控制台卡片，即可查看对应项目。
            </p>
          </div>

          {/* Chapter Selection Links (Book Index Style) */}
          <div className={`flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 mb-12 border-b pb-6 transition-colors duration-300 ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
            {CORE_PROJECTS.map((p, idx) => {
              const isSelected = activeProjectIdx === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`text-sm tracking-wide font-serif transition-all duration-300 relative py-2 px-1 cursor-pointer ${
                    isSelected 
                      ? isDark ? 'text-stone-200 font-bold italic' : 'text-stone-900 font-bold italic' 
                      : isDark ? 'text-stone-500 hover:text-stone-300' : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <span className="font-mono text-xs mr-2">CH {idx + 1}.</span>
                  {p.name}
                  {isSelected && (
                    <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDark ? 'bg-stone-200' : 'bg-stone-800'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Unified Humanities Card Container (6:4 Split) */}
          <div className={`border overflow-hidden rounded-2xl shadow-sm transition-all duration-300 ${
            isDark ? 'border-stone-800 bg-[#292524]' : 'border-stone-200 bg-white'
          }`}>
            <div className={`grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x items-stretch transition-colors duration-300 ${
              isDark ? 'divide-stone-800' : 'divide-stone-200'
            }`}>
              
              {/* Left Column: Details (60% width) */}
              <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 space-y-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <span className={`font-serif italic text-xs block transition-colors duration-305 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      Chapter {activeProjectIdx === 0 ? 'I' : 'II'} — {isChat ? 'Social Interaction' : 'Creative AIGC'}
                    </span>
                    <h3 className={`text-2xl sm:text-3xl font-serif leading-tight font-bold transition-colors duration-300 ${
                      isDark ? 'text-stone-100' : 'text-stone-900'
                    }`}>
                      {proj.name}
                    </h3>
                    <p className={`text-sm font-serif italic leading-relaxed transition-colors duration-300 ${
                      isDark ? 'text-stone-300' : 'text-stone-600'
                    }`}>
                      {proj.tagline}
                    </p>
                    
                    {/* Retrospective */}
                    <div className={`p-5 border-l-2 italic text-xs sm:text-sm leading-relaxed font-serif transition-colors duration-300 ${
                      isDark 
                        ? 'bg-[#3e3425]/30 text-[#e6d0bf] border-stone-600' 
                        : 'bg-[#f4ebd9]/40 text-[#5c4a3c] border-stone-400'
                    }`}>
                      “{proj.reflection}”
                    </div>
                  </div>

                  {/* Problem */}
                  <div className="space-y-2">
                    <span className={`text-xs font-sans font-bold block uppercase tracking-wider transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>【关键背景与突破痛点】</span>
                    <p className={`text-xs sm:text-sm leading-relaxed font-sans transition-colors duration-300 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                      {proj.problem}
                    </p>
                  </div>

                  {/* Strategies */}
                  <div className="space-y-2.5">
                    <span className={`text-xs font-sans font-bold block uppercase tracking-wider transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>【主导产品设计与核心策略】</span>
                    <ul className="space-y-2 pl-0">
                      {proj.designs.map((design, i) => (
                        <li key={i} className={`text-xs sm:text-sm leading-relaxed font-sans flex items-start transition-colors duration-300 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                          <span className="text-stone-400 mr-2 font-mono">▸</span>
                          <span className="flex-1">{design}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats Table */}
                  <div className={`pt-4 border-t transition-colors duration-300 ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
                    <span className={`text-xs font-sans font-bold block uppercase tracking-wider mb-3 transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>【大盘指标验证结果】</span>
                    <div className={`grid grid-cols-3 gap-3 border p-4 transition-colors duration-300 ${
                      isDark ? 'border-stone-800 bg-[#1e1b1a]' : 'border-stone-200 bg-stone-50'
                    }`}>
                      {proj.results.map((res, i) => (
                        <div key={i} className="text-center">
                          <span className={`text-[10px] font-sans block ${isDark ? 'text-stone-400' : 'text-stone-400'}`}>{res.label}</span>
                          <span className={`text-base font-serif mt-0.5 block font-bold transition-colors duration-300 ${isDark ? 'text-stone-100 font-bold' : 'text-stone-900 font-bold'}`}>{res.value}</span>
                          <span className={`text-[9px] font-sans mt-0.5 block italic ${isDark ? 'text-orange-400' : 'text-[#8c2d19]'}`}>{res.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Demo simulator (40% width) */}
              <div className={`lg:col-span-4 p-4 sm:p-6 lg:p-8 flex flex-col justify-between items-center min-h-[480px] lg:min-h-[580px] transition-colors duration-300 ${
                isDark ? 'bg-[#181615]' : 'bg-[#fbf9f4]'
              }`}>
                <div className="flex-1 flex items-center justify-center w-full">
                  <InteractiveDemo initialApp={isChat ? 'chat' : 'portrait'} activeStyle={activeStyle} hideSwitcher={true} onlySimulator={true} isDark={isDark} />
                </div>
                {/* Interaction prompt */}
                <div className={`mt-4 text-[11px] italic font-serif flex items-center justify-center space-x-2 w-full transition-colors duration-300 ${
                  isDark ? 'text-stone-400' : 'text-stone-500'
                }`}>
                  <span>{isChat ? '✎ 点击候选话术，体验 AI 辅助回复流程' : '✎ 点击生成按钮，体验人像风格化流程'}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    );
  }

  // ==========================
  // 3. GEOMETRIC BALANCE STYLE (瑞士波普/硬核网格)
  // ==========================
  if (activeStyle === 'geometric') {
    const isChat = proj.id === 'chat-assistant';

    return (
      <section id="core-projects" className={`py-20 border-b-2 transition-colors duration-350 ${
        isDark ? 'bg-[#09090b] text-[#efeff4] border-zinc-800' : 'bg-white text-zinc-900 border-zinc-900'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Module Header */}
          <div className={`text-left mb-12 border-l-8 pl-4 space-y-1 transition-colors duration-300 ${
            isDark ? 'border-zinc-700' : 'border-zinc-900'
          }`}>
            <span className={`text-xs uppercase font-mono tracking-widest font-bold block pb-1.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              CASE ARCHITECTURE // DATA DRIVEN PM
            </span>
            <h2 className={`text-3xl font-black uppercase tracking-tighter ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
              核心项目
            </h2>
            <p className={`text-xs font-sans font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              我主导负责的核心 AI 项目，均配有可交互 Demo 演示。点选下方控制台卡片，即可查看对应项目。
            </p>
          </div>

          {/* Swiss Solid Block Tabs */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {CORE_PROJECTS.map((p, idx) => {
              const isSelected = activeProjectIdx === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`px-6 py-3 border-4 font-mono font-black uppercase text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? isDark 
                        ? 'bg-zinc-100 border-zinc-100 text-zinc-950' 
                        : 'bg-zinc-900 border-zinc-900 text-white' 
                      : isDark
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                        : 'bg-zinc-100 border-zinc-900 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  [{idx + 1}] {p.name}
                </button>
              );
            })}
          </div>

          {/* Swiss Solid Geometric Unified Console (6:4 Split) */}
          <div className={`border-4 overflow-hidden rounded-none shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] transition-colors duration-300 ${
            isDark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-900 bg-[#efeff4]'
          }`}>
            <div className={`grid grid-cols-1 lg:grid-cols-10 divide-y-4 lg:divide-y-0 lg:divide-x-4 items-stretch transition-colors duration-300 ${
              isDark ? 'divide-zinc-800' : 'divide-zinc-900'
            }`}>
              
              {/* Left side card (60% width) */}
              <div className={`lg:col-span-6 p-6 sm:p-8 md:p-10 space-y-6 flex flex-col justify-between transition duration-200 relative ${
                isDark ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-[#efeff4] hover:bg-white'
              }`}>
                <div className="absolute top-0 left-0 py-1 px-3 bg-[#e11d48] text-white font-mono text-[10px] font-bold">
                  0{activeProjectIdx + 1}
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-red-600 text-white px-2 py-0.5 font-bold">
                      {isChat ? 'AI AGENT CORE' : 'AIGC WORKFLOW'}
                    </span>
                    <h3 className={`text-2xl font-black uppercase mt-2 tracking-tight font-sans ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>{proj.name}</h3>
                    <p className={`text-xs font-bold mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{proj.tagline}</p>
                  </div>

                  {/* Problem statement */}
                  <div className={`border p-4 rounded-none border-l-4 space-y-1 transition-colors duration-300 ${
                    isDark 
                      ? 'bg-zinc-950 border-zinc-800 border-l-zinc-300' 
                      : 'bg-white border-zinc-900/10 border-l-zinc-900'
                  }`}>
                    <span className="text-[9px] font-mono font-black text-red-500 uppercase">PROBLEM STATEMENT //</span>
                    <p className={`text-xs font-medium leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>{proj.problem}</p>
                  </div>

                  {/* Implementations */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-black text-zinc-400 uppercase">CORE IMPLEMENTATIONS //</span>
                    <ul className="space-y-2">
                      {proj.designs.map((design, i) => (
                        <li key={i} className={`text-xs font-medium leading-relaxed flex items-start ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>
                          <span className={`mr-2 font-bold font-mono ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>[{i + 1}]</span>
                          <span className="flex-1">{design}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics */}
                  <div className={`pt-3 border-t transition-colors duration-300 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    <span className="text-[10px] font-mono font-black text-zinc-400 uppercase block mb-3 tracking-wider">METRIC VERIFICATIONS //</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {proj.results.map((res, i) => (
                        <div key={i} className={`border p-3 sm:p-4 transition-colors duration-300 ${
                          isDark ? 'bg-zinc-950 border-zinc-800 hover:border-zinc-600' : 'bg-white border-zinc-200 hover:border-zinc-900'
                        }`}>
                          <span className={`text-[10px] uppercase block font-bold tracking-wider ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{res.label}</span>
                          <span className={`text-lg sm:text-xl font-black block font-mono mt-1.5 leading-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>{res.value}</span>
                          <span className="text-[11px] text-red-600 font-semibold block mt-1 leading-snug">{res.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* key reflection block */}
                <div className={`pt-4 border-t transition-colors duration-300 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                  <span className="text-[9px] font-mono font-black text-zinc-400 uppercase block mb-1">RETROSPECTIVE OUTCOME //</span>
                  <p className={`text-xs italic font-medium leading-relaxed font-serif p-3 border transition-colors duration-300 ${
                    isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700'
                  }`}>
                    “{proj.reflection}”
                  </p>
                </div>
              </div>

              {/* Right side simulator (40% width) */}
              <div className={`lg:col-span-4 p-4 sm:p-6 flex flex-col justify-center items-center min-h-[480px] lg:min-h-[580px] transition-colors duration-300 ${
                isDark ? 'bg-[#18181b]' : 'bg-white'
              }`}>
                <InteractiveDemo initialApp={isChat ? 'chat' : 'portrait'} activeStyle={activeStyle} hideSwitcher={true} onlySimulator={true} isDark={isDark} />
              </div>

            </div>
          </div>

        </div>
      </section>
    );
  }

  // ==========================
  // 4. CLASSIC CYBER DARK STYLE (炫酷极客客制化)
  // ==========================
  const isChat = proj.id === 'chat-assistant';
  const accentColor = isChat ? 'text-cyan-400' : 'text-violet-400';
  const badgeBg = isChat ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-violet-500/10 border-violet-500/20';
  const borderGlow = isChat 
    ? isDark 
      ? 'hover:border-cyan-500/40 border-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.02)]' 
      : 'hover:border-cyan-500/40 border-zinc-200 shadow-sm'
    : isDark 
      ? 'hover:border-violet-500/40 border-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.02)]'
      : 'hover:border-violet-500/40 border-zinc-200 shadow-sm';

  return (
    <section id="core-projects" className={`py-20 lg:py-28 relative border-t transition-colors duration-350 ${
      isDark 
        ? 'border-zinc-900 bg-gradient-to-b from-[#0a0b10] to-[#0c0d14]' 
        : 'border-zinc-200 bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]'
    }`}>
      {/* Background visual light flares */}
      <div className={`absolute top-1/2 right-1/10 w-96 h-96 rounded-full blur-[130px] pointer-events-none transition-opacity duration-300 ${isDark ? 'bg-violet-500/5 opacity-100' : 'bg-violet-500/2 opacity-40'}`} />
      <div className={`absolute top-10 left-10 w-80 h-80 rounded-full blur-[110px] pointer-events-none transition-opacity duration-300 ${isDark ? 'bg-cyan-500/5 opacity-100' : 'bg-cyan-500/2 opacity-40'}`} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="inline-block text-xs font-mono font-semibold tracking-widest text-[#06b6d4] bg-cyan-400/10 px-3.5 py-1 rounded-full uppercase border border-cyan-400/20 mb-3.5">
            精选落地成果 & 演示
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold font-display tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            核心项目
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${isDark ? 'text-zinc-400' : 'text-zinc-700'}`}>
            我主导负责的核心 AI 项目，均配有可交互 Demo 演示。点选下方控制台卡片，即可查看对应项目。
          </p>
        </div>

        {/* Cyberpunk Interactive Control Console Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 max-w-4xl mx-auto">
          {CORE_PROJECTS.map((p, idx) => {
            const isSelected = activeProjectIdx === idx;
            const isC = p.id === 'chat-assistant';
            const hoverBorder = isC ? 'hover:border-cyan-500/50' : 'hover:border-violet-500/50';
            const activeBorder = isC 
              ? isDark 
                ? 'border-cyan-500/80 bg-gradient-to-r from-cyan-950/30 to-blue-950/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                : 'border-cyan-500 bg-cyan-50 text-cyan-700 shadow-sm'
              : isDark
                ? 'border-violet-500/80 bg-gradient-to-r from-violet-950/30 to-fuchsia-950/20 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                : 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm';
            
            return (
              <button
                key={p.id}
                onClick={() => setActiveProjectIdx(idx)}
                className={`w-full md:flex-1 p-4 border rounded-2xl transition-all duration-300 text-left cursor-pointer flex items-center justify-between group ${
                  isSelected 
                    ? activeBorder 
                    : isDark 
                      ? 'border-zinc-800 bg-zinc-950/50 text-zinc-400 ' + hoverBorder
                      : 'border-zinc-200 bg-white text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 shadow-sm'
                }`}
              >
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 font-bold mb-1">
                    PROJECT CASE 0{idx + 1}
                  </div>
                  <div className={`font-bold font-display text-sm sm:text-base transition duration-300 ${
                    isSelected 
                      ? isDark ? 'text-white' : 'text-zinc-950' 
                      : isDark ? 'text-zinc-300 group-hover:text-white' : 'text-zinc-700 group-hover:text-zinc-950'
                  }`}>
                    {p.name}
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition border ${
                  isSelected 
                    ? isC ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-violet-500 bg-violet-500/10 text-violet-400'
                    : isDark 
                      ? 'border-zinc-800 bg-zinc-900 text-zinc-500 group-hover:border-zinc-700 group-hover:text-zinc-300'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-400 group-hover:text-zinc-700'
                }`}>
                  <span className="font-mono text-xs font-bold">0{idx + 1}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Unified Cyber Dark Workspace Console (6:4 Split) */}
        <div className={`w-full border rounded-[32px] overflow-hidden transition-all duration-350 relative ${
          isDark 
            ? 'bg-gradient-to-b from-[#111218]/95 to-[#0c0d14]/95 ' + borderGlow 
            : 'bg-white border-zinc-200 shadow-lg ' + borderGlow
        }`}>
          <div className={`grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x items-stretch transition-colors duration-300 ${
            isDark ? 'divide-zinc-900' : 'divide-zinc-200'
          }`}>
            
            {/* Left Column: Case Study Details (60% width) */}
            <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                {/* Badge & Index */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded border font-semibold uppercase ${
                    isChat 
                      ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' 
                      : 'bg-violet-500/10 border-violet-500/20 text-violet-500'
                  }`}>
                    {isChat ? 'AI 代理助手型 • 社交场景' : 'AIGC 视觉体验型 • 玩乐增长'}
                  </span>
                  <span className={`text-xs font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>0{activeProjectIdx + 1} / 02</span>
                </div>

                {/* Project Name & Tagline */}
                <div className="space-y-1.5">
                  <h3 className={`text-2xl font-bold tracking-tight font-display transition-colors duration-300 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    {proj.name}
                  </h3>
                  <p className={`text-xs sm:text-sm font-semibold leading-relaxed font-sans transition-colors duration-300 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {proj.tagline}
                  </p>
                </div>

                {/* Problem Statement */}
                <div className={`border p-4 rounded-2xl space-y-2 text-left transition-colors duration-300 ${
                  isDark ? 'bg-[#0b0c10] border-zinc-900/80' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <div className="flex items-center space-x-1.5 text-rose-500 text-[10px] font-bold font-display uppercase tracking-wider">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>【关键背景 & 突破痛点】</span>
                  </div>
                  <p className={`text-xs leading-relaxed font-sans transition-colors duration-300 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    {proj.problem}
                  </p>
                </div>

                {/* Key Product Designs */}
                <div className="space-y-2.5">
                  <div className={`flex items-center space-x-1.5 text-[10px] font-bold font-display uppercase tracking-wider transition-colors duration-300 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <CornerRightDown className="w-3.5 h-3.5 text-cyan-500" />
                    <span>【核心产品策略与设计】</span>
                  </div>
                  <ul className="space-y-2.5 pl-0.5">
                    {proj.designs.map((design, i) => (
                      <li key={i} className="flex items-start text-xs leading-relaxed group">
                        <span className={`w-1.5 h-1.5 rounded-full ${isChat ? 'bg-cyan-500' : 'bg-violet-500'} mt-1.5 mr-2 flex-shrink-0 group-hover:scale-125 transition`} />
                        <span className={`flex-1 transition text-[11px] font-medium ${isDark ? 'text-zinc-300 group-hover:text-zinc-100' : 'text-zinc-700 group-hover:text-zinc-950'}`}>{design}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Metrics Results */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center space-x-1.5 text-emerald-500 text-[10px] font-bold font-display uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse" />
                    <span>【大盘验证结果（核心指标）】</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {proj.results.map((res, i) => (
                      <div key={i} className={`p-2.5 rounded-xl border text-center flex flex-col justify-center min-h-[58px] transition-colors duration-300 ${
                        isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200 shadow-sm'
                      }`}>
                        <span className={`text-[8px] block truncate ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{res.label}</span>
                        <span className={`text-xs sm:text-sm font-extrabold mt-1 block font-mono transition-colors duration-300 ${isDark ? 'text-white' : 'text-zinc-950'}`}>{res.value}</span>
                        {res.desc && <span className="text-[8px] text-emerald-500 font-mono mt-0.5 block">{res.desc}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Section: Reflection & Action */}
              <div className={`mt-6 pt-5 border-t space-y-4 transition-colors duration-300 ${isDark ? 'border-zinc-900' : 'border-zinc-200'}`}>
                <div className={`p-3.5 rounded-xl border text-left transition-colors duration-300 ${
                  isDark ? 'bg-zinc-950/40 border-zinc-900/60' : 'bg-zinc-50 border-zinc-200 shadow-sm'
                }`}>
                  <span className="text-[8px] font-bold text-zinc-500 uppercase font-mono block mb-1">项目深度复盘思考 / Case Retrospective</span>
                  <p className={`text-[11px] italic leading-relaxed font-sans transition-colors duration-300 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    “{proj.reflection}”
                  </p>
                </div>

                {/* Interactive prompt — editorial-referenced cue */}
                <div className={`mt-1 text-[11px] italic leading-relaxed flex items-center space-x-2 transition-colors duration-300 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  <span className={isChat ? 'text-cyan-500' : 'text-violet-500'}>✎</span>
                  <span>{isChat ? '点击右侧候选话术，体验 AI 辅助回复流程' : '点击右侧生成按钮，体验人像风格化流程'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Embedded Simulator Workspace (40% width) */}
            <div className={`lg:col-span-4 p-4 sm:p-6 lg:p-8 flex flex-col justify-center items-center relative min-h-[480px] lg:min-h-[580px] transition-colors duration-300 ${
              isDark ? 'bg-zinc-950/40' : 'bg-zinc-50/20'
            }`}>
              {/* Ambient cyber border highlights */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isChat ? 'from-transparent via-cyan-500/20 to-transparent' : 'from-transparent via-violet-500/20 to-transparent'}`} />
              <InteractiveDemo initialApp={isChat ? 'chat' : 'portrait'} activeStyle={activeStyle} hideSwitcher={true} onlySimulator={true} isDark={isDark} />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
