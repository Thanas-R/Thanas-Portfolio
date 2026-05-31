"use client";

import React, { useState, type ComponentProps, type ReactElement } from "react";
import ReactMarkdown from "react-markdown";
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
  const threadColor = experience.accentColor ?? "#3B82F6";
  const threadStyle = {
    ["--thread-color" as any]: threadColor,
  } as React.CSSProperties;

  return (
    <div className="space-y-4 py-4" style={threadStyle}>
      <div className="not-prose flex items-center gap-3">
        <div
          className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background"
          style={{
            borderColor: threadColor,
          }}
        >
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt={experience.companyName}
              className="size-full rounded-[10px] object-cover"
              aria-hidden
            />
          ) : (
            <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        <h3 className="text-lg leading-snug font-semibold text-foreground">
          {experience.companyWebsite ? (
            <a
              className="underline decoration-current/30 decoration-1 underline-offset-3 transition-colors hover:decoration-current"
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
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-sky-500 opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-sky-500" />
            <span className="sr-only">Current Employer</span>
          </span>
        )}
      </div>

      <div className="relative space-y-4 before:absolute before:left-4 before:h-full before:w-px before:bg-[var(--thread-color)] before:opacity-30">
        {experience.positions.map((position) => (
          <ExperiencePositionItem
            key={position.id}
            position={position}
            accentColor={threadColor}
          />
        ))}
      </div>
    </div>
  );
}

function ExperiencePositionItem({
  position,
  accentColor,
}: {
  position: ExperiencePositionItemType;
  accentColor: string;
}) {
  const [open, setOpen] = useState(position.isExpanded ?? true);
  const ExperienceIcon = position.icon ?? (
    <BriefcaseBusinessIcon className="size-4.5" />
  );

  const { start, end } = position.employmentPeriod;

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      disabled={!position.description}
      asChild
    >
      <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
        <CollapsibleTrigger
          className={cn(
            "group block w-full select-none text-left not-prose",
            "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-9 before:rounded-lg hover:before:bg-muted/30",
            "data-disabled:before:content-none"
          )}
        >
          <div className="relative z-1 mb-1 flex items-start gap-3">
            <div
              className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground border border-muted-foreground/15 ring-1 ring-offset-1 ring-offset-background"
              style={{
                borderColor: accentColor,
                boxShadow: `0 0 0 1px ${accentColor}22`,
              }}
            >
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
                  <span className="mx-1 font-mono">—</span>
                  {end ?? "Present"}
                </span>
              </div>
            </div>

            <div
              className={cn(
                "shrink-0 text-muted-foreground transition-transform duration-200 [&_svg]:size-4.5",
                open && "rotate-180",
                "group-disabled:hidden"
              )}
            >
              <ChevronDownIcon />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden">
          {position.description && (
            <div className="pt-2 pl-10">
              <ReactMarkdown
                components={{
                  p: ({ children, ...props }) => (
                    <p
                      className="text-sm leading-relaxed text-foreground/75"
                      {...props}
                    >
                      {children}
                    </p>
                  ),
                  ul: ({ children, ...props }) => (
                    <ul className="space-y-1.5 list-none p-0 m-0" {...props}>
                      {children}
                    </ul>
                  ),
                  li: ({ children, ...props }) => (
                    <li
                      className="flex gap-2 text-sm leading-relaxed text-foreground/75"
                      {...props}
                    >
                      <span className="select-none text-muted-foreground">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  a: ({ children, ...props }) => (
                    <a
                      className="text-[#924205] underline decoration-[#924205]/30 underline-offset-3 transition-colors hover:decoration-[#924205]"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {position.description}
              </ReactMarkdown>
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
