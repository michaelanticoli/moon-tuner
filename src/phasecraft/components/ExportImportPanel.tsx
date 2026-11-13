import { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/phasecraft/store/useAppStore';
import { exportRecordCSV, downloadFile } from '@/phasecraft/lib/csv';
import { SIGNATURES } from '@/phasecraft/data/signatures';

/** Back up and restore the reader's record, which lives only on this device. */
export function ExportImportPanel() {
  const store = useAppStore();
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const stamp = new Date().toISOString().slice(0, 10);

  const handleExportJSON = () => {
    const data = JSON.stringify({ favorites: store.favorites, notes: store.notes }, null, 2);
    downloadFile(data, `phasecraft-record-${stamp}.json`, 'application/json');
    toast('Backup saved');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        if (!data || (typeof data.notes !== 'object' && typeof data.favorites !== 'object')) {
          throw new Error('not a Phasecraft backup');
        }
        store.importState(data);
        toast('Record restored');
      } catch {
        toast.error('That file is not a Phasecraft backup');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportCSV = () => {
    downloadFile(exportRecordCSV(SIGNATURES, store.favorites, store.notes), `phasecraft-record-${stamp}.csv`, 'text/csv');
    toast('Spreadsheet saved');
  };

  return (
    <section className="space-y-3" aria-labelledby="backup-heading">
      <div>
        <h3 id="backup-heading" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Back up your record
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Your favorites and acts are saved in this browser only. Save a backup to keep them or move them to another
          device.
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <Button variant="outline" onClick={handleExportJSON} className="min-h-[44px]">
          <Download className="mr-2 h-4 w-4" />
          Save backup
        </Button>
        <Button variant="outline" onClick={() => jsonInputRef.current?.click()} className="min-h-[44px]">
          <Upload className="mr-2 h-4 w-4" />
          Restore backup
        </Button>
        <Button variant="outline" onClick={handleExportCSV} className="min-h-[44px]">
          <Download className="mr-2 h-4 w-4" />
          Spreadsheet (CSV)
        </Button>
      </div>
      <input ref={jsonInputRef} type="file" accept=".json,application/json" onChange={handleImportJSON} className="hidden" />
    </section>
  );
}
