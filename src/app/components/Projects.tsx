import { ImageWithFallback } from "./ui/ImageWithFallback";
import { ExternalLink, Github, BookOpen } from "lucide-react";
import { Link } from "react-router";
import { allProjects } from "../data/projects";
import { useTheme } from "../context/ThemeContext";

export function Projects() {
  const featuredProjects = allProjects.filter(project => project.featured);
  const { theme, colors } = useTheme();

  return (
    <section
      id="projects"
      className="py-16"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl mb-12 text-center" style={{ color: colors.text }}>
          Featured{" "}
          <span style={{ color: colors.primary }}>Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="relative rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
              style={{ 
                backgroundColor: colors.cardBg,
                boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              {/* Full-area link overlay */}
              <Link
                to={`/projects/${project.id}`}
                className="absolute inset-0 z-0"
                aria-label={`View details for ${project.title}`}
              />

              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl mb-3" style={{ color: colors.text }}>
                  {project.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                  {project.description}
                </p>

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

                {/* Links — raised above the overlay */}
                <div className="relative z-10 flex gap-4">
                  <Link
                    to={`/projects/${project.id}`}
                    className="flex items-center gap-2 transition-colors hover:opacity-80"
                    style={{ color: colors.primary }}
                  >
                    <BookOpen size={16} />
                    <span className="text-sm">Details</span>
                  </Link>
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 transition-colors hover:opacity-80"
                      style={{ color: colors.primary }}
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Link</span>
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
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/projects"
            className="px-8 py-4 rounded-lg transition-all hover:opacity-90 hover:scale-105"
            style={{
              backgroundColor: colors.primary,
              color: theme === 'light' ? '#ffffff' : '#31333c',
            }}
          >
            View all my Projects
          </Link>
        </div>
      </div>
    </section>
  );
}