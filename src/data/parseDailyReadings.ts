// Parse 2026 daily readings from CSV data
// Both CSVs share the same column structure

export interface DailyReading {
  date: string; // "2026-01-01" format for lookup
  title: string;
  closingWisdom: string;
  cosmicWeatherReport: string;
  energyType: string;
  featuredEvents: string;
  practicalSuggestions: string[];
  readingDate: string; // Original date string
  realWorldTranslation: string;
  whatThisMeansForYou: string;
}

// Simple CSV parser that handles quoted fields with commas
function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}

function parseReadingDate(dateStr: string): string | null {
  // Input format: "January 1, 2026" or similar
  const months: Record<string, string> = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };

  const match = dateStr.match(/(\w+)\s+(\d+),\s+(\d{4})/);
  if (!match) return null;

  const month = months[match[1]];
  const day = match[2].padStart(2, '0');
  const year = match[3];

  if (!month) return null;
  return `${year}-${month}-${day}`;
}

export function parseCSV(csvText: string): DailyReading[] {
  const lines = csvText.split('\n').filter(l => l.trim());
  const readings: DailyReading[] = [];

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    if (fields.length < 9) continue;

    const [title, closingWisdom, cosmicWeatherReport, energyType, featuredEvents, practicalSuggestionsRaw, readingDate, realWorldTranslation, whatThisMeansForYou] = fields;

    const dateKey = parseReadingDate(readingDate);
    if (!dateKey) continue;

    const practicalSuggestions = practicalSuggestionsRaw
      .split('|')
      .map(s => s.replace(/^[•\s]+/, '').trim())
      .filter(Boolean);

    readings.push({
      date: dateKey,
      title: title.replace(/^"|"$/g, ''),
      closingWisdom,
      cosmicWeatherReport,
      energyType,
      featuredEvents,
      practicalSuggestions,
      readingDate,
      realWorldTranslation,
      whatThisMeansForYou,
    });
  }

  return readings;
}

// Cache for parsed readings
let cachedReadings: Map<string, DailyReading> | null = null;

export async function getDailyReadingsMap(): Promise<Map<string, DailyReading>> {
  if (cachedReadings) return cachedReadings;

  const [part1Module, part2Module] = await Promise.all([
    import('@/data/dailyReadings2026_part1.csv?raw'),
    import('@/data/dailyReadings2026_part2.csv?raw'),
  ]);

  const part1 = parseCSV(part1Module.default);
  const part2 = parseCSV(part2Module.default);

  cachedReadings = new Map<string, DailyReading>();
  for (const reading of [...part1, ...part2]) {
    cachedReadings.set(reading.date, reading);
  }

  return cachedReadings;
}

export function getDailyReading(readings: Map<string, DailyReading>, date: Date): DailyReading | null {
  const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return readings.get(key) || null;
}
