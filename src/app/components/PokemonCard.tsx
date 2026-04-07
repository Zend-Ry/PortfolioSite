import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface PokemonCardProps {
  dexNumber: number;
  name: string;
  isCaught: boolean;
  isShinyCaught?: boolean;
  imageSrc?: string;
  imageSrcShiny?: string;
  onClick?: () => void;
}

export function PokemonCard({ dexNumber, name, isCaught, isShinyCaught = false, imageSrc, imageSrcShiny, onClick }: PokemonCardProps) {
  const { theme, colors } = useTheme();
  const [imageErrored, setImageErrored] = useState(false);
  // Pick the correct sprite based on catch state
  const activeImage = isShinyCaught && imageSrcShiny ? imageSrcShiny : imageSrc;
  const showImage = Boolean(activeImage) && !imageErrored;
  const formattedDexNumber = `#${String(dexNumber).padStart(4, '0')}`;
  const statusLabel = isShinyCaught ? 'shiny caught' : isCaught ? 'caught' : 'not caught';

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative rounded-xl p-4 flex flex-col gap-3 w-full text-left transition-transform hover:scale-[1.01] cursor-pointer"
      style={{
        backgroundColor: colors.cardBg,
        boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
        fontFamily: 'Arial, Helvetica, sans-serif',
        border: isShinyCaught ? '1px solid rgba(240, 192, 64, 0.8)' : undefined,
      }}
      aria-label={`${formattedDexNumber} ${name} ${statusLabel}`}
      title="Click to cycle: missing -> caught -> shiny -> missing"
    >
      {isShinyCaught && (
        <span
          className="absolute top-0 right-0 w-7 h-7 flex items-center justify-center rounded-tr-lg rounded-bl-lg leading-none pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundColor: 'rgb(220,167,29)',
            color: 'rgb(240, 192, 64)',
            fontSize: '14px',
            textShadow: '0 0 2px rgba(0, 0, 0, 0.6)',
          }}
        >
          ✨
        </span>
      )}

      <div
        className="w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: `${colors.primary}14`,
          border: `1px solid ${colors.primary}22`,
        }}
      >
        {showImage ? (
          <img
            src={activeImage}
            alt={name}
            className="w-full h-full object-contain"
            style={{
              filter: isCaught ? 'none' : 'grayscale(100%) opacity(0.6)',
              transform: isShinyCaught ? 'scale(1.03)' : 'none',
            }}
            onError={() => setImageErrored(true)}
          />
        ) : (
          <span
            className="text-xs uppercase tracking-wider"
            style={{
              color: colors.textSecondary,
              fontFamily: 'Arial, Helvetica, sans-serif',
              filter: isCaught ? 'none' : 'grayscale(100%) opacity(0.6)',
            }}
          >
            Image slot
          </span>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          {formattedDexNumber}
        </p>
        <h3 className="text-base" style={{ color: colors.text }}>
          {name}
        </h3>
      </div>
    </button>
  );
}
