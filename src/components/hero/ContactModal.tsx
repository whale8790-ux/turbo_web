/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Mail, MessageSquare, X } from 'lucide-react';

const MONO = 'font-mono uppercase tracking-[0.2em] text-[10px]';
const Slash = () => <span className="text-red-500 mx-2">//</span>;

interface ContactModalProps {
  show: boolean;
  onClose: () => void;
  wechat: string;
  email: string;
  isDark?: boolean;
}

export default function ContactModal({
  show,
  onClose,
  wechat,
  email,
  isDark = true,
}: ContactModalProps) {
  const [copied, setCopied] = useState<'wechat' | 'email' | null>(null);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current !== null) clearTimeout(copiedTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!show) {
      setCopied(null);
      if (copiedTimerRef.current !== null) {
        clearTimeout(copiedTimerRef.current);
        copiedTimerRef.current = null;
      }
    }
  }, [show]);

  const handleCopy = async (text: string, key: 'wechat' | 'email') => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 静默失败，按钮仍然给反馈
    }
    setCopied(key);
    if (copiedTimerRef.current !== null) clearTimeout(copiedTimerRef.current);
    copiedTimerRef.current = setTimeout(() => {
      setCopied(null);
      copiedTimerRef.current = null;
    }, 1800);
  };

  const modalBg = isDark ? 'bg-[#0a0a0a] border-white/20' : 'bg-white border-zinc-300';
  const headBorder = isDark ? 'border-white/15' : 'border-zinc-200';
  const headText = isDark ? 'text-white' : 'text-zinc-900';
  const closeBtn = isDark
    ? 'text-zinc-500 hover:text-white hover:bg-white/10'
    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100';
  const idCard = isDark ? 'bg-[#111111] border-white/10' : 'bg-zinc-100 border-zinc-200';
  const idText = isDark ? 'text-white' : 'text-zinc-900';
  const labelText = 'text-zinc-500';
  const copyChip = (active: boolean) =>
    active
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
            initial={{ opacity: 0, scale: 0.76, y: 10 }}
            animate={{ opacity: 1, scale: 0.8, y: 0 }}
            exit={{ opacity: 0, scale: 0.76, y: 10 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className={`relative z-10 w-full max-w-lg border p-8 text-center space-y-6 ${modalBg}`}
          >
            <span className="absolute top-0 left-0 h-1 w-16 bg-red-500" aria-hidden />
            <div className={`flex items-center justify-between border-b pb-3 ${headBorder}`}>
              <div className={`flex items-center gap-2 ${headText}`}>
                <MessageSquare className="w-4 h-4 text-red-500" />
                <span className={`${MONO}`}>CONTACT<Slash />立即联系</span>
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
              <img
                src="/wechat-qr.jpg"
                alt="微信二维码 - 添加好友"
                aria-label="微信二维码"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain bg-white"
              />
            </div>
            <div className={`p-3 border flex items-center justify-between text-left ${idCard}`}>
              <div className="min-w-0">
                <span className={`${MONO} ${labelText} block`}>WECHAT ID</span>
                <span className={`text-base font-mono font-semibold select-all break-all ${idText}`}>{wechat}</span>
              </div>
              <button
                onClick={() => handleCopy(wechat, 'wechat')}
                className={`shrink-0 px-3 py-1.5 ${MONO} inline-flex items-center gap-1 cursor-pointer transition-colors border ${copyChip(copied === 'wechat')}`}
              >
                {copied === 'wechat' ? (
                  <>
                    <Check className="w-3 h-3" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    复制 ID
                  </>
                )}
              </button>
            </div>
            <div className={`p-3 border flex items-center justify-between text-left ${idCard}`}>
              <div className="min-w-0 flex-1">
                <span className={`${MONO} ${labelText} block`}>EMAIL</span>
                <a
                  href={`mailto:${email}`}
                  className={`text-base font-mono font-semibold select-all break-all transition-colors ${idText} hover:text-red-500`}
                >
                  {email}
                </a>
              </div>
              <button
                onClick={() => handleCopy(email, 'email')}
                className={`shrink-0 px-3 py-1.5 ${MONO} inline-flex items-center gap-1 cursor-pointer transition-colors border ${copyChip(copied === 'email')}`}
              >
                {copied === 'email' ? (
                  <>
                    <Check className="w-3 h-3" />
                    已复制
                  </>
                ) : (
                  <>
                    <Mail className="w-3 h-3" />
                    复制邮箱
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
