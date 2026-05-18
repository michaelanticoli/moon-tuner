import { PhaseEntry } from './phases';

export function validatePhases(entries: PhaseEntry[]): string[] {
  const errors: string[] = [];
  if (entries.length !== 96) errors.push(`Expected 96 entries, got ${entries.length}`);
  const days = new Set<number>();
  const cells = new Set<string>();
  entries.forEach((e) => {
    if (e.day < 1 || e.day > 96) errors.push(`Day ${e.day} out of range`);
    if (e.row < 1 || e.row > 12) errors.push(`Day ${e.day}: row ${e.row} out of range`);
    if (e.column < 1 || e.column > 8) errors.push(`Day ${e.day}: column ${e.column} out of range`);
    if (days.has(e.day)) errors.push(`Duplicate day ${e.day}`);
    days.add(e.day);
    const cell = `${e.row},${e.column}`;
    if (cells.has(cell)) errors.push(`Duplicate cell ${cell} on day ${e.day}`);
    cells.add(cell);
  });
  return errors;
}
