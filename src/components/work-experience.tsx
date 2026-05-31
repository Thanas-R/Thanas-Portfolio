"use client";

import React, { useState, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

/** Parse "MM.YYYY" or "YYYY" → display year only ("2025"). */
function formatYear(s: string): string {
  if (!s) return "";
  if (s.includes(".")) return s.split(".")[1];
  return s;
}

export function WorkExperience({ className, experiences }: WorkExperienceProps) {
  return (
    <div className={cn("flex flex-col divide-y divide-border/60 border-y border-border/60", className)}>
      {experiences.map((exp) => (
        <ExperienceItem key={exp.id} experience={exp} />
      ))}
    </div>
  );
}

function ExperienceItem({ experience }: { experience: ExperienceItemType }) {
  const accent = experience.accentColor ?? "#3B82F6";
  return (
    <div className="py-4">
      {/* Company header row */}
      <div className="flex items-center gap-3 px-1 mb-2">
        <div className="size-8 rounded-full overflow-hidden flex items-center justify-center bg-card border border-border shrink-0">
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt={`${experience.companyName} logo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-['JetBrains_Mono'] text-sm font-medium text-foreground truncate">
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
          </span>
          {experience.isCurrentEmployer && (
            <span className="relative inline-flex size-2 items-center justify-center" aria-label="Current">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: accent }}
              />
              <span
                className="relative inline-flex size-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
            </span>
          )}
        </div>
      </div>

      {/* Vertical thread + positions */}
      <div className="relative pl-4 ml-3">
        {experience.positions.length > 1 && (
          <div
            className="absolute left-[15px] top-5 bottom-5 w-px bg-border"
            aria-hidden
          />
        )}
        <div className="flex flex-col">
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
  const startYear = formatYear(start);
  const endLabel = end ? formatYear(end) : "Present";

  return (
    <div className="relative py-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 text-left group"
      >
        <div className="size-8 rounded-md flex items-center justify-center shrink-0 bg-muted/50 border border-border text-muted-foreground group-hover:text-foreground transition-colors relative z-[1]">
          {position.icon ?? <Briefcase className="w-4 h-4" />}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-foreground font-['Inter'] truncate">
                {position.title}
              </p>
              <p className="text-xs text-muted-foreground font-['JetBrains_Mono'] mt-0.5">
                {position.employmentType && (
                  <>
                    {position.employmentType}{" "}
                    <span className="opacity-50">·</span>{" "}
                  </>
                )}
                {startYear} <span className="opacity-50">|</span> {endLabel}
              </p>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200",
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
            <div className="pl-11 pt-3 space-y-3">
              {(position.bullets && position.bullets.length > 0) ? (
                <ul className="space-y-1.5">
                  {position.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="text-sm text-foreground/75 font-['Inter'] leading-relaxed flex gap-2"
                    >
                      <span className="text-muted-foreground select-none">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : position.description ? (
                <p className="text-sm leading-relaxed text-foreground/75 font-['Inter'] whitespace-pre-line">
                  {position.description}
                </p>
              ) : null}

              {position.link && (
                <a
                  href={position.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-md border border-border bg-muted/40 px-2.5 py-1 hover:bg-muted transition-colors font-['JetBrains_Mono']"
                  style={{ color: accent }}
                >
                  {position.link.icon}
                  {position.link.label}
                </a>
              )}

              {position.skills && position.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {position.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-border text-muted-foreground font-['JetBrains_Mono']"
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
