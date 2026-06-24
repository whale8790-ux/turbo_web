/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

export interface CyberFooterProps {
  contactInfo: { email: string; github: string; githubLabel: string; wechat: string };
  copiedText: 'email' | 'wechat' | null;
  downloadProgress: number | null;
  downloadSuccess: boolean;
  showQrModal: boolean;
  toastMessage: string | null;
  onCopy: (text: string, type: 'email' | 'wechat') => void;
  onDownload: () => void;
  onOpenQr: () => void;
  onCloseQr: () => void;
  onDismissToast: () => void;
  onScrollTop: () => void;
  QrCodeSvg: (props: { className?: string }) => React.ReactElement;
  isDark: boolean;
}

const MONO = 'font-mono uppercase tracking-[0.18em] text-[10px] font-semibold';

function Pipe({ tone }: { tone: string }) {
  return <span className={`mx-2 ${tone}`}>::</span>;
}

function HeaderRow({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
      <div className="space-y-3 max-w-2xl">
        <h2
          className={`text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] ${
            isDark ? 'text-white' : 'text-zinc-900'
          }`}
        >
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${
              isDark
                ? 'from-cyan-300 via-cyan-100 to-violet-300'
                : 'from-cyan-600 via-zinc-900 to-violet-600'
            }`}
          >
            联系我
          </span>
        </h2>
        <p className={`${MONO} text-zinc-500`}>
          RESUME
          <Pipe tone="text-cyan-500" />
          GET IN TOUCH
        </p>
      </div>
      <span
        className={`inline-flex self-start lg:self-end items-center gap-3 px-4 py-2 rounded-full border shrink-0 ${
          isDark
            ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-200'
            : 'border-emerald-500/40 bg-emerald-50 text-emerald-700'
        }`}
      >
        <span className="relative flex w-2 h-2" aria-hidden>
          <span className="absolute inset-0 bg-emerald-400 animate-ping rounded-full" />
          <span className="relative w-2 h-2 bg-emerald-400 rounded-full" />
        </span>
        <span className={MONO}>
          OPEN TO WORK
          <Pipe tone={isDark ? 'text-emerald-400' : 'text-emerald-500'} />
          开放合作
        </span>
      </span>
    </div>
  );
}

function MetaRow({ onScrollTop, isDark }: { onScrollTop: () => void; isDark: boolean }) {
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t ${MONO} ${
        isDark ? 'border-cyan-500/10 text-zinc-500' : 'border-zinc-200 text-zinc-500'
      }`}
    >
      <button
        onClick={onScrollTop}
        className={`flex items-center gap-2 transition-colors cursor-pointer ${
          isDark ? 'hover:text-cyan-300' : 'hover:text-cyan-600'
        }`}
      >
        <ArrowUp className="w-3 h-3" />
        <span>
          BACK TO TOP
          <Pipe tone={isDark ? 'text-cyan-400' : 'text-cyan-500'} />
          回到首屏
        </span>
      </button>
      <span>(c) 2026 LIU HAORAN / TURBO</span>
    </div>
  );
}

interface MainGridProps {
  contactInfo: CyberFooterProps['contactInfo'];
  copiedText: CyberFooterProps['copiedText'];
  downloadProgress: CyberFooterProps['downloadProgress'];
  downloadSuccess: CyberFooterProps['downloadSuccess'];
  isDownloading: boolean;
  onCopy: CyberFooterProps['onCopy'];
  onDownload: CyberFooterProps['onDownload'];
  onOpenQr: CyberFooterProps['onOpenQr'];
  QrCodeSvg: CyberFooterProps['QrCodeSvg'];
  isDark: boolean;
}

function MainGrid({
  contactInfo,
  copiedText,
  downloadProgress,
  downloadSuccess,
  isDownloading,
  onCopy,
  onDownload,
  onOpenQr,
  QrCodeSvg,
  isDark,
}: MainGridProps) {
  const headlineColor = isDark ? 'text-white' : 'text-zinc-900';
  const accent = isDark ? 'text-cyan-300' : 'text-cyan-600';
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-stretch">
      <div className="flex flex-col space-y-6">
        <p className={`text-2xl sm:text-3xl font-bold leading-tight ${headlineColor}`}>
          完整简历随时可取，
          <br />
          <span className={accent}>欢迎直接联系</span>
          <span className={`animate-pulse ${isDark ? 'text-violet-400' : 'text-violet-500'}`}>_</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          <button
            id="btn-download-cv"
            onClick={onDownload}
            disabled={isDownloading}
            className={`relative overflow-hidden flex-1 px-6 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-90 disabled:cursor-wait disabled:hover:translate-y-0 cursor-pointer text-white bg-gradient-to-r ${
              isDark
                ? 'from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-[0_0_30px_rgba(34,211,238,0.25)]'
                : 'from-cyan-500 via-blue-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 shadow-[0_8px_24px_rgba(34,211,238,0.25)]'
            }`}
          >
            {isDownloading && (
              <span
                className="absolute inset-y-0 left-0 bg-white/20 transition-[width] duration-150"
                style={{ width: `${downloadProgress ?? 0}%` }}
                aria-hidden
              />
            )}
            <span className="relative flex items-center gap-2">
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className={MONO}>DOWNLOADED</span>
                </>
              ) : isDownloading ? (
                <>
                  <Download className="w-4 h-4 animate-pulse" />
                  <span className={MONO}>{downloadProgress}%</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className={MONO}>DOWNLOAD CV</span>
                </>
              )}
            </span>
          </button>
          <a
            href={`mailto:${contactInfo.email}`}
            className={`flex-1 px-6 py-4 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
              isDark
                ? 'border-cyan-500/30 text-cyan-200 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/60'
                : 'border-cyan-500/40 text-cyan-700 bg-cyan-50/60 hover:bg-cyan-100 hover:border-cyan-500'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span className={MONO}>EMAIL ME</span>
          </a>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center">
        <div
          className={`relative w-px h-40 ${
            isDark
              ? 'bg-gradient-to-b from-transparent via-cyan-500/60 to-transparent'
              : 'bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent'
          }`}
        >
          <span
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${
              isDark
                ? 'bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.6)]'
                : 'bg-cyan-500 shadow-[0_0_18px_rgba(6,182,212,0.4)]'
            }`}
            aria-hidden
          />
        </div>
      </div>
      <ChannelsPanel
        contactInfo={contactInfo}
        copiedText={copiedText}
        onCopy={onCopy}
        onOpenQr={onOpenQr}
        QrCodeSvg={QrCodeSvg}
        isDark={isDark}
      />
    </div>
  );
}

interface ChannelsPanelProps {
  contactInfo: CyberFooterProps['contactInfo'];
  copiedText: CyberFooterProps['copiedText'];
  onCopy: CyberFooterProps['onCopy'];
  onOpenQr: CyberFooterProps['onOpenQr'];
  QrCodeSvg: CyberFooterProps['QrCodeSvg'];
  isDark: boolean;
}

function ChannelsPanel({
  contactInfo,
  copiedText,
  onCopy,
  onOpenQr,
  QrCodeSvg,
  isDark,
}: ChannelsPanelProps) {
  const panelClass = isDark
    ? 'bg-[#12131a] border-zinc-800/85'
    : 'bg-white border-zinc-200';
  const divider = isDark ? 'divide-zinc-800/70' : 'divide-zinc-200';
  const linkText = isDark
    ? 'text-zinc-200 hover:text-cyan-300'
    : 'text-zinc-900 hover:text-cyan-600';
  const iconBtn = isDark
    ? 'border-zinc-800 text-zinc-400 hover:text-cyan-200 hover:border-cyan-400/60 hover:bg-cyan-500/5'
    : 'border-zinc-200 text-zinc-500 hover:text-cyan-700 hover:border-cyan-500 hover:bg-cyan-50';
  const clockColor = isDark ? 'text-cyan-400/60' : 'text-cyan-500/70';
  const labelTone = isDark ? 'text-cyan-300/80' : 'text-cyan-700/80';
  return (
    <div className={`relative rounded-3xl border p-6 space-y-5 overflow-hidden ${panelClass}`}>
      <div className="flex items-center justify-between">
        <span className={`${MONO} flex items-center gap-2 ${labelTone}`}>
          <Sparkles className="w-3 h-3" />
          <span>
            DIRECT CHANNELS
            <Pipe tone={isDark ? 'text-violet-400' : 'text-violet-500'} />
            直接渠道
          </span>
        </span>
        <Clock className={`w-3.5 h-3.5 ${clockColor}`} />
      </div>
      <ul className={`divide-y ${divider}`}>
        <li className="py-3 flex items-center gap-4">
          <span className={`${MONO} ${labelTone} w-20 shrink-0`}>EMAIL</span>
          <a
            href={`mailto:${contactInfo.email}`}
            className={`flex-1 min-w-0 truncate font-mono text-sm transition-colors ${linkText}`}
          >
            {contactInfo.email}
          </a>
          <button
            onClick={() => onCopy(contactInfo.email, 'email')}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${iconBtn}`}
            title="复制邮箱"
          >
            {copiedText === 'email' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </li>
        <li className="py-3 flex items-center gap-4">
          <span className={`${MONO} ${labelTone} w-20 shrink-0`}>WECHAT</span>
          <button
            onClick={onOpenQr}
            className={`flex-1 min-w-0 flex items-center gap-3 text-left font-mono text-sm transition-colors cursor-pointer ${linkText}`}
          >
            <span
              className={`w-8 h-8 p-0.5 rounded-md shrink-0 ${
                isDark
                  ? 'bg-white shadow-[0_0_12px_rgba(34,211,238,0.35)]'
                  : 'bg-zinc-900 shadow-[0_4px_12px_rgba(6,182,212,0.2)]'
              }`}
            >
              <QrCodeSvg className="w-full h-full text-black" />
            </span>
            <span className="truncate">{contactInfo.wechat}</span>
          </button>
          <button
            onClick={() => onCopy(contactInfo.wechat, 'wechat')}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${iconBtn}`}
            title="复制微信号"
          >
            {copiedText === 'wechat' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </li>
        <li className="py-3 flex items-center gap-4">
          <span className={`${MONO} ${labelTone} w-20 shrink-0`}>GITHUB</span>
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 min-w-0 truncate font-mono text-sm transition-colors flex items-center gap-2 ${linkText}`}
          >
            <Github className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{contactInfo.githubLabel}</span>
          </a>
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${iconBtn}`}
            title="打开 GitHub"
          >
            <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
          </a>
        </li>
      </ul>
    </div>
  );
}

interface QrModalProps {
  show: boolean;
  wechat: string;
  copied: boolean;
  onClose: () => void;
  onCopy: () => void;
  QrCodeSvg: CyberFooterProps['QrCodeSvg'];
  isDark: boolean;
}

function QrModal({ show, wechat, copied, onClose, onCopy, QrCodeSvg, isDark }: QrModalProps) {
  const modalBg = isDark
    ? 'bg-[#0e1017] border-cyan-500/25 shadow-[0_0_80px_rgba(34,211,238,0.25)]'
    : 'bg-white border-cyan-500/30 shadow-[0_30px_80px_rgba(6,182,212,0.18)]';
  const headBorder = isDark ? 'border-cyan-500/15' : 'border-cyan-500/20';
  const headText = isDark ? 'text-white' : 'text-zinc-900';
  const closeBtn = isDark
    ? 'text-zinc-500 hover:text-cyan-200 hover:bg-cyan-500/10'
    : 'text-zinc-500 hover:text-cyan-700 hover:bg-cyan-50';
  const idCard = isDark
    ? 'bg-[#0b0d14] border-cyan-500/15'
    : 'bg-zinc-50 border-cyan-500/20';
  const idText = isDark ? 'text-white' : 'text-zinc-900';
  const copyBtn = copied
    ? 'border-emerald-400 text-emerald-400'
    : isDark
      ? 'border-cyan-500/30 text-cyan-200 hover:bg-cyan-500/15 hover:border-cyan-400'
      : 'border-cyan-500/40 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-500';
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 backdrop-blur-md cursor-pointer ${
              isDark ? 'bg-black/80' : 'bg-zinc-900/40'
            }`}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className={`relative z-10 w-full max-w-sm rounded-2xl border p-6 text-center space-y-5 overflow-hidden ${modalBg}`}
          >
            <span
              className="absolute top-0 left-0 h-px w-24 bg-gradient-to-r from-cyan-400 to-transparent"
              aria-hidden
            />
            <span
              className="absolute bottom-0 right-0 h-px w-24 bg-gradient-to-l from-violet-400 to-transparent"
              aria-hidden
            />
            <div className={`flex items-center justify-between border-b pb-3 ${headBorder}`}>
              <div className={`flex items-center gap-2 ${headText}`}>
                <MessageSquare className={`w-4 h-4 ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`} />
                <span className={MONO}>
                  WECHAT
                  <Pipe tone={isDark ? 'text-violet-400' : 'text-violet-500'} />
                  微信
                </span>
              </div>
              <button
                onClick={onClose}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${closeBtn}`}
                title="关闭"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mx-auto bg-white p-4 w-56 h-56 rounded-xl">
              <QrCodeSvg className="w-full h-full text-black" />
            </div>
            <div className={`p-3 rounded-xl border flex items-center justify-between text-left ${idCard}`}>
              <div>
                <span className={`${MONO} ${isDark ? 'text-cyan-300/80' : 'text-cyan-700/80'} block`}>
                  WECHAT ID
                </span>
                <span className={`text-xs font-mono select-all ${idText}`}>{wechat}</span>
              </div>
              <button
                onClick={onCopy}
                className={`px-3 py-1.5 rounded-lg ${MONO} flex items-center gap-1 cursor-pointer transition-colors border ${copyBtn}`}
              >
                {copied ? '已复制' : '复制 ID'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Toast({
  message,
  onDismiss,
  isDark,
}: {
  message: string | null;
  onDismiss: () => void;
  isDark: boolean;
}) {
  const toastBg = isDark
    ? 'bg-[#0a0b10]/95 border-cyan-500/30 text-white shadow-[0_0_40px_rgba(34,211,238,0.18)]'
    : 'bg-white border-cyan-500/30 text-zinc-900 shadow-[0_12px_32px_rgba(6,182,212,0.18)]';
  const body = isDark ? 'text-zinc-300' : 'text-zinc-600';
  const closeBtn = isDark
    ? 'text-zinc-500 hover:text-cyan-200'
    : 'text-zinc-400 hover:text-cyan-700';
  const labelTone = isDark ? 'text-cyan-300' : 'text-cyan-600';
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.96 }}
          className={`fixed bottom-6 right-6 z-50 max-w-sm w-full rounded-xl border p-4 flex items-start gap-3 relative overflow-hidden ${toastBg}`}
        >
          <span
            className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 via-cyan-500 to-violet-500"
            aria-hidden
          />
          <div
            className={`p-2 rounded-lg shrink-0 ${
              isDark ? 'bg-cyan-500/15 text-cyan-300' : 'bg-cyan-50 text-cyan-600'
            }`}
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0 text-left font-sans">
            <span className={`${MONO} ${labelTone} block`}>
              提示
              <Pipe tone={isDark ? 'text-violet-400' : 'text-violet-500'} />
              NOTICE
            </span>
            <p className={`text-xs leading-relaxed mt-0.5 ${body}`}>{message}</p>
          </div>
          <button onClick={onDismiss} className={`p-0.5 cursor-pointer ${closeBtn}`}>
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function CyberFooter({
  contactInfo,
  copiedText,
  downloadProgress,
  downloadSuccess,
  showQrModal,
  toastMessage,
  onCopy,
  onDownload,
  onOpenQr,
  onCloseQr,
  onDismissToast,
  onScrollTop,
  QrCodeSvg,
  isDark,
}: CyberFooterProps) {
  const isDownloading = downloadProgress !== null && !downloadSuccess;

  const rootClass = isDark
    ? 'bg-[#0c0d14] text-white'
    : 'bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] text-zinc-900';
  const divider = isDark ? 'border-cyan-500/10' : 'border-cyan-500/15';
  const scanline = isDark
    ? 'bg-[linear-gradient(transparent_0_2px,rgba(34,211,238,0.05)_2px,rgba(34,211,238,0.05)_3px)] bg-[length:100%_3px]'
    : 'bg-[linear-gradient(transparent_0_2px,rgba(6,182,212,0.03)_2px,rgba(6,182,212,0.03)_3px)] bg-[length:100%_3px]';

  return (
    <footer
      id="continue-hear"
      className={`relative transition-colors duration-300 overflow-hidden ${rootClass}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDark ? 'opacity-30' : 'opacity-20'
        } ${scanline}`}
        aria-hidden
      />
      {isDark && (
        <>
          <div
            className="pointer-events-none absolute -top-32 -left-16 w-[420px] h-[420px] rounded-full blur-[120px] bg-cyan-500/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-40 -right-10 w-[420px] h-[420px] rounded-full blur-[120px] bg-violet-500/10"
            aria-hidden
          />
        </>
      )}
      <div
        className={`pointer-events-none absolute top-0 inset-x-0 h-px ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent'
            : 'bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent'
        }`}
        aria-hidden
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14 sm:py-20 space-y-10 sm:space-y-12">
        <HeaderRow isDark={isDark} />
        <div className={`border-t ${divider}`} />
        <MainGrid
          contactInfo={contactInfo}
          copiedText={copiedText}
          downloadProgress={downloadProgress}
          downloadSuccess={downloadSuccess}
          isDownloading={isDownloading}
          onCopy={onCopy}
          onDownload={onDownload}
          onOpenQr={onOpenQr}
          QrCodeSvg={QrCodeSvg}
          isDark={isDark}
        />
        <MetaRow onScrollTop={onScrollTop} isDark={isDark} />
      </div>
      <QrModal
        show={showQrModal}
        wechat={contactInfo.wechat}
        copied={copiedText === 'wechat'}
        onClose={onCloseQr}
        onCopy={() => onCopy(contactInfo.wechat, 'wechat')}
        QrCodeSvg={QrCodeSvg}
        isDark={isDark}
      />
      <Toast message={toastMessage} onDismiss={onDismissToast} isDark={isDark} />
    </footer>
  );
}
