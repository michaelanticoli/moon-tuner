 // 2026 Lunar Ephemeris Data - Astronomically Accurate
 // Moon sign ingress times (when Moon enters each zodiac sign)
 // All times are in local timezone (PST/PDT as applicable)
 
 export interface MoonIngress {
   date: Date;
   sign: ZodiacSign;
 }
 
 export type ZodiacSign = 
   | "Aries" | "Taurus" | "Gemini" | "Cancer" 
   | "Leo" | "Virgo" | "Libra" | "Scorpio" 
   | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces";
 
 export interface PrimaryPhase {
   date: Date;
   phase: "New Moon" | "First Quarter" | "Full Moon" | "Last Quarter";
   sign?: ZodiacSign;
 }
 
 // 2026 Moon Sign Ingress Data
 // Times converted to UTC for consistency
 export const MOON_INGRESSES_2026: MoonIngress[] = [
   // January 2026
   { date: new Date("2026-01-02T13:09:00Z"), sign: "Cancer" },
   { date: new Date("2026-01-04T13:43:00Z"), sign: "Leo" },
   { date: new Date("2026-01-06T16:56:00Z"), sign: "Virgo" },
   { date: new Date("2026-01-09T00:05:00Z"), sign: "Libra" },
   { date: new Date("2026-01-11T10:55:00Z"), sign: "Scorpio" },
   { date: new Date("2026-01-13T23:34:00Z"), sign: "Sagittarius" },
   { date: new Date("2026-01-16T11:47:00Z"), sign: "Capricorn" },
   { date: new Date("2026-01-18T22:18:00Z"), sign: "Aquarius" },
   { date: new Date("2026-01-21T06:49:00Z"), sign: "Pisces" },
   { date: new Date("2026-01-23T13:25:00Z"), sign: "Aries" },
   { date: new Date("2026-01-25T18:05:00Z"), sign: "Taurus" },
   { date: new Date("2026-01-27T20:55:00Z"), sign: "Gemini" },
   { date: new Date("2026-01-29T22:31:00Z"), sign: "Cancer" },
   { date: new Date("2026-02-01T00:09:00Z"), sign: "Leo" },
   // February 2026
   { date: new Date("2026-02-03T03:21:00Z"), sign: "Virgo" },
   { date: new Date("2026-02-05T09:32:00Z"), sign: "Libra" },
   { date: new Date("2026-02-07T19:13:00Z"), sign: "Scorpio" },
   { date: new Date("2026-02-10T07:22:00Z"), sign: "Sagittarius" },
   { date: new Date("2026-02-12T19:44:00Z"), sign: "Capricorn" },
   { date: new Date("2026-02-15T06:16:00Z"), sign: "Aquarius" },
   { date: new Date("2026-02-17T14:09:00Z"), sign: "Pisces" },
   { date: new Date("2026-02-19T19:39:00Z"), sign: "Aries" },
   { date: new Date("2026-02-21T23:31:00Z"), sign: "Taurus" },
   { date: new Date("2026-02-24T02:29:00Z"), sign: "Gemini" },
   { date: new Date("2026-02-26T05:11:00Z"), sign: "Cancer" },
   { date: new Date("2026-02-28T08:16:00Z"), sign: "Leo" },
   // March 2026
   { date: new Date("2026-03-02T12:33:00Z"), sign: "Virgo" },
   { date: new Date("2026-03-04T18:55:00Z"), sign: "Libra" },
   { date: new Date("2026-03-07T04:01:00Z"), sign: "Scorpio" },
   { date: new Date("2026-03-09T15:36:00Z"), sign: "Sagittarius" }, // DST begins
   { date: new Date("2026-03-12T04:07:00Z"), sign: "Capricorn" },
   { date: new Date("2026-03-14T15:13:00Z"), sign: "Aquarius" },
   { date: new Date("2026-03-16T23:15:00Z"), sign: "Pisces" },
   { date: new Date("2026-03-19T04:03:00Z"), sign: "Aries" },
   { date: new Date("2026-03-21T06:35:00Z"), sign: "Taurus" },
   { date: new Date("2026-03-23T08:18:00Z"), sign: "Gemini" },
   { date: new Date("2026-03-25T10:33:00Z"), sign: "Cancer" },
   { date: new Date("2026-03-27T14:10:00Z"), sign: "Leo" },
   { date: new Date("2026-03-29T19:33:00Z"), sign: "Virgo" },
   { date: new Date("2026-04-01T02:50:00Z"), sign: "Libra" },
   // April 2026
   { date: new Date("2026-04-03T12:11:00Z"), sign: "Scorpio" },
   { date: new Date("2026-04-05T23:31:00Z"), sign: "Sagittarius" },
   { date: new Date("2026-04-08T12:04:00Z"), sign: "Capricorn" },
   { date: new Date("2026-04-10T23:55:00Z"), sign: "Aquarius" },
   { date: new Date("2026-04-13T08:55:00Z"), sign: "Pisces" },
   { date: new Date("2026-04-15T14:04:00Z"), sign: "Aries" },
   { date: new Date("2026-04-17T15:57:00Z"), sign: "Taurus" },
   { date: new Date("2026-04-19T16:17:00Z"), sign: "Gemini" },
   { date: new Date("2026-04-21T17:00:00Z"), sign: "Cancer" },
   { date: new Date("2026-04-23T19:40:00Z"), sign: "Leo" },
   { date: new Date("2026-04-26T01:04:00Z"), sign: "Virgo" },
   { date: new Date("2026-04-28T09:02:00Z"), sign: "Libra" },
   { date: new Date("2026-04-30T19:02:00Z"), sign: "Scorpio" },
   // May 2026
   { date: new Date("2026-05-03T06:33:00Z"), sign: "Sagittarius" },
   { date: new Date("2026-05-05T19:06:00Z"), sign: "Capricorn" },
   { date: new Date("2026-05-08T07:27:00Z"), sign: "Aquarius" },
   { date: new Date("2026-05-10T17:39:00Z"), sign: "Pisces" },
   { date: new Date("2026-05-13T00:03:00Z"), sign: "Aries" },
   { date: new Date("2026-05-15T02:31:00Z"), sign: "Taurus" },
   { date: new Date("2026-05-17T02:23:00Z"), sign: "Gemini" },
   { date: new Date("2026-05-19T01:46:00Z"), sign: "Cancer" },
   { date: new Date("2026-05-21T02:47:00Z"), sign: "Leo" },
   { date: new Date("2026-05-23T06:57:00Z"), sign: "Virgo" },
   { date: new Date("2026-05-25T14:34:00Z"), sign: "Libra" },
   { date: new Date("2026-05-28T00:52:00Z"), sign: "Scorpio" },
   { date: new Date("2026-05-30T12:45:00Z"), sign: "Sagittarius" },
   // June 2026
   { date: new Date("2026-06-02T01:19:00Z"), sign: "Capricorn" },
   { date: new Date("2026-06-04T13:45:00Z"), sign: "Aquarius" },
   { date: new Date("2026-06-07T00:42:00Z"), sign: "Pisces" },
   { date: new Date("2026-06-09T08:33:00Z"), sign: "Aries" },
   { date: new Date("2026-06-11T12:28:00Z"), sign: "Taurus" },
   { date: new Date("2026-06-13T13:06:00Z"), sign: "Gemini" },
   { date: new Date("2026-06-15T12:14:00Z"), sign: "Cancer" },
   { date: new Date("2026-06-17T12:05:00Z"), sign: "Leo" },
   { date: new Date("2026-06-19T14:37:00Z"), sign: "Virgo" },
   { date: new Date("2026-06-21T20:55:00Z"), sign: "Libra" },
   { date: new Date("2026-06-24T06:43:00Z"), sign: "Scorpio" },
   { date: new Date("2026-06-26T18:41:00Z"), sign: "Sagittarius" },
   { date: new Date("2026-06-29T07:18:00Z"), sign: "Capricorn" },
   // July 2026
   { date: new Date("2026-07-01T19:33:00Z"), sign: "Aquarius" },
   { date: new Date("2026-07-04T06:30:00Z"), sign: "Pisces" },
   { date: new Date("2026-07-06T15:07:00Z"), sign: "Aries" },
   { date: new Date("2026-07-08T20:30:00Z"), sign: "Taurus" },
   { date: new Date("2026-07-10T22:41:00Z"), sign: "Gemini" },
   { date: new Date("2026-07-12T22:46:00Z"), sign: "Cancer" },
   { date: new Date("2026-07-14T22:35:00Z"), sign: "Leo" },
   { date: new Date("2026-07-17T00:07:00Z"), sign: "Virgo" },
   { date: new Date("2026-07-19T04:56:00Z"), sign: "Libra" },
   { date: new Date("2026-07-21T13:34:00Z"), sign: "Scorpio" },
   { date: new Date("2026-07-24T01:07:00Z"), sign: "Sagittarius" },
   { date: new Date("2026-07-26T13:44:00Z"), sign: "Capricorn" },
   { date: new Date("2026-07-29T01:46:00Z"), sign: "Aquarius" },
   { date: new Date("2026-07-31T12:14:00Z"), sign: "Pisces" },
   // August 2026
   { date: new Date("2026-08-02T20:37:00Z"), sign: "Aries" },
   { date: new Date("2026-08-05T02:35:00Z"), sign: "Taurus" },
   { date: new Date("2026-08-07T06:07:00Z"), sign: "Gemini" },
   { date: new Date("2026-08-09T07:45:00Z"), sign: "Cancer" },
   { date: new Date("2026-08-11T08:38:00Z"), sign: "Leo" },
   { date: new Date("2026-08-13T10:18:00Z"), sign: "Virgo" },
   { date: new Date("2026-08-15T14:19:00Z"), sign: "Libra" },
   { date: new Date("2026-08-17T21:46:00Z"), sign: "Scorpio" },
   { date: new Date("2026-08-20T08:30:00Z"), sign: "Sagittarius" },
   { date: new Date("2026-08-22T20:59:00Z"), sign: "Capricorn" },
   { date: new Date("2026-08-25T09:01:00Z"), sign: "Aquarius" },
   { date: new Date("2026-08-27T19:03:00Z"), sign: "Pisces" },
   { date: new Date("2026-08-30T02:37:00Z"), sign: "Aries" },
   // September 2026
   { date: new Date("2026-09-01T08:01:00Z"), sign: "Taurus" },
   { date: new Date("2026-09-03T11:47:00Z"), sign: "Gemini" },
   { date: new Date("2026-09-05T14:30:00Z"), sign: "Cancer" },
   { date: new Date("2026-09-07T16:49:00Z"), sign: "Leo" },
   { date: new Date("2026-09-09T19:35:00Z"), sign: "Virgo" },
   { date: new Date("2026-09-11T23:51:00Z"), sign: "Libra" },
   { date: new Date("2026-09-14T06:44:00Z"), sign: "Scorpio" },
   { date: new Date("2026-09-16T16:41:00Z"), sign: "Sagittarius" },
   { date: new Date("2026-09-19T04:55:00Z"), sign: "Capricorn" },
   { date: new Date("2026-09-21T17:14:00Z"), sign: "Aquarius" },
   { date: new Date("2026-09-24T03:23:00Z"), sign: "Pisces" },
   { date: new Date("2026-09-26T10:23:00Z"), sign: "Aries" },
   { date: new Date("2026-09-28T14:40:00Z"), sign: "Taurus" },
   { date: new Date("2026-09-30T17:26:00Z"), sign: "Gemini" },
   // October 2026
   { date: new Date("2026-10-02T19:54:00Z"), sign: "Cancer" },
   { date: new Date("2026-10-04T22:54:00Z"), sign: "Leo" },
   { date: new Date("2026-10-07T02:52:00Z"), sign: "Virgo" },
   { date: new Date("2026-10-09T08:10:00Z"), sign: "Libra" },
   { date: new Date("2026-10-11T15:21:00Z"), sign: "Scorpio" },
   { date: new Date("2026-10-14T00:59:00Z"), sign: "Sagittarius" },
   { date: new Date("2026-10-16T12:57:00Z"), sign: "Capricorn" },
   { date: new Date("2026-10-19T01:40:00Z"), sign: "Aquarius" },
   { date: new Date("2026-10-21T12:35:00Z"), sign: "Pisces" },
   { date: new Date("2026-10-23T19:53:00Z"), sign: "Aries" },
   { date: new Date("2026-10-25T23:34:00Z"), sign: "Taurus" },
   { date: new Date("2026-10-28T01:02:00Z"), sign: "Gemini" },
   { date: new Date("2026-10-30T02:05:00Z"), sign: "Cancer" },
   { date: new Date("2026-11-01T04:18:00Z"), sign: "Leo" }, // DST ends
   // November 2026
   { date: new Date("2026-11-03T08:27:00Z"), sign: "Virgo" },
   { date: new Date("2026-11-05T14:38:00Z"), sign: "Libra" },
   { date: new Date("2026-11-07T22:40:00Z"), sign: "Scorpio" },
   { date: new Date("2026-11-10T08:35:00Z"), sign: "Sagittarius" },
   { date: new Date("2026-11-12T20:27:00Z"), sign: "Capricorn" },
   { date: new Date("2026-11-15T09:24:00Z"), sign: "Aquarius" },
   { date: new Date("2026-11-17T21:19:00Z"), sign: "Pisces" },
   { date: new Date("2026-11-20T05:52:00Z"), sign: "Aries" },
   { date: new Date("2026-11-22T10:09:00Z"), sign: "Taurus" },
   { date: new Date("2026-11-24T11:09:00Z"), sign: "Gemini" },
   { date: new Date("2026-11-26T10:51:00Z"), sign: "Cancer" },
   { date: new Date("2026-11-28T11:20:00Z"), sign: "Leo" },
   { date: new Date("2026-11-30T14:12:00Z"), sign: "Virgo" },
   // December 2026
   { date: new Date("2026-12-02T20:04:00Z"), sign: "Libra" },
   { date: new Date("2026-12-05T04:35:00Z"), sign: "Scorpio" },
   { date: new Date("2026-12-07T15:06:00Z"), sign: "Sagittarius" },
   { date: new Date("2026-12-10T03:08:00Z"), sign: "Capricorn" },
   { date: new Date("2026-12-12T16:05:00Z"), sign: "Aquarius" },
   { date: new Date("2026-12-15T04:35:00Z"), sign: "Pisces" },
   { date: new Date("2026-12-17T14:34:00Z"), sign: "Aries" },
   { date: new Date("2026-12-19T20:29:00Z"), sign: "Taurus" },
   { date: new Date("2026-12-21T22:27:00Z"), sign: "Gemini" },
   { date: new Date("2026-12-23T21:58:00Z"), sign: "Cancer" },
   { date: new Date("2026-12-25T21:12:00Z"), sign: "Leo" },
   { date: new Date("2026-12-27T22:13:00Z"), sign: "Virgo" },
   { date: new Date("2026-12-30T02:26:00Z"), sign: "Libra" },
 ];
 
 // 2026 Primary Phases (New Moon, First Quarter, Full Moon, Last Quarter)
 // Times from user-provided data in PST/PDT, converted to UTC
 export const PRIMARY_PHASES_2026: PrimaryPhase[] = [
   // January 2026
   { date: new Date("2026-01-03T10:03:00Z"), phase: "Full Moon" },
   { date: new Date("2026-01-10T18:48:00Z"), phase: "Last Quarter" },
   { date: new Date("2026-01-18T19:52:00Z"), phase: "New Moon" },
   { date: new Date("2026-01-26T04:47:00Z"), phase: "First Quarter" },
   // February 2026
   { date: new Date("2026-02-01T22:09:00Z"), phase: "Full Moon" },
   { date: new Date("2026-02-09T08:43:00Z"), phase: "Last Quarter" },
   { date: new Date("2026-02-17T12:01:00Z"), phase: "New Moon" },
   { date: new Date("2026-02-24T12:27:00Z"), phase: "First Quarter" },
   // March 2026
   { date: new Date("2026-03-03T11:38:00Z"), phase: "Full Moon" },
   { date: new Date("2026-03-11T01:38:00Z"), phase: "Last Quarter" },
   { date: new Date("2026-03-19T01:23:00Z"), phase: "New Moon" }, // PDT
   { date: new Date("2026-03-25T19:18:00Z"), phase: "First Quarter" },
   // April 2026
   { date: new Date("2026-04-02T02:12:00Z"), phase: "Full Moon" },
   { date: new Date("2026-04-09T14:51:00Z"), phase: "Last Quarter" },
   { date: new Date("2026-04-17T11:52:00Z"), phase: "New Moon" },
   { date: new Date("2026-04-24T02:32:00Z"), phase: "First Quarter" },
   // May 2026
   { date: new Date("2026-05-01T17:23:00Z"), phase: "Full Moon" },
   { date: new Date("2026-05-09T01:10:00Z"), phase: "Last Quarter" },
   { date: new Date("2026-05-16T20:01:00Z"), phase: "New Moon" },
   { date: new Date("2026-05-23T11:11:00Z"), phase: "First Quarter" },
   { date: new Date("2026-05-31T08:45:00Z"), phase: "Full Moon" },
   // June 2026
   { date: new Date("2026-06-07T11:01:00Z"), phase: "Last Quarter" },
   { date: new Date("2026-06-15T02:54:00Z"), phase: "New Moon" },
   { date: new Date("2026-06-21T21:55:00Z"), phase: "First Quarter" },
   { date: new Date("2026-06-29T23:56:00Z"), phase: "Full Moon" },
   // July 2026
   { date: new Date("2026-07-07T02:28:00Z"), phase: "Last Quarter" },
   { date: new Date("2026-07-14T09:43:00Z"), phase: "New Moon" },
   { date: new Date("2026-07-21T11:05:00Z"), phase: "First Quarter" },
   { date: new Date("2026-07-29T14:36:00Z"), phase: "Full Moon" },
   // August 2026
   { date: new Date("2026-08-05T14:21:00Z"), phase: "Last Quarter" },
   { date: new Date("2026-08-12T17:37:00Z"), phase: "New Moon" },
   { date: new Date("2026-08-20T02:46:00Z"), phase: "First Quarter" },
   { date: new Date("2026-08-28T04:18:00Z"), phase: "Full Moon" },
   // September 2026
   { date: new Date("2026-09-04T01:52:00Z"), phase: "Last Quarter" },
   { date: new Date("2026-09-10T15:50:00Z"), phase: "New Moon" },
   { date: new Date("2026-09-18T20:44:00Z"), phase: "First Quarter" },
   { date: new Date("2026-09-26T16:49:00Z"), phase: "Full Moon" },
   // October 2026
   { date: new Date("2026-10-03T14:25:00Z"), phase: "Last Quarter" },
   { date: new Date("2026-10-10T15:50:00Z"), phase: "New Moon" },
   { date: new Date("2026-10-18T16:12:00Z"), phase: "First Quarter" },
   { date: new Date("2026-10-26T04:12:00Z"), phase: "Full Moon" },
   // November 2026 (PST)
   { date: new Date("2026-11-02T05:28:00Z"), phase: "Last Quarter" },
   { date: new Date("2026-11-09T07:02:00Z"), phase: "New Moon" },
   { date: new Date("2026-11-17T11:48:00Z"), phase: "First Quarter" },
   { date: new Date("2026-11-24T14:53:00Z"), phase: "Full Moon" },
   // December 2026
   { date: new Date("2026-12-02T01:21:00Z"), phase: "Last Quarter" },
   { date: new Date("2026-12-09T00:52:00Z"), phase: "New Moon" },
   { date: new Date("2026-12-17T05:42:00Z"), phase: "First Quarter" },
   { date: new Date("2026-12-24T01:28:00Z"), phase: "Full Moon" },
 ];
 
 // Get current moon sign from 2026 data
 export function getMoonSign2026(date: Date = new Date()): { sign: ZodiacSign; enteredAt: Date; nextIngress: Date | null } {
   const now = date.getTime();
   
   // Find the most recent ingress before the given date
   let currentIngress: MoonIngress | null = null;
   let nextIngress: MoonIngress | null = null;
   
   for (let i = 0; i < MOON_INGRESSES_2026.length; i++) {
     const ingress = MOON_INGRESSES_2026[i];
     if (ingress.date.getTime() <= now) {
       currentIngress = ingress;
       nextIngress = MOON_INGRESSES_2026[i + 1] || null;
     } else {
       break;
     }
   }
   
   // Fallback for dates outside 2026 data range
   if (!currentIngress) {
     // If before 2026 data, use first entry as approximation
     return {
       sign: MOON_INGRESSES_2026[0].sign,
       enteredAt: MOON_INGRESSES_2026[0].date,
       nextIngress: MOON_INGRESSES_2026[1]?.date || null,
     };
   }
   
   return {
     sign: currentIngress.sign,
     enteredAt: currentIngress.date,
     nextIngress: nextIngress?.date || null,
   };
 }
 
 // Get the 8-phase name from primary phases
 export function getMoonPhase2026(date: Date = new Date()): {
   phaseName: string;
   exactPhase: PrimaryPhase | null;
   illumination: number;
   isWaxing: boolean;
   dayInPhase: number;
 } {
   const now = date.getTime();
   
   // Find surrounding primary phases
   let prevPhase: PrimaryPhase | null = null;
   let nextPhase: PrimaryPhase | null = null;
   
   for (let i = 0; i < PRIMARY_PHASES_2026.length; i++) {
     const phase = PRIMARY_PHASES_2026[i];
     if (phase.date.getTime() <= now) {
       prevPhase = phase;
       nextPhase = PRIMARY_PHASES_2026[i + 1] || null;
     } else {
       if (!prevPhase) {
         // Before first phase in data
         prevPhase = PRIMARY_PHASES_2026[PRIMARY_PHASES_2026.length - 1]; // Wrap to last
       }
       nextPhase = phase;
       break;
     }
   }
   
   if (!prevPhase || !nextPhase) {
     // Fallback
     return {
       phaseName: "Full Moon",
       exactPhase: null,
       illumination: 1,
       isWaxing: false,
       dayInPhase: 0,
     };
   }
   
   // Calculate position between phases
   const phaseLength = nextPhase.date.getTime() - prevPhase.date.getTime();
   const elapsed = now - prevPhase.date.getTime();
   const progress = elapsed / phaseLength;
   const daysSincePrevPhase = elapsed / (1000 * 60 * 60 * 24);
   
   // Determine 8-phase name based on previous primary phase and progress
   const phaseName = get8PhaseName(prevPhase.phase, progress);
   
   // Calculate illumination
   const illumination = calculateIllumination(prevPhase.phase, progress);
   
   // Determine if waxing
   const isWaxing = prevPhase.phase === "New Moon" || prevPhase.phase === "First Quarter" ||
     (prevPhase.phase === "Full Moon" && progress < 0.1);
   
   return {
     phaseName,
     exactPhase: prevPhase,
     illumination,
     isWaxing,
     dayInPhase: Math.floor(daysSincePrevPhase),
   };
 }
 
 function get8PhaseName(lastPrimaryPhase: string, progress: number): string {
   // Map primary phases to 8-phase system based on progress
   switch (lastPrimaryPhase) {
     case "New Moon":
       return progress < 0.5 ? "New Moon" : "Waxing Crescent";
     case "First Quarter":
       return progress < 0.5 ? "First Quarter" : "Waxing Gibbous";
     case "Full Moon":
       return progress < 0.5 ? "Full Moon" : "Waning Gibbous";
     case "Last Quarter":
       return progress < 0.5 ? "Last Quarter" : "Waning Crescent";
     default:
       return "New Moon";
   }
 }
 
 function calculateIllumination(lastPrimaryPhase: string, progress: number): number {
   // Calculate illumination based on phase cycle
   switch (lastPrimaryPhase) {
     case "New Moon":
       return progress * 0.5; // 0% to 50%
     case "First Quarter":
       return 0.5 + progress * 0.5; // 50% to 100%
     case "Full Moon":
       return 1 - progress * 0.5; // 100% to 50%
     case "Last Quarter":
       return 0.5 - progress * 0.5; // 50% to 0%
     default:
       return 0.5;
   }
 }
 
 // Get hours remaining in current sign
 export function getHoursInSign(date: Date = new Date()): number {
   const signData = getMoonSign2026(date);
   if (!signData.nextIngress) return 0;
   
   const msRemaining = signData.nextIngress.getTime() - date.getTime();
   return Math.max(0, Math.floor(msRemaining / (1000 * 60 * 60)));
 }