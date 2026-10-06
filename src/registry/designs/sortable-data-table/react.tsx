// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';

import { useMemo, useState } from 'react';
import '../../shared/base.css';
import './sortable-data-table.css';

const rows = [
  { id: 'aurora', name: 'Aurora', status: 'Ready' },
  { id: 'orbit', name: 'Orbit', status: 'Review' },
  { id: 'signal', name: 'Signal', status: 'Ready' },
] as const;

type SortKey = 'name' | 'status';
type SortDirection = 'ascending' | 'descending';

export interface SortableDataTableProps {
  label?: string;
  className?: string;
}

export default function SortableDataTable({
  label = 'Sortable data table',
  className = '',
}: SortableDataTableProps) {
  const [sort, setSort] = useState<{ key: SortKey; direction: SortDirection }>({
    key: 'name',
    direction: 'ascending',
  });
  const [selected, setSelected] = useState('');
  const sortedRows = useMemo(() => {
    const direction = sort.direction === 'ascending' ? 1 : -1;
    return [...rows].sort(
      (left, right) => left[sort.key].localeCompare(right[sort.key]) * direction,
    );
  }, [sort]);

  function updateSort(key: SortKey) {
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  }

  return (
    <section className={`bw-demo bwm-sortable-data-table ${className}`}>
      <div className="bwm-table-shell">
        <div className="bwm-table-meta" aria-hidden="true">
          <span>System index</span>
          <span>{rows.length.toString().padStart(2, '0')} records</span>
        </div>
        <div className="bwm-table-scroll">
          <table className="bwm-table">
            <caption className="bw-sr-only">{label}</caption>
            <thead>
              <tr>
                <th scope="col" aria-sort={sort.key === 'name' ? sort.direction : undefined}>
                  <button type="button" onClick={() => updateSort('name')}>
                    Name
                    <span aria-hidden="true">
                      {sort.key === 'name' ? (sort.direction === 'ascending' ? '↑' : '↓') : '↕'}
                    </span>
                  </button>
                </th>
                <th scope="col" aria-sort={sort.key === 'status' ? sort.direction : undefined}>
                  <button type="button" onClick={() => updateSort('status')}>
                    Status
                    <span aria-hidden="true">
                      {sort.key === 'status' ? (sort.direction === 'ascending' ? '↑' : '↓') : '↕'}
                    </span>
                  </button>
                </th>
                <th scope="col" className="bwm-action-heading">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span className="bwm-row-marker" aria-hidden="true" />
                    {row.name}
                  </td>
                  <td>
                    <span className={`bwm-status bwm-status-${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="bwm-row-action"
                      aria-label={`Inspect ${row.name}`}
                      onClick={() => setSelected(row.name)}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="bwm-table-status" role="status" aria-live="polite">
          {selected ? `Selected ${selected}.` : 'Select a record to inspect.'}
        </p>
      </div>
    </section>
  );
}
