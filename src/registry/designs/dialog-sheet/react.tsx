// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useState } from 'react';
import '../../shared/base.css';

export interface DialogSheetProps { label?: string; className?: string }
export default function DialogSheet({ label = "Dialog sheet", className = '' }: DialogSheetProps) {
  const [open, setOpen] = useState(false);
  return <section className={`bwm-surface bwm-dialog-sheet ${className}`}><div className="bwm-action"><button onClick={() => setOpen((current) => !current)}>{open ? 'Dismiss' : 'Open ' + label}</button>{open ? <div role="status" className="bwm-notice">Ready to build.</div> : null}</div></section>;
}
