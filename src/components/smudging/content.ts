export type SmudgingPattern = {
  id: string;
  label: string;
  description: string;
  icon: string;
  releasePhrase: string;
};

export const SMUDGING_PATTERNS: SmudgingPattern[] = [
  { id: "notifications", label: "Notification overflow", description: "Alerts interrupting focus without adding real value", icon: "◎", releasePhrase: "I release the obligation to respond immediately." },
  { id: "feeds", label: "Mindless scrolling", description: "Feeds consumed without intention or return", icon: "◈", releasePhrase: "I release the habit of filling silence with scrolling." },
  { id: "subscriptions", label: "Forgotten subscriptions", description: "Services quietly drawing energy and attention", icon: "◇", releasePhrase: "I release what no longer earns a place in my life." },
  { id: "inbox", label: "Inbox weight", description: "Unread messages creating background pressure", icon: "◻", releasePhrase: "I release the anxiety of unread counts." },
  { id: "tabs", label: "Phantom tabs", description: "Kept open out of obligation, never revisited", icon: "◈", releasePhrase: "I release the illusion that keeping it open means acting on it." },
  { id: "apps", label: "Dormant apps", description: "Digital clutter collecting in silence", icon: "◇", releasePhrase: "I release what has gathered dust quietly." },
  { id: "comparison", label: "Comparison traps", description: "Spaces that diminish more than they expand", icon: "◎", releasePhrase: "I release the spaces that make me feel less than." },
  { id: "reactivity", label: "Habitual checking", description: "Reaching for a device without purpose", icon: "◻", releasePhrase: "I release the reflex to reach without reason." },
  { id: "news", label: "Passive news loops", description: "Consuming updates that create anxiety, not clarity", icon: "◈", releasePhrase: "I release the loop that creates urgency without clarity." },
  { id: "drafts", label: "Unfinished drafts", description: "Messages and projects carrying unresolved weight", icon: "◇", releasePhrase: "I release what has lingered unfinished for too long." },
];

export const SMUDGING_PATTERN_BY_ID = Object.fromEntries(
  SMUDGING_PATTERNS.map((pattern) => [pattern.id, pattern]),
) as Record<string, SmudgingPattern>;

export function getSmudgingPatternLabel(id: string) {
  return SMUDGING_PATTERN_BY_ID[id]?.label ?? id;
}
