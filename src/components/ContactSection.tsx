import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, FileText, Send } from 'lucide-react';
import { useState } from 'react';
import { GlowingEffect } from '@/components/GlowingEffect';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be connected to Resend API later
    window.location.href = `mailto:thanas5.rd@gmail.com?subject=Message from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
  };

  return (
    <section id="contact" className="relative py-16 px-6 pt-[32px]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-['Space_Grotesk'] tracking-tight">
            Get in Touch
          </h2>
          



          <div className="mt-10 grid md:grid-cols-5 gap-8">
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

              {/* Social links */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Socials</p>
                <div className="flex gap-3">
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
                      required />

                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground font-['Space_Grotesk']">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1.5 w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
                      required />

                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground font-['Space_Grotesk']">Message</label>
                    <textarea
                      placeholder="Your message..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-1.5 w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring resize-y"
                      required />

                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity">

                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default ContactSection;