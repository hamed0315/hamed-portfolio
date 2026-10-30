
'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Server, Shield, Database, Box, Terminal, Activity } from 'lucide-react';

const nodes = [
  { id: 'go', label: 'Go Backend', icon: <Terminal size={24} />, x: 50, y: 50, isCenter: true },
  { id: 'docker', label: 'Docker', icon: <Box size={18} />, x: 20, y: 20 },
  { id: 'k8s', label: 'Kubernetes', icon: <Server size={18} />, x: 80, y: 30 },
  { id: 'db', label: 'PostgreSQL', icon: <Database size={18} />, x: 25, y: 80 },
  { id: 'trivy', label: 'DevSecOps', icon: <Shield size={18} />, x: 85, y: 75 },
  { id: 'monitor', label: 'Monitoring', icon: <Activity size={18} />, x: 50, y: 15 },
];

export default function DevOpsConstellation() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 40);
    mouseY.set(y * 40);
  };

  return (
    <div 
      className="relative w-full aspect-square max-h-[600px] flex items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      {/* هاله نور مرکزی */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,255,77,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* خطوط اتصال */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(200,255,77,0.2))' }}>
        <g className="stroke-white/10" strokeWidth="1">
          {nodes.filter(n => !n.isCenter).map((node, i) => (
            <motion.line
              key={i}
              x1="50%" y1="50%"
              x2={`${node.x}%`} y2={`${node.y}%`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeInOut" }}
            />
          ))}
        </g>
      </svg>

      {/* نودها */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {nodes.map((node, index) => {
          const xOffset = useTransform(springX, v => v * (node.isCenter ? 0 : (node.x - 50) / 50));
          const yOffset = useTransform(springY, v => v * (node.isCenter ? 0 : (node.y - 50) / 50));

          return (
            <motion.div
              key={node.id}
              className="absolute flex flex-col items-center justify-center group"
              style={{ 
                left: `${node.x}%`, 
                top: `${node.y}%`,
                x: xOffset,
                y: yOffset,
                translateX: '-50%',
                translateY: '-50%'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, type: "spring" }}
            >
              <div className={`
                relative flex items-center justify-center rounded-2xl backdrop-blur-md border transition-all duration-300
                ${node.isCenter 
                  ? 'w-24 h-24 bg-[#C8FF4D]/10 border-[#C8FF4D]/30 text-[#C8FF4D] shadow-[0_0_40px_rgba(200,255,77,0.15)]' 
                  : 'w-14 h-14 bg-white/5 border-white/10 text-gray-400 hover:text-[#C8FF4D] hover:border-[#C8FF4D]/50 hover:bg-[#C8FF4D]/5 hover:scale-110'
                }
              `}>
                {node.icon}
                {/* حلقه چشمک‌زن برای نود مرکزی */}
                {node.isCenter && (
                  <div className="absolute inset-0 rounded-2xl border border-[#C8FF4D]/50 animate-ping opacity-20" />
                )}
              </div>
              <span className={`absolute -bottom-6 text-[10px] font-mono whitespace-nowrap transition-opacity duration-300 ${node.isCenter ? 'text-[#C8FF4D] opacity-100' : 'text-gray-500 opacity-0 group-hover:opacity-100'}`}>
                {node.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
