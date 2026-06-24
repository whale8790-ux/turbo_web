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

export interface GeometricFooterProps {
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

const MONO = 'font-mono uppercase tracking-[0.2em] text-[10px]';
const Slash = () => <span className="text-red-500 mx-2">//</span>;

function HeaderRow({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:items-end justify-between">
      <div className="border-l-8 border-red-500 pl-4 text-left space-y-1 max-w-3xl">
        <h2 className="text-3xl font-black uppercase tracking-tighter">联系我</h2>
        <p className={`${MONO} text-zinc-500`}>
          RESUME<Slash />GET IN TOUCH
        </p>
      </div>
      <span
        className={`inline-flex self-start sm:self-end items-center gap-3 px-4 py-2 border shrink-0 ${
          isDark ? 'border-white/20' : 'border-zinc-400'
        }`}
      >
        <span className="relative flex w-2 h-2" aria-hidden>
          <span className="absolute inset-0 bg-emerald-400 animate-ping rounded-full" />
          <span className="relative w-2 h-2 bg-emerald-400 rounded-full" />
        </span>
        <span className={`${MONO} ${isDark ? 'text-white' : 'text-zinc-900'}`}>
          开放合作<Slash />OPEN TO WORK
        </span>
      </span>
    </div>
  );
}

function MetaRow({ onScrollTop, isDark }: { onScrollTop: () => void; isDark: boolean }) {
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center gap-3 pt-8 border-t ${
        isDark ? 'border-white/15' : 'border-zinc-300'
      } ${MONO} text-zinc-500`}
    >
      <button
        onClick={onScrollTop}
        className={`flex items-center gap-2 transition-colors cursor-pointer ${
          isDark ? 'hover:text-white' : 'hover:text-zinc-900'
        }`}
      >
        <ArrowUp className="w-3 h-3" />
        <span>回到首屏<Slash />BACK TO TOP</span>
      </button>
      <span>© 2026 刘昊然Turbo</span>
    </div>
  );
}

interface MainGridProps {
  contactInfo: GeometricFooterProps['contactInfo'];
  copiedText: GeometricFooterProps['copiedText'];
  downloadProgress: GeometricFooterProps['downloadProgress'];
  downloadSuccess: GeometricFooterProps['downloadSuccess'];
  isDownloading: boolean;
  onCopy: GeometricFooterProps['onCopy'];
  onDownload: GeometricFooterProps['onDownload'];
  onOpenQr: GeometricFooterProps['onOpenQr'];
  QrCodeSvg: GeometricFooterProps['QrCodeSvg'];
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 items-stretch">
      <div className="flex flex-col space-y-8">
        <p className="text-2xl sm:text-3xl font-bold leading-tight">
          完整简历随时可取，
          <br />
          <span className="text-red-500">欢迎直接联系</span>。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          <button
            id="btn-download-cv"
            onClick={onDownload}
            disabled={isDownloading}
            className={`relative overflow-hidden flex-1 px-6 py-4 font-bold text-sm flex items-center justify-center gap-2 transition-colors hover:bg-red-500 hover:text-white disabled:opacity-90 disabled:cursor-wait cursor-pointer ${
              isDark ? 'bg-white text-black' : 'bg-zinc-900 text-white'
            }`}
          >
            {isDownloading && (
              <span
                className="absolute inset-y-0 left-0 bg-red-500/30 transition-[width] duration-150"
                style={{ width: `${downloadProgress ?? 0}%` }}
                aria-hidden
              />
            )}
            <span className="relative flex items-center gap-2">
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="font-bold tracking-[0.1em] text-sm">已下载</span>
                </>
              ) : isDownloading ? (
                <>
                  <Download className="w-4 h-4 animate-pulse" />
                  <span className="font-bold tracking-[0.05em] text-sm tabular-nums">{downloadProgress}%</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className="font-bold tracking-[0.1em] text-sm">下载简历</span>
                </>
              )}
            </span>
          </button>
          <a
            href={`mailto:${contactInfo.email}`}
            className={`flex-1 px-6 py-4 border font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              isDark
                ? 'border-white/30 text-white hover:bg-white hover:text-black'
                : 'border-zinc-400 text-zinc-900 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span className="font-bold tracking-[0.1em] text-sm">邮件联系</span>
          </a>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center">
        <ArrowRight className="w-16 h-16 text-red-500" strokeWidth={1.5} />
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
  contactInfo: GeometricFooterProps['contactInfo'];
  copiedText: GeometricFooterProps['copiedText'];
  onCopy: GeometricFooterProps['onCopy'];
  onOpenQr: GeometricFooterProps['onOpenQr'];
  QrCodeSvg: GeometricFooterProps['QrCodeSvg'];
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
  const panelBg = isDark ? 'bg-[#111111] border-white/10' : 'bg-white border-zinc-300';
  const divider = isDark ? 'border-white/10' : 'border-zinc-200';
  const linkText = isDark
    ? 'text-white hover:text-red-500'
    : 'text-zinc-900 hover:text-red-500';
  const iconBtn = isDark
    ? 'border-white/15 text-zinc-400 hover:text-white hover:border-red-500'
    : 'border-zinc-300 text-zinc-500 hover:text-zinc-900 hover:border-red-500';
  const clockColor = isDark ? 'text-zinc-600' : 'text-zinc-400';
  const subtleLink = isDark
    ? 'text-zinc-500 hover:text-zinc-200'
    : 'text-zinc-400 hover:text-zinc-700';
  const qrFrame = isDark ? 'border-white/15 bg-white' : 'border-zinc-300 bg-white';
  const labelText = isDark ? 'text-zinc-500' : 'text-zinc-500';
  return (
    <div className={`relative border p-6 space-y-6 ${panelBg}`}>
      <span className="absolute top-0 right-0 w-3 h-3 bg-red-500" aria-hidden />
      <div className="flex items-center justify-between">
        <span className={`${MONO} text-zinc-500`}>
          DIRECT CHANNELS<Slash />直接渠道
        </span>
        <Clock className={`w-3.5 h-3.5 ${clockColor}`} />
      </div>

      {/* Primary: WeChat - 二维码 + 微信号 */}
      <div className="flex gap-5 items-stretch">
        <button
          onClick={onOpenQr}
          className={`shrink-0 w-32 h-32 p-1.5 border transition-colors cursor-pointer ${qrFrame} hover:border-red-500`}
          aria-label="放大微信二维码"
          title="点击放大二维码"
        >
          <QrCodeSvg className="w-full h-full text-black" />
        </button>
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div className="space-y-1">
            <span className={`${MONO} ${labelText}`}>WECHAT<Slash />微信</span>
            <div className={`font-mono text-base sm:text-lg font-bold truncate ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              {contactInfo.wechat}
            </div>
            <span className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
              点击二维码或复制微信号
            </span>
          </div>
          <button
            onClick={() => onCopy(contactInfo.wechat, 'wechat')}
            className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 border text-xs font-bold transition-colors cursor-pointer w-fit ${iconBtn}`}
          >
            {copiedText === 'wechat' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>复制微信号</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Secondary: Email */}
      <div className={`border-t pt-4 flex items-center gap-3 ${divider}`}>
        <span className={`${MONO} ${labelText} w-16 shrink-0`}>EMAIL</span>
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
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Tertiary: GitHub - 弱化 */}
      <div className={`border-t pt-3 ${divider}`}>
        <a
          href={contactInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 text-[11px] font-mono transition-colors ${subtleLink}`}
        >
          <Github className="w-3 h-3" />
          <span>{contactInfo.githubLabel}</span>
          <ArrowRight className="w-3 h-3 -rotate-45" />
        </a>
      </div>
    </div>
  );
}

interface QrModalProps {
  show: boolean;
  wechat: string;
  copied: boolean;
  onClose: () => void;
  onCopy: () => void;
  QrCodeSvg: GeometricFooterProps['QrCodeSvg'];
  isDark: boolean;
}

function QrModal({ show, wechat, copied, onClose, onCopy, QrCodeSvg, isDark }: QrModalProps) {
  const modalBg = isDark ? 'bg-[#0a0a0a] border-white/20' : 'bg-white border-zinc-300';
  const headBorder = isDark ? 'border-white/15' : 'border-zinc-200';
  const headText = isDark ? 'text-white' : 'text-zinc-900';
  const closeBtn = isDark
    ? 'text-zinc-500 hover:text-white hover:bg-white/10'
    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100';
  const idCard = isDark ? 'bg-[#111111] border-white/10' : 'bg-zinc-100 border-zinc-200';
  const idText = isDark ? 'text-white' : 'text-zinc-900';
  const copyBtn = copied
    ? 'border-emerald-400 text-emerald-400'
    : isDark
      ? 'border-white/20 text-white hover:bg-red-500 hover:border-red-500'
      : 'border-zinc-400 text-zinc-900 hover:bg-red-500 hover:text-white hover:border-red-500';
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 backdrop-blur-md cursor-pointer ${
              isDark ? 'bg-black/85' : 'bg-zinc-900/40'
            }`}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className={`relative z-10 w-full max-w-lg border p-8 text-center space-y-6 ${modalBg}`}
          >
            <span className="absolute top-0 left-0 h-1 w-16 bg-red-500" aria-hidden />
            <div className={`flex items-center justify-between border-b pb-3 ${headBorder}`}>
              <div className={`flex items-center gap-2 ${headText}`}>
                <MessageSquare className="w-4 h-4 text-red-500" />
                <span className={`${MONO}`}>WECHAT<Slash />微信</span>
              </div>
              <button
                onClick={onClose}
                className={`p-1.5 transition-colors cursor-pointer ${closeBtn}`}
                title="关闭"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mx-auto bg-white p-2 w-full max-w-md aspect-square">
              <QrCodeSvg className="w-full h-full text-black" />
            </div>
            <div className={`p-3 border flex items-center justify-between text-left ${idCard}`}>
              <div>
                <span className={`${MONO} text-zinc-500 block`}>WECHAT ID</span>
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
    ? 'bg-[#111111] border-white/15 text-white'
    : 'bg-white border-zinc-300 text-zinc-900';
  const body = isDark ? 'text-zinc-300' : 'text-zinc-600';
  const closeBtn = isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-zinc-900';
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.96 }}
          className={`fixed bottom-6 right-6 z-50 max-w-sm w-full border p-4 flex items-start gap-3 relative ${toastBg}`}
        >
          <span className="absolute top-0 left-0 w-1 h-full bg-red-500" aria-hidden />
          <div className="p-2 bg-red-500/10 text-red-500 shrink-0">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0 text-left font-sans">
            <span className={`${MONO} text-red-500 block`}>提示<Slash />NOTICE</span>
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

export default function GeometricFooter({
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
}: GeometricFooterProps) {
  const isDownloading = downloadProgress !== null && !downloadSuccess;

  const rootClass = isDark
    ? 'bg-[#0a0a0a] text-white'
    : 'bg-[#f4f4f5] text-zinc-900';
  const divider = isDark ? 'border-white/15' : 'border-zinc-300';

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
