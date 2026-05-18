import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import { exportNotesCSV, parsePhaseCSV, downloadFile } from '@/lib/csv';
import { validatePhases } from '@/data/validate';
import { Download, Upload } from 'lucide-react';
import { toast } from 'sonner';

export function ExportImportPanel() {
  const store = useAppStore();
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const handleExportJSON = () => {
    const data = JSON.stringify(
      {
        startDate: store.startDate,
        favorites: store.favorites,
        notes: store.notes,
        themeMode: store.themeMode,
      },
      null,
      2
    );
    downloadFile(data, 'phasecraft-backup.json', 'application/json');
    toast('JSON exported');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        store.importState(data);
        toast('State restored from JSON');
      } catch {
        toast.error('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportCSV = () => {
    const phases = store.getPhases();
    const csv = exportNotesCSV(phases, store.favorites, store.notes);
    downloadFile(csv, 'phasecraft-notes.csv', 'text/csv');
    toast('CSV exported');
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const phases = parsePhaseCSV(reader.result as string);
        const errors = validatePhases(phases);
        if (errors.length > 0) {
          toast.error(`Validation errors: ${errors.slice(0, 3).join('; ')}`);
          return;
        }
        store.setCustomPhases(phases);
        toast('Dataset imported successfully');
      } catch (err: any) {
        toast.error(err.message || 'Failed to parse CSV');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Data
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={handleExportJSON} className="min-h-[44px]">
          <Download className="h-4 w-4 mr-2" />
          Export JSON
        </Button>
        <Button
          variant="outline"
          onClick={() => jsonInputRef.current?.click()}
          className="min-h-[44px]"
        >
          <Upload className="h-4 w-4 mr-2" />
          Import JSON
        </Button>
        <Button variant="outline" onClick={handleExportCSV} className="min-h-[44px]">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
        <Button
          variant="outline"
          onClick={() => csvInputRef.current?.click()}
          className="min-h-[44px]"
        >
          <Upload className="h-4 w-4 mr-2" />
          Import CSV
        </Button>
      </div>
      <input
        ref={jsonInputRef}
        type="file"
        accept=".json"
        onChange={handleImportJSON}
        className="hidden"
      />
      <input
        ref={csvInputRef}
        type="file"
        accept=".csv"
        onChange={handleImportCSV}
        className="hidden"
      />
    </div>
  );
}
