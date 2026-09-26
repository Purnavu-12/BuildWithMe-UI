// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';

export interface MediaGalleryProps { label?: string; className?: string }
export default function MediaGallery({ label = "Media gallery", className = '' }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  return <section className={`bwm-surface bwm-media-gallery ${className}`}><div className="bwm-gallery" aria-label={label}><div className="bwm-gallery-stage">Frame {activeIndex + 1}</div><div>{[0,1,2].map((index) => <button key={index} aria-label={'Show frame ' + (index + 1)} onClick={() => setActiveIndex(index)} data-active={activeIndex === index} />)}</div></div></section>;
}
