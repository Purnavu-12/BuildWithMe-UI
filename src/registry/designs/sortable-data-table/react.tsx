// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import '../../shared/base.css';

export interface SortableDataTableProps { label?: string; className?: string }
export default function SortableDataTable({ label = "Sortable data table", className = '' }: SortableDataTableProps) {
  return <section className={`bwm-surface bwm-sortable-data-table ${className}`}><table className="bwm-table"><caption className="sr-only">{label}</caption><thead><tr><th>Name</th><th>Status</th></tr></thead><tbody>{['Aurora', 'Orbit', 'Signal'].map((entry, index) => <tr key={entry}><td>{entry}</td><td>{index === 1 ? 'Review' : 'Ready'}</td></tr>)}</tbody></table></section>;
}
