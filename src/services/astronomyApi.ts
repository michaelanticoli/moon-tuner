export interface BirthDataInput {
  name: string;
  date: string;       // "YYYY-MM-DD"
  time?: string;      // "HH:MM"
  place: string;      // "City, State/Country"
  year?: number;      // 2026
}

export interface CompendiumResponse {
  [key: string]: unknown;
}

export const fetchCompendium = async (
  data: BirthDataInput
): Promise<CompendiumResponse> => {
  try {
    const response = await fetch(
      "https://moontuner-api.vercel.app/api/generate-compendium",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          date: data.date,
          time: data.time || null,
          place: data.place,
          year: data.year || 2026,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `Server returned status ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Compendium Generation Error:", error);
    throw error;
  }
};
