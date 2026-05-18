import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface NotesEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function NotesEditor({ value, onChange }: NotesEditorProps) {
  const [local, setLocal] = useState(value);
  useEffect(() => setLocal(value), [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (local !== value) onChange(local);
    }, 500);
    return () => clearTimeout(timer);
  }, [local, value, onChange]);

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Notes
      </label>
      <Textarea
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Add your notes here..."
        className="min-h-[100px] resize-none"
      />
    </div>
  );
}
