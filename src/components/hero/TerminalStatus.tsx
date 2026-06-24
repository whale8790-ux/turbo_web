/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';

interface TerminalStatusProps {
  isDark?: boolean;
}

type Row = {
  label: string;
  value: string;
  dot?: 'green' | 'red' | 'amber';
  emphasize?: boolean;
};

const ROWS: Row[] = [
  { label: 'STATUS', value: '找寻机会', dot: 'green', emphasize: true },
  { label: 'ROLE', value: 'AI 产品经理 · 独立开发者' },
  { label: 'BASE', value: '北京 · GMT+8' },
  { label: 'FOCUS', value: 'AI Agent · 社交' },
  { label: 'SHIPPING', value: 'AI 额度监控工具', dot: 'amber' },
];

const CHAR_MS = 70;
const ROW_GAP_MS = 160;
const KICKOFF_MS = 250;

const MONO_FONT_STACK =
  '"SF Mono", "JetBrains Mono", Menlo, Monaco, ui-monospace, monospace';
const CN_FONT_STACK =
  'system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif';

function buildSchedule(rows: Row[]) {
  let acc = KICKOFF_MS;
  return rows.map((row) => {
    const len = [...row.value].length;
    const start = acc;
    const end = acc + len * CHAR_MS;
    acc = end + ROW_GAP_MS;
    return { start, end, len };
  });
}

function useTypewriter(rows: Row[], enabled: boolean) {
  const schedule = useMemo(() => buildSchedule(rows), [rows]);
  const lastSeg = schedule.length ? schedule[schedule.length - 1] : undefined;
  const totalMs = lastSeg ? lastSeg.end : 0;
  const [elapsed, setElapsed] = useState(enabled ? 0 : totalMs);

  useEffect(() => {
    if (!enabled) return;
    if (elapsed >= totalMs) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      setElapsed((prev) => {
        const next = prev + delta;
        if (next >= totalMs) return totalMs;
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, totalMs, elapsed]);

  return schedule.map((seg) => {
    if (elapsed <= seg.start) return 0;
    if (elapsed >= seg.end) return seg.len;
    return Math.floor(((elapsed - seg.start) / (seg.end - seg.start)) * seg.len);
  });
}

function useShouldAnimate() {
  const [animate, setAnimate] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAnimate(!mqReduce.matches);
    mqReduce.addEventListener('change', update);
    return () => mqReduce.removeEventListener('change', update);
  }, []);
  return animate;
}

export default function TerminalStatus({ isDark = true }: TerminalStatusProps) {
  const shouldAnimate = useShouldAnimate();
  const counts = useTypewriter(ROWS, shouldAnimate);
  const allDone = counts.every((c, i) => {
    const row = ROWS[i];
    if (!row) return true;
    return c >= [...row.value].length;
  });

  return (
    <div
      className={`rounded-xl overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#1c1c1e] shadow-[0_18px_50px_rgba(0,0,0,0.55)] ring-1 ring-black/40'
          : 'bg-[#f5f5f7] shadow-[0_18px_40px_rgba(15,23,42,0.18)] ring-1 ring-black/10'
      }`}
      style={{ minHeight: '400px', fontFamily: MONO_FONT_STACK }}
      role="presentation"
    >
      <div
        className={`relative h-9 flex items-center px-4 select-none ${
          isDark
            ? 'bg-gradient-to-b from-[#3a3a3c] to-[#2a2a2c] border-b border-black/60'
            : 'bg-gradient-to-b from-[#ececec] to-[#dadada] border-b border-black/10'
        }`}
      >
        <div className="flex items-center gap-[7px]">
          <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] ring-1 ring-black/20" aria-hidden />
          <span className="w-3.5 h-3.5 rounded-full bg-[#febc2e] ring-1 ring-black/20" aria-hidden />
          <span className="w-3.5 h-3.5 rounded-full bg-[#28c840] ring-1 ring-black/20" aria-hidden />
        </div>
        <span
          className={`absolute left-1/2 -translate-x-1/2 text-[12px] font-medium ${
            isDark ? 'text-zinc-300' : 'text-zinc-700'
          }`}
        >
          turbo — -zsh — 80×24
        </span>
      </div>

      <div
        className={`px-6 py-6 text-[14px] leading-[1.85] ${
          isDark ? 'text-zinc-200' : 'text-zinc-900'
        }`}
      >
        <div className="flex items-baseline gap-1 flex-wrap">
          <PromptHead isDark={isDark} />
          <span className={isDark ? 'text-zinc-100' : 'text-zinc-900'}>cat profile.txt</span>
        </div>

        <ul className="mt-2 space-y-1.5 tabular-nums">
          {ROWS.map((row, i) => {
            const c = counts[i] ?? 0;
            const valueChars = [...row.value];
            const valueShown = valueChars.slice(0, c).join('');
            const valueDone = c >= valueChars.length;
            const everStarted = c > 0 || valueDone;

            return (
              <li key={row.label} className="flex items-baseline gap-3">
                <span
                  className={`inline-block w-[104px] shrink-0 text-[12px] tracking-wider ${
                    isDark ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {row.label}
                </span>
                <span
                  className={`flex-1 inline-flex items-center gap-2 ${
                    row.emphasize
                      ? isDark
                        ? 'text-emerald-300 font-semibold'
                        : 'text-emerald-700 font-semibold'
                      : isDark
                        ? 'text-zinc-100'
                        : 'text-zinc-900'
                  }`}
                  style={{ fontFamily: CN_FONT_STACK, fontSize: '14px' }}
                >
                  {valueDone && row.dot ? <Dot color={row.dot} /> : null}
                  <span>{valueShown}</span>
                  {everStarted && !valueDone && <Cursor isDark={isDark} />}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 flex items-baseline gap-1">
          <PromptHead isDark={isDark} />
          {allDone && <BlinkingCursor isDark={isDark} />}
        </div>
      </div>
    </div>
  );
}

function PromptHead({ isDark }: { isDark: boolean }) {
  return (
    <span className="inline-flex items-baseline gap-1 whitespace-nowrap">
      <span className={isDark ? 'text-emerald-400' : 'text-emerald-700'}>turbo@mac</span>
      <span className={isDark ? 'text-zinc-500' : 'text-zinc-500'}>:</span>
      <span className={isDark ? 'text-sky-400' : 'text-sky-700'}>~/portfolio</span>
      <span className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>%</span>
    </span>
  );
}

function Dot({ color }: { color: 'green' | 'red' | 'amber' }) {
  const cls =
    color === 'green'
      ? 'bg-emerald-500'
      : color === 'red'
      ? 'bg-red-500'
      : 'bg-amber-400';
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${cls}`} aria-hidden />
  );
}

function Cursor({ isDark }: { isDark: boolean }) {
  return (
    <span
      className={`inline-block w-[8px] h-[16px] align-[-2px] ml-1 ${
        isDark ? 'bg-zinc-200' : 'bg-zinc-800'
      }`}
      aria-hidden
    />
  );
}

function BlinkingCursor({ isDark }: { isDark: boolean }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = window.setInterval(() => setOn((v) => !v), 530);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span
      className={`inline-block w-[8px] h-[16px] align-[-2px] ${
        on ? (isDark ? 'bg-zinc-200' : 'bg-zinc-800') : 'bg-transparent'
      }`}
      aria-hidden
    />
  );
}
