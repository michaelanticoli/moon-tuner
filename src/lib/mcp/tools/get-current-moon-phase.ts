import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import * as Astronomy from "astronomy-engine";

function phaseName(angle: number): string {
  const a = ((angle % 360) + 360) % 360;
  if (a < 22.5 || a >= 337.5) return "New Moon";
  if (a < 67.5) return "Waxing Crescent";
  if (a < 112.5) return "First Quarter";
  if (a < 157.5) return "Waxing Gibbous";
  if (a < 202.5) return "Full Moon";
  if (a < 247.5) return "Waning Gibbous";
  if (a < 292.5) return "Last Quarter";
  return "Waning Crescent";
}

export default defineTool({
  name: "get_current_moon_phase",
  title: "Get current moon phase",
  description:
    "Return the current moon phase angle, phase name, illumination percentage, and Moon zodiac sign for right now (UTC).",
  inputSchema: {},
  annotations: {
    readOnlyHint: true,
    idempotentHint: false,
    openWorldHint: false,
  },
  handler: () => {
    const now = new Date();
    const angle = Astronomy.MoonPhase(now);
    const illum = Astronomy.Illumination(Astronomy.Body.Moon, now);
    const eq = Astronomy.Equator(Astronomy.Body.Moon, now, {
      latitude: 0,
      longitude: 0,
      height: 0,
    }, true, true);
    const ecl = Astronomy.Ecliptic(eq.vec);
    const signs = [
      "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
      "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
    ];
    const signIdx = Math.floor(((ecl.elon % 360) + 360) % 360 / 30);
    const payload = {
      timestampUtc: now.toISOString(),
      phaseAngleDegrees: Number(angle.toFixed(3)),
      phaseName: phaseName(angle),
      illuminationPercent: Number((illum.phase_fraction * 100).toFixed(2)),
      moonSign: signs[signIdx],
      moonEclipticLongitudeDegrees: Number(ecl.elon.toFixed(3)),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
