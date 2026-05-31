import { CodeXml, Lightbulb, FlaskConical } from "lucide-react";
import type { ExperienceItemType } from "@/components/work-experience";
import { WorkExperience } from "@/components/work-experience";

import pilLogo from "@/assets/exp-pesu-il.png";
import virdisLogo from "@/assets/exp-virdis.png";

const EXPERIENCES: ExperienceItemType[] = [
  {
    id: "pesu-innovation-lab",
    companyName: "PESU Innovation Lab",
    companyLogo: pilLogo,
    companyWebsite: "https://www.theinnovationlab.in/",
    isCurrentEmployer: true,
    positions: [
      {
        id: "pil-member",
        title: "Member",
        employmentPeriod: { start: "May 2026" },
        employmentType: "Full-time",
        icon: <CodeXml />,
        isExpanded: true,
        description: `- Selected for PIL, the best lab on campus.
- Currently helping rebuild the lab's official website with the dev team.
- Picking up how a working research lab actually runs day to day.
- Soaking up the kind of things you don't get from a textbook.`,
        skills: ["AI", "Collaboration", "Web Dev", "Networking"],
      },
      {
        id: "pil-intern",
        title: "Research Intern",
        employmentPeriod: { start: "June 2026" },
        employmentType: "Internship",
        icon: <FlaskConical />,
        description: `I will add it soon from experience.`,
        skills: ["Research", "Data", "Analysis", "Machine Learning"],
      },
    ],
  },
  {
    id: "virdis",
    companyName: "Virdis",
    companyLogo: virdisLogo,
    companyWebsite: "https://virdis.vercel.app",
    isCurrentEmployer: true,
    positions: [
      {
        id: "virdis-founder",
        title: "Founder",
        employmentPeriod: { start: "July 2026" },
        employmentType: "Building",
        icon: <Lightbulb />,
        isExpanded: true,
        description: `- Started Virdis as a project to help farmers.
- AI-assisted farm boundary mapping with crop-health analytics on Sentinel-2 satellite data.
- I shared a [Reddit post](https://www.reddit.com/r/vibecoding/comments/1tg1lqy/i_vibecoded_something_that_really_might_help/) and the feedback was strong enough to push me to keep building it.`,
        skills: ["Owner", "Data Analytics", "Satellite", "Sentinel-2"],
      },
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full py-16 md:py-20">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="mb-8">
          <p className="mb-1 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            What I'm up to
          </p>
          <h2 className="font-['Averia_Serif_Libre'] text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Experience
          </h2>
        </div>

        <WorkExperience className="w-full" experiences={EXPERIENCES} />
      </div>
    </section>
  );
}
