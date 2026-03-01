import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuroraBackground from './components/AuroraBackground';
import QueryInput from './components/QueryInput';
import LoadingState from './components/LoadingState';
import ResultsPanel from './components/ResultsPanel';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/chat';

const stats = [
  { num: '1500+', label: 'Schemes Tracked', icon: '📋' },
  { num: '28', label: 'States Covered', icon: '🗺️' },
  { num: 'AI', label: 'Powered Analysis', icon: '🤖' },
  { num: 'Free', label: 'No Signup Needed', icon: '🎁' },
];

function CountUp({ target }) {
  const [count, setCount] = useState(0);
  const isNum = !isNaN(parseInt(target));

  useEffect(() => {
    if (!isNum) return;
    const end = parseInt(target);
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, isNum]);

  return <span>{isNum ? count + (target.includes('+') ? '+' : '') : target}</span>;
}

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;

    setError(null);
    setResult(null);
    setLoading(true);
    setActiveStep(0);

    // Animate through loading steps
    const stepTimer = setInterval(() => {
      setActiveStep(prev => (prev < 2 ? prev + 1 : prev));
    }, 3000);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_prompt: prompt.trim(), temperature: 0.2 }),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || json.detail || 'AI service error. Please try again.');
      }

      clearInterval(stepTimer);
      setActiveStep(2);
      await new Promise(r => setTimeout(r, 400));
      setResult(json);
    } catch (err) {
      clearInterval(stepTimer);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setResult(null);
    setError(null);
    setPrompt('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <AuroraBackground />

      {/* Noise texture overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.4,
      }} />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* TOP NAV */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 40px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(5,5,8,0.6)',
            backdropFilter: 'blur(20px)',
            position: 'sticky', top: 0, zIndex: 100,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
            }}>🇮🇳</div>
            <span style={{ fontWeight: 800, fontSize: 15, color: '#f1f5f9', letterSpacing: '-0.01em' }}>
              SchemeFinder <span style={{ color: '#6366f1' }}>AI</span>
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['#6366f1', '#f97316', '#22c55e'].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
            ))}
          </div>
        </motion.nav>

        {/* HERO */}
        <div style={{ textAlign: 'center', padding: '80px 24px 48px', maxWidth: 760, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 16px', borderRadius: 99,
              background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
              color: '#a5b4fc', fontSize: 13, fontWeight: 600, marginBottom: 28,
              boxShadow: '0 0 20px rgba(99,102,241,0.1)',
            }}
          >
            <span>🇮🇳</span>
            <span>India-Focused AI</span>
            <span style={{
              padding: '2px 8px', borderRadius: 99, fontSize: 11,
              background: 'rgba(34,197,94,0.2)', color: '#86efac',
              border: '1px solid rgba(34,197,94,0.3)',
            }}>LIVE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(36px, 6vw, 68px)',
              fontWeight: 900, lineHeight: 1.05,
              letterSpacing: '-0.03em', marginBottom: 20,
              fontFamily: 'Space Grotesk, Inter, sans-serif',
            }}
          >
            Government{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Scheme</span>
            {' '}&amp;{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Subsidy</span>
            {' '}Finder
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ color: '#64748b', fontSize: 18, lineHeight: 1.6, maxWidth: 520, margin: '0 auto 48px' }}
          >
            Powered by AI — Discover schemes, check eligibility, and get direct apply links in seconds.
          </motion.p>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              display: 'flex', justifyContent: 'center', gap: 0, flexWrap: 'wrap',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, overflow: 'hidden',
              backdropFilter: 'blur(12px)', marginBottom: 0,
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: '20px 32px', textAlign: 'center',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                flex: '1 1 120px',
              }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                <div style={{
                  fontSize: 22, fontWeight: 800, color: '#f1f5f9',
                  fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em',
                }}>
                  <CountUp target={s.num} />
                </div>
                <div style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 80px' }}>
          <AnimatePresence mode="wait">
            {!loading && !result && (
              <motion.div key="input" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <QueryInput
                  value={prompt}
                  onChange={setPrompt}
                  onSubmit={handleAnalyze}
                  loading={loading}
                />
              </motion.div>
            )}

            {loading && (
              <motion.div key="loading">
                <LoadingState activeStep={activeStep} />
              </motion.div>
            )}

            {!loading && result && (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ResultsPanel
                  data={result.data}
                  tokenCount={result.tokens_used}
                  modelUsed={result.model_used}
                  onNewSearch={handleNewSearch}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error toast */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                style={{
                  marginTop: 20,
                  background: 'rgba(239,68,68,0.12)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: 16, padding: '20px 24px',
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                }}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>⚠️</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#fca5a5', fontWeight: 700, marginBottom: 4 }}>Something went wrong</p>
                  <p style={{ color: '#f87171', fontSize: 14, lineHeight: 1.5 }}>{error}</p>
                </div>
                <button
                  onClick={() => { setError(null); setLoading(false); }}
                  style={{
                    background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 8, color: '#fca5a5', padding: '6px 14px',
                    cursor: 'pointer', fontSize: 13, fontFamily: 'Inter, sans-serif',
                  }}
                >Dismiss</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FOOTER */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: '24px 40px',
            textAlign: 'center',
            color: '#334155', fontSize: 13,
            background: 'rgba(5,5,8,0.5)',
          }}
        >
          🇮🇳 AI Government Scheme Finder &nbsp;|&nbsp; Powered by{' '}
          <span style={{ color: '#6366f1', fontWeight: 600 }}>OpenRouter + DeepSeek</span>
          &nbsp;|&nbsp; For informational purposes only
        </motion.footer>
      </div>
    </div>
  );
}
