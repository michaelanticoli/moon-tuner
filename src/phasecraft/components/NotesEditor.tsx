import { useEffect, useId, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface NotesEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

/** Autosaving note field. Saves to this device half a second after typing stops. */
export function NotesEditor({ value, onChange, label = 'Notes', placeholder = 'Add your notes here…' }: NotesEditorProps) {
  const [local, setLocal] = useState(value);
  const [saved, setSaved] = useState(false);
  const id = useId();
  useEffect(() => setLocal(value), [value]);

  useEffect(() => {
    if (local === value) return;
    const timer = setTimeout(() => {
      onChange(local);
      setSaved(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [local, value, onChange]);

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 1600);
    return () => clearTimeout(t);
  }, [saved]);

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
        <span className="text-[11px] text-muted-foreground" aria-live="polite">
          {saved ? 'Saved on this device' : ''}
        </span>
      </div>
      <Textarea
        id={id}
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="min-h-[100px] resize-y"
      />
    </div>
  );
}
