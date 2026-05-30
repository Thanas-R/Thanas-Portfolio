"use client";

import React, { useState, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExperiencePositionItemType = {
  id: string;
  title: string;
  employmentPeriod: { start: string; end?: string };
  employmentType?: string;
  description?: string;
  icon?: ReactElement;
  skills?: string[];
  isExpanded?: boolean;
  link?: { href: string; label: string; icon?: ReactElement };
};

export type ExperienceItemType = {
  id: string;
  companyName: string;
  companyLogo?: string;
  companyWebsite?: string;
  /** Optional dot/accent color for the company */
  accentColor?: string;
  positions: ExperiencePositionItemType[];
  isCurrentEmployer?: boolean;
};

export type WorkExperienceProps = {
  className?: string;
  experiences: ExperienceItemType[];
};

/** Computes a human-readable duration like "1y 2m" or "5m". */
function formatDuration(start: string, end?: string): string {
  const parseDate = (s: string) => {
    const [mm, yyyy] = s.includes(".") ? s.split(".") : ["01", s];
    return new Date(Number(yyyy), Number(mm) - 1, 1);
  };
  const startDate = parseDate(start);
  const endDate = end ? parseDate(end) : new Date();
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1;
  if (months <= 0) return "";
  if (months < 12) return `${months}m`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m === 0 ? `${y}y` : `${y}y ${m}m`;
}

export function WorkExperience({ className, experiences }: WorkExperienceProps) {
  return (
    <div className={cn("flex flex-col gap-10", className)}>
      {experiences.map((exp) => (
        <ExperienceItem key={exp.id} experience={exp} />
      ))}
    </div>
  );
}

function ExperienceItem({ experience }: { experience: ExperienceItemType }) {
  const accent = experience.accentColor ?? "#3B82F6";
  return (
    <div className="flex flex-col gap-5">
      {/* Company header */}
      <div className="flex items-center gap-3">
        <div
          className="size-11 rounded-lg overflow-hidden flex items-center justify-center bg-card border border-border shrink-0"
          style={{ boxShadow: `0 0 0 2px ${accent}22` }}
        >
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt={`${experience.companyName} logo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <Briefcase className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-foreground truncate font-['Inter']">
            {experience.companyWebsite ? (
              <a
                href={experience.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-4 decoration-current/40"
              >
                {experience.companyName}
              </a>
            ) : (
              experience.companyName
            )}
          </h3>
          {experience.isCurrentEmployer && (
            <span
              className="relative inline-flex size-2.5 items-center justify-center"
              aria-label="Current employer"
            >
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: accent }}
              />
              <span
                className="relative inline-flex size-2 rounded-full"
                style={{ backgroundColor: accent }}
              />
            </span>
          )}
        </div>
      </div>

      {/* Thread of positions */}
      <div className="relative pl-5">
        <div
          className="absolute left-[20px] top-2 bottom-2 w-px"
          style={{ background: `linear-gradient(to bottom, ${accent}55, transparent)` }}
          aria-hidden
        />
        <div className="flex flex-col gap-4">
          {experience.positions.map((position) => (
            <ExperiencePositionItem
              key={position.id}
              position={position}
              accent={accent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperiencePositionItem({
  position,
  accent,
}: {
  position: ExperiencePositionItemType;
  accent: string;
}) {
  const [open, setOpen] = useState(!!position.isExpanded);
  const { start, end } = position.employmentPeriod;
  const duration = formatDuration(start, end);
  const isOngoing = !end;

  return (
    <div className="relative">
      <div
        className="absolute -left-[14px] top-3 size-3 rounded-full border-2 bg-background"
        style={{ borderColor: accent }}
        aria-hidden
      />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 text-left rounded-xl border border-border bg-card/70 hover:bg-card transition-colors p-4"
      >
        <div
          className="size-9 rounded-md flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${accent}1a`, color: accent }}
        >
          {position.icon ?? <Briefcase className="w-4 h-4" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm md:text-base font-semibold text-foreground font-['Inter'] truncate">
              {position.title}
            </p>
            <ChevronsUpDown
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform shrink-0",
                open && "rotate-180"
              )}
            />
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-['JetBrains_Mono']">
            {position.employmentType && (
              <span className="px-1.5 py-0.5 rounded-md border border-border/70 bg-muted/40">
                {position.employmentType}
              </span>
            )}
            <span>
              {start} <span className="opacity-50">to</span>{" "}
              {isOngoing ? (
                <span className="font-semibold" style={{ color: accent }}>
                  Present
                </span>
              ) : (
                end
              )}
            </span>
            {duration && <span className="opacity-70">· {duration}</span>}
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pt-3 pb-1 space-y-3">
              {position.description && (
                <p className="text-sm leading-relaxed text-foreground/80 font-['Inter'] whitespace-pre-line">
                  {position.description}
                </p>
              )}
              {position.link && (
                <a
                  href={position.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold rounded-full border border-border bg-muted/40 px-3 py-1.5 hover:bg-muted transition-colors"
                  style={{ color: accent }}
                >
                  {position.link.icon}
                  {position.link.label}
                </a>
              )}
              {position.skills && position.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {position.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-medium px-2 py-1 rounded-md border border-border/70 bg-muted/40 text-foreground/80 font-['JetBrains_Mono']"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WorkExperience;
