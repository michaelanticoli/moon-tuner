import { PhaseEntry } from '@/phasecraft/data/phases';

export function exportNotesCSV(
  phases: PhaseEntry[],
  favorites: Record<number, boolean>,
  notes: Record<number, string>
): string {
  const header = 'Day,Theme,Favorite,Note';
  const rows = phases
    .filter((p) => favorites[p.day] || notes[p.day])
    .map(
      (p) =>
        `${p.day},"${p.theme}",${favorites[p.day] ? 'Yes' : 'No'},"${(notes[p.day] || '').replace(/"/g, '""')}"`
    );
  return [header, ...rows].join('\n');
}

function parseLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export function parsePhaseCSV(csvText: string): PhaseEntry[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) throw new Error('CSV must have a header row and at least one data row');

  return lines
    .slice(1)
    .filter((l) => l.trim())
    .map((line) => {
      const f = parseLine(line);
      return {
        day: parseInt(f[0]),
        row: parseInt(f[1]),
        column: parseInt(f[2]),
        theme: f[3] || '',
        coreTheme: f[4] || '',
        archetypalTag: f[5] || '',
        dailyPrompt: f[6] || '',
        practicalApplication: f[7] || '',
        symbolicAnchor: f[8] || '',
      };
    });
}

export function downloadFile(content: string, filename: string, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
