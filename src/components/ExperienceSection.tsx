import { motion } from "framer-motion";
import { CodeXml, Lightbulb, FlaskConical } from "lucide-react";
import type { ExperienceItemType } from "@/components/work-experience";
import { WorkExperience } from "@/components/work-experience";

import pilLogo from "@/assets/exp-pesu-il.png";
import virdisLogo from "@/assets/exp-virdis.png";

const ACCENT_BLUE = "#3B82F6";

const EXPERIENCES: ExperienceItemType[] = [
  {
    id: "pesu-innovation-lab",
    companyName: "PESU Innovation Lab",
    companyLogo: pilLogo,
    accentColor: ACCENT_BLUE,
    isCurrentEmployer: true,
    positions: [
      {
        id: "pil-member",
        title: "Member",
        employmentPeriod: { start: "05.2026" },
        employmentType: "Member",
        icon: <CodeXml />,
        isExpanded: true,
        description: `- Selected for PIL, the best lab on campus.
- Currently helping rebuild the lab's official website with the dev team.
- Picking up how a working research lab actually runs day to day.
- Soaking up the kind of things you don't get from a textbook.`,
        skills: ["Innovation Lab", "Research", "Collaboration", "Web Dev"],
      },
      {
        id: "pil-intern",
        title: "Research Intern",
        employmentPeriod: { start: "06.2026" },
        employmentType: "Intern",
        icon: <FlaskConical />,
        isExpanded: true,
        description: `I will add content soon.`,
      },
    ],
  },
  {
    id: "virdis",
    companyName: "Virdis",
    companyLogo: virdisLogo,
    companyWebsite: "https://virdis.vercel.app",
    accentColor: ACCENT_BLUE,
    isCurrentEmployer: true,
    positions: [
      {
        id: "virdis-founder",
        title: "Founder",
        employmentPeriod: { start: "07.2026" },
        employmentType: "Hackathon project",
        icon: <Lightbulb />,
        isExpanded: true,
        description: `- Started Virdis as a hackathon project to help farmers.
- AI-assisted farm boundary mapping with crop-health analytics on Sentinel-2 satellite data.
- I shared it on [Reddit](https://www.reddit.com/r/vibecoding/comments/1tg1lqy/i_vibecoded_something_that_really_might_help/) and the feedback was strong enough to push me to keep building.`,
        skills: ["Ownership", "Sentinel-2", "Farmers", "Analytics"],
      },
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="relative w-full py-16 md:py-20">
      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="mb-8">
            <p className="mb-1 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              What I'm up to
            </p>
            <h2 className="font-['Averia_Serif_Libre'] text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Experience
            </h2>
          </div>

          <WorkExperience className="w-full" experiences={EXPERIENCES} />
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
