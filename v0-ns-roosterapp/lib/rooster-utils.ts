/**
 * Rooster generation utilities
 * TODO: Replace dummy cycle data with real roster data
 */

// Dummy roster options - TODO: Replace with actual roster data
export const ROOSTER_OPTIONS = [
  { value: "mix1ag", label: "Mix 1 AG" },
  { value: "mix2ag", label: "Mix 2 AG" },
  { value: "mix3ag", label: "Mix 3 AG" },
  { value: "sprinter_a", label: "Sprinter A" },
  { value: "sprinter_b", label: "Sprinter B" },
  { value: "ic_direct", label: "IC Direct" },
  { value: "nachtdienst", label: "Nachtdienst" },
];

export const FUNCTIEGROEP_OPTIONS = [
  { value: "MCN", label: "MCN (Machinist)" },
  { value: "HC", label: "HC (Hoofdconducteur)" },
  { value: "OVERIG", label: "Overig" },
];

// Dummy 7-day cycle - TODO: Replace with actual roster cycles
// This represents a simple rotation pattern
const DUMMY_CYCLE = [
  "D1", // Day 1 - Early shift
  "D2", // Day 2 - Late shift
  "D3", // Day 3 - Day shift
  "N1", // Day 4 - Night shift
  "VRIJ", // Day 5 - Off
  "VRIJ", // Day 6 - Off
  "D1", // Day 7 - Early shift
];

export interface DayInfo {
  date: Date;
  dayOfMonth: number;
  dienstcode: string;
  isWeekend: boolean;
  isVrij: boolean;
}

export interface WeekInfo {
  weekNumber: number;
  days: DayInfo[];
}

export interface MonthInfo {
  month: number;
  monthName: string;
  year: number;
  weeks: WeekInfo[];
}

// Dutch month names
const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maart",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Augustus",
  "September",
  "Oktober",
  "November",
  "December",
];

// Get ISO week number
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

// Calculate the dienst code for a given date based on start rule and cycle
function getDienstcode(
  date: Date,
  startDate: Date,
  startregel: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _rooster: string
): string {
  // TODO: Use actual roster data based on the selected rooster
  // For now, use dummy cycle

  // Calculate days since start of the year
  const daysSinceStart = Math.floor(
    (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Apply startregel offset (startregel 1-16 determines starting position in cycle)
  const cyclePosition = (daysSinceStart + (startregel - 1)) % DUMMY_CYCLE.length;

  return DUMMY_CYCLE[cyclePosition >= 0 ? cyclePosition : cyclePosition + DUMMY_CYCLE.length];
}

// Generate year roster
export function generateJaarrooster(
  jaar: number,
  startregel: number,
  rooster: string
): MonthInfo[] {
  const months: MonthInfo[] = [];
  const startDate = new Date(jaar, 0, 1); // January 1st of the year

  for (let month = 0; month < 12; month++) {
    const monthInfo: MonthInfo = {
      month: month + 1,
      monthName: MONTH_NAMES[month],
      year: jaar,
      weeks: [],
    };

    // Get first and last day of month
    const firstDay = new Date(jaar, month, 1);
    const lastDay = new Date(jaar, month + 1, 0);

    // Group days by week
    let currentWeek: WeekInfo | null = null;

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(jaar, month, day);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const weekNum = getWeekNumber(date);

      // Start a new week on Monday (dayOfWeek === 1) or first day of month
      if (currentWeek === null || dayOfWeek === 1) {
        if (currentWeek !== null) {
          monthInfo.weeks.push(currentWeek);
        }
        currentWeek = {
          weekNumber: weekNum,
          days: [],
        };

        // Add empty days for the first week if it doesn't start on Monday
        if (day === 1 && dayOfWeek !== 1) {
          const emptyDays = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
          for (let i = 0; i < emptyDays; i++) {
            currentWeek.days.push({
              date: new Date(0),
              dayOfMonth: 0,
              dienstcode: "",
              isWeekend: false,
              isVrij: false,
            });
          }
        }
      }

      const dienstcode = getDienstcode(date, startDate, startregel, rooster);
      currentWeek.days.push({
        date,
        dayOfMonth: day,
        dienstcode,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        isVrij: dienstcode === "VRIJ",
      });
    }

    // Push the last week
    if (currentWeek !== null) {
      monthInfo.weeks.push(currentWeek);
    }

    months.push(monthInfo);
  }

  return months;
}

// Generate ICS file content
export function generateICS(
  jaar: number,
  startregel: number,
  rooster: string,
  standplaats: string,
  functiegroep: string
): string {
  const months = generateJaarrooster(jaar, startregel, rooster);
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NS Jaarrooster//NL",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:NS Rooster ${jaar} - ${standplaats}`,
  ];

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const now = new Date();
  const timestamp = `${formatDate(now)}T${String(now.getHours()).padStart(2, "0")}${String(
    now.getMinutes()
  ).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}Z`;

  for (const month of months) {
    for (const week of month.weeks) {
      for (const day of week.days) {
        if (day.dayOfMonth === 0) continue; // Skip empty days

        const uid = `${formatDate(day.date)}-${rooster}@ns-rooster`;
        const dateStr = formatDate(day.date);

        lines.push("BEGIN:VEVENT");
        lines.push(`UID:${uid}`);
        lines.push(`DTSTAMP:${timestamp}`);
        lines.push(`DTSTART;VALUE=DATE:${dateStr}`);
        lines.push(`DTEND;VALUE=DATE:${dateStr}`);
        lines.push(`SUMMARY:${day.dienstcode} - ${standplaats}`);
        lines.push(`DESCRIPTION:Functiegroep: ${functiegroep}\\nRooster: ${rooster}\\nRegel: ${startregel}`);
        lines.push("END:VEVENT");
      }
    }
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

// Download ICS file
export function downloadICS(
  jaar: number,
  startregel: number,
  rooster: string,
  standplaats: string,
  functiegroep: string
): void {
  const icsContent = generateICS(jaar, startregel, rooster, standplaats, functiegroep);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ns-rooster-${jaar}-${standplaats.toLowerCase().replace(/\s+/g, "-")}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Mock SMS function
// TODO: Replace with actual SMS/WhatsApp service (e.g., Twilio, MessageBird)
export function mockSendICSToPhone(phoneNumber: string): void {
  console.log(`[MOCK] Zou nu ICS naar ${phoneNumber} sturen via SMS/WhatsApp`);
  // TODO: Implement actual SMS/WhatsApp sending:
  // 1. Upload ICS file to cloud storage
  // 2. Generate short URL
  // 3. Send SMS/WhatsApp message with download link
}
