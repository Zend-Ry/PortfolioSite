import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function Contact() {
  const { theme, colors } = useTheme();
  
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-12"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl mb-12" style={{ color: colors.text }}>
          Get In <span style={{ color: colors.primary }}>Touch</span>
        </h2>

        <p
          className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ color: colors.textSecondary }}
        >
          I'm always open to discussing new projects, creative
          ideas, or opportunities to collaborate. Feel free to
          reach out!
          <br />
          Currently looking for work. 2026-03-23
        </p>

        <div className="flex justify-center gap-8 mb-12">
          <a
            href="mailto:your.email@example.com"
            className="p-4 rounded-full transition-all hover:scale-110 duration-300"
            style={{
              backgroundColor: colors.cardBg,
              color: colors.primary,
              boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.08)' : 'none'
            }}
            aria-label="Email"
          >
            <Mail size={28} />
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full transition-all hover:scale-110 duration-300"
            style={{
              backgroundColor: colors.cardBg,
              color: colors.primary,
              boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.08)' : 'none'
            }}
            aria-label="GitHub"
          >
            <Github size={28} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full transition-all hover:scale-110 duration-300"
            style={{
              backgroundColor: colors.cardBg,
              color: colors.primary,
              boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.08)' : 'none'
            }}
            aria-label="LinkedIn"
          >
            <Linkedin size={28} />
          </a>
        </div>

        <a
          href="mailto:your.email@example.com"
          className="inline-block px-8 py-3 rounded-lg transition-all hover:scale-105"
          style={{
            backgroundColor: colors.primary,
            color: theme === 'light' ? '#ffffff' : '#31333c',
          }}
        >
          Send Message
        </a>

        <footer
          className="mt-20 pt-8"
          style={{
            borderTop: `1px solid ${theme === 'light' ? '#e5e7eb' : '#242630'}`,
            color: colors.textSecondary,
          }}
        >
          <p className="text-sm">
            © 2026 Riley Daigle. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}