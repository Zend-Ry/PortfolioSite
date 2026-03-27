import { ImageWithFallback } from "../ui/ImageWithFallback";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  columns?: 2 | 3;
}

export function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const gridClass = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';
  
  return (
    <div className={`grid grid-cols-1 ${gridClass} gap-4 mb-12`}>
      {images.map((image, index) => (
        <div 
          key={index} 
          className="rounded-lg overflow-hidden" 
          style={{ backgroundColor: '#242630' }}
        >
          <ImageWithFallback 
            src={image.src} 
            alt={image.alt}
            className="w-full h-full object-cover aspect-video"
          />
        </div>
      ))}
    </div>
  );
}
