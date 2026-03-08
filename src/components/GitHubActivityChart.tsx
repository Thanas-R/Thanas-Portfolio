import { useEffect, useState, useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface DayCommit {
  label: string;
  date: string;
  value: number;
}

const GitHubActivityChart = () => {
  const [weekData, setWeekData] = useState<DayCommit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch multiple pages to get more complete data
        const pages = await Promise.all([
          fetch('https://api.github.com/users/Thanas-R/events/public?per_page=100&page=1'),
          fetch('https://api.github.com/users/Thanas-R/events/public?per_page=100&page=2'),
        ]);
        
        const allEvents = [];
        for (const res of pages) {
          if (res.ok) {
            const data = await res.json();
            allEvents.push(...data);
          }
        }

        const now = new Date();
        const days: DayCommit[] = [];

        for (let i = 6; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().slice(0, 10);
          const label = d.toLocaleDateString('en-US', { weekday: 'short' });
          let count = 0;

          for (const event of allEvents) {
            if (event.type === 'PushEvent') {
              const eventDate = new Date(event.created_at).toISOString().slice(0, 10);
              if (eventDate === dateStr) {
                count += event.payload?.commits?.length || 1;
              }
            }
          }

          days.push({ label, date: dateStr, value: count });
        }

        setWeekData(days);
      } catch {
        setWeekData(Array.from({ length: 7 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - i));
          return { label: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.toISOString().slice(0, 10), value: 0 };
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const maxValue = useMemo(() => Math.max(...weekData.map((d) => d.value), 1), [weekData]);
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
        GitHub Commits
      </p>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold text-foreground font-['Inter']">
          {loading ? '...' : total}
        </span>
        <span className="text-xs text-muted-foreground font-['Inter']">in the last 7 days</span>
      </div>

      <TooltipProvider delayDuration={0}>
        <div className="flex-1 flex items-end gap-2 min-h-[80px]">
          {weekData.map((item, i) => {
            const heightPct = Math.max((item.value / maxValue) * 100, 6);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="w-full rounded-sm bg-foreground/80 min-h-[3px]  cursor-default"
                      style={{ height: `${heightPct}%`, pointerEvents: 'auto' }}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="font-['Inter'] text-xs">
                    {item.value} commit{item.value !== 1 ? 's' : ''}
                  </TooltipContent>
                </Tooltip>
                <span className="text-[10px] text-muted-foreground font-['JetBrains_Mono']">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default GitHubActivityChart;
