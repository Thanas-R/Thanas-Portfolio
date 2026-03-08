import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface DayCommit {
  day: string;
  value: number;
}

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const GitHubActivityChart = () => {
  const [weekData, setWeekData] = useState<DayCommit[]>(
    dayLabels.map((d) => ({ day: d, value: 0 }))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const res = await fetch('https://api.github.com/users/Thanas-R/events/public?per_page=100');
        if (!res.ok) throw new Error('GitHub API error');
        const events = await res.json();

        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const counts = [0, 0, 0, 0, 0, 0, 0];

        for (const event of events) {
          if (event.type === 'PushEvent') {
            const d = new Date(event.created_at);
            if (d >= weekAgo) {
              counts[d.getDay()] += event.payload?.commits?.length || 1;
            }
          }
        }

        setWeekData(dayLabels.map((label, i) => ({ day: label, value: counts[i] })));
      } catch {
        // Fallback: keep zeros
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const maxValue = useMemo(
    () => Math.max(...weekData.map((d) => d.value), 1),
    [weekData]
  );

  const total = useMemo(() => weekData.reduce((s, d) => s + d.value, 0), [weekData]);

  const barVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: (i: number) => ({
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.4, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    }),
  };

  return (
    <div className="h-full flex flex-col">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-['Inter'] mb-3">
        GitHub Activity
      </p>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold text-foreground font-['Inter']">
          {loading ? '...' : total}
        </span>
        <span className="text-xs text-muted-foreground font-['Inter']">commits this week</span>
      </div>

      <div className="flex-1 flex items-end gap-2 min-h-[80px]">
        {weekData.map((item, i) => {
          const heightPct = Math.max((item.value / maxValue) * 100, 6);
          return (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <motion.div
                className="w-full rounded-sm bg-foreground/80 min-h-[3px]"
                style={{
                  height: `${heightPct}%`,
                  transformOrigin: 'bottom',
                }}
                custom={i}
                variants={barVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <span className="text-[10px] text-muted-foreground font-['JetBrains_Mono']">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GitHubActivityChart;
