// Shared creator/admin allowlist for free internal access to paid features.
export const CREATOR_EMAILS = [
  "michaelanticoli@gmail.com",
  "hello@moontuner.xyz",
  "logisticalastrology@gmail.com",
];

export const isCreator = (email?: string | null): boolean =>
  !!email && CREATOR_EMAILS.includes(email.toLowerCase());
