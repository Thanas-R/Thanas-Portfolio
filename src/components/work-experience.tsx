"use client";

import React, { useMemo, useState, type ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExperiencePositionItemType = {
  id: string;
  title: string;
  employmentPeriod: { start: string; end?: string };
  employmentType?: string;
  description?: string;
  bullets?: string[];
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
  accentColor?: string;
  positions: ExperiencePositionItemType[];
  isCurrentEmployer?: boolean;
};

export type WorkExperienceProps = {
  className?: string;
  experiences: ExperienceItemType[];
};

function formatPeriodValue(value: string): string {
  if (!value) return "";
  return value;
}

function splitDescription(description?: string): string[] {
  if (!description) return [];
  return description
    .split("\n")
    .map((line) => line.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);
}

export function WorkExperience({ className, experiences }: WorkExperienceProps) {
  return (
    <div className={cn("w-full flex flex-col", className)}>
      {experiences.map((experience, expIndex) => (
        <ExperienceItem
          key={experience.id}
          experience={experience}
          isFirst={expIndex === 0}
        />
      ))}
    </div>
  );
}

function ExperienceItem({
  experience,
  isFirst,
}: {
  experience: ExperienceItemType;
  isFirst: boolean;
}) {
  const accent = experience.accentColor ?? "#3B82F6";

  return (
    <div className="w-full">
      {isFirst && (
        <div className="mb-5 flex items-center gap-3 px-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-card">
            {experience.companyLogo ? (
              <img
                src={experience.companyLogo}
                alt={`${experience.companyName} logo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <div className="truncate text-sm font-medium text-foreground font-['JetBrains_Mono']">
              {experience.companyWebsite ? (
                <a
                  href={experience.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4"
                >
                  {experience.companyName}
                </a>
              ) : (
                experience.companyName
              )}
            </div>

            {experience.isCurrentEmployer && (
              <span className="relative inline-flex h-2 w-2 items-center justify-center" aria-label="Current">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: accent }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: accent }}
                />
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col">
        {experience.positions.map((position, index) => (
          <ExperiencePositionItem
            key={position.id}
            position={position}
            accent={accent}
            isLast={index === experience.positions.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function ExperiencePositionItem({
  position,
  accent,
  isLast,
}: {
  position: ExperiencePositionItemType;
  accent: string;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(Boolean(position.isExpanded));

  const { start, end } = position.employmentPeriod;
  const startLabel = formatPeriodValue(start);
  const endLabel = end ? formatPeriodValue(end) : "Present";

  const responsibilities = useMemo(() => {
    const bullets = position.bullets?.filter(Boolean) ?? [];
    if (bullets.length > 0) return bullets;
    return splitDescription(position.description);
  }, [position.bullets, position.description]);

  return (
    <div className={cn("grid grid-cols-[40px_1fr] gap-3", !isLast && "pb-5")}>
      <div className="relative flex flex-col items-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
          <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-border/70 bg-background/80">
            <span className="[&>svg]:h-4 [&>svg]:w-4">
              {position.icon ?? <Briefcase className="h-4 w-4" />}
            </span>
          </div>
        </div>

        {!isLast && <div className="mt-1.5 w-px flex-1 bg-border/80" />}
      </div>

      <div className={cn("w-full", !isLast && "border-b border-border/50 pb-5")}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="w-full text-left"
        >
          <div className="rounded-xl border border-border/60 bg-background/40 px-4 py-3 transition-colors hover:bg-muted/30">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-foreground font-['Inter']">
                  {position.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground font-['JetBrains_Mono']">
                  {position.employmentType ? (
                    <>
                      {position.employmentType} <span className="opacity-50">•</span>{" "}
                    </>
                  ) : null}
                  {startLabel} <span className="opacity-50">|</span> {endLabel}
                </p>
              </div>

              <ChevronDown
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  open && "rotate-180"
                )}
              />
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
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 pt-3">
                {responsibilities.length > 0 && (
                  <ul className="space-y-1.5">
                    {responsibilities.map((item, idx) => (
                      <li
                        key={`${position.id}-${idx}`}
                        className="flex gap-2 text-sm leading-relaxed text-foreground/75 font-['Inter']"
                      >
                        <span className="select-none text-muted-foreground">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {position.link && (
                  <a
                    href={position.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/30 px-2.5 py-1 text-xs font-semibold transition-colors hover:bg-muted font-['JetBrains_Mono']"
                    style={{ color: accent }}
                  >
                    {position.link.icon}
                    {position.link.label}
                  </a>
                )}

                {position.skills && position.skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {position.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground font-['JetBrains_Mono']"
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
    </div>
  );
}

export default WorkExperience;
