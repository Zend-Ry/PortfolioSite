interface VideoBlockProps {
  src: string;
  caption?: string;
  autoPlay?: boolean;
}

export function VideoBlock({ src, caption, autoPlay = false }: VideoBlockProps) {
  return (
    <div className="mb-12">
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#242630' }}>
        <video 
          src={src}
          controls
          autoPlay={autoPlay}
          loop
          muted
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <p className="text-sm mt-2 text-center" style={{ color: '#9ca3af' }}>
          {caption}
        </p>
      )}
    </div>
  );
}
