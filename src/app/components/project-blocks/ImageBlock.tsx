import { ImageWithFallback } from "../ui/ImageWithFallback";
import { useTheme } from '../../context/ThemeContext';

interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ImageBlock({ src, alt, caption }: ImageBlockProps) {
  const { theme, colors } = useTheme();
  
  return (
    <div className="mb-12">
      <div 
        className="rounded-lg overflow-hidden" 
        style={{ 
          backgroundColor: colors.cardBg,
          boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <ImageWithFallback 
          src={src} 
          alt={alt}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <p className="text-sm mt-2 text-center" style={{ color: colors.textSecondary }}>
          {caption}
        </p>
      )}
    </div>
  );
}