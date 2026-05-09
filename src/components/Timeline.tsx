/**
 * Timeline
 *
 * Longitudinal archival timeline. Renders the user's record of interactions
 * — directives, reflections, rituals, proposals, reports — as an elegant,
 * emotionally meaningful scroll through their pattern history.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format, formatDistanceToNow } from 'date-fns';
import { Moon, BookOpen, Sparkles, FileText, Clock, Flame, Calendar } from 'lucide-react';
import { useUserMemory, type TimelineEvent } from '@/hooks/useUserMemory';
import { type TimelineEventType } from '@/lib/supabase';

const EVENT_META: Record<TimelineEventType, { label: string; Icon: React.ElementType; color: string }> = {
  directive_view:     { label: 'Directive',         Icon: Sparkles,  color: 'text-accent' },
  reflection_write:   { label: 'Reflection',        Icon: BookOpen,  color: 'text-gold' },
  proposal_submit:    { label: 'Proposal',          Icon: Calendar,  color: 'text-clay' },
  report_purchase:    { label: 'Report',            Icon: FileText,  color: 'text-foreground' },
  ritual:             { label: 'Ritual',            Icon: Flame,     color: 'text-accent' },
  workbook_progress:  { label: 'Workbook',          Icon: BookOpen,  color: 'text-gold' },
  chart_saved:        { label: 'Chart',             Icon: Moon,      color: 'text-accent' },
};

function TimelineNode({ event, index }: { event: TimelineEvent; index: number }) {
  const meta = EVENT_META[event.event_type] ?? {
    label: event.event_type,
    Icon: Clock,
    color: 'text-muted-foreground',
  };
  const { Icon, color, label } = meta;
  const date = new Date(event.occurred_at);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex gap-6 pb-10 last:pb-0"
    >
      {/* Spine line */}
      <div className="flex flex-col items-center">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-border/60 bg-card flex items-center justify-center ${color}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1 w-px bg-border/30 mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 pt-0.5 pb-2">
        <div className="flex items-baseline gap-3 mb-1 flex-wrap">
          <span className="text-[10px] tracking-widest uppercase text-muted-foreground/60 font-sans">
            {label}
          </span>
          {event.lunar_phase && (
            <span className="text-[10px] tracking-wider text-accent/60 font-sans">
              {event.lunar_phase}
            </span>
          )}
        </div>

        <h4 className="font-serif text-base text-foreground leading-snug mb-1">
          {event.title}
        </h4>

        {event.description && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            {event.description}
          </p>
        )}

        {event.emotional_theme && (
          <span className="inline-block text-[11px] text-gold/70 italic">
            {event.emotional_theme}
          </span>
        )}

        <p
          className="text-[11px] text-muted-foreground/50 mt-2"
          title={format(date, 'PPPp')}
        >
          {formatDistanceToNow(date, { addSuffix: true })}
        </p>
      </div>
    </motion.div>
  );
}

function EmptyTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16"
    >
      <Moon className="w-10 h-10 text-muted-foreground/20 mx-auto mb-5" />
      <p className="font-serif text-xl text-foreground/60 mb-2">
        Your record begins here.
      </p>
      <p className="text-sm text-muted-foreground/50 max-w-xs mx-auto leading-relaxed">
        Each reflection, directive, and ritual will leave a mark. The archive
        grows as you move through the lunar field.
      </p>
    </motion.div>
  );
}

export function Timeline() {
  const { getTimeline } = useUserMemory();
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTimeline(60).then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, [getTimeline]);

  if (loading) {
    return (
      <div className="space-y-6 py-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-6">
            <div className="w-8 h-8 rounded-full bg-muted/40 animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-3 w-16 bg-muted/40 rounded animate-pulse" />
              <div className="h-4 w-48 bg-muted/30 rounded animate-pulse" />
              <div className="h-3 w-24 bg-muted/20 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return <EmptyTimeline />;
  }

  return (
    <div className="relative">
      {events.map((event, i) => (
        <TimelineNode key={event.id} event={event} index={i} />
      ))}
    </div>
  );
}
