import { ArrowDown, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

const heroDark = new URL("../../assets/images/hero_dark.png", import.meta.url).href;
const heroLight = new URL("../../assets/images/hero_light.png", import.meta.url).href;

export function Hero() {
  const { theme, colors } = useTheme();

  const titles = [
    "Developer",
    "Designer",
    "Programmer",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex(
        (prev) => (prev + 1) % titles.length,
      );
    }, 5000); // Change title every 3 seconds

    return () => clearInterval(interval);
  }, [titles.length]);

  const quotes = [
    "Creating immersive experiences and bringing interactive worlds to life through code and creativity.",
    "Crafting memorable gameplay experiences that captivate and inspire players.",
    "Turning imagination into interactive reality, one line of code at a time.",
    "Building worlds where players become heroes and stories come alive.",
    "Blending art, technology, and storytelling to create unforgettable gaming experiences.",
    "The best method for accelerating a computer is the one that boosts it by 9.8 m/s^2.",
    "// TODO: Make this fun.",
    "while(alive) { dev(); }",
    "Syntax errors build character.",
    "404: Quote not found",
    "It's not a bug, it's an emergent feature.",
    '"99 little bugs in the code, 99 little bugs... take one down, patch it around, 117 little bugs in the code.',
    "Refactor until morale improves.",
    "Compiles on my machine.",
    "Good design is invisible.",
    "Players won't read - design accordingly.",
    "Design for intent, not control.",
    "Design is solving problems you didn't know you had in ways you don't understand.",
    "Give the player a choice, even if both options are explode.",
    "Game feel is 80% juice and 20% vibes.",
    "Everything you place tells a story. Even that barrel.",
    "Is this technically 'playtesting'?",
    "Not just a pretty interface.",
    "I guess we doin circles now.",
    "Rate my topology. \t❒",
    "Reviewing Cookies...",
    "Also try Terraria!",
    "Also try Minecraft!",
    "Yes, I made this. No, it's not done.",
    "Loading: Existential dread.",
    "NullReferenceException: Brain not found.",
    "Made with love... and bugs.",
    "Why yes, that is intentional jank.",
    "Achievement unlocked: Visited Portfolio",
    "Don't worry, it compiled once.",
    "This website is held together by tape and passion.",
    "Oh hey, you're actually reading this?",
    "You're looking at this way too closely.",
    "You found the secret quote. Congrats?",
    "Made with love, rage, and a few Google searches.",
    "Feel free to pretend this is impressive.",
    "This quote was handcrafted just for you.",
    "You look like someone who appreciates good kerning.",
    "That font? Totally intentional.",
    "Will code for snacks. Or salary. Preferably both.",
    "Looking for a job? So am I!",
    "References available... if you roll a nat 20.",
    "Dear recruiter, I made this for you.",
    "Everything here was totally intentional. Probably.",
    "100% résumé. 0% imposter syndrome. (Okay, maybe 20%)",
    "Nat 20! :D",
    "Nat 1! :(",
    "Enigma\nArchon Plate\n\"JahIthBer\"",
  ];

  const [currentQuote, setCurrentQuote] = useState(
    () => quotes[Math.floor(Math.random() * quotes.length)],
  );
  const [refreshSpinTurns, setRefreshSpinTurns] = useState(0);

  const refreshQuote = () => {
    const newQuote =
      quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(newQuote);
    setRefreshSpinTurns((prev) => prev + 1);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const heroBackground =
    theme === "light"
      ? heroLight
      : heroDark;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-x-hidden"
    >
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl mb-6 tracking-tight">
          Hi, I'm{" "}
          <span style={{ color: colors.primary }}>
            Riley Daigle
          </span>
        </h1>
        <p
          className="text-xl md:text-2xl mb-8 h-8 md:h-10 flex items-center justify-center overflow-hidden"
          style={{ color: colors.textSecondary }}
        >
          <span className="inline-block min-w-[140px] md:min-w-[180px] text-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTitleIndex}
                className="inline-block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                {titles[currentTitleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="mx-2">|</span> Looking for Work
        </p>
        <div className="relative max-w-2xl mx-auto mb-12 flex flex-col items-center md:block md:relative">
          <p
            className="text-lg leading-relaxed text-center whitespace-pre-line"
            style={{ color: colors.textSecondary }}
          >
            {currentQuote}
          </p>
          <button
            onClick={refreshQuote}
            className="mt-4 md:mt-0 md:absolute md:-right-12 md:top-1/2 md:-translate-y-1/2 p-3 md:p-2 transition-all duration-300 cursor-pointer rounded-lg md:rounded-none"
            style={{
              color: colors.primary,
              backgroundColor: "transparent",
            }}
            aria-label="Refresh quote"
          >
            <motion.span
              className="inline-flex"
              animate={{ rotate: refreshSpinTurns * 360 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <RefreshCw className="w-6 h-6 md:w-4 md:h-4" />
            </motion.span>
          </button>
        </div>
        <button
          onClick={() => scrollToSection("projects")}
          className="px-8 py-3 rounded-lg transition-all hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: colors.primary,
            color: theme === "light" ? "#ffffff" : "#31333c",
          }}
        >
          View My Work
        </button>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10 cursor-pointer"
        style={{ color: colors.primary }}
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
}