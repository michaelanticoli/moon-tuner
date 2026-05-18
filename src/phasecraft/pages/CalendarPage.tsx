import { CalendarGrid } from '@/components/CalendarGrid';
import { useAppStore } from '@/store/useAppStore';
import { getCurrentDay } from '@/lib/date';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Crosshair } from 'lucide-react';

export default function CalendarPage() {
  const { startDate, getPhases } = useAppStore();
  const currentDay = getCurrentDay(startDate);
  const phases = getPhases();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Calendar</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/day/${currentDay}`)}
          className="min-h-[44px]"
        >
          <Crosshair className="h-4 w-4 mr-2" />
          Current
        </Button>
      </div>
      <CalendarGrid phases={phases} currentDay={currentDay} />
    </div>
  );
}
