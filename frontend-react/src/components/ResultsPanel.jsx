import { motion } from 'framer-motion';

const cardThemes = {
    summary: {
        icon: '📝', title: 'Summary',
        gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))',
        border: 'rgba(99,102,241,0.3)', glow: 'rgba(99,102,241,0.12)',
        iconBg: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
        titleColor: '#a5b4fc',
    },
    eligibility: {
        icon: '✅', title: 'Eligibility Reasoning',
        gradient: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(16,185,129,0.06))',
        border: 'rgba(34,197,94,0.3)', glow: 'rgba(34,197,94,0.1)',
        iconBg: 'linear-gradient(135deg,#22c55e,#10b981)',
        titleColor: '#86efac',
    },
    actions: {
        icon: '🚀', title: 'Recommended Actions',
        gradient: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(251,191,36,0.06))',
        border: 'rgba(249,115,22,0.3)', glow: 'rgba(249,115,22,0.1)',
        iconBg: 'linear-gradient(135deg,#f97316,#fbbf24)',
        titleColor: '#fed7aa',
    },
    risks: {
        icon: '⚠️', title: 'Risk Notes & Caveats',
        gradient: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(239,68,68,0.06))',
        border: 'rgba(236,72,153,0.3)', glow: 'rgba(236,72,153,0.1)',
        iconBg: 'linear-gradient(135deg,#ec4899,#ef4444)',
        titleColor: '#f9a8d4',
    },
};

function ResultCard({ type, children, index }) {
    const theme = cardThemes[type];
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
                background: theme.gradient,
                backdropFilter: 'blur(16px)',
                border: `1px solid ${theme.border}`,
                borderRadius: 20,
                padding: '24px',
                boxShadow: `0 8px 32px ${theme.glow}`,
                position: 'relative', overflow: 'hidden',
            }}
        >
            {/* Subtle corner glow */}
            <div style={{
                position: 'absolute', top: -20, right: -20, width: 80, height: 80,
                borderRadius: '50%', background: theme.border, filter: 'blur(30px)', opacity: 0.5,
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                    width: 38, height: 38, borderRadius: 10, background: theme.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 17, boxShadow: `0 4px 12px ${theme.glow}`,
                    flexShrink: 0,
                }}>
                    {theme.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: theme.titleColor, letterSpacing: '0.01em' }}>
                    {theme.title}
                </h3>
            </div>
            <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>
                {children}
            </div>
        </motion.div>
    );
}

function ApplyLinks({ links }) {
    if (!links?.length) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 20, padding: '28px',
                boxShadow: '0 0 40px rgba(99,102,241,0.08)',
            }}
        >
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#a5b4fc', marginBottom: 6 }}>
                🔗 Official Apply Links
            </h3>
            <p style={{ color: '#475569', fontSize: 13, marginBottom: 20 }}>
                Click to apply directly on the official government portals
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {links.map((link, i) => (
                    <motion.a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '12px 20px',
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))',
                            border: '1px solid rgba(99,102,241,0.35)',
                            borderRadius: 12, color: '#c4b5fd',
                            textDecoration: 'none', fontSize: 14, fontWeight: 600,
                            boxShadow: '0 4px 16px rgba(99,102,241,0.15)',
                            transition: 'box-shadow 0.2s',
                        }}
                    >
                        <span style={{ opacity: 0.7 }}>🌐</span>
                        <span>{link.name}</span>
                        <span style={{ opacity: 0.5, fontSize: 12 }}>↗</span>
                    </motion.a>
                ))}
            </div>
        </motion.div>
    );
}

export default function ResultsPanel({ data, onNewSearch }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: 14 }}
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    style={{ fontSize: 28 }}
                >✨</motion.div>
                <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9' }}>Analysis Complete</h2>
                    <p style={{ color: '#475569', fontSize: 13 }}>AI-powered scheme recommendations for you</p>
                </div>
            </motion.div>

            {/* Cards grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 16,
            }}>
                <ResultCard type="summary" index={0}>
                    <p>{data.summary}</p>
                </ResultCard>

                <ResultCard type="eligibility" index={1}>
                    <p>{data.eligibility_reason}</p>
                </ResultCard>

                <ResultCard type="actions" index={2}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {(data.recommended_actions || []).map((action, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                <span style={{
                                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                                    background: 'rgba(249,115,22,0.25)', border: '1px solid rgba(249,115,22,0.4)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 11, fontWeight: 700, color: '#fb923c', marginTop: 2,
                                }}>{i + 1}</span>
                                <span>{action}</span>
                            </li>
                        ))}
                    </ul>
                </ResultCard>

                <ResultCard type="risks" index={3}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {(data.risk_notes || []).map((risk, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                <span style={{ fontSize: 14, marginTop: 2, flexShrink: 0 }}>⚠️</span>
                                <span>{risk}</span>
                            </li>
                        ))}
                    </ul>
                </ResultCard>
            </div>

            {/* Apply links */}
            <ApplyLinks links={data.apply_links} />

            {/* New search */}
            <motion.div style={{ textAlign: 'center', paddingTop: 8 }}>
                <motion.button
                    onClick={onNewSearch}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                        padding: '13px 32px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 12, color: '#94a3b8',
                        fontSize: 15, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.25s',
                        fontFamily: 'Inter, sans-serif',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = '#f1f5f9';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.color = '#94a3b8';
                    }}
                >
                    🔄 Start New Search
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
