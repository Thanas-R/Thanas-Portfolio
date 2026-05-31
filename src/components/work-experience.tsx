"use client";

import React, { useState, type ComponentProps, type ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    <div className="space-y-5 py-5">
      <div className="not-prose flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-background">
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt={experience.companyName}
              className="size-full object-cover"
              aria-hidden
            />
          ) : (
            <span className="flex size-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        <h3 className="text-2xl leading-snug font-semibold text-foreground md:text-[1.6rem]">
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

      <div className="relative space-y-5 before:absolute before:left-4 before:h-full before:w-px before:bg-border/80">
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
  const ExperienceIcon = position.icon ?? <BriefcaseBusinessIcon className="size-6" />;

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
            "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-9 before:rounded-xl hover:before:bg-muted/30",
            "data-disabled:before:content-none"
          )}
        >
          <div className="relative z-1 mb-1 flex items-start gap-4">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl",
                "border border-border/60 bg-muted text-muted-foreground"
              )}
            >
              <span className="[&>svg]:size-5">{ExperienceIcon}</span>
            </div>

            <div className="flex-1">
              <h4 className="text-balance text-xl font-semibold text-foreground md:text-[1.35rem]">
                {position.title}
              </h4>

              <div className="mt-1.5 flex items-center gap-2 text-base text-muted-foreground md:text-[1.05rem]">
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
              <ChevronDown className="size-5" />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden">
          {lines.length > 0 && (
            <div className="pt-3 pl-14">
              <ul className="space-y-2">
                {lines.map((item, index) => (
                  <li
                    key={`${position.id}-${index}`}
                    className="flex gap-2 text-[1.02rem] leading-relaxed text-foreground/80 md:text-[1.08rem]"
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
                  className="mt-4 inline-flex items-center gap-1.5 text-[0.98rem] font-semibold underline decoration-current/30 decoration-1 underline-offset-4 transition-colors hover:decoration-current"
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
          <ul className="not-prose flex flex-wrap gap-2 pt-4 pl-14">
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
        "inline-flex items-center rounded-lg border bg-muted/50 px-2 py-1 font-mono text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export default WorkExperience;
