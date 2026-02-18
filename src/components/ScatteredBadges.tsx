import { motion } from 'framer-motion';

const badges = [
  { label: 'marketing', rotate: -12, x: '5%', y: '15%', size: 'text-[10px]' },
  { label: 'SEO', rotate: 8, x: '85%', y: '10%', size: 'text-xs' },
  { label: 'ads', rotate: -6, x: '78%', y: '85%', size: 'text-[10px]' },
  { label: 'branding', rotate: 15, x: '10%', y: '80%', size: 'text-[10px]' },
  { label: 'growth', rotate: -4, x: '92%', y: '50%', size: 'text-[10px]' },
];

const ScatteredBadges = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
      {badges.map((badge, i) => (
        <motion.span
          key={badge.label}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`absolute px-2.5 py-1 rounded-full border border-foreground/10 bg-background/60 backdrop-blur-sm text-muted-foreground font-medium ${badge.size} select-none`}
          style={{
            left: badge.x,
            top: badge.y,
            transform: `rotate(${badge.rotate}deg)`,
          }}
        >
          {badge.label}
        </motion.span>
      ))}
    </div>
  );
};

export default ScatteredBadges;
