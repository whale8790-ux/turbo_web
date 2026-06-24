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

export interface EditorialFooterProps {
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

const MONO = 'font-mono uppercase tracking-[0.22em] text-[10px]';

function Dash({ tone }: { tone: string }) {
  return <span className={`mx-2 ${tone}`}>—</span>;
}

function HeaderRow({ isDark }: { isDark: boolean }) {
  const headline = isDark ? 'text-stone-100' : 'text-stone-900';
  const italicTone = isDark ? 'text-stone-300' : 'text-stone-600';
  const subtitle = isDark ? 'text-stone-400' : 'text-stone-600';
  const badgeBorder = isDark ? 'border-stone-700 text-stone-200' : 'border-stone-400 text-stone-700';
  const dashTone = isDark ? 'text-stone-500' : 'text-stone-400';
  return (
    <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto">
      <h2 className={`text-4xl sm:text-5xl font-serif leading-[1.05] tracking-normal ${headline}`}>
        联系<span className={`italic font-normal ${italicTone}`}>我</span>
      </h2>
      <span
        className={`inline-flex items-center gap-3 px-4 py-2 border shrink-0 ${badgeBorder}`}
      >
        <span className="relative flex w-2 h-2" aria-hidden>
          <span className="absolute inset-0 bg-emerald-500 animate-ping rounded-full" />
          <span className="relative w-2 h-2 bg-emerald-500 rounded-full" />
        </span>
        <span className={MONO}>
          OPEN TO WORK
          <Dash tone={dashTone} />
          开放合作
        </span>
      </span>
    </div>
  );
}

function MetaRow({ onScrollTop, isDark }: { onScrollTop: () => void; isDark: boolean }) {
  const border = isDark ? 'border-stone-800' : 'border-stone-200';
  const text = isDark ? 'text-stone-400' : 'text-stone-500';
  const hover = isDark ? 'hover:text-stone-100' : 'hover:text-stone-900';
  const dashTone = isDark ? 'text-stone-500' : 'text-stone-400';
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t ${border} ${MONO} ${text}`}
    >
      <button
        onClick={onScrollTop}
        className={`flex items-center gap-2 transition-colors cursor-pointer ${hover}`}
      >
        <ArrowUp className="w-3 h-3" />
        <span>
          BACK TO TOP
          <Dash tone={dashTone} />
          回到首屏
        </span>
      </button>
      <span>© 2026 LIU HAORAN · TURBO</span>
    </div>
  );
}

interface MainGridProps {
  contactInfo: EditorialFooterProps['contactInfo'];
  copiedText: EditorialFooterProps['copiedText'];
  downloadProgress: EditorialFooterProps['downloadProgress'];
  downloadSuccess: EditorialFooterProps['downloadSuccess'];
  isDownloading: boolean;
  onCopy: EditorialFooterProps['onCopy'];
  onDownload: EditorialFooterProps['onDownload'];
  onOpenQr: EditorialFooterProps['onOpenQr'];
  QrCodeSvg: EditorialFooterProps['QrCodeSvg'];
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
  const headlineColor = isDark ? 'text-stone-100' : 'text-stone-900';
  const accent = isDark ? 'text-stone-300' : 'text-stone-700';
  const dashTone = isDark ? 'text-stone-500' : 'text-stone-400';
  const downloadBtn = isDark
    ? 'bg-stone-100 text-stone-950 hover:bg-white border-stone-100'
    : 'bg-stone-900 text-white hover:bg-stone-800 border-stone-900';
  const ghostBtn = isDark
    ? 'border-stone-600 text-stone-200 hover:bg-stone-100 hover:text-stone-900 hover:border-stone-100'
    : 'border-stone-400 text-stone-800 hover:bg-stone-900 hover:text-white hover:border-stone-900';
  const rule = isDark ? 'bg-stone-700' : 'bg-stone-300';
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 items-stretch">
      <div className="flex flex-col items-center text-center space-y-6 max-w-md mx-auto lg:mx-0 lg:items-center lg:text-center">
        <p className={`text-2xl sm:text-3xl font-serif leading-tight ${headlineColor}`}>
          完整简历随时可取，
          <br />
          <span className={`italic ${accent}`}>欢迎直接联系。</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-auto w-full justify-center">
          <button
            id="btn-download-cv"
            onClick={onDownload}
            disabled={isDownloading}
            className={`relative overflow-hidden flex-1 px-6 py-4 border font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-90 disabled:cursor-wait cursor-pointer ${downloadBtn}`}
          >
            {isDownloading && (
              <span
                className="absolute inset-y-0 left-0 bg-stone-500/30 transition-[width] duration-150"
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
                  <span className={MONO}>下载简历 PDF</span>
                </>
              )}
            </span>
          </button>
          <a
            href={`mailto:${contactInfo.email}`}
            className={`flex-1 px-6 py-4 border font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer ${ghostBtn}`}
          >
            <Mail className="w-4 h-4" />
            <span className={MONO}>EMAIL ME</span>
          </a>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center">
        <div className={`w-px h-40 ${rule}`} aria-hidden />
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
  contactInfo: EditorialFooterProps['contactInfo'];
  copiedText: EditorialFooterProps['copiedText'];
  onCopy: EditorialFooterProps['onCopy'];
  onOpenQr: EditorialFooterProps['onOpenQr'];
  QrCodeSvg: EditorialFooterProps['QrCodeSvg'];
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
    ? 'bg-[#292524] border-stone-800'
    : 'bg-white border-stone-200';
  const divider = isDark ? 'divide-stone-800' : 'divide-stone-200';
  const linkText = isDark
    ? 'text-stone-100 hover:text-stone-300'
    : 'text-stone-900 hover:text-stone-600';
  const iconBtn = isDark
    ? 'border-stone-700 text-stone-400 hover:text-stone-100 hover:border-stone-300'
    : 'border-stone-300 text-stone-500 hover:text-stone-900 hover:border-stone-900';
  const labelTone = isDark ? 'text-stone-400' : 'text-stone-500';
  const clockColor = isDark ? 'text-stone-500' : 'text-stone-400';
  const dashTone = isDark ? 'text-stone-500' : 'text-stone-400';
  return (
    <div className={`relative border p-6 space-y-5 ${panelClass}`}>
      <div className="flex items-center justify-between">
        <span className={`${MONO} ${labelTone}`}>
          DIRECT CHANNELS
          <Dash tone={dashTone} />
          直接渠道
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
            className={`p-2 border transition-colors cursor-pointer ${iconBtn}`}
            title="复制邮箱"
          >
            {copiedText === 'email' ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
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
              className={`w-8 h-8 p-0.5 shrink-0 ${
                isDark ? 'bg-stone-100' : 'bg-stone-900'
              }`}
            >
              <QrCodeSvg className="w-full h-full text-black" />
            </span>
            <span className="truncate">{contactInfo.wechat}</span>
          </button>
          <button
            onClick={() => onCopy(contactInfo.wechat, 'wechat')}
            className={`p-2 border transition-colors cursor-pointer ${iconBtn}`}
            title="复制微信号"
          >
            {copiedText === 'wechat' ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
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
            className={`p-2 border transition-colors cursor-pointer ${iconBtn}`}
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
  QrCodeSvg: EditorialFooterProps['QrCodeSvg'];
  isDark: boolean;
}

function QrModal({ show, wechat, copied, onClose, onCopy, QrCodeSvg, isDark }: QrModalProps) {
  const modalBg = isDark
    ? 'bg-[#1c1917] border-stone-700'
    : 'bg-[#faf8f4] border-stone-300';
  const headBorder = isDark ? 'border-stone-700' : 'border-stone-300';
  const headText = isDark ? 'text-stone-100' : 'text-stone-900';
  const closeBtn = isDark
    ? 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'
    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100';
  const idCard = isDark
    ? 'bg-[#292524] border-stone-700'
    : 'bg-white border-stone-200';
  const idText = isDark ? 'text-stone-100' : 'text-stone-900';
  const labelTone = isDark ? 'text-stone-400' : 'text-stone-500';
  const copyBtn = copied
    ? 'border-emerald-500 text-emerald-500'
    : isDark
      ? 'border-stone-600 text-stone-200 hover:bg-stone-100 hover:text-stone-900 hover:border-stone-100'
      : 'border-stone-400 text-stone-800 hover:bg-stone-900 hover:text-white hover:border-stone-900';
  const dashTone = isDark ? 'text-stone-500' : 'text-stone-400';
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 backdrop-blur-md cursor-pointer ${
              isDark ? 'bg-black/70' : 'bg-stone-900/30'
            }`}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className={`relative z-10 w-full max-w-sm border p-6 text-center space-y-5 ${modalBg}`}
          >
            <div className={`flex items-center justify-between border-b pb-3 ${headBorder}`}>
              <div className={`flex items-center gap-2 ${headText}`}>
                <MessageSquare className="w-4 h-4" />
                <span className={MONO}>
                  WECHAT
                  <Dash tone={dashTone} />
                  微信
                </span>
              </div>
              <button
                onClick={onClose}
                className={`p-1.5 transition-colors cursor-pointer ${closeBtn}`}
                title="关闭"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mx-auto bg-white p-4 w-56 h-56 border border-stone-200">
              <QrCodeSvg className="w-full h-full text-black" />
            </div>
            <div className={`p-3 border flex items-center justify-between text-left ${idCard}`}>
              <div>
                <span className={`${MONO} ${labelTone} block`}>WECHAT ID</span>
                <span className={`text-xs font-mono select-all ${idText}`}>{wechat}</span>
              </div>
              <button
                onClick={onCopy}
                className={`px-3 py-1.5 ${MONO} flex items-center gap-1 cursor-pointer transition-colors border ${copyBtn}`}
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
    ? 'bg-[#292524] border-stone-700 text-stone-100'
    : 'bg-[#faf8f4] border-stone-300 text-stone-900';
  const body = isDark ? 'text-stone-300' : 'text-stone-600';
  const closeBtn = isDark
    ? 'text-stone-500 hover:text-stone-100'
    : 'text-stone-400 hover:text-stone-900';
  const labelTone = isDark ? 'text-stone-400' : 'text-stone-500';
  const dashTone = isDark ? 'text-stone-500' : 'text-stone-400';
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.96 }}
          className={`fixed bottom-6 right-6 z-50 max-w-sm w-full border p-4 flex items-start gap-3 relative ${toastBg}`}
        >
          <span
            className={`absolute top-0 left-0 w-1 h-full ${isDark ? 'bg-stone-200' : 'bg-stone-900'}`}
            aria-hidden
          />
          <div className={`p-2 shrink-0 ${isDark ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-700'}`}>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0 text-left font-sans">
            <span className={`${MONO} ${labelTone} block`}>
              NOTICE
              <Dash tone={dashTone} />
              提示
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

export default function EditorialFooter({
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
}: EditorialFooterProps) {
  const isDownloading = downloadProgress !== null && !downloadSuccess;

  const rootClass = isDark
    ? 'bg-[#1c1917] text-stone-100 border-t border-stone-800'
    : 'bg-[#faf8f4] text-stone-900 border-t border-stone-200';
  const divider = isDark ? 'border-stone-800' : 'border-stone-200';

  return (
    <footer
      id="continue-hear"
      className={`relative transition-colors duration-300 ${rootClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 space-y-12">
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
