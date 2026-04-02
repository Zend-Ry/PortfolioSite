import {Instagram, Linkedin, Github, ChevronDown, ArrowUp, ExternalLink, User} from 'lucide-react';
import {Link} from 'react-router';
import {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {useTheme} from '../context/ThemeContext';

export function About() {
    const [isExpanded, setIsExpanded] = useState(false);
    const {theme, colors} = useTheme();

    return (
        <section id="about" className="min-h-screen flex items-center justify-center py-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* New Hero-style About Section */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Side - Profile Card */}
                    <div
                        className="w-full lg:w-80 flex-shrink-0 p-8 flex flex-col items-center"
                    >
                        {/* Profile Image */}
                        <div
                            className="w-full aspect-square rounded-xl overflow-hidden mb-6 flex items-center justify-center"
                            style={{
                                backgroundColor: theme === 'light' ? '#f0f1ec' : '#31333c',
                                boxShadow: theme === 'light' ? '0 10px 30px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.3)',
                                border: `1px solid ${colors.primary}22`,
                            }}
                            aria-label="Default profile placeholder"
                        >
                            <User size={120} style={{color: colors.primary}} aria-hidden="true"/>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4 mb-3">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-full transition-all hover:scale-110 duration-300"
                                style={{backgroundColor: colors.cardBg, color: colors.primary}}
                                aria-label="Instagram"
                            >
                                <Instagram size={24}/>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-full transition-all hover:scale-110 duration-300"
                                style={{backgroundColor: colors.cardBg, color: colors.primary}}
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={24}/>
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-full transition-all hover:scale-110 duration-300"
                                style={{backgroundColor: colors.cardBg, color: colors.primary}}
                                aria-label="GitHub"
                            >
                                <Github size={24}/>
                            </a>
                        </div>

                        {/* Get in touch */}
                        <div className="flex flex-col items-center">
                            <ArrowUp size={24} style={{color: colors.primary}} className="mb-1"/>
                            <motion.span
                                className="text-lg tracking-wide"
                                style={{
                                    color: colors.primary,
                                    fontFamily: 'Jua, sans-serif'
                                }}
                                animate={{
                                    rotate: [-3, 3, -3]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                Get in touch!
                            </motion.span>
                        </div>
                    </div>

                    {/* Right Side - Main Content Card */}
                    <div
                        className="flex-1 rounded-xl p-8 md:p-12"
                        style={{
                            backgroundColor: colors.cardBg,
                            boxShadow: theme === 'light' ? '0 4px 20px rgba(0,0,0,0.08)' : 'none'
                        }}
                    >
                        {/* Heading */}
                        <h2
                            className="text-4xl md:text-5xl mb-6"
                            style={{fontFamily: 'Koulen, sans-serif'}}
                        >
                            <span style={{color: colors.primary}}>HEY!</span>{' '}
                            <span style={{color: colors.text}}>I'M RILEY</span>
                        </h2>

                        {/* Skills Grid - shown at top */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div
                                className="p-4 rounded-lg"
                                style={{backgroundColor: theme === 'light' ? '#f0f1ec' : '#31333c'}}
                            >
                                <h3 className="mb-3 text-lg"
                                    style={{color: colors.primary, fontFamily: 'SUSE, sans-serif'}}>
                                    Engines & Tools
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Unity', 'Unreal Engine', 'Git', 'Jira', 'Sqlite3', 'Blender', '3DS Max', 'Adobe Suite'].map(skill => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 rounded-full text-sm"
                                            style={{
                                                backgroundColor: theme === 'light' ? '#ffffff' : '#242630',
                                                color: colors.text
                                            }}
                                        >
                      {skill}
                    </span>
                                    ))}
                                </div>
                            </div>

                            <div
                                className="p-4 rounded-lg"
                                style={{backgroundColor: theme === 'light' ? '#f0f1ec' : '#31333c'}}
                            >
                                <h3 className="mb-3 text-lg"
                                    style={{color: colors.primary, fontFamily: 'SUSE, sans-serif'}}>
                                    Languages
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {['C#', 'C++', 'Java', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'XAML'].map(lang => (
                                        <span
                                            key={lang}
                                            className="px-3 py-1 rounded-full text-sm"
                                            style={{
                                                backgroundColor: theme === 'light' ? '#ffffff' : '#242630',
                                                color: colors.text
                                            }}
                                        >
                      {lang}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main intro paragraph - always visible */}
                        <p
                            className="text-base leading-relaxed mb-6"
                            style={{color: colors.textSecondary, fontFamily: 'SUSE, sans-serif'}}
                        >
                            I've been into games for as long as I can remember; some of my favorite memories growing up
                            were
                            playing Diablo II with my parents. That connection, combined with a love for figuring out
                            how things
                            work, led me into game development. I'm drawn to the challenge of writing efficient,
                            well-structured
                            code and building systems that feel responsive and satisfying to interact with.
                        </p>

                        {/* Expandable content */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{height: 0, opacity: 0}}
                                    animate={{height: 'auto', opacity: 1}}
                                    exit={{height: 0, opacity: 0}}
                                    transition={{duration: 0.3}}
                                    style={{overflow: 'hidden'}}
                                >
                                    <p
                                        className="text-base leading-relaxed mb-6"
                                        style={{color: colors.textSecondary, fontFamily: 'SUSE, sans-serif'}}
                                    >
                                        I'm especially interested in the technical side of development; building tools,
                                        systems, and pipelines that make life easier for artists and designers. I've
                                        found a passion in bridging the gap between art and programming, which is why
                                        I'm aiming for a role in technical art. I also love helping others learn and
                                        solve problems, whether it's in code, design, or somewhere in between.
                                    </p>
                                    <p
                                        className="text-base leading-relaxed mb-6"
                                        style={{color: colors.textSecondary, fontFamily: 'SUSE, sans-serif'}}
                                    >
                                        Outside of development, I'm usually diving into RPGs, enjoying the speed of
                                        racing games, or mindlessly enjoying first or third-person shooters. I'm also
                                        working on a full <Link to="/pokemon-livingdex-progress"
                                                                style={{color: colors.primary}}>Pokémon Living
                                        Dex</Link>, playing <a href="https://archidekt.com/collection/v2/51688"
                                                               target="_blank" rel="noopener noreferrer"
                                                               style={{color: colors.primary}}>Magic The Gathering</a>,
                                        and slowly learning the ropes of D&D and Warhammer. If there's one
                                        theme across everything, I enjoy games and picking up new hobbies; everything
                                        about their creativity and building something meaningful.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Bottom row with expand button and CV button */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6">
                            {/* Read more/less button */}
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="flex items-center gap-2 transition-all hover:opacity-80 cursor-pointer"
                                style={{
                                    color: colors.primary,
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: '14px'
                                }}
                            >
                                <span>{isExpanded ? 'read less about me' : 'read more about me'}</span>
                                <motion.div
                                    animate={{rotate: isExpanded ? 180 : 0}}
                                    transition={{duration: 0.3}}
                                >
                                    <ChevronDown size={20}/>
                                </motion.div>
                            </button>

                            {/* View CV Button */}
                            <div className="flex flex-col items-start md:items-end gap-1">
                                <button
                                    className="px-6 py-3 rounded-lg transition-all hover:opacity-90 flex items-center gap-2 cursor-pointer"
                                    style={{
                                        backgroundColor: colors.primary,
                                        color: theme === 'light' ? '#ffffff' : '#1a1b26',
                                        fontFamily: 'SUSE, sans-serif'
                                    }}
                                >
                                    <span>View my CV</span>
                                    <ExternalLink size={16}/>
                                </button>
                                <span
                                    className="text-xs"
                                    style={{
                                        color: colors.textSecondary,
                                        fontFamily: 'JetBrains Mono, monospace'
                                    }}
                                >
                  Last Updated: 2025-05-07
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}