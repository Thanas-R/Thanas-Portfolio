import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, FileText } from 'lucide-react';
import { useState } from 'react';
import { GlowingEffect } from '@/components/GlowingEffect';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
                  <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Email</p>
                    <p className="text-sm text-foreground font-medium">thanas5.rd@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+919141944808" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Phone</p>
                    <p className="text-sm text-foreground font-medium">+91 9141944808</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Location</p>
                    <p className="text-sm text-foreground font-medium">Bengaluru, Karnataka</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-0">
                <div className="flex gap-3 py-4">
                  <a href="https://github.com/Thanas-R" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href="https://www.linkedin.com/in/thanasr/" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <Link to="/resume"
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all">
                    <FileText className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="md:col-span-3">
              <div className="relative rounded-xl border border-border bg-card overflow-hidden">
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} disabled={false} />
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
