"use client";

import React, { useState, type ComponentProps, type ReactElement } from "react";
import { BriefcaseBusinessIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  link?: {
    href: string;
    label: string;
    icon?: ReactElement;
    color?: string;
  };
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
        <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-background">
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt={experience.companyName}
              className="size-8 object-cover"
              aria-hidden
            />
          ) : (
            <span className="flex size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        <h3 className="text-xl leading-snug font-semibold text-foreground">
          {experience.companyWebsite ? (
            <a
              className="underline decoration-current/30 decoration-1 underline-offset-4 transition-colors hover:decoration-current"
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
      </div>

      <div className="relative space-y-4 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-8px)] before:w-px before:bg-border/80">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
}

function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePositionItemType;
}) {
  const [open, setOpen] = useState(position.isExpanded ?? true);
  const ExperienceIcon = position.icon ?? <BriefcaseBusinessIcon className="size-4" />;

  const { start, end } = position.employmentPeriod;

  const lines = (position.description ?? "")
    .split("\n")
    .map((line) => line.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);

  return (
    <Collapsible open={open} onOpenChange={setOpen} disabled={!position.description} asChild>
      <div className="relative last:before:absolute last:before:h-full last:before:w-5 last:before:bg-background">
        <CollapsibleTrigger
          className={cn(
            "group not-prose block w-full select-none text-left",
            "focus-visible:outline-none focus-visible:ring-0",
            "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-8 before:rounded-lg hover:before:bg-muted/30",
            "data-disabled:before:content-none"
          )}
        >
          <div className="relative z-1 mb-1 flex items-start gap-3">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted text-muted-foreground">
              <span className="[&>svg]:size-5">{ExperienceIcon}</span>
            </div>

            <div className="flex-1">
              <h4 className="text-base font-medium text-foreground">
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

            <div className="shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180 group-disabled:hidden">
              <ChevronDown className="size-4" />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden">
          {lines.length > 0 && (
            <div className="pt-2 pl-10">
              <ul className="space-y-1.5">
                {lines.map((item, index) => (
                  <li
                    key={`${position.id}-${index}`}
                    className="flex gap-2 text-sm leading-relaxed text-foreground/75"
                  >
                    <span className="select-none text-muted-foreground">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {position.link && (
                <a
                  href={position.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-current/30 decoration-1 underline-offset-4 transition-colors hover:decoration-current"
                  style={{ color: position.link.color ?? "#924205" }}
                >
                  {position.link.icon}
                  {position.link.label}
                </a>
              )}
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

function Skill({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export default WorkExperience;
