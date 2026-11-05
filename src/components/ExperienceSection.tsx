import { CodeXml, Lightbulb, FlaskConical,  Briefcase } from "lucide-react";
import type { ExperienceItemType } from "@/components/work-experience";
import { WorkExperience } from "@/components/work-experience";

import expQsg from "@/assets/exp-qsg.webp";
import pilLogo from "@/assets/exp-pesu-il.webp";
import virdisLogo from "@/assets/exp-virdis.webp";

const EXPERIENCES: ExperienceItemType[] = [
  {
    id: "pesu-innovation-lab",
    companyName: "PESU Innovation Lab",
    companyLogo: pilLogo,
    companyWebsite: "https://www.theinnovationlab.in/",
    logoBordered: true,
    logoBorderColor: "ring-white",
    isCurrentEmployer: true,
    positions: [
      {
        id: "pil-member",
        title: "Member",
        employmentPeriod: { start: "May 2026" },
        employmentType: "Full-time",
        icon: <CodeXml />,
        isExpanded: false,
        description: `- Selected as a member of the PESU Innovation Lab, where I collaborate with talented peers and work on research and software projects.`,
        skills: ["Research", "Lab", "Technical", "Networking"],
      },
      {
        id: "pil-intern",
        title: "Research Intern",
        employmentPeriod: { start: "2027", end: "????" },
        employmentType: "Internship",
        icon: <FlaskConical />,
        description: `I will add it soon from experience.`,
      },
    ],
  },
 {
  id: "qsg-technologies",
  companyName: "QSG Technologies",
  companyLogo: expQsg,
  logoBordered: true,
  logoBorderColor: "ring-black",
  isCurrentEmployer: true,
  positions: [
    {
      id: "qsg-intern",
      title: "Summer Intern",
      employmentPeriod: { start: "June 2026", end: "July 2026" },
      employmentType: "Full-time",
      icon: <Briefcase />,
      isExpanded: true,
      description: `- Worked on two software projects involving full-stack web development and automation using Go (Golang), Angular, TypeScript, SQL, HTML, CSS, Git, AWS, Bitbucket, Oauth and REST APIs.
- Collaborated on developing, testing, and optimizing scalable applications while gaining hands-on experience with modern software development practices.`,
      skills: [
        "Automation",
        "ML",
        "Web-dev", "Agentic Workflow",
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
        isExpanded: false,
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
          <div className="flex items-baseline gap-3 flex-wrap">
            <h2 className="font-['Averia_Serif_Libre'] text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Experience
            </h2>
          </div>
        </div>

        <WorkExperience className="w-full" experiences={EXPERIENCES} />
      </div>
    </section>
  );
}
