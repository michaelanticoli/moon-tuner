// Shared creator/admin allowlist for free internal access to paid features.
export const CREATOR_EMAILS = [
  "michael@creativealchemy.xyz",
  "michael@moontuner.xyz",
  "moontuner@gmail.com",
];

export const isCreator = (email?: string | null): boolean =>
  !!email && CREATOR_EMAILS.includes(email.toLowerCase());
