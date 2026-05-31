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
        id: "pil-intern",
        title: "Research Intern",
        employmentPeriod: { start: "06.2026" },
        employmentType: "Intern",
        icon: <FlaskConical />,
        isExpanded: true,
        description: `- Joined as a summer research intern well before the usual eligibility window.
- Currently helping rebuild the lab's official website with the dev team.
- Picking up how a working research lab actually runs day to day.`,
        skills: ["React", "TypeScript", "Tailwind CSS", "Research", "UI/UX"],
      },
      {
        id: "pil-member",
        title: "Member",
        employmentPeriod: { start: "05.2026" },
        employmentType: "Member",
        icon: <CodeXml />,
        description: `- Selected into PIL, one of the more curious corners of campus.
- Contributing to dev work and shipping things alongside the team.
- Soaking up the kind of things you don't get from a textbook.`,
        skills: ["Collaboration", "Frontend", "Innovation", "Web Dev"],
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
        employmentType: "Building",
        icon: <Lightbulb />,
        isExpanded: true,
        description: `- Started Virdis as a side mission to actually help farmers.
- AI-assisted farm boundary mapping with crop-health analytics on satellite data.
- Still very early, building in public and iterating fast.`,
        skills: [
          "React",
          "TypeScript",
          "Mapbox",
          "Earth Engine",
          "Supabase",
          "Gemini AI",
          "Product",
        ],
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
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-['JetBrains_Mono'] mb-1">
              What I'm up to
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight font-['Averia_Serif_Libre']">
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
