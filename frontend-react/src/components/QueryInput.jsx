import { motion } from 'framer-motion';

const chips = [
    { emoji: '🌾', label: 'PM-KUSUM Solar Pump', prompt: 'I am a farmer in Punjab with 5 acres of land. Tell me about PM-KUSUM solar pump subsidy.' },
    { emoji: '👩‍💼', label: 'MUDRA Loan Scheme', prompt: 'I am a woman entrepreneur from Rajasthan looking for MUDRA loan scheme for my small business.' },
    { emoji: '🎓', label: 'Student Scholarship', prompt: 'I am a student from a rural area in Bihar looking for post-matric scholarship schemes.' },
    { emoji: '🏠', label: 'PM Awas Yojana', prompt: 'I want to know about PM Awas Yojana for affordable housing in Maharashtra.' },
    { emoji: '🌿', label: 'Kisan Credit Card', prompt: 'I am a farmer in UP wanting to know about Kisan Credit Card scheme.' },
    { emoji: '⚡', label: 'Rooftop Solar', prompt: 'I am a homeowner in Gujarat looking for rooftop solar panel subsidies.' },
];

export default function QueryInput({ value, onChange, onSubmit, loading }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24,
                padding: '32px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Glow top border */}
            <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)',
            }} />

            {/* Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                }}>💬</div>
                <span style={{ color: '#94a3b8', fontSize: 14, fontWeight: 500, letterSpacing: '0.02em' }}>
                    Describe your situation in detail
                </span>
            </div>

            {/* Textarea */}
            <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                onKeyDown={e => { if (e.ctrlKey && e.key === 'Enter') onSubmit(); }}
                placeholder="E.g., I am a small farmer in Maharashtra with 3 acres of land looking for solar pump subsidies and PM-KUSUM scheme..."
                rows={4}
                style={{
                    width: '100%', padding: '16px 18px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 14, color: '#f1f5f9',
                    fontSize: 15, fontFamily: 'Inter, sans-serif',
                    resize: 'vertical', outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    lineHeight: 1.6,
                }}
                onFocus={e => {
                    e.target.style.borderColor = 'rgba(99,102,241,0.6)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)';
                }}
                onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.boxShadow = 'none';
                }}
            />

            {/* Quick chips */}
            <div style={{ marginTop: 16 }}>
                <p style={{ color: '#475569', fontSize: 12, fontWeight: 500, marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Try an example →
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {chips.map((chip, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => onChange(chip.prompt)}
                            style={{
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 99, padding: '7px 14px',
                                color: '#cbd5e1', fontSize: 13, fontWeight: 500,
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                                transition: 'all 0.2s',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(99,102,241,0.15)';
                                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
                                e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.color = '#cbd5e1';
                            }}
                        >
                            <span>{chip.emoji}</span>
                            <span>{chip.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <motion.button
                onClick={onSubmit}
                disabled={loading}
                whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                style={{
                    marginTop: 20, width: '100%',
                    padding: '16px 28px',
                    background: loading
                        ? 'rgba(99,102,241,0.4)'
                        : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                    border: 'none', borderRadius: 14,
                    color: '#fff', fontSize: 16, fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    boxShadow: loading ? 'none' : '0 8px 32px rgba(99,102,241,0.4)',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.01em',
                    position: 'relative', overflow: 'hidden',
                }}
            >
                {!loading && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)',
                        pointerEvents: 'none',
                    }} />
                )}
                <span style={{ fontSize: 20 }}>{loading ? '⏳' : '🔍'}</span>
                <span>{loading ? 'Analyzing with AI...' : 'Analyze Schemes'}</span>
                {!loading && <span style={{ opacity: 0.7 }}>→</span>}
            </motion.button>

            <p style={{ textAlign: 'center', color: '#334155', fontSize: 12, marginTop: 10 }}>
                Ctrl + Enter to submit
            </p>
        </motion.div>
    );
}
