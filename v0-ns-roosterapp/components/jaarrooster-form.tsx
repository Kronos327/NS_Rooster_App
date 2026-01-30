"use client";

import React from "react"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { ROOSTER_OPTIONS, FUNCTIEGROEP_OPTIONS } from "@/lib/rooster-utils";
import { CalendarDays, Save } from "lucide-react";

interface JaarroosterFormProps {
  onGenerate: (settings: {
    standplaats: string;
    functiegroep: "MCN" | "HC" | "OVERIG";
    rooster: string;
    startregel: number;
    jaar: number;
  }) => void;
}

export function JaarroosterForm({ onGenerate }: JaarroosterFormProps) {
  const { user, settings, saveSettings } = useAuth();

  const [standplaats, setStandplaats] = useState(settings?.standplaats || "");
  const [functiegroep, setFunctiegroep] = useState<"MCN" | "HC" | "OVERIG">(
    settings?.functiegroep || "MCN"
  );
  const [rooster, setRooster] = useState(settings?.rooster || ROOSTER_OPTIONS[0].value);
  const [startregel, setStartregel] = useState(settings?.startregel || 1);
  const [jaar, setJaar] = useState(settings?.jaar || 2026);

  // Update form when settings change (e.g., after login)
  useEffect(() => {
    if (settings) {
      setStandplaats(settings.standplaats);
      setFunctiegroep(settings.functiegroep);
      setRooster(settings.rooster);
      setStartregel(settings.startregel);
      setJaar(settings.jaar);
    }
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      standplaats,
      functiegroep,
      rooster,
      startregel,
      jaar,
    });
  };

  const handleSaveSettings = () => {
    saveSettings({
      standplaats,
      functiegroep,
      rooster,
      startregel,
      jaar,
    });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-primary pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-primary-foreground">
          <CalendarDays className="h-5 w-5" />
          Roosterinstellingen
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Standplaats */}
          <div className="space-y-2">
            <Label htmlFor="standplaats" className="text-base font-medium">
              Standplaats
            </Label>
            <Input
              id="standplaats"
              placeholder="bijv. Amsterdam, Utrecht"
              value={standplaats}
              onChange={(e) => setStandplaats(e.target.value)}
              className="h-12 text-base"
              required
            />
          </div>

          {/* Functiegroep */}
          <div className="space-y-2">
            <Label htmlFor="functiegroep" className="text-base font-medium">
              Functiegroep
            </Label>
            <Select
              value={functiegroep}
              onValueChange={(value) => setFunctiegroep(value as "MCN" | "HC" | "OVERIG")}
            >
              <SelectTrigger id="functiegroep" className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FUNCTIEGROEP_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-base">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rooster */}
          <div className="space-y-2">
            <Label htmlFor="rooster" className="text-base font-medium">
              Rooster
            </Label>
            <Select value={rooster} onValueChange={setRooster}>
              <SelectTrigger id="rooster" className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROOSTER_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-base">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Startregel */}
          <div className="space-y-2">
            <Label htmlFor="startregel" className="text-base font-medium">
              Startregel (1-16)
            </Label>
            <Select
              value={startregel.toString()}
              onValueChange={(value) => setStartregel(Number.parseInt(value))}
            >
              <SelectTrigger id="startregel" className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()} className="text-base">
                    Regel {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Jaar */}
          <div className="space-y-2">
            <Label htmlFor="jaar" className="text-base font-medium">
              Jaar
            </Label>
            <Select
              value={jaar.toString()}
              onValueChange={(value) => setJaar(Number.parseInt(value))}
            >
              <SelectTrigger id="jaar" className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2024, 2025, 2026, 2027, 2028].map((y) => (
                  <SelectItem key={y} value={y.toString()} className="text-base">
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              size="lg"
              className="h-14 w-full bg-secondary text-lg font-semibold text-secondary-foreground hover:bg-secondary/90"
            >
              Genereer Jaarrooster
            </Button>

            {user && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-12 w-full gap-2 text-base bg-transparent"
                onClick={handleSaveSettings}
              >
                <Save className="h-4 w-4" />
                Instellingen opslaan
              </Button>
            )}

            {!user && (
              <p className="text-center text-sm text-muted-foreground">
                Log in om je instellingen op te slaan
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
