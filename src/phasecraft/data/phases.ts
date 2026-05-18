import csvData from './Phasecraft_96_Matrix_Companion.csv?raw';

export interface PhaseEntry {
  day: number;
  row: number;
  column: number;
  theme: string;
  coreTheme: string;
  archetypalTag: string;
  dailyPrompt: string;
  practicalApplication: string;
  symbolicAnchor: string;
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

function parseCSV(raw: string): PhaseEntry[] {
  const lines = raw.trim().split('\n');
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

export const defaultPhases: PhaseEntry[] = parseCSV(csvData);
