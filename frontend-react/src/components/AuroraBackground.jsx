import { useEffect, useRef } from 'react';

export default function AuroraBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;
        let t = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const blobs = [
            { x: 0.2, y: 0.2, r: 0.35, color: '#6366f1', speed: 0.0003 },
            { x: 0.8, y: 0.7, r: 0.30, color: '#f97316', speed: 0.0004 },
            { x: 0.5, y: 0.9, r: 0.25, color: '#ec4899', speed: 0.0005 },
            { x: 0.9, y: 0.1, r: 0.20, color: '#38bdf8', speed: 0.0002 },
        ];

        const draw = () => {
            t++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            blobs.forEach((blob, i) => {
                const x = (blob.x + Math.sin(t * blob.speed + i * 1.5) * 0.15) * canvas.width;
                const y = (blob.y + Math.cos(t * blob.speed + i * 2.1) * 0.12) * canvas.height;
                const r = blob.r * Math.min(canvas.width, canvas.height);

                const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
                grad.addColorStop(0, blob.color + '22');
                grad.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed', inset: 0, zIndex: 0,
                pointerEvents: 'none', opacity: 0.7,
            }}
        />
    );
}
