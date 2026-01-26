import jsPDF from 'jspdf';
import { 
  getPhase, 
  getPhaseName, 
  getPhaseKey,
  getDetailedInsight,
  type ArcMonth 
} from '@/hooks/useLunarCalculations';

interface LunarReportData {
  birthDate: Date;
  birthLocation: string;
  natalPhase: number;
  natalPhaseName: string;
  arc: ArcMonth[];
}

const PHASE_ARCHETYPES: Record<string, { archetype: string; element: string; modality: string; bodyZone: string; keywords: string[] }> = {
  'new': {
    archetype: 'The Seed',
    element: 'Earth/Void',
    modality: 'Cardinal Initiation',
    bodyZone: 'Pineal Gland, Third Eye',
    keywords: ['Incubation', 'Intention', 'Darkness', 'Potential', 'Stillness']
  },
  'waxing-crescent': {
    archetype: 'The Sprout',
    element: 'Earth Rising',
    modality: 'Fixed Emergence',
    bodyZone: 'Throat, Voice',
    keywords: ['Breakthrough', 'Courage', 'First Steps', 'Declaration', 'Momentum']
  },
  'first-quarter': {
    archetype: 'The Builder',
    element: 'Fire',
    modality: 'Cardinal Crisis',
    bodyZone: 'Solar Plexus, Gut',
    keywords: ['Decision', 'Conflict', 'Action', 'Commitment', 'Risk']
  },
  'waxing-gibbous': {
    archetype: 'The Refiner',
    element: 'Fire Rising',
    modality: 'Fixed Development',
    bodyZone: 'Heart, Chest',
    keywords: ['Adjustment', 'Patience', 'Analysis', 'Perfection', 'Devotion']
  },
  'full': {
    archetype: 'The Illuminator',
    element: 'Air/Light',
    modality: 'Cardinal Culmination',
    bodyZone: 'Eyes, Face, Skin',
    keywords: ['Revelation', 'Objectivity', 'Relationships', 'Harvest', 'Peak']
  },
  'waning-gibbous': {
    archetype: 'The Teacher',
    element: 'Air Descending',
    modality: 'Fixed Distribution',
    bodyZone: 'Hands, Arms',
    keywords: ['Sharing', 'Gratitude', 'Wisdom', 'Generosity', 'Communication']
  },
  'last-quarter': {
    archetype: 'The Liberator',
    element: 'Water',
    modality: 'Cardinal Release',
    bodyZone: 'Hips, Thighs, Elimination',
    keywords: ['Letting Go', 'Forgiveness', 'Reorientation', 'Crisis', 'Shedding']
  },
  'waning-crescent': {
    archetype: 'The Mystic',
    element: 'Water Deepening',
    modality: 'Fixed Surrender',
    bodyZone: 'Feet, Lymphatic System',
    keywords: ['Rest', 'Dreams', 'Dissolution', 'Prophecy', 'Transition']
  }
};

const SOLFEGGIO_FREQUENCIES: Record<string, { hz: number; meaning: string }> = {
  'new': { hz: 396, meaning: 'Liberation from fear and guilt' },
  'waxing-crescent': { hz: 417, meaning: 'Facilitating change and transformation' },
  'first-quarter': { hz: 528, meaning: 'Transformation, miracles, DNA repair' },
  'waxing-gibbous': { hz: 639, meaning: 'Harmonizing relationships' },
  'full': { hz: 741, meaning: 'Awakening intuition and expression' },
  'waning-gibbous': { hz: 852, meaning: 'Returning to spiritual order' },
  'last-quarter': { hz: 963, meaning: 'Awakening perfect state' },
  'waning-crescent': { hz: 174, meaning: 'Foundation of spiritual evolution' }
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const generateLunarPDF = (data: LunarReportData): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = margin;

  // Helper functions
  const addNewPage = () => {
    doc.addPage();
    yPos = margin;
  };

  const checkPageBreak = (neededSpace: number) => {
    if (yPos + neededSpace > pageHeight - margin) {
      addNewPage();
    }
  };

  const drawHorizontalLine = (y: number, width: number = contentWidth) => {
    doc.setDrawColor(180, 170, 150);
    doc.setLineWidth(0.3);
    doc.line(margin, y, margin + width, y);
  };

  // === COVER PAGE ===
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Title
  doc.setTextColor(235, 230, 220);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('MOONTUNER', pageWidth / 2, 60, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 170, 150);
  doc.text('PERSONAL LUNAR ARC REPORT', pageWidth / 2, 72, { align: 'center' });

  // Moon symbol
  doc.setFillColor(235, 230, 220);
  doc.circle(pageWidth / 2, 120, 25, 'F');
  doc.setFillColor(15, 15, 15);
  doc.circle(pageWidth / 2 + 10, 115, 22, 'F');

  // Birth data summary
  yPos = 170;
  doc.setTextColor(180, 170, 150);
  doc.setFontSize(10);
  doc.text('GENERATED FOR', pageWidth / 2, yPos, { align: 'center' });

  yPos += 12;
  doc.setTextColor(235, 230, 220);
  doc.setFontSize(14);
  doc.text(formatDate(data.birthDate), pageWidth / 2, yPos, { align: 'center' });

  if (data.birthLocation) {
    yPos += 8;
    doc.setFontSize(11);
    doc.text(data.birthLocation, pageWidth / 2, yPos, { align: 'center' });
  }

  yPos += 20;
  doc.setTextColor(180, 170, 150);
  doc.setFontSize(10);
  doc.text('NATAL LUNAR SIGNATURE', pageWidth / 2, yPos, { align: 'center' });

  yPos += 10;
  doc.setTextColor(235, 230, 220);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(data.natalPhaseName.toUpperCase(), pageWidth / 2, yPos, { align: 'center' });

  yPos += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 170, 150);
  doc.text(`${(data.natalPhase * 360).toFixed(2)}° Ecliptic Longitude`, pageWidth / 2, yPos, { align: 'center' });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(120, 110, 100);
  doc.text('moontuner.com', pageWidth / 2, pageHeight - 20, { align: 'center' });
  doc.text(`Generated ${formatDate(new Date())}`, pageWidth / 2, pageHeight - 14, { align: 'center' });

  // === NATAL SIGNATURE PAGE ===
  addNewPage();
  doc.setFillColor(252, 250, 245);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Natal Lunar Signature', margin, yPos + 10);

  yPos += 25;
  drawHorizontalLine(yPos);
  yPos += 15;

  const phaseKey = getPhaseKey(data.natalPhase);
  const archetype = PHASE_ARCHETYPES[phaseKey];
  const insight = getDetailedInsight(data.natalPhase);
  const frequency = SOLFEGGIO_FREQUENCIES[phaseKey];

  // Phase Details
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('PHASE', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(14);
  doc.text(data.natalPhaseName, margin, yPos + 7);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('ARCHETYPE', margin + 60, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(14);
  doc.text(archetype.archetype, margin + 60, yPos + 7);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('ELEMENT', margin + 120, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(14);
  doc.text(archetype.element, margin + 120, yPos + 7);

  yPos += 25;

  // Thematic Title
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('THEMATIC TITLE', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(16);
  doc.text(`"${insight.title}"`, margin, yPos + 8);

  yPos += 22;

  // Core Theme
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('CORE THEME', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(12);
  doc.text(insight.theme, margin, yPos + 7);

  yPos += 20;

  // Body Zone
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('SOMATIC ZONE', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(12);
  doc.text(archetype.bodyZone, margin, yPos + 7);

  yPos += 20;

  // Frequency
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('SOLFEGGIO FREQUENCY', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(12);
  doc.text(`${frequency.hz}Hz — ${frequency.meaning}`, margin, yPos + 7);

  yPos += 25;
  drawHorizontalLine(yPos);
  yPos += 15;

  // Natal Insight
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('NATAL INSIGHT', margin, yPos);
  yPos += 8;

  doc.setFont('helvetica', 'italic');
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(11);
  const insightLines = doc.splitTextToSize(insight.insight, contentWidth);
  doc.text(insightLines, margin, yPos);
  yPos += (insightLines.length * 6) + 10;

  // Natal Instruction
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('LIFELONG INSTRUCTION', margin, yPos);
  yPos += 8;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(11);
  const instructionLines = doc.splitTextToSize(insight.instruction, contentWidth);
  doc.text(instructionLines, margin, yPos);
  yPos += (instructionLines.length * 6) + 15;

  // Keywords
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('KEYWORDS', margin, yPos);
  yPos += 8;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(11);
  doc.text(archetype.keywords.join('  •  '), margin, yPos);

  yPos += 20;
  drawHorizontalLine(yPos);
  yPos += 15;

  // Interpretation paragraph
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('WHAT THIS MEANS FOR YOU', margin, yPos);
  yPos += 10;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(10);

  const interpretation = getNatalInterpretation(phaseKey, data.natalPhaseName);
  const interpLines = doc.splitTextToSize(interpretation, contentWidth);
  doc.text(interpLines, margin, yPos);

  // === 12-MONTH ARC PAGE ===
  addNewPage();
  doc.setFillColor(252, 250, 245);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Your 12-Month Lunar Arc', margin, yPos + 10);

  yPos += 20;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 90, 80);
  const arcIntro = `Each month, the Moon returns to your natal phase position. These are your personal power days—moments when the cosmic rhythm aligns with your birth signature. Use these dates for important decisions, launches, and deep work.`;
  const arcIntroLines = doc.splitTextToSize(arcIntro, contentWidth);
  doc.text(arcIntroLines, margin, yPos);
  yPos += (arcIntroLines.length * 5) + 10;

  drawHorizontalLine(yPos);
  yPos += 10;

  // Arc Table
  data.arc.forEach((month, index) => {
    checkPageBreak(35);

    // Month header
    doc.setFillColor(240, 238, 230);
    doc.rect(margin, yPos - 4, contentWidth, 28, 'F');

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`${month.month} ${month.day}`, margin + 5, yPos + 6);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 90, 80);
    doc.text(`${month.phase} Return`, margin + 5, yPos + 14);

    // Power indicator
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 120, 100);
    doc.text(month.intensity, margin + contentWidth - 25, yPos + 6);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('POWER', margin + contentWidth - 25, yPos + 12);

    // Focus
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(`Focus: ${month.focus}`, margin + 5, yPos + 21);

    yPos += 35;
  });

  // === WORKING WITH YOUR ARC PAGE ===
  addNewPage();
  doc.setFillColor(252, 250, 245);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Working With Your Arc', margin, yPos + 10);

  yPos += 25;
  drawHorizontalLine(yPos);
  yPos += 15;

  const practices = [
    {
      title: 'Before Your Power Day (2-3 days prior)',
      content: 'Begin winding down external commitments. Clear your schedule. Review your intentions from the previous cycle. Prepare materials for any rituals or focused work sessions.'
    },
    {
      title: 'On Your Power Day',
      content: 'Wake early if possible. Journal your current state and aspirations. Conduct important meetings or make significant decisions. This is optimal for signing contracts, launching projects, or having crucial conversations.'
    },
    {
      title: 'After Your Power Day (2-3 days following)',
      content: 'Allow integration time. Avoid second-guessing decisions made during your power window. Document any insights or dreams. Begin implementing action steps from your power day intentions.'
    },
    {
      title: 'Mid-Cycle Check-In',
      content: 'Approximately 14 days after your power day, the Moon will be in the opposite phase. Use this time to assess progress, make adjustments, and prepare for the next return.'
    }
  ];

  practices.forEach((practice) => {
    checkPageBreak(35);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text(practice.title, margin, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(70, 70, 70);
    const practiceLines = doc.splitTextToSize(practice.content, contentWidth);
    doc.text(practiceLines, margin, yPos);
    yPos += (practiceLines.length * 5) + 12;
  });

  // === CLOSING PAGE ===
  addNewPage();
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(235, 230, 220);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('The Moon Reflects.', pageWidth / 2, 80, { align: 'center' });

  doc.setFontSize(20);
  doc.setFont('helvetica', 'italic');
  doc.text('You Transform.', pageWidth / 2, 92, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 170, 150);
  
  const closingText = `This report is your compass for the coming year. Return to it monthly. Mark your calendar with your power days. Over time, you will develop an intuitive relationship with your natal lunar rhythm—one that informs not just your planning, but your entire way of being.`;
  const closingLines = doc.splitTextToSize(closingText, contentWidth - 20);
  doc.text(closingLines, pageWidth / 2, 120, { align: 'center', maxWidth: contentWidth - 20 });

  doc.setFontSize(10);
  doc.setTextColor(120, 110, 100);
  doc.text('Continue your journey at moontuner.com', pageWidth / 2, pageHeight - 40, { align: 'center' });

  doc.setFontSize(8);
  doc.text('© Moontuner. All rights reserved.', pageWidth / 2, pageHeight - 30, { align: 'center' });

  // Save the PDF
  const fileName = `Moontuner_Lunar_Arc_${data.birthDate.toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

function getNatalInterpretation(phaseKey: string, phaseName: string): string {
  const interpretations: Record<string, string> = {
    'new': `Being born under the New Moon marks you as a natural initiator. You carry the energy of beginnings—the seed that has not yet broken soil. Your gift is the ability to sense potential where others see only darkness. However, this also means you may often feel misunderstood, as your visions exist in forms not yet visible to others. Your life path involves learning to trust incubation periods and resist the pressure to show results before their time. Each monthly New Moon return amplifies your manifesting capacity—use these windows to plant your most important seeds.`,
    
    'waxing-crescent': `Born during the Waxing Crescent, you are a pioneer at heart. You carry the surge of first momentum—the sprout breaking through resistance. Your innate courage to take initial action, even without guarantees, sets you apart. The challenge for you is follow-through; you may be drawn to new beginnings before completing current projects. Your monthly returns are optimal for pushing through resistance and declaring intentions publicly. The universe responds strongly when you voice your commitments during these windows.`,
    
    'first-quarter': `The First Quarter birth signature marks you as a decisive, action-oriented soul. You thrive in crisis and are often the person others turn to when hard choices must be made. However, you may create conflict unconsciously when life feels too stable. Your growth edge involves learning when to push forward and when to yield. Your monthly power days are ideal for making commitments you've been avoiding, confronting difficult truths, and taking calculated risks that others might shy away from.`,
    
    'waxing-gibbous': `Born under the Waxing Gibbous, you are naturally analytical and devoted to refinement. You see what's almost right and feel compelled to perfect it. This makes you an excellent editor, analyst, or developer of others' ideas. Your shadow is a tendency toward perpetual adjustment—never quite feeling something is ready. Your monthly returns are powerful windows for reviewing projects, making technical improvements, and preparing for the culmination that comes at Full Moon. Trust that done is better than perfect.`,
    
    'full': `A Full Moon birth bestows high visibility and the capacity for objective awareness. You naturally see both sides of any situation and often serve as a bridge between opposing forces. Relationships are central to your life path—you understand yourself through others. The challenge is avoiding codependency or losing yourself in partnership dynamics. Your monthly Full Moon returns are emotionally potent; use them for celebration, honest relationship conversations, and acknowledging what has come to fruition.`,
    
    'waning-gibbous': `Born under the Waning Gibbous (also called Disseminating Moon), you are a natural teacher and communicator. You've come to share wisdom and find meaning through contribution to the collective. Your gift is synthesizing experience into transferable knowledge. The shadow side involves over-giving or teaching before fully integrating lessons yourself. Your monthly returns are optimal for writing, speaking, mentoring, and any form of knowledge distribution.`,
    
    'last-quarter': `The Last Quarter birth signature marks you as someone who came to release outdated patterns—both personal and collective. You have an innate ability to see what needs to end and the courage to let it go. This can manifest as being seen as the "destroyer" in family or organizational systems, which is actually a sacred role. Your challenge is releasing without resentment. Monthly power days are potent for decluttering—physically, emotionally, relationally. What you release in these windows stays released.`,
    
    'waning-crescent': `Born under the Balsamic Moon (Waning Crescent), you carry ancient wisdom and a connection to liminal spaces. You may have felt "old" even as a child, possessing insight beyond your years. Dreams and intuition are heightened for you. The challenge is engaging with the material world—you may resist full incarnation. Your monthly returns are deeply introspective periods; honor them with solitude, rest, and dreamwork. You're not meant to be productive during these windows—you're meant to receive.`
  };

  return interpretations[phaseKey] || interpretations['new'];
}
