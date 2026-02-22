import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TbBrandGithubFilled } from "react-icons/tb";
import { ExternalLink } from 'lucide-react';

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
        <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
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
      style={{ fontFamily: "'Quicksand', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Contact
          </p>

          {/* paragraph styled to match reference */}
          <p className="text-lg md:text-xl font-light text-muted-foreground mb-8 max-w-md">
            You can contact me using the form or via the links below.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-secondary/40 text-foreground text-base font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-secondary/40 text-foreground text-base font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring"
                required
              />
            </div>

            <textarea
              placeholder="Message"
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onKeyDown={handleKeyDown}
              className="w-full px-5 py-4 rounded-xl bg-secondary/40 text-foreground text-base font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring resize-y mb-4 min-h-[220px]"
              required
            />

            <div className="flex items-center gap-6">
              <button
                type="submit"
                disabled={sending}
                className="px-6 py-3 rounded-full bg-foreground text-background text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send message'}
              </button>
              <span className="text-base text-muted-foreground">
                or <kbd className="px-2 py-1 rounded border border-border text-xs font-mono">↵ Enter</kbd> to send
              </span>
            </div>
          </form>

          {/* Social links list */}
          <div className="border-t border-border pt-6 space-y-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between py-4 group"
              >
                <div className="flex items-center gap-4 text-muted-foreground group-hover:text-foreground transition-colors">
                  {/** icons + label */}
                  <div className="flex items-center gap-3">
                    {link.icon}
                    <span className="text-base font-medium">{link.label}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                  <span className="text-base">{link.value}</span>
                  <ExternalLink className="w-5 h-5" />
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
