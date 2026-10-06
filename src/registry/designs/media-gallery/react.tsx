// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState, useRef, useId } from 'react';
import '../../shared/base.css';
import './media-gallery.css';
import { galleryImages } from '../../shared/gallery-assets';
export interface MediaGalleryProps {
  label?: string;
  className?: string;
}
export default function MediaGallery({
  label = 'Media gallery',
  className = '',
}: MediaGalleryProps) {
  const uid = useId();
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const item = galleryImages[index];
  function key(e: React.KeyboardEvent) {
    let next: number;
    if (e.key === 'ArrowRight') next = (index + 1) % 3;
    else if (e.key === 'ArrowLeft') next = (index + 2) % 3;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = 2;
    else return;
    e.preventDefault();
    setIndex(next);
  }
  return (
    <section className={`bw-demo bwm-media-gallery ${className}`}>
      <div className="bwm-gallery">
        <figure aria-label={label}>
          <img src={item.src} alt={item.alt} />
          <figcaption>
            {item.title} · {index + 1} / 3
          </figcaption>
        </figure>
        <div className="bwm-row">
          <button
            type="button"
            className="bwm-control"
            aria-label="Previous image"
            onClick={() => setIndex((index + 2) % 3)}
          >
            ←
          </button>
          {galleryImages.map((image, i) => (
            <button
              type="button"
              key={image.title}
              className="bwm-thumb"
              onKeyDown={key}
              aria-label={`Show ${image.title}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <img src={image.src} alt="" />
            </button>
          ))}
          <button
            type="button"
            className="bwm-control"
            aria-label="Next image"
            onClick={() => setIndex((index + 1) % 3)}
          >
            →
          </button>
        </div>
        <button
          ref={trigger}
          type="button"
          className="bwm-control"
          aria-haspopup="dialog"
          onClick={() => dialog.current?.showModal()}
        >
          Open image
        </button>
        <dialog
          ref={dialog}
          className="bwm-modal"
          aria-labelledby={uid}
          onClose={() => trigger.current?.focus()}
        >
          <h3 id={uid}>{item.title}</h3>
          <img src={item.src} alt={item.alt} />
          <div className="bwm-row">
            <button type="button" className="bwm-control" onClick={() => dialog.current?.close()}>
              Close image
            </button>
          </div>
        </dialog>
      </div>
    </section>
  );
}
