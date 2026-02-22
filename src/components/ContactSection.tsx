// (only the outer wrapper classes were updated)
import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TbBrandGithubFilled } from "react-icons/tb";
import { ExternalLink } from 'lucide-react';

// contactLinks unchanged...

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
      {/* NOTE: changed max-w-5xl -> w-full mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 */}
      <div className="w-full mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
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
          <form onSubmit={handleSubmit} className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/40 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/40 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
                required
              />
            </div>
            <textarea
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/40 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring resize-y mb-4"
              required
            />
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={sending}
                className="px-6 py-2.5 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send message'}
              </button>
              <span className="text-sm text-muted-foreground">
                or <kbd className="px-1.5 py-0.5 rounded border border-border text-xs font-mono">↵ Enter</kbd> to send
              </span>
            </div>
          </form>

          {/* Social links list */}
          <div className="border-t border-border pt-6 space-y-0">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between py-3 group"
              >
                <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                  {link.icon}
                  <span className="text-sm font-medium">{link.label}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                  <span className="text-sm">{link.value}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
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
