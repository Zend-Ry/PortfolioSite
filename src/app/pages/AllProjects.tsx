import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ExternalLink, Github, ArrowUpDown } from 'lucide-react';
import { allProjects } from '../data/projects';
import { useTheme } from '../context/ThemeContext';

type SortBy = 'date' | 'name';

export default function AllProjects() {
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const { theme, colors } = useTheme();
  
  const sortedProjects = [...allProjects].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long'
    });
  };

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
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 transition-colors hover:opacity-80"
            style={{ color: colors.primary }}
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
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

        {/* Sort Controls */}
        <div className="flex gap-4 mb-8">
          <span style={{ color: colors.textSecondary }} className="flex items-center gap-2">
            <ArrowUpDown size={16} />
            Sort by:
          </span>
          <button
            onClick={() => setSortBy('date')}
            className="px-4 py-2 rounded transition-all"
            style={{
              backgroundColor: sortBy === 'date' ? colors.primary : colors.cardBg,
              color: sortBy === 'date' ? (theme === 'light' ? '#ffffff' : '#31333c') : colors.text,
            }}
          >
            Date
          </button>
          <button
            onClick={() => setSortBy('name')}
            className="px-4 py-2 rounded transition-all"
            style={{
              backgroundColor: sortBy === 'name' ? colors.primary : colors.cardBg,
              color: sortBy === 'name' ? (theme === 'light' ? '#ffffff' : '#31333c') : colors.text,
            }}
          >
            Name
          </button>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {sortedProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-lg transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: colors.cardBg,
                borderLeft: `4px solid ${colors.primary}`,
                boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Left: Title and Date */}
                <div className="flex-1">
                  <Link 
                    to={`/projects/${project.id}`}
                    className="text-2xl hover:opacity-80 transition-opacity inline-block mb-2"
                    style={{ color: colors.primary }}
                  >
                    {project.title}
                  </Link>
                  <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                    {formatDate(project.date)}
                  </p>
                  
                  {/* Skills/Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: theme === 'light' ? '#f0f1ec' : '#31333c',
                          color: colors.primary,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Links */}
                <div className="flex gap-4 items-start">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 transition-colors hover:opacity-80"
                      style={{ color: colors.primary }}
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm">Demo</span>
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 transition-colors hover:opacity-80"
                      style={{ color: colors.primary }}
                    >
                      <Github size={18} />
                      <span className="text-sm">Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}