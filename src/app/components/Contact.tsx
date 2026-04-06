import { Github, Linkedin, Instagram } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function Contact() {
  const { theme, colors } = useTheme();
  
  return (
    <section
      id="contact"
      className="py-16"
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
          Currently looking for work.
        </p>

        <div className="flex justify-center gap-8 mb-12">

            <a
                href="https://www.instagram.com/riley.cc.daigle/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full transition-all hover:scale-110 duration-300"
                style={{
                    backgroundColor: colors.cardBg,
                    color: colors.primary,
                    boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.08)' : 'none'
                }}
                aria-label="Instagram"
            >
                <Instagram size={28} />
            </a>
          <a
            href="https://github.com/Zend-Ry"
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
            href="https://www.linkedin.com/in/rileydaigle/"
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
          href="https://www.linkedin.com/messaging/compose/?to=rileydaigle"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-lg transition-all hover:scale-105"
          style={{
            backgroundColor: colors.primary,
            color: theme === 'light' ? '#ffffff' : '#31333c',
          }}
        >
          Send a Message via LinkedIn
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