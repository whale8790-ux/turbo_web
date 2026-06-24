/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUp,
  Check,
  Clock,
  Copy,
  Download,
  Github,
  Mail,
  MessageSquare,
  Sparkles,
  X,
} from 'lucide-react';
import GeometricFooter from './footer/GeometricFooter';
import CyberFooter from './footer/CyberFooter';
import EditorialFooter from './footer/EditorialFooter';

interface FooterProps {
  onScrollToSection: (id: string) => void;
  activeStyle?: 'cyber' | 'editorial' | 'geometric';
  isDark?: boolean;
}

const QrCodeSvg = ({ className = 'w-full h-full' }: { className?: string }) => (
  <img
    src="/wechat-qr.jpg"
    alt="微信二维码 - 添加好友"
    aria-label="微信二维码"
    loading="lazy"
    decoding="async"
    className={`${className} object-contain bg-white`}
  />
);

export default function Footer({ activeStyle = 'cyber', isDark = true }: FooterProps) {
  const [copiedText, setCopiedText] = useState<'email' | 'wechat' | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const downloadIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const downloadFinishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (downloadIntervalRef.current !== null) clearInterval(downloadIntervalRef.current);
      if (downloadFinishTimerRef.current !== null) clearTimeout(downloadFinishTimerRef.current);
      if (toastTimerRef.current !== null) clearTimeout(toastTimerRef.current);
      if (copiedResetTimerRef.current !== null) clearTimeout(copiedResetTimerRef.current);
    };
  }, []);

  const contactInfo = {
    email: 'turbo707@icloud.com',
    github: 'https://github.com/whale8790-ux',
    githubLabel: 'whale8790-ux',
    wechat: 'turboss7',
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current !== null) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      toastTimerRef.current = null;
      setToastMessage(null);
    }, 3000);
  };

  const startRealDownload = () => {
    if (downloadProgress !== null || downloadSuccess) return;
    if (downloadIntervalRef.current !== null) clearInterval(downloadIntervalRef.current);
    if (downloadFinishTimerRef.current !== null) clearTimeout(downloadFinishTimerRef.current);

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
            showToast('简历已下载。');
          }, 600);
          return 100;
        }
        return prev + 25;
      });
    }, 100);
  };

  const handleCopy = async (text: string, type: 'email' | 'wechat') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      showToast(type === 'email' ? '邮箱已复制。' : '微信 ID 已复制。');
    } catch {
      showToast('复制失败，请手动复制。');
    }

    if (copiedResetTimerRef.current !== null) clearTimeout(copiedResetTimerRef.current);
    copiedResetTimerRef.current = setTimeout(() => {
      copiedResetTimerRef.current = null;
      setCopiedText(null);
    }, 2000);
  };

  const isEditorial = activeStyle === 'editorial';
  const isGeometric = activeStyle === 'geometric';

  const footerClass = isEditorial
    ? isDark
      ? 'bg-[#181615] text-[#eae6df] border-stone-800'
      : 'bg-[#faf8f4] text-stone-900 border-stone-300'
    : isGeometric
      ? isDark
        ? 'bg-[#0f1013] text-zinc-100 border-zinc-800'
        : 'bg-[#efeff4] text-zinc-900 border-zinc-900'
      : isDark
        ? 'bg-[#08090d] text-white border-zinc-900/80'
        : 'bg-zinc-50 text-zinc-900 border-zinc-200';

  const cardClass = isEditorial
    ? isDark
      ? 'bg-stone-900/30 border-stone-800'
      : 'bg-white border-stone-300'
    : isGeometric
      ? isDark
        ? 'bg-[#15171c] border-zinc-800 shadow-[5px_5px_0px_#181a20]'
        : 'bg-white border-zinc-900 shadow-[5px_5px_0px_#000000]'
      : isDark
        ? 'bg-[#0b0c11]/80 border-zinc-900'
        : 'bg-white border-zinc-200';

  const itemClass = isEditorial
    ? isDark
      ? 'bg-[#1c1a17] border-stone-800'
      : 'bg-stone-50 border-stone-300'
    : isGeometric
      ? isDark
        ? 'bg-[#0f1013] border-zinc-800'
        : 'bg-white border-zinc-900'
      : isDark
        ? 'bg-zinc-950/60 border-zinc-900/80'
        : 'bg-zinc-50 border-zinc-200';

  const primaryButtonClass = isEditorial
    ? isDark
      ? 'bg-stone-100 hover:bg-white border-stone-100 text-stone-950'
      : 'bg-stone-900 hover:bg-stone-800 border-stone-900 text-white'
    : isGeometric
      ? isDark
        ? 'bg-zinc-100 hover:bg-white border-zinc-100 text-zinc-950 shadow-[4px_4px_0px_#27272a]'
        : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-900 text-white shadow-[4px_4px_0px_#000000]'
      : isDark
        ? 'bg-cyan-400 hover:bg-cyan-300 border-transparent text-black shadow-[0_0_30px_rgba(34,211,238,0.15)]'
        : 'bg-cyan-600 hover:bg-cyan-700 border-transparent text-white shadow-lg';

  const accentText = isEditorial ? 'text-stone-500' : isGeometric ? 'text-zinc-500' : isDark ? 'text-cyan-400' : 'text-cyan-600';
  const hardBorder = isGeometric ? 'border-4 rounded-none' : isEditorial ? 'border rounded-none' : 'border rounded-2xl';
  const smallCardShape = isGeometric ? 'border-4 rounded-none' : isEditorial ? 'border rounded-none' : 'border rounded-xl';

  const copyButtonClass = `p-2 shrink-0 transition cursor-pointer ${smallCardShape} ${
    isDark
      ? 'text-zinc-400 hover:text-white border-zinc-800 bg-zinc-950/60'
      : 'text-zinc-500 hover:text-zinc-900 border-zinc-300 bg-white'
  }`;

  if (isGeometric) {
    return (
      <GeometricFooter
        contactInfo={contactInfo}
        copiedText={copiedText}
        downloadProgress={downloadProgress}
        downloadSuccess={downloadSuccess}
        showQrModal={showQrModal}
        toastMessage={toastMessage}
        onCopy={handleCopy}
        onDownload={startRealDownload}
        onOpenQr={() => setShowQrModal(true)}
        onCloseQr={() => setShowQrModal(false)}
        onDismissToast={() => setToastMessage(null)}
        onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        QrCodeSvg={QrCodeSvg}
        isDark={isDark}
      />
    );
  }

  if (activeStyle === 'cyber') {
    return (
      <CyberFooter
        contactInfo={contactInfo}
        copiedText={copiedText}
        downloadProgress={downloadProgress}
        downloadSuccess={downloadSuccess}
        showQrModal={showQrModal}
        toastMessage={toastMessage}
        onCopy={handleCopy}
        onDownload={startRealDownload}
        onOpenQr={() => setShowQrModal(true)}
        onCloseQr={() => setShowQrModal(false)}
        onDismissToast={() => setToastMessage(null)}
        onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        QrCodeSvg={QrCodeSvg}
        isDark={isDark}
      />
    );
  }

  if (isEditorial) {
    return (
      <EditorialFooter
        contactInfo={contactInfo}
        copiedText={copiedText}
        downloadProgress={downloadProgress}
        downloadSuccess={downloadSuccess}
        showQrModal={showQrModal}
        toastMessage={toastMessage}
        onCopy={handleCopy}
        onDownload={startRealDownload}
        onOpenQr={() => setShowQrModal(true)}
        onCloseQr={() => setShowQrModal(false)}
        onDismissToast={() => setToastMessage(null)}
        onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        QrCodeSvg={QrCodeSvg}
        isDark={isDark}
      />
    );
  }

  return (
    <footer id="continue-hear" className={`relative py-20 border-t transition-colors duration-300 ${footerClass}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className={`p-6 sm:p-8 lg:p-10 ${hardBorder} ${cardClass}`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="text-left space-y-3">
              <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${accentText}`}>CONTACT</span>
              <h3 className={`text-3xl sm:text-4xl font-bold ${isEditorial ? 'font-serif font-normal' : ''}`}>简历与联系</h3>
            </div>

            <button
              id="btn-download-cv"
              onClick={startRealDownload}
              className={`w-full lg:w-auto min-w-[220px] px-6 py-4 flex items-center justify-center gap-3 font-bold text-sm transition cursor-pointer border ${isGeometric ? 'rounded-none' : 'rounded-xl'} ${primaryButtonClass}`}
            >
              {downloadProgress !== null ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>{downloadProgress}%</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>已下载</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>下载简历</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_180px] gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 min-w-0 ${smallCardShape} ${itemClass}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 text-left">
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${accentText}`}>
                      <Mail className="w-3.5 h-3.5" />
                      <span>邮箱</span>
                    </div>
                    <span className="mt-2 block text-xs font-mono break-all select-all">{contactInfo.email}</span>
                  </div>
                  <button className={copyButtonClass} onClick={() => handleCopy(contactInfo.email, 'email')} aria-label="复制邮箱">
                    {copiedText === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className={`p-4 min-w-0 ${smallCardShape} ${itemClass}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 text-left">
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${accentText}`}>
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>微信</span>
                    </div>
                    <span className="mt-2 block text-xs font-mono break-all select-all">{contactInfo.wechat}</span>
                  </div>
                  <button className={copyButtonClass} onClick={() => handleCopy(contactInfo.wechat, 'wechat')} aria-label="复制微信 ID">
                    {copiedText === 'wechat' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 min-w-0 block transition ${smallCardShape} ${itemClass}`}
              >
                <div className="text-left">
                  <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${accentText}`}>
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </div>
                  <span className="mt-2 block text-xs font-mono break-all">{contactInfo.githubLabel} →</span>
                </div>
              </a>
            </div>

            <div className={`p-4 flex items-center gap-4 lg:flex-col lg:items-start ${smallCardShape} ${itemClass}`}>
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="w-32 h-32 lg:w-full lg:h-auto lg:aspect-square bg-white p-2 shrink-0 border border-zinc-200 cursor-pointer"
                aria-label="放大微信二维码"
              >
                <QrCodeSvg className="w-full h-full text-zinc-900" />
              </button>
              <div className="text-left">
                <div className={`text-[10px] font-bold uppercase ${accentText}`}>微信二维码</div>
                <p className={isDark ? 'text-xs text-zinc-500 mt-1' : 'text-xs text-zinc-600 mt-1'}>直接扫码，或点击放大。</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] gap-3 ${
          isDark ? 'text-zinc-500' : 'text-zinc-500'
        }`}>
          <button
            id="btn-footer-scroll-back"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 hover:opacity-80 transition cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>回到首屏</span>
          </button>
          <span>© 2026 侯瑛琪Turbo</span>
        </div>
      </div>

      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
              onClick={() => setShowQrModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative z-10 w-full max-w-sm bg-[#0e1017] border border-cyan-500/20 rounded-2xl p-6 text-center space-y-5 shadow-[0_0_80px_rgba(34,211,238,0.15)]"
            >
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <div className="flex items-center gap-2 text-violet-400">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase">WECHAT</span>
                </div>
                <button
                  onClick={() => setShowQrModal(false)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                  title="关闭"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mx-auto bg-white rounded-2xl p-4 w-56 h-56">
                <QrCodeSvg className="w-full h-full text-zinc-900" />
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
                  {copiedText === 'wechat' ? '已复制' : '复制 ID'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#0a0b10]/95 backdrop-blur-md border border-cyan-500/30 text-white rounded-xl p-4 shadow-[0_10px_30px_rgba(6,182,212,0.15)] flex items-start space-x-3.5"
          >
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg shrink-0">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0 text-left font-sans">
              <span className="text-[10px] font-mono text-cyan-400 block tracking-wider uppercase font-bold">提示</span>
              <p className="text-zinc-300 text-xs leading-relaxed mt-0.5">{toastMessage}</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-zinc-500 hover:text-white p-0.5 cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
