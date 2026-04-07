import { Link, useParams } from 'react-router';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { allProjects, ProjectBlock } from '../data/projects';
import { TextBlock } from '../components/project-blocks/TextBlock';
import { ImageBlock } from '../components/project-blocks/ImageBlock';
import { TwoColumnBlock } from '../components/project-blocks/TwoColumnBlock';
import { ImageGallery } from '../components/project-blocks/ImageGallery';
import { VideoBlock } from '../components/project-blocks/VideoBlock';
import { FeatureList } from '../components/project-blocks/FeatureList';
import { QuoteBlock } from '../components/project-blocks/QuoteBlock';
import { CodeBlock } from '../components/project-blocks/CodeBlock';
import { useTheme } from '../context/ThemeContext';
import { formatProjectDateDetail } from '../utils/date';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = allProjects.find(p => p.id === Number(id));
  const { theme, colors } = useTheme();

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background, color: colors.text }}>
        <div className="text-center">
          <h1 className="text-4xl mb-4">Project Not Found</h1>
          <Link to="/projects" style={{ color: colors.primary }}>Back to All Projects</Link>
        </div>
      </div>
    );
  }

  const renderBlock = (block: ProjectBlock, index: number) => {
    switch (block.type) {
      case 'text':
        return <TextBlock key={index} title={block.title} content={block.content} />;
      case 'features':
        return <FeatureList key={index} title={block.title} features={block.features} />;
      case 'image':
        return <ImageBlock key={index} src={block.src} alt={block.alt} caption={block.caption} />;
      case 'two-column':
        return <TwoColumnBlock key={index} imageLeft={block.imageLeft} imageSrc={block.imageSrc} imageAlt={block.imageAlt} title={block.title} content={block.content} />;
      case 'gallery':
        return <ImageGallery key={index} columns={block.columns} images={block.images} />;
      case 'quote':
        return <QuoteBlock key={index} quote={block.quote} author={block.author} />;
      case 'video':
        return <VideoBlock key={index} src={block.src} caption={block.caption} autoPlay={block.autoPlay} />;
      case 'code':
        return <CodeBlock key={index} title={block.title} language={block.language} code={block.code} />;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
      <div
        className="sticky top-0 z-50 transition-colors duration-500"
        style={{ backgroundColor: colors.background, borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#242630'}` }}
      >
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link to="/projects" className="inline-flex items-center gap-2 transition-colors hover:opacity-80" style={{ color: colors.primary }}>
            <ArrowLeft size={20} />
            <span>Back to All Projects</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl mb-4" style={{ color: colors.text }}>{project.title}</h1>
          <p className="text-lg mb-6" style={{ color: colors.textSecondary }}>{formatProjectDateDetail(project.date)}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: theme === 'light' ? '#f0f1ec' : '#242630', color: colors.primary }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mb-8">
            {project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: colors.primary, color: theme === 'light' ? '#ffffff' : '#31333c' }}>
                <ExternalLink size={18} />
                <span>{project.demoLinkLabel ?? 'View Project'}</span>
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: colors.cardBg, color: colors.text }}>
                <Github size={18} />
                <span>View Code</span>
              </a>
            )}
          </div>
        </div>

        <ImageBlock src={project.image} alt={project.title} />

        {project.detailContent && project.detailContent.length > 0 ? (
          project.detailContent.map((block, i) => renderBlock(block, i))
        ) : (
          <TextBlock
            title="Coming Soon"
            content="Detailed write-up for this project is on the way."
          />
        )}
      </div>
    </div>
  );
}