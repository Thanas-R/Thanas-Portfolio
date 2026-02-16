import { motion } from 'framer-motion';
import avatar from '@/assets/avatar.png';

const socials = [
{
  label: 'GitHub',
  href: 'https://github.com/Thanas-R',
  icon:
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>

},
{
  label: 'LinkedIn',
  href: 'https://www.linkedin.com/in/thanasr/',
  icon:
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>

},
{
  label: 'Email',
  href: 'mailto:thanas5.rd@gmail.com',
  icon:
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>

},
{
  label: 'Spotify',
  href: 'https://open.spotify.com/user/1ruu5bmall8721u0hsnedbbxh',
  icon:
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15c3-1 5.5-1 8 .5" />
        <path d="M7 12.5c4-1.5 7-1.5 10 .5" />
        <path d="M6.5 10c4.5-1.5 8.5-1.5 11 1" />
      </svg>

},
{
  label: 'Discord',
  href: '#',
  icon:
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M20.33 3.67a19.6 19.6 0 0 0-4.83-1.5 14.5 14.5 0 0 0-.64 1.3 18.2 18.2 0 0 0-5.72 0 14.5 14.5 0 0 0-.64-1.3 19.6 19.6 0 0 0-4.83 1.5A20.2 20.2 0 0 0 .21 18.17a19.7 19.7 0 0 0 6 3.03 14.5 14.5 0 0 0 1.25-2.03 12.8 12.8 0 0 1-2-.96l.48-.37a14 14 0 0 0 12.12 0l.48.37c-.64.38-1.3.7-2 .96a14.5 14.5 0 0 0 1.25 2.03 19.7 19.7 0 0 0 6-3.03A20.2 20.2 0 0 0 20.33 3.67z" />
        <circle cx="9" cy="13" r="1" />
        <circle cx="15" cy="13" r="1" />
      </svg>

}];


const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-10 items-center py-[20px] pt-[20px]">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] tracking-tight font-['Space_Grotesk']">
            Thanas <span className="text-muted-foreground">R.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
            Developer & creative problem-solver. Building thoughtful digital experiences with code.
          </p>
          <div className="mt-8 flex items-center gap-4">
            {socials.map((s) =>
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label={s.label}
              title={s.label === 'Discord' ? 'darkspacepirate' : s.label}>

                {s.icon}
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0, 1] }}
          className="flex justify-center md:justify-end">

          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <img
              src={avatar}
              alt="Thanas R"
              className="w-full h-full object-cover rounded-2xl border-2 border-foreground/10"
              style={{ imageRendering: 'pixelated' }} />

          </div>
        </motion.div>
      </div>
    </section>);

};

export default HeroSection;