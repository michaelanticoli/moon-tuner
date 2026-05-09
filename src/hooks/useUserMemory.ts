/**
 * useUserMemory
 *
 * Persistence layer for the Moontuner ecosystem memory system.
 * Records user interactions — directives viewed, reflections written,
 * rituals performed, proposals submitted — alongside the lunar context
 * at the moment they occurred, so patterns can surface over time.
 */
import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import type { MemoryEntityType, TimelineEventType } from '@/lib/supabase';

export interface MemoryPayload {
  entityType: MemoryEntityType;
  entityId?: string;
  title?: string;
  emotionalTheme?: string;
  lunarPhase?: string;
  lunarPhasePct?: number;
  metadata?: Record<string, unknown>;
}

export interface TimelinePayload {
  eventType: TimelineEventType;
  title: string;
  description?: string;
  emotionalTheme?: string;
  lunarPhase?: string;
  lunarPhasePct?: number;
  metadata?: Record<string, unknown>;
  occurredAt?: string;
}

export interface TimelineEvent {
  id: string;
  event_type: TimelineEventType;
  title: string;
  description: string | null;
  emotional_theme: string | null;
  lunar_phase: string | null;
  lunar_phase_pct: number | null;
  metadata: Record<string, unknown>;
  occurred_at: string;
}

export interface MemoryEvent {
  id: string;
  entity_type: MemoryEntityType;
  entity_id: string | null;
  title: string | null;
  emotional_theme: string | null;
  lunar_phase: string | null;
  lunar_phase_pct: number | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export function useUserMemory() {
  const { user } = useAuth();

  /**
   * Record a memory — a lightweight event tied to an ecosystem entity.
   * Safe to call without a user (no-op for anonymous/unauthenticated).
   */
  const recordMemory = useCallback(
    async (payload: MemoryPayload): Promise<void> => {
      if (!user || user.is_anonymous) return;

      await supabase.from('user_memories').insert({
        user_id: user.id,
        entity_type: payload.entityType,
        entity_id: payload.entityId ?? null,
        title: payload.title ?? null,
        emotional_theme: payload.emotionalTheme ?? null,
        lunar_phase: payload.lunarPhase ?? null,
        lunar_phase_pct: payload.lunarPhasePct ?? null,
        metadata: payload.metadata ?? {},
      });
    },
    [user]
  );

  /**
   * Record a curated event to the longitudinal timeline.
   * Safe to call without a user (no-op for anonymous/unauthenticated).
   */
  const recordTimelineEvent = useCallback(
    async (payload: TimelinePayload): Promise<void> => {
      if (!user || user.is_anonymous) return;

      await supabase.from('timeline_events').insert({
        user_id: user.id,
        event_type: payload.eventType,
        title: payload.title,
        description: payload.description ?? null,
        emotional_theme: payload.emotionalTheme ?? null,
        lunar_phase: payload.lunarPhase ?? null,
        lunar_phase_pct: payload.lunarPhasePct ?? null,
        metadata: payload.metadata ?? {},
        occurred_at: payload.occurredAt ?? new Date().toISOString(),
      });
    },
    [user]
  );

  /**
   * Fetch the user's longitudinal timeline (most recent first).
   */
  const getTimeline = useCallback(
    async (limit = 50): Promise<TimelineEvent[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('timeline_events')
        .select('*')
        .eq('user_id', user.id)
        .order('occurred_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching timeline:', error);
        return [];
      }

      return (data ?? []) as TimelineEvent[];
    },
    [user]
  );

  /**
   * Fetch raw memories, optionally filtered by entity type.
   */
  const getMemories = useCallback(
    async (entityType?: MemoryEntityType, limit = 100): Promise<MemoryEvent[]> => {
      if (!user) return [];

      let query = supabase
        .from('user_memories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (entityType) {
        query = query.eq('entity_type', entityType);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching memories:', error);
        return [];
      }

      return (data ?? []) as MemoryEvent[];
    },
    [user]
  );

  /**
   * Export the user's full memory archive as a JSON blob.
   * Supports the "exportable archives" privacy requirement.
   */
  const exportArchive = useCallback(async (): Promise<void> => {
    if (!user) return;

    const [{ data: memories }, { data: timeline }, { data: charts }] =
      await Promise.all([
        supabase.from('user_memories').select('*').eq('user_id', user.id),
        supabase.from('timeline_events').select('*').eq('user_id', user.id),
        supabase.from('saved_charts').select('*').eq('user_id', user.id),
      ]);

    const archive = {
      exported_at: new Date().toISOString(),
      user_id: user.id,
      memories: memories ?? [],
      timeline: timeline ?? [],
      charts: charts ?? [],
    };

    const blob = new Blob([JSON.stringify(archive, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `moontuner-archive-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [user]);

  return {
    recordMemory,
    recordTimelineEvent,
    getTimeline,
    getMemories,
    exportArchive,
  };
}
