// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';

import { useId, useRef } from 'react';
import '../../shared/base.css';
import './dialog-sheet.css';

export interface DialogSheetProps {
  label?: string;
  className?: string;
}

export default function DialogSheet({ label = 'Dialog sheet', className = '' }: DialogSheetProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  function openDialog() {
    dialog.current?.showModal();
  }

  function closeDialog() {
    dialog.current?.close();
  }

  return (
    <section className={`bw-demo bwm-dialog-sheet ${className}`}>
      <button
        ref={trigger}
        className="bwm-dialog-sheet__trigger"
        type="button"
        aria-haspopup="dialog"
        onClick={openDialog}
      >
        Open {label}
      </button>
      <dialog
        ref={dialog}
        className="bwm-dialog-sheet__dialog"
        aria-labelledby={titleId}
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === dialog.current) closeDialog();
        }}
      >
        <div className="bwm-dialog-sheet__panel">
          <p className="bwm-dialog-sheet__eyebrow">Overlay / adaptive</p>
          <h2 id={titleId}>{label}</h2>
          <p className="bwm-dialog-sheet__copy">
            Keep the current task in view while reviewing the next building block.
          </p>
          <button className="bwm-dialog-sheet__close" type="button" autoFocus onClick={closeDialog}>
            Close {label}
          </button>
        </div>
      </dialog>
    </section>
  );
}
