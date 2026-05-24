import { getMoonState, effectFromMoonState } from './moon';

/**
 * The "current effect" is now derived from the live moon position:
 * row = current zodiac sign of the Moon, column = current lunar phase.
 * The startDate parameter is accepted for backward compatibility but ignored.
 */
export function getCurrentDay(_startDate?: string): number {
  return effectFromMoonState(getMoonState());
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
