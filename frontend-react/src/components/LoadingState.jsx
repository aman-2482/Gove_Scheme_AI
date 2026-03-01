import { motion } from 'framer-motion';

const steps = [
    { id: 1, icon: '🔍', label: 'Searching schemes database' },
    { id: 2, icon: '📋', label: 'Checking your eligibility' },
    { id: 3, icon: '🔗', label: 'Finding official apply links' },
];

export default function LoadingState({ activeStep = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 24,
                padding: '48px 32px',
                textAlign: 'center',
                boxShadow: '0 0 60px rgba(99,102,241,0.1)',
            }}
        >
            {/* Spinning ring */}
            <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 24px' }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute', inset: 0,
                        borderRadius: '50%',
                        border: '3px solid transparent',
                        borderTopColor: '#6366f1',
                        borderRightColor: '#a855f7',
                    }}
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute', inset: 8,
                        borderRadius: '50%',
                        border: '2px solid transparent',
                        borderTopColor: '#f97316',
                    }}
                />
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28,
                }}>🤖</div>
            </div>

            <motion.h3
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: 20, fontWeight: 700, marginBottom: 6, color: '#f1f5f9' }}
            >
                Analyzing your query...
            </motion.h3>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 32 }}>
                AI is searching through government schemes and checking eligibility
            </p>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320, margin: '0 auto' }}>
                {steps.map((step, i) => {
                    const isDone = i < activeStep;
                    const isActive = i === activeStep;
                    return (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '12px 16px', borderRadius: 12,
                                background: isActive ? 'rgba(99,102,241,0.15)' : isDone ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)',
                                border: `1px solid ${isActive ? 'rgba(99,102,241,0.4)' : isDone ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.06)'}`,
                                transition: 'all 0.4s ease',
                            }}
                        >
                            <span style={{ fontSize: 18 }}>
                                {isDone ? '✅' : step.icon}
                            </span>
                            <span style={{
                                fontSize: 14, fontWeight: 500,
                                color: isActive ? '#a5b4fc' : isDone ? '#86efac' : '#475569',
                            }}>
                                {step.label}
                            </span>
                            {isActive && (
                                <motion.div
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1.2, repeat: Infinity }}
                                    style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }}
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
