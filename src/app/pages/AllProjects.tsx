import { Link } from 'react-router';
import { ArrowLeft, ExternalLink, Github, BookOpen, Sun, Moon } from 'lucide-react';
import { allProjects } from '../data/projects';
import { useTheme } from '../context/ThemeContext';
import { formatProjectDateMonthYear } from '../utils/date';

export default function AllProjects() {
  const { theme, toggleTheme, colors } = useTheme();

  const dividerColor = theme === 'light' ? '#c9cdd6' : '#404455';

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
      {/* Header with Back Button */}
      <div 
        className="sticky top-0 z-50 transition-colors duration-500" 
        style={{ 
          backgroundColor: colors.background, 
          borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#242630'}` 
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 transition-colors hover:opacity-80"
            style={{ color: colors.primary }}
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <button
            onClick={toggleTheme}
            className="transition-all hover:scale-110 cursor-pointer p-2"
            style={{ color: colors.primary }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ color: colors.text }}>
            All <span style={{ color: colors.primary }}>Projects</span>
          </h1>
          <p style={{ color: colors.textSecondary }}>
            A complete collection of my game development work
          </p>
        </div>

        {/* Projects List */}
        <div style={{ borderTop: `1.5px solid ${dividerColor}` }}>
          {allProjects.map((project) => (
            <div
              key={project.id}
              className="relative py-7 cursor-pointer"
              style={{ borderBottom: `1.5px solid ${dividerColor}` }}
            >
              {/* Full-area link overlay */}
              <Link
                to={`/projects/${project.id}`}
                className="absolute inset-0"
                aria-label={`View details for ${project.title}`}
              />

              {/* Title + Date row */}
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold" style={{ color: colors.text }}>
                    {project.title}
                  </span>
                  {project.featured && (
                    <span
                      className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full"
                      style={{
                        color: '#b45309',
                        border: '0.75px solid #f59e0b'
                      }}
                    >
                      Featured
                    </span>
                  )}
                </div>
                <span className="text-sm shrink-0" style={{ color: colors.textSecondary }}>
                  {formatProjectDateMonthYear(project.date)}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ border: `1px solid ${colors.primary}`, color: colors.primary }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links — raised above the overlay */}
              <div className="relative z-10 flex gap-5">
                <Link
                  to={`/projects/${project.id}`}
                  className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
                  style={{ color: colors.textSecondary }}
                >
                  <BookOpen size={14} />
                  Details
                </Link>
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
                    style={{ color: colors.textSecondary }}
                  >
                    <ExternalLink size={14} />
                    Link
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
                    style={{ color: colors.textSecondary }}
                  >
                    <Github size={14} />
                    Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}