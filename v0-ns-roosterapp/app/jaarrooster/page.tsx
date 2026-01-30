"use client";

import { useState } from "react";
import { JaarroosterForm } from "@/components/jaarrooster-form";
import { JaarroosterView } from "@/components/jaarrooster-view";
import { ICSExportSection } from "@/components/ics-export-section";
import { generateJaarrooster, type MonthInfo } from "@/lib/rooster-utils";
import { CalendarDays } from "lucide-react";

interface RoosterSettings {
  standplaats: string;
  functiegroep: "MCN" | "HC" | "OVERIG";
  rooster: string;
  startregel: number;
  jaar: number;
}

export default function JaarroosterPage() {
  const [months, setMonths] = useState<MonthInfo[] | null>(null);
  const [currentSettings, setCurrentSettings] = useState<RoosterSettings | null>(null);

  const handleGenerate = (settings: RoosterSettings) => {
    const generatedMonths = generateJaarrooster(
      settings.jaar,
      settings.startregel,
      settings.rooster
    );
    setMonths(generatedMonths);
    setCurrentSettings(settings);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary px-5 pb-6 pt-8">
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-secondary" />
        <div className="mx-auto max-w-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-primary-foreground">
              Jaarrooster Generator
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-lg px-5 py-6">
        <div className="space-y-6">
          {/* Form */}
          <JaarroosterForm onGenerate={handleGenerate} />

          {/* Generated Roster */}
          {months && currentSettings && (
            <>
              <JaarroosterView
                months={months}
                standplaats={currentSettings.standplaats}
              />

              {/* ICS Export */}
              <ICSExportSection
                jaar={currentSettings.jaar}
                startregel={currentSettings.startregel}
                rooster={currentSettings.rooster}
                standplaats={currentSettings.standplaats}
                functiegroep={currentSettings.functiegroep}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
