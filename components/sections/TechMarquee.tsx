
'use client';
import { motion } from 'framer-motion';

const techs = [
  'Go', 'Docker', 'Kubernetes', 'Next.js', 'React', 'TypeScript', 
  'Terraform', 'GitHub Actions', 'Prometheus', 'Grafana', 'Redis', 'Kafka', 'PostgreSQL', 'Nginx'
];

export default function TechMarquee() {
  return (
    <div className="w-full overflow-hidden bg-[#0A0A0B] border-y border-white/5 py-6 relative z-10">
      <div className="flex w-max animate-marquee">
        {[...techs, ...techs].map((tech, i) => (
          <div key={i} className="flex items-center mx-8 text-gray-500 font-mono text-sm tracking-widest uppercase">
            {tech}
            <span className="mx-8 w-1 h-1 rounded-full bg-[#C8FF4D]/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
