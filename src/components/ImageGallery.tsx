import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Modal from './Modal';

export default function ImageGallery({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  // keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!emblaApi) return;
    if (e.key === 'ArrowLeft') emblaApi.scrollPrev();
    if (e.key === 'ArrowRight') emblaApi.scrollNext();
  };

  const openLightbox = useCallback((i: number) => {
    setSelected(i);
    setLightboxOpen(true);
  }, []);

  return (
    <div>
      <div className="embla" ref={emblaRef as any} tabIndex={0} onKeyDown={onKeyDown}>
        <div className="embla__container flex">
          {images.map((src, i) => (
            <div key={i} className="embla__slide min-w-full">
              <button className="w-full h-72 sm:h-96 lg:h-[480px] block" onClick={() => openLightbox(i)}>
                <img src={src} alt={`slide-${i}`} className="w-full h-full object-cover rounded-b-xl" loading="lazy" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar" role="list" aria-label="Thumbnails">
        {images.map((src, i) => (
          <button
            key={i}
            aria-current={selected === i}
            aria-label={`View image ${i + 1}`}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={`w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden border ${selected === i ? 'ring-2 ring-brand' : 'border-neutral-200'}`}>
            <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      <Modal open={lightboxOpen} onClose={() => setLightboxOpen(false)}>
        <div className="w-full">
          <img src={images[selected]} alt={`lightbox-${selected}`} className="w-full h-[60vh] object-contain" />
        </div>
      </Modal>
    </div>
  );
}
