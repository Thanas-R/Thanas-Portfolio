import { useEffect, useState, useMemo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface MonthCommit {
  label: string;
  value: number;
}

const GitHubActivityChart = () => {
  const [monthData, setMonthData] = useState<MonthCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch(
          "https://github-contributions-api.jogruber.de/v4/Thanas-R"
        );

        const data = await res.json();

        const contributions = data.contributions;

        const now = new Date();
        const months: MonthCommit[] = [];

        for (let m = 6; m >= 0; m--) {
          const target = new Date(now.getFullYear(), now.getMonth() - m, 1);

          const monthLabel = target.toLocaleDateString("en-US", {
            month: "short",
          });

          const month = target.getMonth();
          const year = target.getFullYear();

          let total = 0;

          contributions.forEach((c: any) => {
            const d = new Date(c.date);

            if (d.getMonth() === month && d.getFullYear() === year) {
              total += c.count;
            }
          });

          months.push({
            label: monthLabel,
            value: total,
          });
        }

        setMonthData(months);
      } catch {
        setMonthData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const maxValue = useMemo(
    () => Math.max(...monthData.map((d) => d.value), 1),
    [monthData]
  );

  const total = useMemo(
    () => monthData.reduce((s, d) => s + d.value, 0),
    [monthData]
  );

  return (
    <div className="h-full flex flex-col">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-['Inter'] mb-3">
        GitHub Commits
      </p>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold text-foreground font-['Inter']">
          {loading ? "..." : total}
        </span>
        <span className="text-xs text-muted-foreground font-['Inter']">
          in the last 7 months
        </span>
      </div>

      <TooltipProvider delayDuration={0}>
        <div className="flex-1 flex items-end gap-2 min-h-[80px]">
          {monthData.map((item, i) => {
            const heightPct = Math.max((item.value / maxValue) * 100, 6);

            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="w-full rounded-sm bg-foreground/80 min-h-[3px] cursor-default transition-all duration-500"
                      style={{
                        height: loading ? "6%" : `${heightPct}%`,
                        opacity: loading ? 0.3 : 1,
                        transitionDelay: isMobile ? `${i * 60}ms` : "0ms",
                      }}
                    />
                  </TooltipTrigger>

                  <TooltipContent
                    side="top"
                    className="font-['Inter'] text-xs"
                  >
                    {item.value} commit{item.value !== 1 ? "s" : ""}
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
