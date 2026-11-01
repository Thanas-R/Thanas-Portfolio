import {
  SiC,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiGo,
  SiReact,
  SiAngular,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiFastapi,
  SiNodedotjs,
  SiDocker,
  SiGit,
  SiGithub,
  SiBitbucket,
  SiVercel,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiSupabase,
  SiPostgresql,
  SiPytorch,
  SiPandas,
  SiPycharm,
} from 'react-icons/si';
import { BiLogoVisualStudio } from 'react-icons/bi';
import { FaJava } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  icon: React.ReactNode;
  url?: string;
}

interface TechGroup {
  label: string;
  items: TechItem[];
}

const groups: TechGroup[] = [
  {
    label: 'Languages',
    items: [
      { name: 'C', icon: <SiC />, url: 'https://en.cppreference.com/w/c' },
      { name: 'C++', icon: <SiCplusplus />, url: 'https://en.cppreference.com/w/cpp' },
      { name: 'Python', icon: <SiPython />, url: 'https://www.python.org/' },
      { name: 'Java', icon: <FaJava />, url: 'https://www.oracle.com/java/' },
      
      { name: 'Go', icon: <SiGo />, url: 'https://go.dev/' },
      { name: 'TypeScript', icon: <SiTypescript />, url: 'https://www.typescriptlang.org/' },
      { name: 'JavaScript', icon: <SiJavascript />, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React', icon: <SiReact />, url: 'https://reactjs.org/' },
      { name: 'Angular', icon: <SiAngular />, url: 'https://angular.dev/' },
      { name: 'Next.js', icon: <SiNextdotjs />, url: 'https://nextjs.org/' },
      { name: 'Vite', icon: <SiVite />, url: 'https://vite.dev/' },
      { name: 'Tailwind', icon: <SiTailwindcss />, url: 'https://tailwindcss.com/' },
      { name: 'HTML', icon: <SiHtml5 />, url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { name: 'CSS', icon: <SiCss3 />, url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    ],
  },
  {
    label: 'Backend & ML',
    items: [
      { name: 'Node.js', icon: <SiNodedotjs />, url: 'https://nodejs.org/' },
      { name: 'FastAPI', icon: <SiFastapi />, url: 'https://fastapi.tiangolo.com/' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, url: 'https://www.postgresql.org/' },
      { name: 'MySQL', icon: <SiMysql />, url: 'https://www.mysql.com/' },
      { name: 'MongoDB', icon: <SiMongodb />, url: 'https://www.mongodb.com/' },
      { name: 'Redis', icon: <SiRedis />, url: 'https://redis.io/' },
      { name: 'PyTorch', icon: <SiPytorch />, url: 'https://pytorch.org/' },
      { name: 'Pandas', icon: <SiPandas />, url: 'https://pandas.pydata.org/' },    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git', icon: <SiGit />, url: 'https://git-scm.com/' },
      { name: 'GitHub', icon: <SiGithub />, url: 'https://github.com/' },
      { name: 'Bitbucket', icon: <SiBitbucket />, url: 'https://bitbucket.org/' },
      { name: 'Docker', icon: <SiDocker />, url: 'https://www.docker.com/' },
      { name: 'VS Code', icon: <BiLogoVisualStudio />, url: 'https://code.visualstudio.com/' },
      { name: 'PyCharm', icon: <SiPycharm />, url: 'https://www.jetbrains.com/pycharm/' },
      { name: 'Vercel', icon: <SiVercel />, url: 'https://vercel.com/' },
    ],
  },
];

const Pill = ({ item, i }: { item: TechItem; i: number }) => (
  <motion.a
    href={item.url ?? '#'}
    target={item.url?.startsWith('http') ? '_blank' : undefined}
    rel="noopener noreferrer"
    aria-label={item.name}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay: i * 0.03 }}
    className="group inline-flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full
      bg-secondary/60 border border-foreground/10
      text-sm font-medium text-foreground/80
      hover:bg-foreground hover:text-background hover:border-foreground
      transition-colors duration-200 no-underline"
  >
    <span className="text-lg text-foreground/60 group-hover:text-background transition-colors duration-200">
      {item.icon}
    </span>
    {item.name}
  </motion.a>
);

const TechCarousel = () => {
  return (
    <section id="skills" className="relative px-6 py-12 mb-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-baseline gap-3 flex-wrap">
          <h3 className="font-['Averia_Serif_Libre'] text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Skills &amp; stacks.
          </h3>
          <span className="font-['Caveat'] text-xl md:text-2xl text-muted-foreground/70 -rotate-1 origin-left">
            stuff i work with
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item, i) => (
                  <Pill key={item.name} item={item} i={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechCarousel;
