import { useTheme } from '../../context/ThemeContext';

interface QuoteBlockProps {
  quote: string;
  author?: string;
}

export function QuoteBlock({ quote, author }: QuoteBlockProps) {
  const { theme, colors } = useTheme();
  
  return (
    <div 
      className="mb-12 py-8 px-6 rounded-lg" 
      style={{ 
        backgroundColor: colors.cardBg, 
        borderLeft: `4px solid ${colors.primary}`,
        boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
      }}
    >
      <blockquote className="text-xl italic mb-2" style={{ color: colors.text }}>
        "{quote}"
      </blockquote>
      {author && (
        <p className="text-sm" style={{ color: colors.primary }}>
          — {author}
        </p>
      )}
    </div>
  );
}