/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  MessageSquare, 
  Download, 
  Github, 
  FileText, 
  ArrowUp, 
  Check, 
  Copy, 
  Sparkles, 
  X, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
  activeStyle?: 'cyber' | 'editorial' | 'geometric';
  isDark?: boolean;
}

// Static decorative WeChat QR placeholder SVG. Module-level so it isn't
// re-created on every render and a single reference is reused across all calls.
const QrCodeSvg = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" aria-label="微信二维码">
    <rect x="0" y="0" width="25" height="25" fill="currentColor" />
    <rect x="4" y="4" width="17" height="17" fill="white" />
    <rect x="8" y="8" width="9" height="9" fill="currentColor" />
    <rect x="75" y="0" width="25" height="25" fill="currentColor" />
    <rect x="79" y="4" width="17" height="17" fill="white" />
    <rect x="83" y="8" width="9" height="9" fill="currentColor" />
    <rect x="0" y="75" width="25" height="25" fill="currentColor" />
    <rect x="4" y="79" width="17" height="17" fill="white" />
    <rect x="8" y="83" width="9" height="9" fill="currentColor" />
    <rect x="35" y="5" width="6" height="6" fill="currentColor" />
    <rect x="50" y="5" width="8" height="6" fill="currentColor" />
    <rect x="62" y="10" width="6" height="12" fill="currentColor" />
    <rect x="35" y="20" width="12" height="6" fill="currentColor" />
    <rect x="15" y="35" width="6" height="18" fill="currentColor" />
    <rect x="5" y="60" width="12" height="6" fill="currentColor" />
    <rect x="30" y="30" width="40" height="40" fill="transparent" stroke="currentColor" strokeWidth="4" />
    <rect x="45" y="45" width="10" height="10" fill="currentColor" />
    <rect x="38" y="52" width="6" height="6" fill="currentColor" />
    <rect x="56" y="38" width="6" height="6" fill="currentColor" />
    <rect x="75" y="75" width="6" height="6" fill="currentColor" />
    <rect x="85" y="75" width="10" height="6" fill="currentColor" />
    <rect x="75" y="85" width="6" height="10" fill="currentColor" />
    <rect x="85" y="85" width="6" height="6" fill="currentColor" />
  </svg>
);

export default function Footer({ onScrollToSection, activeStyle = 'cyber', isDark = true }: FooterProps) {
  const [copiedText, setCopiedText] = useState<'email' | 'wechat' | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Refs to all setInterval / setTimeout ids so we can cancel them on close or unmount.
  const downloadIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const downloadFinishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup every pending timer/interval when the component unmounts.
  useEffect(() => {
    return () => {
      if (downloadIntervalRef.current !== null) {
        clearInterval(downloadIntervalRef.current);
        downloadIntervalRef.current = null;
      }
      if (downloadFinishTimerRef.current !== null) {
        clearTimeout(downloadFinishTimerRef.current);
        downloadFinishTimerRef.current = null;
      }
      if (toastTimerRef.current !== null) {
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
      if (copiedResetTimerRef.current !== null) {
        clearTimeout(copiedResetTimerRef.current);
        copiedResetTimerRef.current = null;
      }
    };
  }, []);

  const contactInfo = {
    email: 'whale.4655@gmail.com',
    wechat: 'Turbo_HaoRan'
  };

  const startRealDownload = () => {
    if (downloadProgress !== null || downloadSuccess) return;
    // Cancel any prior in-flight download (interval + post-finish timer) before starting fresh.
    if (downloadIntervalRef.current !== null) {
      clearInterval(downloadIntervalRef.current);
      downloadIntervalRef.current = null;
    }
    if (downloadFinishTimerRef.current !== null) {
      clearTimeout(downloadFinishTimerRef.current);
      downloadFinishTimerRef.current = null;
    }
    setDownloadProgress(0);
    downloadIntervalRef.current = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          if (downloadIntervalRef.current !== null) {
            clearInterval(downloadIntervalRef.current);
            downloadIntervalRef.current = null;
          }
          setDownloadSuccess(true);
          downloadFinishTimerRef.current = setTimeout(() => {
            downloadFinishTimerRef.current = null;
            setDownloadProgress(null);
            showToast("【简历打包就绪】包含全生命周期 A/B Test 归因 & 优秀 Agent 框架的简历已成功打包下载。");
          }, 600);
          return 100;
        }
        return prev + 25;
      });
    }, 100);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    // Cancel any previous auto-dismiss before scheduling the new one
    // (consecutive toasts should not stack timers; the new toast owns the dismiss).
    if (toastTimerRef.current !== null) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      toastTimerRef.current = null;
      setToastMessage(null);
    }, 4000);
  };

  const handleCopy = async (text: string, type: 'email' | 'wechat') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      showToast(`成功复制【${type === 'email' ? '电子邮箱' : '微信ID'}】至剪贴板。`);
    } catch (err) {
      // clipboard API rejects in non-HTTPS contexts, when permission is denied,
      // or in private/incognito modes. Surface a real error instead of pretending it worked.
      const reason = err instanceof Error ? err.message : String(err);
      showToast(`复制失败,请手动选中复制 (${reason || '权限被拒'})`);
    }
    // Cancel any prior "已复制" reset before scheduling a new one.
    if (copiedResetTimerRef.current !== null) {
      clearTimeout(copiedResetTimerRef.current);
    }
    copiedResetTimerRef.current = setTimeout(() => {
      copiedResetTimerRef.current = null;
      setCopiedText(null);
    }, 2000);
  };

  // Styles based on activeStyle
  const isEditorial = activeStyle === 'editorial';
  const isGeometric = activeStyle === 'geometric';

  // ==========================
  // 1. EDITORIAL STYLE (人文社论)
  // ==========================
  if (isEditorial) {
    return (
      <footer id="continue-hear" className={`relative py-24 border-t transition-colors duration-300 ${
        isDark 
          ? 'bg-[#181615] text-[#eae6df] border-stone-800' 
          : 'bg-[#faf8f4] text-stone-900 border-stone-300'
      }`}>
        <div id="footer-container-editorial" className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b transition-colors duration-300 ${
            isDark ? 'border-stone-800' : 'border-stone-200'
          }`}>
            {/* Left Box: Simple Info */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className={`text-[10px] font-sans font-bold tracking-widest uppercase border px-3 py-1 inline-block transition-colors duration-300 ${
                isDark 
                  ? 'text-stone-400 bg-stone-900/30 border-stone-800' 
                  : 'text-stone-500 bg-stone-100 border-stone-300'
              }`}>
                关于我 ｜ BIO
              </span>
              <h3 className={`text-3xl font-serif font-normal leading-tight transition-colors duration-300 ${
                isDark ? 'text-stone-100' : 'text-stone-900'
              }`}>
                感谢看到最后。期待与您开启更深度的对话。
              </h3>
              <p className={`text-sm leading-relaxed font-sans transition-colors duration-300 ${
                isDark ? 'text-stone-400' : 'text-stone-700'
              }`}>
                我是刘昊然Turbo，一名专注于 AI Agent 与 AIGC 应用落地、致力于突破算法能力和工程设计体验咬合界限的产品经理。希望能在您的组织架构设计或产品探索中提供助力。
              </p>
              
              <div id="status-card-editorial" className={`p-5 rounded-none text-left border transition-colors duration-300 ${
                isDark 
                  ? 'bg-stone-900/40 border-stone-800' 
                  : 'bg-stone-50 border-stone-300'
              }`}>
                <div className={`flex items-center space-x-2 text-xs font-bold transition-colors duration-300 ${
                  isDark ? 'text-stone-200' : 'text-stone-800'
                }`}>
                  <FileText className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-stone-700'}`} />
                  <span>当前状态：随时看新机会 (AI PM / 策略增长 / 独立开发者)</span>
                </div>
                <p className={`text-xs leading-relaxed mt-2 transition-colors duration-300 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  寻求深度合作与共创机会，关注高契合度的端侧产品落地、智能体商业化及高效敏捷团队。
                </p>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`inline-flex items-center space-x-1.5 text-xs font-serif cursor-pointer transition-colors ${
                  isDark ? 'text-stone-400 hover:text-stone-200' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>返回顶部</span>
              </button>
            </div>

            {/* Right Box: Actions */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h4 className={`text-xs font-bold uppercase tracking-widest font-sans transition-colors duration-300 ${
                isDark ? 'text-stone-400' : 'text-stone-500'
              }`}>
                合作联系与资料 ｜ CREDENTIALS
              </h4>
              
              <div className="space-y-4">
                {/* PDF CV Button */}
                <button
                  id="btn-download-cv-editorial"
                  onClick={startRealDownload}
                  className={`w-full p-4 rounded-none flex items-center justify-between text-left transition cursor-pointer border ${
                    isDark 
                      ? 'bg-stone-900/40 hover:bg-stone-900/70 border-stone-800' 
                      : 'bg-white hover:bg-stone-50 border-stone-300'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`p-2 rounded-lg border transition-colors duration-300 ${
                      isDark 
                        ? 'bg-stone-900 border-stone-800 text-stone-300' 
                        : 'bg-stone-100 border-stone-200 text-stone-700'
                    }`}>
                      {downloadProgress !== null ? <Clock className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className={`font-bold text-xs block font-serif transition-colors duration-350 ${
                        isDark ? 'text-stone-200' : 'text-stone-900'
                      }`}>
                        {downloadProgress !== null ? `正在打包简历 ${downloadProgress}%` : downloadSuccess ? '已成功下载' : '下载简历'}
                      </span>
                      <span className={`text-[10px] mt-0.5 block transition-colors ${
                        isDark ? 'text-stone-400' : 'text-stone-500'
                      }`}>包含核心 Project / Prompt 设计框架及转归因指标</span>
                    </div>
                  </div>
                  <span className={`font-serif font-bold ${isDark ? 'text-stone-600' : 'text-stone-400'}`}>→</span>
                </button>

                {/* GitHub */}
                <a
                  id="link-github-editorial"
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full p-4 rounded-none flex items-center justify-between text-left transition border ${
                    isDark 
                      ? 'bg-stone-900/40 hover:bg-stone-900/70 border-stone-800' 
                      : 'bg-white hover:bg-stone-50 border-stone-300'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`p-2 rounded-lg border transition-colors duration-300 ${
                      isDark 
                        ? 'bg-stone-900 border-stone-800 text-stone-300' 
                        : 'bg-stone-100 border-stone-200 text-stone-700'
                    }`}>
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`font-bold text-xs block font-serif transition-colors duration-300 ${
                        isDark ? 'text-stone-200' : 'text-stone-900'
                      }`}>访问 GitHub 个人开源主页</span>
                      <span className={`text-[10px] mt-0.5 block transition-colors ${
                        isDark ? 'text-stone-400' : 'text-stone-500'
                      }`}>包含多套前端 Demo 与 Agent 精简化运行框架实例</span>
                    </div>
                  </div>
                  <span className={`font-serif font-bold ${isDark ? 'text-stone-600' : 'text-stone-400'}`}>→</span>
                </a>

                {/* Direct copy block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={`p-3.5 text-left flex flex-col justify-between border transition-colors duration-300 ${
                    isDark ? 'bg-stone-900/30 border-stone-800' : 'bg-stone-50 border-stone-300'
                  }`}>
                    <div className="flex items-center space-x-1.5 text-stone-500 text-[10px] font-bold uppercase">
                      <Mail className="w-3.5 h-3.5" />
                      <span>电子邮箱</span>
                    </div>
                    <span className={`text-xs font-mono my-2 select-all break-all transition-colors ${
                      isDark ? 'text-stone-200' : 'text-stone-800'
                    }`}>{contactInfo.email}</span>
                    <button
                      onClick={() => handleCopy(contactInfo.email, 'email')}
                      className={`w-full py-1 text-[9px] font-mono cursor-pointer text-center border transition-all ${
                        isDark 
                          ? 'border-stone-800 bg-[#1c1a17] hover:bg-stone-900 text-stone-400 hover:text-stone-200' 
                          : 'border-stone-400 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {copiedText === 'email' ? '已复制邮箱' : '复制电子邮箱'}
                    </button>
                  </div>

                  <div className={`p-3.5 text-left flex flex-col justify-between border transition-colors duration-300 ${
                    isDark ? 'bg-stone-900/30 border-stone-800' : 'bg-stone-50 border-stone-300'
                  }`}>
                    <div className="flex items-center space-x-1.5 text-stone-500 text-[10px] font-bold uppercase">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>微信咨询</span>
                    </div>
                    <span className={`text-xs font-mono my-2 select-all transition-colors ${
                      isDark ? 'text-stone-200' : 'text-stone-800'
                    }`}>{contactInfo.wechat}</span>
                    <button
                      onClick={() => handleCopy(contactInfo.wechat, 'wechat')}
                      className={`w-full py-1 text-[9px] font-mono cursor-pointer text-center border transition-all ${
                        isDark 
                          ? 'border-stone-800 bg-[#1c1a17] hover:bg-stone-900 text-stone-400 hover:text-stone-200' 
                          : 'border-stone-400 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {copiedText === 'wechat' ? '已复制微信' : '复制微信 ID'}
                    </button>
                  </div>
                </div>

                {/* Mini WeChat QR code block */}
                <div className={`p-4 flex items-center space-x-4 border transition-colors duration-300 ${
                  isDark ? 'bg-stone-900/30 border-stone-800' : 'bg-stone-50 border-stone-300'
                }`}>
                  <div className="w-16 h-16 bg-white p-1 border border-stone-200 flex-shrink-0 cursor-pointer" onClick={() => setShowQrModal(true)}>
                    <QrCodeSvg className="w-full h-full text-stone-800" />
                  </div>
                  <div className="text-left select-none">
                    <span className={`text-xs font-serif font-bold block transition-colors ${
                      isDark ? 'text-stone-200' : 'text-stone-900'
                    }`}>点击扫码添加好友</span>
                    <p className={`text-[10px] mt-1 font-sans leading-snug transition-colors ${
                      isDark ? 'text-stone-500' : 'text-stone-500'
                    }`}>
                      支持微信直接扫码添加好友建立直连沟通，添加时请备注「AI 招聘合作」。
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom simple footer info */}
          <div className={`pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] font-sans border-t transition-colors duration-300 ${
            isDark ? 'border-stone-800 text-stone-500' : 'border-stone-200 text-stone-500'
          }`}>
            <span>© 2026 刘昊然Turbo 作品集 • 保留所有权利</span>
            <span className="font-mono text-[10px]">基于 React & Tailwind CSS 优雅构建</span>
          </div>

        </div>
      </footer>
    );
  }

  // ==========================
  // 2. GEOMETRIC STYLE (几何包豪斯)
  // ==========================
  if (isGeometric) {
    return (
      <footer id="continue-hear" className={`relative py-24 border-t-4 transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0f1013] text-zinc-100 border-zinc-800' 
          : 'bg-[#efeff4] text-zinc-900 border-zinc-900'
      }`}>
        <div id="footer-container-geometric" className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b-4 transition-colors duration-300 ${
            isDark ? 'border-zinc-800' : 'border-zinc-900'
          }`}>
            {/* Left Box */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className={`text-xs font-mono font-black uppercase px-3 py-1.5 inline-block transition-colors duration-300 ${
                isDark 
                  ? 'text-zinc-900 bg-zinc-200 border-2 border-zinc-200' 
                  : 'text-white bg-zinc-900 border-2 border-zinc-900'
              }`}>
                BIOGRAPHY
              </span>
              <h3 className={`text-3xl font-black uppercase tracking-tighter leading-none transition-colors duration-300 ${
                isDark ? 'text-zinc-100' : 'text-zinc-900'
              }`}>
                感谢关注 ｜ 期待与您共同探索
              </h3>
              <p className={`text-sm font-semibold leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-zinc-400' : 'text-zinc-800'
              }`}>
                我是刘昊然Turbo。专注于 AI PM + 独立全栈开发，拒绝不切实际的项目包装。期待在 AIGC 应用工程落地、策略指标增长与快速验证等各层级中开启共创讨论。
              </p>
              
              <div id="status-card-geometric" className={`p-5 border-4 rounded-none text-left transition-colors duration-300 ${
                isDark 
                  ? 'bg-[#15171c] border-zinc-800 shadow-[4px_4px_0px_#181a20]' 
                  : 'bg-white border-zinc-900 shadow-[4px_4px_0px_#000000]'
              }`}>
                <div className="flex items-center space-x-2 text-xs font-black uppercase">
                  <FileText className={`w-4 h-4 ${isDark ? 'text-zinc-300' : 'text-zinc-900'}`} />
                  <span>当前求职状态：随时看新机会 (AI PM / 独立 PM 开发者)</span>
                </div>
                <p className={`text-xs leading-relaxed mt-2 font-medium transition-colors duration-300 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-700'
                }`}>
                  精深 Prompt 免疫约束、业务闭环量化指标治理，可作为 AI 全职团队骨干或项目顾问随时切入。
                </p>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`inline-flex items-center space-x-1.5 text-xs font-mono font-black transition-colors ${
                  isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>BACK TO TOP</span>
              </button>
            </div>

            {/* Right Box */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h4 className={`text-xs font-mono font-black uppercase tracking-widest transition-colors duration-300 ${
                isDark ? 'text-zinc-500' : 'text-zinc-600'
              }`}>
                联络与中文简历 ｜ DIRECT PORTS
              </h4>

              <div className="space-y-4">
                {/* CV button with thick border styling */}
                <button
                  id="btn-download-cv-geometric"
                  onClick={startRealDownload}
                  className={`w-full p-4 rounded-none flex items-center justify-between text-left transition cursor-pointer border-4 ${
                    isDark 
                      ? 'bg-[#15171c] hover:bg-zinc-900 border-zinc-800 text-zinc-100 shadow-[3px_3px_0px_#181a20]' 
                      : 'bg-white hover:bg-zinc-100 border-zinc-900 text-zinc-900 shadow-[3px_3px_0px_#000000]'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`p-2 border-2 transition-colors duration-300 ${
                      isDark ? 'border-zinc-800 text-zinc-200 bg-zinc-900' : 'border-zinc-900 text-zinc-900 bg-zinc-100'
                    }`}>
                      {downloadProgress !== null ? <Clock className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className={`font-extrabold text-xs block uppercase transition-colors ${
                        isDark ? 'text-zinc-200' : 'text-zinc-900'
                      }`}>
                        {downloadProgress !== null ? `正在离线打包简历 ${downloadProgress}%` : downloadSuccess ? '已成功离线另存' : '下载简历'}
                      </span>
                      <span className={`text-[10px] block mt-0.5 transition-colors ${
                        isDark ? 'text-zinc-500' : 'text-zinc-600'
                      }`}>含各功能 Prompt 代码模型及指标归因拆解式案例</span>
                    </div>
                  </div>
                  <span className={`font-black text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-900'}`}>→</span>
                </button>

                {/* GitHub link with retro shadow */}
                <a
                  id="link-github-geometric"
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full p-4 rounded-none flex items-center justify-between text-left transition border-4 ${
                    isDark 
                      ? 'bg-[#15171c] hover:bg-zinc-900 border-zinc-800 text-zinc-100 shadow-[3px_3px_0px_#181a20]' 
                      : 'bg-white hover:bg-zinc-100 border-zinc-900 text-zinc-900 shadow-[3px_3px_0px_#000000]'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`p-2 border-2 transition-colors duration-300 ${
                      isDark ? 'border-zinc-800 text-zinc-200 bg-zinc-900' : 'border-zinc-900 text-zinc-900 bg-zinc-100'
                    }`}>
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`font-extrabold text-xs block uppercase transition-colors ${
                        isDark ? 'text-zinc-200' : 'text-zinc-900'
                      }`}>查看开源代码仓库主页</span>
                      <span className={`text-[10px] block mt-0.5 transition-colors ${
                        isDark ? 'text-zinc-500' : 'text-zinc-600'
                      }`}>包含主页展示的多项 React 原子层交互 Demo 微内核代码</span>
                    </div>
                  </div>
                  <span className={`font-black text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-900'}`}>→</span>
                </a>

                {/* Copies row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={`p-3.5 text-left flex flex-col justify-between border-4 transition-colors duration-300 ${
                    isDark 
                      ? 'bg-[#15171c] border-zinc-800 shadow-[2px_2px_0px_#181a20]' 
                      : 'bg-white border-zinc-900 shadow-[2px_2px_0px_#000000]'
                  }`}>
                    <div className="flex items-center space-x-1.5 text-zinc-500 text-[10px] font-mono font-black uppercase">
                      <Mail className="w-3.5 h-3.5" />
                      <span>EMAIL</span>
                    </div>
                    <span className={`text-xs font-mono my-2 select-all font-bold truncate transition-colors duration-300 ${
                      isDark ? 'text-zinc-200' : 'text-zinc-900'
                    }`}>{contactInfo.email}</span>
                    <button
                      onClick={() => handleCopy(contactInfo.email, 'email')}
                      className={`w-full py-1 text-[9px] font-mono font-bold border-2 cursor-pointer text-center transition-all ${
                        isDark 
                          ? 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300' 
                          : 'border-zinc-900 bg-zinc-100 hover:bg-zinc-200 text-zinc-900'
                      }`}
                    >
                      {copiedText === 'email' ? 'COPIED!' : 'COPY EMAIL'}
                    </button>
                  </div>

                  <div className={`p-3.5 text-left flex flex-col justify-between border-4 transition-colors duration-300 ${
                    isDark 
                      ? 'bg-[#15171c] border-zinc-800 shadow-[2px_2px_0px_#181a20]' 
                      : 'bg-white border-zinc-900 shadow-[2px_2px_0px_#000000]'
                  }`}>
                    <div className="flex items-center space-x-1.5 text-zinc-500 text-[10px] font-mono font-black uppercase">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WECHAT</span>
                    </div>
                    <span className={`text-xs font-mono my-2 select-all font-bold transition-colors duration-300 ${
                      isDark ? 'text-zinc-200' : 'text-zinc-900'
                    }`}>{contactInfo.wechat}</span>
                    <button
                      onClick={() => handleCopy(contactInfo.wechat, 'wechat')}
                      className={`w-full py-1 text-[9px] font-mono font-bold border-2 cursor-pointer text-center transition-all ${
                        isDark 
                          ? 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300' 
                          : 'border-zinc-900 bg-zinc-100 hover:bg-zinc-200 text-zinc-900'
                      }`}
                    >
                      {copiedText === 'wechat' ? 'COPIED!' : 'COPY WECHAT ID'}
                    </button>
                  </div>
                </div>

                {/* Inline QR */}
                <div className={`p-4 border-4 flex items-center space-x-4 transition-colors duration-300 ${
                  isDark 
                    ? 'bg-[#15171c] border-zinc-800 shadow-[3px_3px_0px_#181a20]' 
                    : 'bg-white border-zinc-900 shadow-[3px_3px_0px_#000000]'
                }`}>
                  <div className="w-16 h-16 bg-white p-1 border-2 border-zinc-900 flex-shrink-0 cursor-pointer" onClick={() => setShowQrModal(true)}>
                    <QrCodeSvg className="w-full h-full text-zinc-900" />
                  </div>
                  <div className="text-left font-sans animate-fade-in">
                    <span className={`text-xs font-black uppercase block transition-colors ${
                      isDark ? 'text-zinc-200' : 'text-zinc-900'
                    }`}>CLICK TO ENLARGE QR CODE</span>
                    <p className={`text-[10px] mt-1 font-semibold leading-snug transition-colors duration-300 ${
                      isDark ? 'text-zinc-500' : 'text-zinc-600'
                    }`}>
                      支持微信直接点按或扫码添加好友直达通道。请备注「岗位/合作意图」。
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className={`pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono font-bold transition-colors duration-300 ${
            isDark ? 'text-zinc-600 border-zinc-800' : 'text-zinc-500 border-zinc-200'
          }`}>
            <span>© 2026 刘昊然TURBO PORTFOLIO • KEEP IT TRUTHFUL</span>
            <span>BUILT WITH REACT 19 & TAILWIND</span>
          </div>

        </div>
      </footer>
    );
  }

  // ==========================
  // 3. CYBER STYLE (赛博极能) - PORTFOLIO SYSTEM LAYOUT WITH EXQUISITE DESIGN & HIERARCHY
  // ==========================
  return (
    <footer id="continue-hear" className={`relative py-24 overflow-hidden border-t transition-colors duration-300 ${
      isDark 
        ? 'bg-[#08090d] border-zinc-900/80 text-white' 
        : 'bg-zinc-50 border-zinc-200 text-zinc-900'
    }`}>
      {/* Subtle atmospheric ambient backgrow */}
      <div className={`absolute top-1/2 left-1/4 -translate-y-1/2 w-[650px] h-64 bg-gradient-to-tr from-cyan-500/5 to-violet-500/5 rounded-full filter blur-[150px] pointer-events-none transition-opacity duration-500 ${
        isDark ? 'opacity-100' : 'opacity-10'
      }`} />

      <div id="footer-container-cyber" className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Title block focused solely on career options and portfolio contact */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between border-b pb-10 mb-16 transition-colors duration-300 ${
          isDark ? 'border-zinc-900/80' : 'border-zinc-200'
        }`}>
          <div className="space-y-3 text-left">
            <div className={`inline-flex items-center space-x-2 border px-3 py-1 rounded-full ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border-cyan-500/20 text-cyan-400' 
                : 'bg-cyan-50 border-cyan-200 text-cyan-600'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold">与我联络 ｜ CONTACT DIRECTORY</span>
            </div>
            <h3 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-display transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-zinc-900'
            }`}>
              期待与您开启更深度的对话
            </h3>
            <p className={`text-xs sm:text-sm font-sans max-w-xl leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              下载完整版中文简历PDF或通过专属直联通道随叫随到。共同探讨 AIGC 在真实量化大盘中的商用与增长可能性。
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center space-x-4">
            <span className={`text-xs font-mono px-4 py-2 rounded-lg border transition-all ${
              isDark 
                ? 'text-zinc-500 bg-zinc-950 border-zinc-900' 
                : 'text-zinc-600 bg-white border-zinc-200'
            }`}>
              随时看新方向 (PM / PM Developer)
            </span>
          </div>
        </div>

        {/* Dynamic Cards Grid: Perfectly compact, focused on core credentials and copies without larping status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left panel: Compact & Premium CV Download Hub */}
          <div className={`p-8 sm:p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-500 group border lg:col-span-7 ${
            isDark 
              ? 'bg-[#0b0c11]/80 border-zinc-900 hover:border-cyan-500/20' 
              : 'bg-white border-zinc-200 hover:border-cyan-500/30'
          }`}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-left space-y-5">
              <div className="flex items-center space-x-2 text-cyan-400">
                <FileText className="w-4 h-4" />
                <span className={`text-[10px] font-mono tracking-wider font-bold uppercase transition-colors ${
                  isDark ? 'text-cyan-400' : 'text-cyan-600'
                }`}>OFFICIAL RESUME PATH</span>
              </div>
              
              <h4 className={`text-xl sm:text-2xl font-bold font-display leading-tight transition-colors ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}>
                刘昊然Turbo · 5年完整版中文简历.pdf
              </h4>
              
              <p className={`text-xs sm:text-sm leading-relaxed font-sans transition-colors ${
                isDark ? 'text-zinc-400' : 'text-zinc-700'
              }`}>
                详尽记录了我主导设计的 AIGC 落地产品（如破冰助手、SD 个人模版化等）的核心策略、Prompt 异常免疫机制、全渠道 A/B 流量测试归因数据。
              </p>
              
              <div className="space-y-2 pt-2 text-xs text-zinc-500 font-sans">
                <div className="flex items-center space-x-2.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-500' : 'bg-cyan-600'}`} />
                  <span className={isDark ? 'text-zinc-500' : 'text-zinc-600'}>5年沉淀的 A/B 试验与漏斗深度增长调优 model</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-500' : 'bg-cyan-600'}`} />
                  <span className={isDark ? 'text-zinc-500' : 'text-zinc-600'}>大厂核心 AI 特色功能 System Prompt 与约束机制拆解</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-500' : 'bg-cyan-600'}`} />
                  <span className={isDark ? 'text-zinc-500' : 'text-zinc-600'}>独立应用或微服务快速原型组装及迭代经验</span>
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
              isDark ? 'border-zinc-900/60' : 'border-zinc-200'
            }`}>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-mono text-zinc-500">文件规格 DETAILS</span>
                <span className={`text-xs font-mono transition-colors ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>PDF SECURE HQ DOCUMENT // 4.8MB</span>
              </div>
              
              <div className="relative">
                <button
                  id="btn-download-cv-cyber"
                  onClick={startRealDownload}
                  className={`px-5 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer border ${
                    downloadProgress !== null
                      ? isDark 
                        ? 'bg-zinc-950 border-cyan-500/30 text-cyan-400' 
                        : 'bg-zinc-100 border-cyan-500/30 text-cyan-700'
                      : downloadSuccess
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : isDark
                      ? 'bg-cyan-400 border-transparent text-black hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]'
                      : 'bg-cyan-600 border-transparent text-white hover:bg-cyan-700'
                  }`}
                >
                  {downloadProgress !== null ? (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 animate-spin text-cyan-400" />
                      <span className="font-mono text-[10px]">系统自打包中 {downloadProgress}%...</span>
                    </div>
                  ) : downloadSuccess ? (
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 stroke-[3px]" />
                      <span>5年官方中文版简历已为您极速下载</span>
                    </div>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>下载简历</span>
                    </>
                  )}
                </button>

                {downloadProgress !== null && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 rounded-full transition-all duration-150" 
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right panel: Direct Connections */}
          <div className={`p-8 sm:p-10 rounded-2xl flex flex-col justify-between space-y-6 border transition-colors lg:col-span-5 ${
            isDark 
              ? 'bg-[#0b0c11]/40 border-zinc-900/80' 
              : 'bg-zinc-100/40 border-zinc-200'
          }`}>
            
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold text-left">
                专属直联联络点 ｜ DIRECT CONNECTION
              </span>
              
              <div className="space-y-3">
                {/* Email Link Card */}
                <div className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                  isDark 
                    ? 'bg-zinc-950/60 border-zinc-900/80 hover:bg-zinc-950/95' 
                    : 'bg-white border-zinc-200 hover:bg-zinc-50'
                }`}>
                  <div className="flex items-center space-x-3.5 text-left">
                    <div className={`p-2.5 rounded-lg transition-colors ${isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600'}`}>
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">EMAIL ADDRESS</span>
                      <span className={`text-xs font-mono font-medium select-all block mt-0.5 transition-colors ${
                        isDark ? 'text-zinc-100' : 'text-zinc-900'
                      }`}>{contactInfo.email}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleCopy(contactInfo.email, 'email')}
                    className={`p-2 rounded-lg border transition-all cursor-pointer ${
                      isDark 
                        ? 'border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white bg-zinc-950' 
                        : 'border-zinc-200 hover:border-zinc-300 text-zinc-500 hover:text-zinc-900 bg-white'
                    }`}
                  >
                    {copiedText === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* WeChat Link Card */}
                <div className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                  isDark 
                    ? 'bg-zinc-950/60 border-zinc-900/80 hover:bg-zinc-950/95' 
                    : 'bg-white border-zinc-200 hover:bg-zinc-50'
                }`}>
                  <div className="flex items-center space-x-3.5 text-left">
                    <div className={`p-2.5 rounded-lg transition-colors ${isDark ? 'bg-violet-500/10 text-violet-400' : 'bg-violet-50 text-violet-600'}`}>
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">WECHAT ID</span>
                      <span className={`text-xs font-mono font-medium select-all block mt-0.5 transition-colors ${
                        isDark ? 'text-zinc-100' : 'text-zinc-900'
                      }`}>{contactInfo.wechat}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleCopy(contactInfo.wechat, 'wechat')}
                    className={`p-2 rounded-lg border transition-all cursor-pointer ${
                      isDark 
                        ? 'border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white bg-zinc-950' 
                        : 'border-zinc-200 hover:border-zinc-300 text-zinc-500 hover:text-zinc-900 bg-white'
                    }`}
                  >
                    {copiedText === 'wechat' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

              </div>
            </div>

            {/* WeChat Mini QR-Scan action widget */}
            <div 
              id="widget-qr-mini-cyber"
              onClick={() => setShowQrModal(true)}
              className={`p-4 border rounded-xl flex items-center space-x-4 text-left cursor-pointer transition-all duration-300 group ${
                isDark 
                  ? 'bg-zinc-950 border-zinc-900 hover:border-violet-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.03)]' 
                  : 'bg-white border-zinc-200 hover:border-violet-500/30'
              }`}
            >
              <div className="w-[50px] h-[50px] bg-white p-1 rounded-lg border flex-shrink-0 flex items-center justify-center relative group-hover:scale-105 transition-transform border-zinc-200">
                <QrCodeSvg className="w-full h-full text-zinc-900" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className={`font-bold text-xs block transition-colors ${isDark ? 'text-white' : 'text-zinc-900'}`}>微信直接扫码添加</span>
                  <span className={`text-[7.5px] border px-1 py-0.5 rounded leading-none uppercase font-mono font-bold transition-all ${
                    isDark 
                      ? 'bg-violet-400/10 text-violet-400 border-violet-400/20' 
                      : 'bg-violet-50 text-violet-600 border-violet-200'
                  }`}>SCAN ME</span>
                </div>
                <p className={`text-[10px] sm:text-[11px] leading-relaxed mt-0.5 truncate font-sans transition-colors ${
                  isDark ? 'text-zinc-500' : 'text-zinc-500'
                }`}>
                  点击拉起微信加友大图，添加备注「AI 作品集」。
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom clean Gateway entrance zone without larping entry portals */}
        <div id="footer-bottom-gateway" className={`pt-8 flex flex-col sm:flex-row justify-between items-center text-xs gap-y-4 border-t transition-colors ${
          isDark ? 'border-zinc-900/40 text-zinc-500' : 'border-zinc-200 text-zinc-500'
        }`}>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-3">
            <a
              id="link-footer-github"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-1.5 transition text-[11px] font-medium ${
                isDark ? 'hover:text-cyan-400 text-zinc-500' : 'hover:text-cyan-600 text-zinc-600'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub 个人主页</span>
            </a>

            <button
              id="btn-footer-scroll-back"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`flex items-center space-x-1.5 transition text-[11px] font-medium cursor-pointer ${
                isDark ? 'hover:text-white text-zinc-500' : 'hover:text-zinc-900 text-zinc-600'
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>回到首屏</span>
            </button>
          </div>

          <div className="text-[11px] font-mono">
            © 2026 刘昊然Turbo • Powered by React & Tailwind CSS
          </div>

        </div>

      </div>

      {/* ==================================
          DETAILED DIALOG WORKFLOW: WECHAT QR MODAL OVERLAY
          ================================== */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Glass background overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
              onClick={() => setShowQrModal(false)}
            />
            
            {/* Main Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-[#0e1017] border border-cyan-500/20 max-w-sm w-full rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.15)] relative z-10 p-6 flex flex-col items-center text-center space-y-6"
            >
              
              {/* Header section */}
              <div className="w-full flex items-center justify-between border-b border-zinc-900 pb-3">
                <div className="flex items-center space-x-2 text-violet-400 text-left">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase">WECHAT CHANNEL // CONTACT GATEWAY</span>
                </div>
                <button 
                  onClick={() => setShowQrModal(false)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                  title="关闭"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* QR Scanner Mock Content area */}
              <div className="relative p-3 bg-white rounded-2xl w-48 h-48 flex items-center justify-center shadow-lg group">
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-violet-500 pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-violet-500 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-violet-500 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-violet-500 pointer-events-none" />
                
                <div className="absolute left-3 right-3 h-[2.5px] bg-violet-400 top-2 animate-[bounce_3.5s_infinite] pointer-events-none" />

                <QrCodeSvg className="w-[154px] h-[154px] text-zinc-900" />
              </div>

              {/* Instruction tags and actions */}
              <div className="space-y-4 w-full">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white font-sans">刘昊然Turbo WeChat</h4>
                  <p className="text-zinc-400 text-xs font-sans">用微信直接扫描上方二维码添加</p>
                </div>

                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-900 flex items-center justify-between text-left">
                  <div>
                    <span className="text-[8px] font-mono text-zinc-500 block font-bold">WECHAT ID</span>
                    <span className="text-xs font-mono text-zinc-200 select-all">{contactInfo.wechat}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(contactInfo.wechat, 'wechat')}
                    className="px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-[10px] flex items-center gap-1 cursor-pointer transition border border-zinc-800"
                  >
                    {copiedText === 'wechat' ? (
                      <span className="text-emerald-400 font-bold inline-flex items-center gap-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                        已复制
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <Copy className="w-3 h-3" />
                        复制 ID
                      </span>
                    )}
                  </button>
                </div>

                <div className="bg-violet-950/20 border border-violet-500/10 p-2.5 rounded-lg text-left">
                  <span className="text-[10px] text-zinc-400 block leading-relaxed font-sans text-center">
                    添加时请备注您的组织机构与业务意向，例：
                    <br />「<strong className="text-violet-400 font-medium font-sans">XX大厂 + 招聘</strong>」或「<strong className="text-violet-400 font-medium font-sans">XX资本 + 合作</strong>」
                  </span>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================
          HIGHLY DESIGNED FIXED TOAST NOTIFICATION BLOCK (AUTO SLIDE)
          ================================== */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#0a0b10]/95 backdrop-blur-md border border-cyan-500/30 text-white rounded-xl p-4 shadow-[0_10px_30px_rgba(6,182,212,0.15)] flex items-start space-x-3.5"
          >
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg flex-shrink-0">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0 text-left font-sans">
              <span className="text-[10px] font-mono text-cyan-400 block tracking-wider uppercase font-bold">通知 ｜ NOTIFICATION</span>
              <p className="text-zinc-300 text-xs font-sans leading-relaxed mt-0.5">{toastMessage}</p>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-zinc-500 hover:text-white p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}
