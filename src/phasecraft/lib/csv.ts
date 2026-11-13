import type { Signature } from '@/phasecraft/data/signatures';

function cell(v: string): string {
  return `"${v.replace(/"/g, '""')}"`;
}

/** The reader's record as a spreadsheet: every signature they starred or wrote an act for. */
export function exportRecordCSV(
  signatures: Signature[],
  favorites: Record<number, boolean>,
  notes: Record<number, string>
): string {
  const header = 'Signature,Name,Sensory signature,Favorite,Your act';
  const rows = signatures
    .filter((s) => favorites[s.day] || notes[s.day])
    .map((s) =>
      [cell(s.code), cell(s.name), cell(s.sensory), favorites[s.day] ? 'Yes' : 'No', cell(notes[s.day] || '')].join(',')
    );
  return [header, ...rows].join('\n');
}

export function downloadFile(content: string, filename: string, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
