import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TbBrandGithubFilled } from "react-icons/tb";
import { ArrowUpRight } from 'lucide-react';

const contactLinks = [
  {
    label: 'Email',
    value: 'thanas5.rd@gmail.com',
    href: 'mailto:thanas5.rd@gmail.com',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'Thanas-R',
    href: 'https://github.com/Thanas-R',
    icon: <TbBrandGithubFilled className="w-6 h-6" aria-hidden />,
  },
  {
    label: 'LinkedIn',
    value: 'thanasr',
    href: 'https://www.linkedin.com/in/thanasr/',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <circle cx="4.983" cy="5.009" r="2.188" />
        <path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    value: '@darkspacepirate',
    href: '#',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.22 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // allow shift+enter for new line, plain enter submits
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const formEl = e.currentTarget.closest('form');
      if (formEl) formEl.requestSubmit();
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 px-6"
      style={{ fontFamily: "'Quicksand', ui-sans-serif, system-ui" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          {/* slightly reduced heading size */}
          <p className="text-sm md:text-base font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Contact
          </p>

          {/* bold but a bit lighter in color */}
          <p className="text-lg md:text-xl font-semibold text-foreground/60 mb-8 md:whitespace-nowrap">
            You can contact me using the form or via the links below.
          </p>

          {/* form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-[#F8F8F8] dark:bg-secondary/30 text-foreground text-lg font-medium dark:font-semibold placeholder:text-muted-foreground/70 placeholder:font-medium focus:outline-none focus:ring-1 focus:ring-ring"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-secondary/50 dark:bg-secondary/30 text-foreground text-lg font-medium dark:font-semibold placeholder:text-muted-foreground/70 placeholder:font-medium focus:outline-none focus:ring-1 focus:ring-ring"
                required
              />
            </div>

            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onKeyDown={handleKeyDown}
              className="w-full px-5 py-4 rounded-xl bg-secondary/50 dark:bg-secondary/30 text-foreground text-lg font-medium dark:font-semibold placeholder:text-muted-foreground/70 placeholder:font-medium focus:outline-none focus:ring-1 focus:ring-ring resize-y mb-6 min-h-[200px] overflow-auto scrollbar-hide"
              required
            />

            {/* Button LEFT + Enter hint RIGHT */}
            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={sending}
                className="px-8 py-3 rounded-full bg-foreground text-background text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send message'}
              </button>

              {/* Enter guide stays on the right; visible on all sizes but compact on mobile */}
              <span className="text-sm text-foreground/60 items-center gap-2 whitespace-nowrap flex">
                <span className="hidden sm:inline">Press</span>
                <kbd className="px-2.5 py-1 rounded-md border border-border text-xs font-mono bg-secondary/40">
                  ↵ Enter
                </kbd>
              </span>
            </div>
          </form>

          {/* socials — plain icons, tighter spacing, larger values, gray in both modes */}
          <div className="pt-2 space-y-1">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between py-2 group"
              >
                <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                  {/* icon (no bg/pill) */}
                  <div className="flex items-center justify-center text-muted-foreground group-hover:text-foreground">
                    {link.icon}
                  </div>

                  <span className="text-base font-semibold text-muted-foreground">
                    {link.label}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                  <span className="text-lg font-medium text-muted-foreground">
                    {link.value}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
