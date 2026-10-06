// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState, useRef, useId } from 'react';
import '../../shared/base.css';
import './product-quick-view.css';
import { galleryImages } from '../../shared/gallery-assets';
export interface ProductQuickViewProps {
  label?: string;
  className?: string;
}
export default function ProductQuickView({
  label = 'Product quick view',
  className = '',
}: ProductQuickViewProps) {
  const uid = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [size, setSize] = useState('Medium');
  const [added, setAdded] = useState(false);
  const image = galleryImages[0];
  return (
    <section className={`bw-demo bwm-product-quick-view ${className}`}>
      <button
        ref={trigger}
        type="button"
        className="bwm-control"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        Open {label}
      </button>
      <dialog
        ref={dialog}
        className="bwm-modal"
        aria-labelledby={uid}
        onClose={() => trigger.current?.focus()}
      >
        <img src={image.src} alt={image.alt} />
        <h3 id={uid}>{label}</h3>
        <p>Signal object · $48 · local demonstration</p>
        <fieldset>
          <legend>Size</legend>
          <div className="bwm-row">
            {['Small', 'Medium', 'Large'].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={uid}
                  checked={size === option}
                  onChange={() => {
                    setSize(option);
                    setAdded(false);
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="bwm-row">
          <button type="button" className="bwm-control" onClick={() => setAdded(true)}>
            Add to selection
          </button>
          <button type="button" className="bwm-control" onClick={() => dialog.current?.close()}>
            Close quick view
          </button>
        </div>
        <p role="status">{added ? `${size} Signal object added locally. No order placed.` : ''}</p>
      </dialog>
    </section>
  );
}
