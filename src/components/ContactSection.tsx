import { motion } from 'framer-motion';
import { useState } from 'react';
import { GlowingEffect } from '@/components/GlowingEffect';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TbBrandGithubFilled } from "react-icons/tb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const contactSocials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Thanas-R',
    tooltip: 'Thanas-R',
    icon: <TbBrandGithubFilled className="w-6 h-6" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thanasr/',
    tooltip: 'Thanas R',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="4.983" cy="5.009" r="2.188" />
        <path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: '#',
    tooltip: 'darkspacepirate',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
      </svg>
    ),
  },
  {
    label: 'Resume',
    href: '/resume',
    tooltip: 'View Resume',
    isInternal: true,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
      </svg>
    ),
  },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: form,
      });
      if (error) throw error;
      if (data?.success) {
        toast.success('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error(data?.error || 'Failed to send');
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 px-6 pt-0">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="mt-10 grid md:grid-cols-5 gap-8 py-6">
            {/* Left — contact info */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-5">
                <a href="mailto:thanas5.rd@gmail.com" className="flex items-center gap-4 group">
                  <svg className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z" />
                  </svg>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Email</p>
                    <p className="text-sm text-foreground font-medium">thanas5.rd@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+919141944808" className="flex items-center gap-4 group">
                  <svg className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Phone</p>
                    <p className="text-sm text-foreground font-medium">+91 9141944808</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Location</p>
                    <p className="text-sm text-foreground font-medium">Bengaluru, Karnataka</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-0">
                <TooltipProvider delayDuration={100}>
                  <div className="flex gap-4 py-4">
                    {contactSocials.map((s) => (
                      <Tooltip key={s.label}>
                        <TooltipTrigger asChild>
                          {s.isInternal ? (
                            <Link
                              to={s.href}
                              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                              aria-label={s.label}
                            >
                              {s.icon}
                            </Link>
                          ) : (
                            <a
                              href={s.href}
                              target={s.href.startsWith('http') ? '_blank' : undefined}
                              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                              aria-label={s.label}
                            >
                              {s.icon}
                            </a>
                          )}
                        </TooltipTrigger>
                        <TooltipContent side="top" className="font-['Space_Grotesk']">
                          {s.tooltip}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="md:col-span-3">
              <div className="relative rounded-xl border border-border bg-card overflow-hidden">
                <GlowingEffect spread={40} proximity={64} borderWidth={2} disabled={false} />
                <form onSubmit={handleSubmit} className="relative z-10 p-6 space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-foreground font-['Space_Grotesk']">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1.5 w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground font-['Space_Grotesk']">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1.5 w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground font-['Space_Grotesk']">Message</label>
                    <textarea
                      placeholder="Your message..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-1.5 w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring resize-y"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
