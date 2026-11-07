"use client";

import React, { useState, type ComponentProps, type ReactElement, type ReactNode } from "react";
import { BriefcaseBusinessIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

export type ExperiencePositionItemType = {
  id: string;
  title: string;
  employmentPeriod: {
    start: string;
    end?: string;
  };
  employmentType?: string;
  description?: string;
  icon?: ReactElement;
  skills?: string[];
  isExpanded?: boolean;
};

export type ExperienceItemType = {
  id: string;
  companyName: string;
  location?: string;
  companyLogo?: string;
  companyWebsite?: string;
  logoBordered?: boolean;
  logoBorderColor?: string;
  positions: ExperiencePositionItemType[];
  isCurrentEmployer?: boolean;
};

export type WorkExperienceProps = {
  className?: string;
  experiences: ExperienceItemType[];
};

export function WorkExperience({ className, experiences }: WorkExperienceProps) {
  return (
    <div className={cn("w-full text-foreground", className)}>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </div>
  );
}

function ExperienceItem({ experience }: { experience: ExperienceItemType }) {
  return (
    <div className="space-y-4 py-4">
      {/* 1. Logo & Title Line */}
      <div className="not-prose flex items-center gap-4 -ml-2 md:-ml-0">
        <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-border bg-background shadow-xs">
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt={experience.companyName}
              className={cn(
                "size-full object-cover",
                experience.id === "virdis" && "[image-rendering:pixelated]"
              )}
              aria-hidden
            />
          ) : (
            <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        <h3
          className={cn(
            "text-xl md:text-3xl leading-snug text-foreground tracking-tight",
            experience.id === "pesu-innovation-lab" &&
  "font-['Oswald'] text-[1.65rem] md:text-[2.02rem] tracking-normal",

            experience.id === "qsg-technologies" && "font-['Space_Grotesk'] font-bold",
          )}
        >
          {experience.companyWebsite ? (
            <a
              className="transition-opacity hover:opacity-80"
              href={experience.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              {experience.companyName}
            </a>
          ) : (
            experience.companyName
          )}
        </h3>
        {experience.location && (
          <span className="ml-auto shrink-0 font-['JetBrains_Mono'] text-xs md:text-sm font-medium tracking-tight text-muted-foreground">
            {experience.location}
          </span>
        )}
      </div>

      {/* 2. Positions block indented right */}
      <div className="space-y-4 pt-1 pl-6 md:pl-9">
        {experience.positions.map((position, index) => (
          <ExperiencePositionItem
            key={position.id}
            position={position}
            isLast={index === experience.positions.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function ExperiencePositionItem({
  position,
  isLast,
}: {
  position: ExperiencePositionItemType;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(Boolean(position.isExpanded));
  const ExperienceIcon = position.icon ?? (
    <BriefcaseBusinessIcon className="h-4 w-4" />
  );

  const { start, end } = position.employmentPeriod;
  const hasSkills = Array.isArray(position.skills) && position.skills.length > 0;
  const hasDescription = Boolean(position.description);

  return (
    <div className="relative">
      {/* Vertical spine between positions (z-0 behind the solid icon badge) */}
      {!isLast && (
        <span
          className="absolute left-[1.125rem] -translate-x-1/2 top-9 -bottom-4 w-px bg-border pointer-events-none z-0"
          aria-hidden="true"
        />
      )}

      {/* Branch line from icon down to tags */}
      {hasSkills && (
        <span
          className="absolute left-[1.125rem] top-9 bottom-[14px] w-5 rounded-bl-lg border-b border-l border-border pointer-events-none z-0"
          aria-hidden="true"
        />
      )}

      <Collapsible
        open={open}
        onOpenChange={setOpen}
        disabled={!hasDescription}
      >
        <CollapsibleTrigger
          className={cn(
            "group not-prose block w-full select-none text-left",
            "relative rounded-lg p-1 -m-1 transition-colors hover:bg-muted/30",
            !hasDescription && "cursor-default"
          )}
        >
          <div className="relative z-10 flex items-start gap-3">
            {/* Position Icon badge (relative z-10 + bg-background solid opaque fill prevents bleed) */}
            <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground shadow-xs ring-1 ring-border/50 [&_svg]:h-4 [&_svg]:w-4">
              {ExperienceIcon}
            </div>

            {/* Position Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-semibold text-foreground leading-snug">
                {position.title}
              </h4>

              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
                {position.employmentType && (
                  <>
                    <span>{position.employmentType}</span>
                    <Separator
                      className="h-3.5 self-center"
                      orientation="vertical"
                    />
                  </>
                )}

                <span className="tabular-nums">
                  {start}
                  <span className="mx-1 font-mono">-</span>
                  {end ?? "Present"}
                </span>
              </div>
            </div>

            {/* ChevronsUpDown toggle icon */}
            {hasDescription && (
              <div className="shrink-0 text-muted-foreground/70 transition-colors group-hover:text-foreground [&_svg]:h-4 [&_svg]:w-4 pt-1">
                <ChevronsUpDown />
              </div>
            )}
          </div>
        </CollapsibleTrigger>

        {/* Collapsible description */}
        {hasDescription && (
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <div className="pt-2 pl-10 pr-2">
              <ul className="space-y-1.5">
                {position.description!
                  .split("\n")
                  .map((line) => line.trim().replace(/^[-•]\s*/, ""))
                  .filter(Boolean)
                  .map((item, index) => (
                    <li
                      key={`${position.id}-${index}`}
                      className="flex gap-2 text-sm leading-relaxed text-foreground/80"
                    >
                      <span className="select-none text-muted-foreground">•</span>
                      <span>{renderInlineText(item)}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>

      {/* Tags row */}
      {hasSkills && (
        <div className="relative mt-2 pl-10 pb-1">
          <ul className="not-prose flex flex-wrap gap-1.5">
            {position.skills?.map((skill, index) => (
              <li key={index} className="flex">
                <Skill>{skill}</Skill>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function renderInlineText(text: string): ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, label, href] = match;

    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <a
        key={`${href}-${match.index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#924205] dark:text-[#FEDE79] underline decoration-[#924205]/30 dark:decoration-[#FEDE79]/30 underline-offset-3 transition-colors hover:decoration-[#924205] dark:hover:decoration-[#FEDE79]"
      >
        {label}
      </a>
    );

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function Skill({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border/80 bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-muted/70",
        className
      )}
      {...props}
    />
  );
}

export default WorkExperience;
