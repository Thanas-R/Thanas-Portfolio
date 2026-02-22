import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';

const socials = [
  { icon: Mail, label: 'Email', value: 'thanas5.rd@gmail.com', href: 'mailto:thanas5.rd@gmail.com' },
  { icon: Github, label: 'GitHub', value: '@Thanas-R', href: 'https://github.com/Thanas-R' },
  { icon: Linkedin, label: 'LinkedIn', value: '/in/thanasr', href: 'https://www.linkedin.com/in/thanasr/' },
  { icon: SiDiscord, label: 'Discord', value: 'darkspacepirate', href: '#' },
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
    <section id="contact" className="relative py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Contact
          </p>
          <p className="text-muted-foreground text-base mb-8 max-w-md">
            You can contact me using the form or via the links below.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground/50 text-sm border-0 outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground/50 text-sm border-0 outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
            <textarea
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground/50 text-sm border-0 outline-none focus:ring-2 focus:ring-ring resize-y"
              required
            />
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={sending}
                className="px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send message'}
              </button>
              <span className="text-xs text-muted-foreground">
                or <kbd className="px-1.5 py-0.5 rounded border border-border text-xs font-mono">↵</kbd> Enter to send
              </span>
            </div>
          </form>

          {/* Social links */}
          <div className="divide-y divide-border">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between py-3 px-1 group"
              >
                <div className="flex items-center gap-3">
                  <s.icon size={18} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{s.label}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  <span>{s.value}</span>
                  <ArrowUpRight size={14} />
                </div>
              </a>
            ))}
          </div>

          {/* Footer signature */}
          <div className="flex justify-center mt-16">
            <p className="text-4xl text-foreground/20 italic" style={{ fontFamily: "'Georgia', serif" }}>
              Thanas
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
