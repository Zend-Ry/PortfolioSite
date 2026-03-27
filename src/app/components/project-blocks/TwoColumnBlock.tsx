import { useTheme } from '../../context/ThemeContext';
import { ImageWithFallback } from '../ui/ImageWithFallback';

interface TwoColumnBlockProps {
  imageLeft?: boolean;
  imageSrc: string;
  imageAlt: string;
  title: string;
  content: string;
}

export function TwoColumnBlock({ 
  imageLeft = true, 
  imageSrc, 
  imageAlt, 
  title, 
  content 
}: TwoColumnBlockProps) {
  const { theme, colors } = useTheme();
  
  return (
    <div className={`grid md:grid-cols-2 gap-8 items-center mb-12 ${!imageLeft ? 'md:grid-flow-dense' : ''}`}>
      <div className={imageLeft ? '' : 'md:col-start-2'}>
        <div 
          className="rounded-lg overflow-hidden" 
          style={{ 
            backgroundColor: colors.cardBg,
            boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
          }}
        >
          <ImageWithFallback 
            src={imageSrc} 
            alt={imageAlt}
            className="w-full h-auto"
          />
        </div>
      </div>
      <div>
        <h3 className="text-2xl mb-4">
          <span style={{ color: colors.primary }}>{title}</span>
        </h3>
        <p className="leading-relaxed whitespace-pre-line" style={{ color: colors.textSecondary }}>
          {content}
        </p>
      </div>
    </div>
  );
}