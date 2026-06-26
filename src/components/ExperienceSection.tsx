import { CodeXml, Lightbulb, FlaskConical,  Briefcase } from "lucide-react";
import type { ExperienceItemType } from "@/components/work-experience";
import { WorkExperience } from "@/components/work-experience";

import expQsg from "@/assets/exp-qsg.jpg";
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
  id: "qsg-technologies",
  companyName: "QSG Technologies",
  companyLogo: expQsg,
  isCurrentEmployer: true,
  positions: [
    {
      id: "qsg-intern",
      title: "Summer Intern",
      employmentPeriod: { start: "June 2026", end: "July 2026" },
      employmentType: "Full-time",
      icon: <Briefcase />,
      isExpanded: true,
      description: `- Will be working on building ai models with the company.
- Hoping to gain first-hand industry experience while working at the World Trade Cente.`,
      skills: [
        "Artificial Intelligence",
        "Machine Learning",
        "Model Development",
        "Industry Experience",
      ],
    },
  ],
},
  {
    id: "virdis",
    companyName: "Virdis",
    companyLogo: virdisLogo,
    companyWebsite: "https://virdis.thanas.dev",
    isCurrentEmployer: false,
    positions: [
      {
        id: "virdis-founder",
        title: "Creator",
        employmentPeriod: { start: "February 2026" },
        employmentType: "Building",
        icon: <Lightbulb />,
        isExpanded: true,
        description: `- Started Virdis as a project to help farmers, an AI-assisted farm boundary mapping with crop-health analytics on Sentinel-2 satellite data.
- I shared this project on [Reddit](https://www.reddit.com/r/vibecoding/comments/1tg1lqy/i_vibecoded_something_that_really_might_help/) and got lots on love on this project.`,
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
