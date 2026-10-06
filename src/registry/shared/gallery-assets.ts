// Original BuildWithMe-UI artwork, created for Kinetic Playground. MIT.
// The registry embeds these assets as data URLs so installation makes no remote requests.
import signal from './media/signal.webp';
import orbit from './media/orbit.webp';
import fold from './media/fold.webp';

function assetSource(image: string | { src: string }) {
  return typeof image === 'string' ? image : image.src;
}

export const galleryImages = [
  {
    title: 'Signal object',
    alt: 'Lime diamond forms assembled into a geometric sculpture on charcoal.',
    src: assetSource(signal),
  },
  {
    title: 'Orbit object',
    alt: 'Cyan open arcs orbit a lime geometric core on charcoal.',
    src: assetSource(orbit),
  },
  {
    title: 'Fold object',
    alt: 'Coral and warm-white planes folded into an asymmetric sculpture.',
    src: assetSource(fold),
  },
];
