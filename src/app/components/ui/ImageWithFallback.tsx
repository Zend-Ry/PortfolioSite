import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackClassName,
}: ImageWithFallbackProps) {
  const { colors } = useTheme();
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center text-sm ${fallbackClassName ?? className ?? ''}`}
        style={{
          backgroundColor: colors.cardBg,
          color: colors.textSecondary,
          minHeight: '160px',
        }}
        aria-label={alt}
      >
        {alt}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

