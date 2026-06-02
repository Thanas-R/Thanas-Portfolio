"use client";

import React, { useState, type ComponentProps, type ReactElement, type ReactNode } from "react";
import { BriefcaseBusinessIcon, ChevronDownIcon } from "lucide-react";
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
      <div className="not-prose flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-background">
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt={experience.companyName}
              className="size-full rounded-md object-cover"
              aria-hidden
            />
          ) : (
            <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        <h3 className="text-lg leading-snug font-semibold text-foreground">
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

        {experience.isCurrentEmployer && (
          <span
            className="relative flex items-center justify-center"
            aria-label="Current Employer"
          >
            {/* CHANGED: Replaced bg-sky-500 with bg-[#43B581] */}
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-[#43B581] opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-[#43B581]" />
            <span className="sr-only">Current Employer</span>
          </span>
        )}
      </div>

      <div className="space-y-4">
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

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      disabled={!position.description}
      asChild
    >
      <div
        className={cn(
          "relative",
          !isLast &&
            "after:absolute after:left-4 after:top-4 after:-bottom-4 after:w-px after:bg-border after:content-['']"
        )}
      >
        <CollapsibleTrigger
          className={cn(
            "group not-prose block w-full select-none text-left",
            "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-10 before:rounded-lg hover:before:bg-muted/30",
            "data-disabled:before:content-none"
          )}
        >
          <div className="relative z-10 mb-1 flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground ring-1 ring-border/60 ring-offset-1 ring-offset-background [&_svg]:h-4 [&_svg]:w-4">
              {ExperienceIcon}
            </div>

            <div className="flex-1">
              <h4 className="text-balance text-base font-medium text-foreground">
                {position.title}
              </h4>

              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                {position.employmentType && (
                  <>
                    <span>{position.employmentType}</span>
                    <Separator
                      className="data-vertical:h-4 data-vertical:self-center"
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

            <div
              className={cn(
                "shrink-0 text-muted-foreground transition-transform duration-200 [&_svg]:h-4 [&_svg]:w-4",
                open && "rotate-180",
                "group-disabled:hidden"
              )}
            >
              <ChevronDownIcon />
            </div>
          </div>
        </CollapsibleTrigger>

        {/* CHANGED: Added animation classes to CollapsibleContent */}
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          {position.description && (
            <div className="pt-2 pl-10">
              <ul className="space-y-1.5">
                {position.description
                  .split("\n")
                  .map((line) => line.trim().replace(/^[-•]\s*/, ""))
                  .filter(Boolean)
                  .map((item, index) => (
                    <li
                      key={`${position.id}-${index}`}
                      className="flex gap-2 text-sm leading-relaxed text-foreground/75"
                    >
                      <span className="select-none text-muted-foreground">•</span>
                      <span>{renderInlineText(item)}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </CollapsibleContent>

        {Array.isArray(position.skills) && position.skills.length > 0 && (
          <ul className="not-prose flex flex-wrap gap-1.5 pt-3 pl-10">
            {position.skills.map((skill, index) => (
              <li key={index} className="flex">
                <Skill>{skill}</Skill>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Collapsible>
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
        className="text-[#FEDE79] underline decoration-[#FEDE79]/30 underline-offset-3 transition-colors hover:decoration-[#FEDE79]"
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
        "inline-flex items-center rounded-lg border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export default WorkExperience;
