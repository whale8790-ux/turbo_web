/**
 * ErrorBoundary — catches render-time errors from the entire React tree below
 * and shows a recoverable fallback UI instead of an all-white page.
 *
 * Scope (per React 19 docs):
 *   ✅ render / lifecycle / constructor errors in descendants
 *   ❌ event handlers (handle async errors with try/catch)
 *   ❌ async code / setTimeout / Promise rejections
 *   ❌ server-side rendering
 *
 * In production, hook `componentDidCatch` to your error-reporting backend
 * (Sentry / DataDog / 自家监控). Here we console.error for visibility.
 */

import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State, unknown> {
  override state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    // TODO(prod): report to error-monitoring service.
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] caught render error:', error, info.componentStack);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  private handleReload = (): void => {
    window.location.reload();
  };

  override render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    return (
      <div
        role="alert"
        className="min-h-screen flex items-center justify-center bg-[#0a0b10] text-[#e4e4e7] p-6 font-sans"
      >
        <div className="max-w-md w-full text-center space-y-5">
          <div className="text-5xl" aria-hidden="true">
            ⚠️
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">页面遇到了一点问题</h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              组件渲染时发生了未捕获的错误。可以重试或刷新页面,问题仍存在请联系作者反馈。
            </p>
          </div>
          {this.state.error && (
            <pre className="text-left text-[11px] text-zinc-400 bg-zinc-950 p-3 rounded-lg border border-zinc-900 overflow-auto max-h-40 whitespace-pre-wrap break-words">
              {this.state.error.message}
            </pre>
          )}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={this.handleReset}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition cursor-pointer"
            >
              重试
            </button>
            <button
              onClick={this.handleReload}
              className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-sm transition cursor-pointer"
            >
              刷新页面
            </button>
          </div>
        </div>
      </div>
    );
  }
}
