import { CodeXml, Lightbulb, FlaskConical,  Briefcase } from "lucide-react";
import type { ExperienceItemType } from "@/components/work-experience";
import { WorkExperience } from "@/components/work-experience";

import expQsg from "@/assets/exp-qsg.webp";
import pilLogo from "@/assets/exp-pesu-il.webp";
import virdisLogo from "@/assets/exp-virdis.webp";

const EXPERIENCES: ExperienceItemType[] = [
  {
    id: "pesu-innovation-lab",
    companyName: "PES Innovation Lab",
      location: "PES University, Blr",
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
        description: `Part of the most prestigious lab in PESU which is sponsored by Akamai & also served as one of the organisers for Hashcode #14`,
              skills: [
        "Research",
        "Logistics",
        "Networking",
      ],
      },
      {
        id: "pil-intern",
        title: "Research Intern",
        employmentPeriod: { start: "2027", end: "????" },
        employmentType: "Internship",
        icon: <FlaskConical />,
        description: `Will update it later, when i do my internship in summer 2027 <3`,
      },
    ],
  },
 {
  id: "qsg-technologies",
  companyName: "QSG Technologies",
  location: "World Trade Center, Blr",
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
- Collaborated on developing, testing & optimizing scalable applications while gaining hands-on experience with modern software development practices.`,
      skills: [
        "Automation",
        "GO","Angular",
        "Team-work", "Agentic Workflow",
        "Industry Experience",
      ],
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
