<section
  id="contact"
  className="relative py-20 px-6"
  style={{ fontFamily: "'Quicksand', ui-sans-serif, system-ui" }}
>
  <div className="max-w-3xl mx-auto">
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
    >

      {/* Section Label */}
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-3">
        Contact
      </p>

      {/* Description */}
      <p className="text-[17px] font-medium text-foreground/60 mb-10">
        You can contact me using the form or via the links below.
      </p>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mb-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg
            bg-[#F8F8F8] dark:bg-secondary/30
            border border-[#F6F6F6] dark:border-border
            text-[15px] font-medium tracking-tight
            placeholder:text-muted-foreground/70
            focus:outline-none focus:ring-1 focus:ring-foreground/20
            transition-all"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg
            bg-[#F8F8F8] dark:bg-secondary/30
            border border-[#F6F6F6] dark:border-border
            text-[15px] font-medium tracking-tight
            placeholder:text-muted-foreground/70
            focus:outline-none focus:ring-1 focus:ring-foreground/20
            transition-all"
            required
          />
        </div>

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 rounded-lg
          bg-[#F8F8F8] dark:bg-secondary/30
          border border-[#F6F6F6] dark:border-border
          text-[15px] font-medium tracking-tight
          placeholder:text-muted-foreground/70
          focus:outline-none focus:ring-1 focus:ring-foreground/20
          resize-y mb-6 min-h-[180px]
          transition-all"
          required
        />

        {/* Button Row */}
        <div className="flex items-center justify-between gap-4">

          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2
            px-5 py-2.5
            rounded-lg
            bg-foreground text-background
            text-[15px] font-medium tracking-tight
            hover:opacity-90
            transition-all duration-200
            disabled:opacity-50 group"
          >
            {sending ? 'Sending...' : 'Send message'}
            {!sending && (
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            )}
          </button>

          <span className="text-xs text-muted-foreground flex items-center gap-2 whitespace-nowrap">
            <span className="hidden sm:inline">Press</span>
            <kbd className="px-2 py-0.5 rounded-md border border-border text-xs font-mono bg-secondary/40">
              ↵ Enter
            </kbd>
          </span>
        </div>
      </form>

      {/* SOCIALS */}
      <div className="space-y-2">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center justify-between py-2.5 group transition-all"
          >
            <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              <div className="flex items-center justify-center">
                {link.icon}
              </div>
              <span className="text-[15px] font-medium tracking-tight">
                {link.label}
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              <span className="text-[15px] font-medium tracking-tight">
                {link.value}
              </span>

              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </a>
        ))}
      </div>

    </motion.div>
  </div>
</section>
