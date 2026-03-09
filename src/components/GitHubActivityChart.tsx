import { useEffect, useState, useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface MonthCommit {
  label: string;
  value: number;
}

const GitHubActivityChart = () => {
  const [monthData, setMonthData] = useState<MonthCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        // Get all public repos
        const reposRes = await fetch('https://api.github.com/users/Thanas-R/repos?per_page=100');
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const repos = await reposRes.json();

        // For each repo, get weekly commit participation (last 52 weeks)
        const statsPromises = repos.map((repo: any) =>
          fetch(`https://api.github.com/repos/Thanas-R/${repo.name}/stats/participation`)
            .then(r => r.ok ? r.json() : null)
            .catch(() => null)
        );
        const allStats = await Promise.all(statsPromises);

        // Build weekly totals (owner commits) for last 52 weeks
        const weeklyTotals = new Array(52).fill(0);
        for (const stat of allStats) {
          if (stat?.owner) {
            stat.owner.forEach((count: number, i: number) => {
              weeklyTotals[i] += count;
            });
          }
        }

        // Map weeks to months for the last 7 months
        const now = new Date();
        const months: MonthCommit[] = [];

        for (let m = 6; m >= 0; m--) {
          const target = new Date(now.getFullYear(), now.getMonth() - m, 1);
          const label = target.toLocaleDateString('en-US', { month: 'short' });

          // Calculate which weeks fall in this month
          const monthStart = new Date(target.getFullYear(), target.getMonth(), 1);
          const monthEnd = new Date(target.getFullYear(), target.getMonth() + 1, 0);

          let total = 0;
          for (let w = 0; w < 52; w++) {
            // Week 51 = most recent, week 0 = oldest
            const weekEnd = new Date(now);
            weekEnd.setDate(weekEnd.getDate() - (51 - w) * 7);
            const weekStart = new Date(weekEnd);
            weekStart.setDate(weekStart.getDate() - 6);

            // Check if this week overlaps with the target month
            if (weekEnd >= monthStart && weekStart <= monthEnd) {
              total += weeklyTotals[w];
            }
          }

          months.push({ label, value: total });
        }

        setMonthData(months);
      } catch {
        // Fallback: empty data
        const months: MonthCommit[] = [];
        const now = new Date();
        for (let m = 6; m >= 0; m--) {
          const target = new Date(now.getFullYear(), now.getMonth() - m, 1);
          months.push({ label: target.toLocaleDateString('en-US', { month: 'short' }), value: 0 });
        }
        setMonthData(months);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, []);

  const maxValue = useMemo(() => Math.max(...monthData.map(d => d.value), 1), [monthData]);
  const total = useMemo(() => monthData.reduce((s, d) => s + d.value, 0), [monthData]);

  return (
    <div className="h-full flex flex-col">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-['Inter'] mb-3">
        GitHub Commits
      </p>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold text-foreground font-['Inter']">
          {loading ? '...' : total}
        </span>
        <span className="text-xs text-muted-foreground font-['Inter']">in the last 7 months</span>
      </div>

      <TooltipProvider delayDuration={0}>
        <div className="flex-1 flex items-end gap-2 min-h-[80px]">
          {monthData.map((item, i) => {
            const heightPct = Math.max((item.value / maxValue) * 100, 6);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="w-full rounded-sm bg-foreground/80 min-h-[3px] cursor-default transition-all duration-500"
                      style={{
                        height: loading ? '6%' : `${heightPct}%`,
                        opacity: loading ? 0.3 : 1,
                        transitionDelay: isMobile ? `${i * 60}ms` : '0ms',
                        pointerEvents: 'auto',
                      }}
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
