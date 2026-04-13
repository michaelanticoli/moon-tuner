import jsPDF from 'jspdf';
import type { LunarReport } from '@/lib/lunarReportEngine';

export const generateLunarPDF = (report: LunarReport): void => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = margin;

  const addNewPage = () => { doc.addPage(); yPos = margin; };
  const checkPageBreak = (needed: number) => { if (yPos + needed > pageHeight - margin) addNewPage(); };
  const drawLine = (y: number) => { doc.setDrawColor(180, 170, 150); doc.setLineWidth(0.3); doc.line(margin, y, margin + contentWidth, y); };

  const { natal, powerDays, arcPractice, peakSummary, closing, meta } = report;

  // === COVER ===
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  doc.setTextColor(235, 230, 220);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('MOONTUNER', pageWidth / 2, 60, { align: 'center' });
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 170, 150);
  doc.text('PERSONAL LUNAR ARC REPORT', pageWidth / 2, 72, { align: 'center' });

  doc.setFillColor(235, 230, 220);
  doc.circle(pageWidth / 2, 120, 25, 'F');
  doc.setFillColor(15, 15, 15);
  doc.circle(pageWidth / 2 + 10, 115, 22, 'F');

  yPos = 170;
  doc.setTextColor(180, 170, 150);
  doc.setFontSize(10);
  doc.text('GENERATED FOR', pageWidth / 2, yPos, { align: 'center' });
  yPos += 12;
  if (meta.querentName) {
    doc.setTextColor(235, 230, 220);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(meta.querentName, pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;
    doc.setFont('helvetica', 'normal');
  }
  doc.setTextColor(235, 230, 220);
  doc.setFontSize(14);
  doc.text(`${meta.birthDate} at ${meta.birthTime}`, pageWidth / 2, yPos, { align: 'center' });
  if (meta.location) { yPos += 8; doc.setFontSize(11); doc.text(meta.location, pageWidth / 2, yPos, { align: 'center' }); }
  yPos += 20;
  doc.setTextColor(180, 170, 150);
  doc.setFontSize(10);
  doc.text('NATAL LUNAR SIGNATURE', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;
  doc.setTextColor(235, 230, 220);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(natal.phase.toUpperCase(), pageWidth / 2, yPos, { align: 'center' });
  yPos += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 170, 150);
  doc.text(`${natal.angle}°`, pageWidth / 2, yPos, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(120, 110, 100);
  doc.text('moontuner.xyz', pageWidth / 2, pageHeight - 20, { align: 'center' });
  doc.text(`Generated ${meta.generatedDate}`, pageWidth / 2, pageHeight - 14, { align: 'center' });

  // === NATAL SIGNATURE ===
  addNewPage();
  doc.setFillColor(252, 250, 245);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Natal Lunar Signature', margin, yPos + 10);
  yPos += 25;
  drawLine(yPos);
  yPos += 15;

  const fields = [
    ['PHASE', natal.phase],
    ['ARCHETYPE', natal.archetype],
    ['ELEMENT', natal.element],
    ['MODALITY', natal.modality],
    ['SOMATIC ZONE', natal.somaticZone],
    ['SOLFEGGIO', `${natal.solfeggio} — ${natal.solfeggioMeaning}`],
    ['INSTRUCTION', natal.instruction],
  ];

  for (const [label, value] of fields) {
    checkPageBreak(20);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 90, 80);
    doc.text(label, margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(value, contentWidth);
    doc.text(lines, margin, yPos + 6);
    yPos += 6 + lines.length * 5 + 6;
  }

  yPos += 5;
  drawLine(yPos);
  yPos += 10;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('KEYWORDS', margin, yPos);
  yPos += 6;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(10);
  doc.text(natal.navTabs.join('  ·  '), margin, yPos);
  yPos += 12;
  drawLine(yPos);
  yPos += 10;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('WHAT THIS MEANS FOR YOU', margin, yPos);
  yPos += 8;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(10);
  const interpLines = doc.splitTextToSize(natal.whatThisMeans.replace(/\n\n/g, '\n'), contentWidth);
  for (const line of interpLines) {
    checkPageBreak(6);
    doc.text(line, margin, yPos);
    yPos += 5;
  }

  // === PEAK SUMMARY ===
  addNewPage();
  doc.setFillColor(252, 250, 245);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Three Peak Windows', margin, yPos + 10);
  yPos += 25;
  drawLine(yPos);
  yPos += 10;

  for (const line of peakSummary.peakLines) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 30, 30);
    doc.text(`★  ${line}`, margin, yPos);
    yPos += 8;
  }

  yPos += 10;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 90, 80);
  doc.text('SOFTEST WINDOW', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(10);
  doc.text(peakSummary.softestLine, margin, yPos);

  // === 12-MONTH ARC ===
  yPos += 20;
  drawLine(yPos);
  yPos += 15;
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Your 12-Month Lunar Arc', margin, yPos);
  yPos += 15;

  for (const day of powerDays) {
    const descLines = doc.splitTextToSize(day.description, contentWidth - 10);
    const maxLines = Math.min(descLines.length, 4);
    const cardHeight = 24 + maxLines * 4;
    checkPageBreak(cardHeight + 8);

    doc.setFillColor(day.isPeak ? 245 : 240, day.isPeak ? 242 : 238, day.isPeak ? 235 : 230);
    doc.rect(margin, yPos - 4, contentWidth, cardHeight, 'F');

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${day.monthFull} ${day.day}`, margin + 5, yPos + 6);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 90, 80);
    doc.text(`${day.keyword}${day.eclipse ? '  ·  ECLIPSE WINDOW' : ''}${day.isPeak ? '  ·  ★ PEAK' : ''}`, margin + 5, yPos + 13);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 120, 100);
    doc.text(`${day.power}%`, margin + contentWidth - 20, yPos + 6);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    for (let i = 0; i < maxLines; i++) {
      doc.text(descLines[i], margin + 5, yPos + 20 + i * 4);
    }

    yPos += cardHeight + 4;
  }

  // === ARC PRACTICE ===
  if (arcPractice) {
    addNewPage();
    doc.setFillColor(252, 250, 245);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Arc Practice', margin, yPos + 10);
    yPos += 25;
    drawLine(yPos);
    yPos += 10;

    const panels = [arcPractice.panelA, arcPractice.panelB, arcPractice.panelC, arcPractice.panelD];
    for (const panel of panels) {
      checkPageBreak(30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 30, 30);
      doc.text(panel.title, margin, yPos);
      if (panel.subtitle) { yPos += 6; doc.setFontSize(10); doc.setFont('helvetica', 'italic'); doc.setTextColor(140, 120, 80); doc.text(panel.subtitle, margin, yPos); }
      yPos += 8;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(10);
      const content = panel.body || [panel.before, panel.during, panel.after].filter(Boolean).join('\n\n');
      const pLines = doc.splitTextToSize(content, contentWidth);
      for (const line of pLines) {
        checkPageBreak(6);
        doc.text(line, margin, yPos);
        yPos += 5;
      }
      yPos += 8;
    }
  }

  // === CLOSING ===
  addNewPage();
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  doc.setTextColor(235, 230, 220);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(closing.headline1, pageWidth / 2, 80, { align: 'center' });
  doc.setFont('helvetica', 'italic');
  doc.text(closing.headline2, pageWidth / 2, 92, { align: 'center' });
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 170, 150);
  const closingLines = doc.splitTextToSize(closing.body, contentWidth - 20);
  doc.text(closingLines, pageWidth / 2, 120, { align: 'center', maxWidth: contentWidth - 20 });
  doc.setFontSize(10);
  doc.setTextColor(120, 110, 100);
  doc.text('Continue your journey at moontuner.xyz', pageWidth / 2, pageHeight - 40, { align: 'center' });
  doc.setFontSize(8);
  doc.text('© Moontuner. All rights reserved.', pageWidth / 2, pageHeight - 30, { align: 'center' });

  const fileName = `Moontuner_Lunar_Arc_${meta.birthDate}.pdf`;
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};
