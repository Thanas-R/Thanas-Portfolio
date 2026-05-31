import { motion } from "framer-motion";
import { CodeXml, Lightbulb, FlaskConical } from "lucide-react";
import { FaReddit } from "react-icons/fa";
import {
  WorkExperience,
  type ExperienceItemType,
} from "@/components/work-experience";
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
        icon: <FlaskConical className="w-4 h-4" />,
        isExpanded: true,
        bullets: [
          "Joined as a summer research intern well before the usual eligibility window.",
          "Currently helping rebuild the lab's official website with the dev team.",
          "Picking up how a working research lab actually runs day to day.",
        ],
        skills: ["React", "TypeScript", "Tailwind CSS", "Research", "UI/UX"],
      },
      {
        id: "pil-member",
        title: "Member",
        employmentPeriod: { start: "05.2026" },
        employmentType: "Member",
        icon: <CodeXml className="w-4 h-4" />,
        bullets: [
          "Selected into PIL, one of the more curious corners of campus.",
          "Contributing to dev work and shipping things alongside the team.",
          "Soaking up the kind of things you don't get from a textbook.",
        ],
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
        icon: <Lightbulb className="w-4 h-4" />,
        isExpanded: true,
        bullets: [
          "Started Virdis as a side mission to actually help farmers.",
          "AI-assisted farm boundary mapping with crop-health analytics on satellite data.",
          "Still very early, building loudly in public — updates dropping soon.",
        ],
        link: {
          href: "https://www.reddit.com/r/vibecoding/comments/1tg1lqy/i_vibecoded_something_that_really_might_help/",
          label: "Read the Reddit post",
          icon: <FaReddit className="w-3.5 h-3.5" />,
        },
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
    <section id="experience" className="relative py-12 w-full">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-['JetBrains_Mono'] mb-1">
              What I'm up to
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight font-['Averia_Serif_Libre']">
              Experience
            </h2>
          </div>
          <WorkExperience experiences={EXPERIENCES} />
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
