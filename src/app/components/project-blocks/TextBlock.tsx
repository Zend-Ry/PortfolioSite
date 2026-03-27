import { useTheme } from '../../context/ThemeContext';

interface TextBlockProps {
  title?: string;
  content: string;
}

export function TextBlock({ title, content }: TextBlockProps) {
  const { colors } = useTheme();
  
  return (
    <div className="mb-12">
      {title && (
        <h2 className="text-3xl mb-4">
          <span style={{ color: colors.primary }}>{title}</span>
        </h2>
      )}
      <p className="leading-relaxed whitespace-pre-line" style={{ color: colors.textSecondary }}>
        {content}
      </p>
    </div>
  );
}