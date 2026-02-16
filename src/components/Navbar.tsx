import { motion } from 'framer-motion';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" className="font-['Space_Grotesk'] text-lg font-semibold text-foreground tracking-tight">
          thanas.
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:thanas5.rd@gmail.com"
          className="text-sm font-medium border border-foreground/20 px-4 py-1.5 rounded-full text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Say hi
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
