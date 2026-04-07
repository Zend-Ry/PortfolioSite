import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, colors } = useTheme();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-colors duration-500"
      style={{ backgroundColor: colors.navBg }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => scrollToSection("home")}
            className="text-xl transition-colors cursor-pointer"
            style={{
              color: colors.primary,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            &lt;RileyDaigle
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.5, 0.5, 1]
              }}
            >
              _
            </motion.span>
            &gt;
          </button>

          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="transition-colors hover:opacity-80 cursor-pointer"
                style={{ color: colors.text }}
              >
                {item.label}
              </button>
            ))}
            
            <button
              onClick={toggleTheme}
              className="transition-all hover:scale-110 cursor-pointer p-2"
              style={{ color: colors.primary }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden cursor-pointer"
            style={{ color: colors.primary }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-2 transition-colors cursor-pointer"
                  style={{ color: colors.text }}
                >
                  {item.label}
                </button>
              ))}
              
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 py-2 transition-colors cursor-pointer"
                style={{ color: colors.primary }}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={20} />
                    <span style={{ color: colors.text }}>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={20} />
                    <span style={{ color: colors.text }}>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}